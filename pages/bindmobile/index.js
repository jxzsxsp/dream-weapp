// pages/bindmobile/index.js
import { urls } from '../../constants/urls.js'
import { _post } from '../../utils/request.js'
import { config } from '../../config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnDisabled: false,
    btnText: '发送验证码',
    mobile: '',
    smscode: '',
    source: 20, // 验证码来源（10 - 用户注册，20 - 绑定手机号，30 - 修改手机号， 40 - 用户手机验证码登录 ..）
    randomStr: '1234'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({ bindId: options.bindId });
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

  changeMobile(e) {
    this.setData({ mobile: e.detail });
  },

  changeSmsCode(e) {
    this.setData({ smscode: e.detail });
  },

  sendSmsCode(e) {
    let _this = this;

    if (!_this.data.mobile) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return true;
    }

    _post(urls.get_smscode_url
      , {
        appId: config.app_id,
        mobile: _this.data.mobile,
        source: _this.data.source,
        randomStr: _this.data.randomStr,
        domainName: config.domain_name
      }
      , function (result) {
        console.log(result);

        if (result.data && result.data.uuid) {
          _this.setData({uuid: result.data.uuid});
          wx.showToast({
            title: '验证码发送成功',
          });

          _this.timing();
        }
      }
      , false
      , false);

  },

  timing() {
    let _this = this;
    let seconds = 60;
    _this.setData({ btnDisabled: true });
    setInterval(() => {
      seconds--;
      
      if(seconds <= 0) {
        _this.setData({ btnText: "发送验证码", btnDisabled: false});
      }
      else {
        _this.setData({ btnText: seconds+"秒" });
      }
    }, 1000);
  },

  submit(e) {
    console.log("submit", e);
    let _this = this;

    _post(urls.bind_mobile_url
      , {
        appId: config.app_id,
        bindId: _this.data.bindId,
        mobile: _this.data.mobile,
        authCode: _this.data.smscode,
        uuid: _this.data.uuid,
        domainName: config.domain_name
      }
      , function (result) {
        console.log(result);
        if (result.data.token) {
          wx.setStorageSync('token', result.data.token);
        }
        wx.redirectTo({
          url: '/pages/home/index',
        })
      }
      , false
      , false);

  }

})