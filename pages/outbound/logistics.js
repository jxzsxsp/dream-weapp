// pages/outbound/logistics.js
import { urls } from '../../constants/urls.js'
import { _post } from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logisticsCompany: '',
    username: '',
    mobile: '',
    logisticsNo: '',
    memo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderNo: options.orderNo,
      customerName: options.customerName,
      customerMobile: options.customerMobile,
    });
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

  scanCode() {
    let that = this;
    wx.scanCode({
      success(res) {
        that.setData({
          logisticsNo: res.result
        })
      }
    })
  },

  changeLogisticsCompany(e) {
    this.setData({ logisticsCompany: e.detail });
  },

  changeUsername(e) {
    this.setData({ username: e.detail });
  },

  changeMobile(e) {
    this.setData({ mobile: e.detail });
  },

  changeLogisticsNo(e) {
    this.setData({ logisticsNo: e.detail });
  },

  changeMemo(e) {
    this.setData({memo: e.detail});
  },

  checkParams() {
    let logisticsCompany = this.data.logisticsCompany;
    let logisticsNo = this.data.logisticsNo;

    if (!logisticsCompany) {
      wx.showToast({
        title: '请输入物流公司',
        icon: 'none',
      });
      return true;
    }

    if (!logisticsNo) {
      wx.showToast({
        title: '请输入物流单号',
        icon: 'none',
      });
      return true;
    }

    return false;
  },

  outBound() {
    let _this = this;

    if (_this.checkParams()) {
      return false;
    }

    _post(urls.output_url,
      {
        orderNo: _this.data.orderNo,
        logisticsCompanyName: _this.data.logisticsCompany,
        logisticsSn: _this.data.logisticsNo,
        //contactName: _this.data.username,
        //contactMobile: _this.data.mobile,
        memo: _this.data.memo
      },
      function (result) {
        console.log(result);
        wx.showToast({
          title: '出库成功',
        });
        wx.navigateBack({
          delta: 2
        });
      },
      false,
      function () {
        typeof callback === 'function' && callback();
      });
  }
})