// pages/login/index.js

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

  /**
   * 授权登录
   */
  authorLogin: function (e) {
    let _this = this;

    if (e.detail.errMsg !== 'getUserInfo:ok') {
      return false;
    }

    wx.showLoading({ title: "正在登录", mask: true });

    // 执行微信登录
    wx.login({
      success: function (res) {
        // 发送用户信息

        wx.hideLoading();

        wx.setStorageSync('token', 'token')

        // 跳转回原页面
        _this.navigateBack();

        /*
        App._post_form('user/login'
          , {
            code: res.code,
            user_info: e.detail.rawData,
            encrypted_data: e.detail.encryptedData,
            iv: e.detail.iv,
            signature: e.detail.signature
          }
          , function (result) {
            // 记录token user_id
            wx.setStorageSync('token', result.data.token);
            wx.setStorageSync('user_id', result.data.user_id);
            // 跳转回原页面
            _this.navigateBack();
          }
          , false
          , function () {
            wx.hideLoading();
          });
        */
      }
    });
  },

  /**
   * 授权成功 跳转回原页面
   */
  navigateBack: function () {
    let pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack();
    } else {
      wx.redirectTo({
        url: '/pages/home/index',
      })
    }
  },
})