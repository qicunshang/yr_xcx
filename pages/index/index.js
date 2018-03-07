Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    phoneNumber:'123456'
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://xcx.yirunjk.com/ylxcx/example',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var example = res.data.data
        that.setData({
          example: example
        })
      },
    })
  },
  makePhone: function(e){
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber,
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})