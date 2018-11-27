// pages/inbound/reject.js
import Toast from '../../dist/toast/toast';
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
    this.setData({ orderNo: options.orderNo });
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

  reject(callback) {
    let _this = this;

    _post(urls.reject_url,
      {
        orderNo: _this.data.orderNo,
        rejectDescription: _this.data.rejectDescription
      },
      function (result) {
        console.log(result);
        Toast.success('成功驳回');
        wx.navigateBack({
          delta: 2
        })
      },
      false,
      function () {
        typeof callback === 'function' && callback();
      });
  },

  onChange(e) {
    this.setData({ rejectDescription: e.detail.value })
  }

})