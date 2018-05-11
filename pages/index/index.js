const app = getApp()

Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var info = app.globalData.info

    if(info.start){
      wx.redirectTo({
        url: '../home/home',
      })
    }else{
      wx.redirectTo({
        url: '../start/start',
      })
    }
  }

})