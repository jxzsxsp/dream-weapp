// pages/redPacket/redPacket.js 
var e = require("../../utils/config.js"), t = getApp();
Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    getCouponStatus:true,
  
    CouponId: 11
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
  onGetCoupon:function(){
    var tm = this;
    var e = this.data.CouponId;
    var that = this
    "" == e || parseInt(e) <= 0 ? wx.showModal({
      title: "提示",
      content: "领取的优惠券不存在",
      showCancel: !1,
      success: function (e) {
        e.confirm && wx.navigateBack({
          delta: 1
        });
      }
    }) : t.getOpenId(function (o) {
      wx.request({
        url: t.getUrl("UserGetCoupon"),
        data: {
          openId: o,
          couponId: e
        },
        success: function (e) {
          "OK" == e.data.Status ? (wx.showModal({
            title: "提示",
            content: e.data.Message,
            showCancel: !1
          }), this.setData({
            getCouponStatus: false
          })) : "NO" == e.data.Status && ("NOUser" == e.data.Message ? wx.navigateTo({
            url: "../login/login"
          }) : (that.setData({
            backShow: "none",
            couponShow: "none",
            isGet: true
          }), wx.showToast({
            title: e.data.Message,
            image: "../../images/warning.png"
          })));
        }
      });
    });
    
  }
})