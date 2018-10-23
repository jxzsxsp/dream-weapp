// pages/inbound/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  onSearchChange(e) {
    this.setData({
      keyword: e.detail
    });
  },

  onSearch(event) {
    if (this.data.keyword) {
      wx.showToast({
        title: '搜索：' + this.data.keyword,
        icon: 'none'
      });
    }
  },

  /**
   * 点击切换Tab事件
   */
  onTabChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.title}`,
      icon: 'none'
    });
  }
})