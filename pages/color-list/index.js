// pages/color-list/index.js
import { urls } from '../../constants/urls.js'
import { _post } from '../../utils/request.js'
import { constants } from '../../constants/constants.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: constants.EMPTY_STRING,
    pageId: constants.DEFAULT_PAGE_ID,
    pageSize: constants.MAX_PAGE_SIZE,
    colorList: []
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
    this.setData({
      pageId: constants.DEFAULT_PAGE_ID,
      colorList: []
    });
    this.getColor();
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
    this.setData({
      pageId: constants.DEFAULT_PAGE_ID,
      colorList: []
    });
    this.getColor(function () {
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMore) {
      let pageId = this.data.pageId + 1;
      this.setData({ pageId: pageId });
      this.getColor();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onSearchChange(e) {
    this.setData({
      keyword: e.detail,
      pageId: constants.DEFAULT_PAGE_ID,
      colorList: []
    });
    this.getColor();
  },

  onSearch(e) {
    this.setData({ colorList: [] });
    this.getColor();
  },

  getColor: function (callback) {
    let _this = this;

    _post(urls.color_list_url,
      {
        keyword: _this.data.keyword,
        pageId: _this.data.pageId,
        pageSize: _this.data.pageSize,
      },
      function (result) {
        _this.setData({ colorList: result.data });
      },
      false,
      function () {
        typeof callback === 'function' && callback();
      });
  },

  selectColor(e) {
    wx.setStorageSync("colorId", e.target.dataset.id);
    wx.setStorageSync("colorName", e.target.dataset.name);
    wx.navigateBack();
  }

})