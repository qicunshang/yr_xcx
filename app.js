//app.js

App({
  data:{
    nickName:'',
    avatarUrl:''
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var token = (wx.getStorageSync('token'))
    console.log(token)
    if (token) {
      var that = this
      wx.getUserInfo({
        success: function (res) {
          /*that.setData({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
          })*/
          console.log("获取成功！")
          wx.setStorageSync('user.nickname', res.userInfo.nickName)
          wx.setStorageSync('user.headimgurl', res.userInfo.avatarUrl)
          wx.setStorageSync('user.mobile', res.userInfo.mobile)
        },
        fail: function () {
          // fail
          console.log("获取失败！")
        },
        complete: function () {
          // complete
          console.log("获取用户信息完成！")
        }
      })
    }else{
      // 登录
      console.log("调用wx.login")
      wx.login({
        success: res1 => {
          //console.log(res1);
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              wx.request({
                url: 'https://xcx.yirunjk.com/ylxcx/wx_login',
                data: {
                  iv: res.iv,
                  encryptedData: res.encryptedData,
                  code: res1.code
                },
                method: 'GET',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  // this.globalData.userInfo = JSON.parse(res.data);
                  console.log(res)
                  wx.setStorageSync('token', res.data.data.token);
                  var token = (wx.getStorageSync('token'))
                  console.log("wx.login调用成功")
                  console.log(res.data.data.token)
                },
                fail: function () {
                  console.log('wx.login请求失败')
                }
              })

              //console.log(res);
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })

          // 获取用户信息
          // wx.getSetting({
          //   success: res => {
          //     console.log(res.authSetting)
          //     if (res.authSetting['scope.userInfo']) {
          //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                
          //     }
          //   }
          // })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },
  getUserInfoByToken: function(token, that){
    //TODO 如果token没有过期则直接请求用户信息，反之则生成token
    wx.request({
      url: 'https://xcx.yirunjk.com/ylxcx/userInfo',
      method: 'GET',
      data: {
        token: token
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //TODO 请求成功，通过返回码判断是否成功 200-成功 -1失败 404-没有token
        if(res.data.status.code == '200'){
          //save or use userInfo
          console.log(res.data.data)
          wx.setStorageSync('user.nickname', res.data.data.nickname)
          wx.setStorageSync('user.headimgurl', res.data.data.headimgurl)
          wx.setStorageSync('user.mobile', res.data.data.mobile)

          that.setData({
            nickname: res.data.data.nickname,
            headimgurl: res.data.data.headimgurl,
            mobile: res.data.data.mobile,
          })
        }else{
          //wx.login
          console.log(res)
          wx.login({
            success: res1 => {
              //console.log(res1);
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  wx.request({
                    url: 'https://xcx.yirunjk.com/ylxcx/wx_login',
                    data: {
                      iv: res.iv,
                      encryptedData: res.encryptedData,
                      code: res1.code
                    },
                    method: 'GET',
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                      // this.globalData.userInfo = JSON.parse(res.data);
                      console.log(res)
                      wx.setStorageSync('token', res.data.data.token)
                      getUserInfoByToken(res.data.data.token)
                    },
                    fail: function () {
                      console.log('wx.login请求失败')
                    }
                  })

                  //console.log(res);
                  this.globalData.userInfo = res.userInfo

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
          
        }
      },
    })
  }
})