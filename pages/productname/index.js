// pages/productname/index.js
import { urls } from '../../constants/urls.js'
import { _post } from '../../utils/request.js'

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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getProductName();
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

  getProductName: function (callback) {
    let _this = this;

    _post(urls.product_name_url,
      {
      },
      function (result) {
        _this.setData({productNameList: result.data});
      },
      false,
      function () {
        typeof callback === 'function' && callback();
      });
  },

  selectProductName(e) {
    wx.setStorageSync("productNameId", e.target.dataset.id);
    wx.setStorageSync("productName", e.target.dataset.name);
    wx.navigateBack();
  }

})