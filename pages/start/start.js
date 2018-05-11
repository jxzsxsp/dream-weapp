const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      info: app.globalData.info
    })
  },
  
  start: function() {
    this.data.info.start = true
    this.setData({
      info: this.data.info
    })
    app.updateInfo(this.data.info)

    wx.redirectTo({
      url: '../home/home',
    })
  }
})