App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    this.globalData.info = wx.getStorageSync('info') || this.globalData.info;
    wx.setStorageSync('info', this.globalData.info)
    
  },

  updateInfo: function(info) {
    this.globalData.info = info;
    wx.setStorageSync('info', info)
  },
  
  globalData: {
    info: {
      province: "",
      area: "",
      degree: "",
      start: false
    }
  }
})
