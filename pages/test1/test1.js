// pages/test1/test1.js
var WxParse = require('../..//wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newsInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.moduleId);
    var text = '医院介绍';
    var that = this
    wx.request({
      url: 'https://xcx.yirunjk.com/ylxcx/newsInfo?Id=' + options.moduleId,
      method: 'GET',
      success: function(res){
        console.log(res.data.data.content)
        var article = res.data.data.content
        WxParse.wxParse('article', 'html', article, that, 5)
        that.setData({
          newsInfo: article
        })
      }
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