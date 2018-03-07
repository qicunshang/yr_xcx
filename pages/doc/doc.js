// pages/doc/doc.js
var inputContent = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {

    sex: ["未知","男", "女"],
    sexIndex: 1,

    inputContent: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = (wx.getStorageSync('token'))
    inputContent['token'] = token
    inputContent['sex'] = 1
    /*wx.request({
      url: 'https://xcx.yirunjk.com/ylxcx/saveUserInfo',
      method: 'POST',
      data: inputContent,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('获取成功')
      },
    })*/
  },

  bindChange: function (e) {
    inputContent[e.currentTarget.id] = e.detail.value
  },

  bindAccountChange: function(e){
    inputContent['sex'] = e.detail.value
  },

  showTopTips :function(e){
    var that = this
    var token = (wx.getStorageSync('token'))
    inputContent['token'] = token
    console.log(inputContent)
    wx.request({
      url: 'https://xcx.yirunjk.com/ylxcx/saveUserInfo',
      method: 'POST',
      data: inputContent,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == "200" || res.data.code == "500"){
          wx.showModal({
            content: '保存成功！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
        }else{
          wx.showModal({
            content: '保存失败！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
        }
      },
      fail: function () {
        wx.showModal({
          content: '保存失败！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})