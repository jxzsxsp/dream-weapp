// pages/codeprint/index.js
import { urls } from '../../constants/urls.js'
import { _post } from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rollCodes: [],
    viewAddress: true,
    pageNo: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let rollCodes = wx.getStorageSync("rollCodes");
    wx.removeStorageSync("rollCodes");
    this.setData({
      rollCodes: rollCodes
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

  onChange(e) {
    this.setData({ viewAddress: !this.data.viewAddress});
  },

  changeNum(e) {
    this.setData({ pageNo: e.detail});
  },

  print: function (callback) {
    let _this = this;

    if(_this.data.printing) {
      return false;
    }

    _this.setData({ printing: true });

    _post(urls.input_print_url,
      {
        rollCodes: _this.data.rollCodes,
        pageNo: _this.data.pageNo,
        viewAddress: _this.data.viewAddress
      },
      function (result) {
        console.log(result);

        wx.showToast({
          title: '打印成功',
          icon: 'none'
        });
        
        wx.navigateBack({
          delta: 2
        });
      },
      false,
      function () {
        _this.setData({ printing: false });
        typeof callback === 'function' && callback();
      });
  },

  next() {
    wx.navigateTo({
      url: '/pages/codeview/index?num='+this.data.num+"&checked="+this.data.checked,
    })
  }
})