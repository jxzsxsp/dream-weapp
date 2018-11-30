// pages/collection/collection.js
import Dialog from '../../dist/dialog/dialog';
import { urls } from '../../constants/urls.js'
import { _post } from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fee: '',
    memo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({orderNo: options.orderNo });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getInitData();
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

  getInitData: function (callback) {
    let _this = this;

    _post(urls.output_init_url,
      {
        orderNo: _this.data.orderNo
      },
      function (result) {
        console.log(result);
        let data = result.data;
        _this.setData(data);
        _this.setData(data.orderDetail);
      },
      false,
      function () {
        typeof callback === 'function' && callback();
      });
  },

  changeFee(e) {
    this.setData({fee:e.detail.value})
  },

  changeMemo(e) {
    this.setData({ memo: e.detail });
  },

  submit() {
    let _this=this;

    Dialog.confirm({
      message: '实收金额为'+_this.data.fee+'元，是否确认收款？'
    }).then(() => {
      // on confirm
      console.log('confirm');
      _this.collection();
    }).catch(() => {
      // on cancel
      console.log('cancel');
    });
  },

  collection: function (callback) {
    let _this = this;
    this.navigateBack

    _post(urls.receipt_url,
      {
        orderNo: _this.data.orderNo,
        realPrice: _this.data.fee,
        receiptRemark: _this.data.memo
      },
      function (result) {
        wx.showToast({
          title: '收款成功',
        });
        wx.navigateBack();
      },
      false,
      function () {
        typeof callback === 'function' && callback();
      });
  }

})