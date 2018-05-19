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
    console.log("onLoad")

    console.log(options)
    var province = options.province;
    var area = options.area;
    var degree = options.degree;
    var info = app.globalData.info;

    if(province != "" && province != undefined){
      info.province = province;
    }

    if (area != "" && area != undefined) {
      info.area = area;
    }

    if (degree != "" && degree != undefined) {
      info.degree = degree;
    }

    this.setData({
      info: info,
      userInfo: app.globalData.userInfo,
      provinceList: app.globalData.provinceList
    })

    app.updateInfo(info);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow")

    var info = app.globalData.info;
    this.setData({
      info: info
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh")

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom")

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("onShareAppMessage")

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
  },

  selectArea: function() {
    wx.navigateTo({
      url: '../area/area'
    })
  },

  selectProvince: function () {
    wx.navigateTo({
      url: '../province/province'
    })
  },

  selectUniversity: function () {
    wx.navigateTo({
      url: '../university/university'
    })
  },

  selectCollege: function () {
    wx.navigateTo({
      url: '../college/college'
    })
  },

  selectSpeciality: function () {
    wx.navigateTo({
      url: '../speciality/speciality'
    })
  }

})