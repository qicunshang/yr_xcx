// pages/user/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '123456',
    nickname: '',
    headimgurl: '',
    mobile: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var nickname = (wx.getStorageSync('user.nickname'))
    var headimgurl = (wx.getStorageSync('user.headimgurl'))
    var mobile = (wx.getStorageSync('user.mobile'))
    console.log(nickname)
    console.log(headimgurl)
    if (!nickname) {
      var token = (wx.getStorageSync('token'))
      var that = this
      app.getUserInfoByToken(token,that)
    }
    this.setData({
      nickname: nickname,
      headimgurl: headimgurl,
      mobile: mobile,
    })
  },
  makePhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber,
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