import { constants } from '../constants/constants.js';

function showLoading() {
  wx.showLoading({
    title: '加载中...'
  });
}

/**
 * 执行用户登录
 */
function doLogin() {
  let pages = getCurrentPages();
  console.log(pages[pages.length-1].route);

  // 跳转授权页面
  if (pages[pages.length - 1].route !== 'pages/login/index') {
    wx.navigateTo({
      url: "/pages/login/index"
    });
  }
}

/**
 * get请求
 */
function _get(url, data, success, fail, complete, check_login) {

  showLoading();

  // 构造请求参数
  data = data || {};
  let token = wx.getStorageSync('token');
  //data.token = token;

  // 构造get请求
  let request = function () {
    console.log(url, data);

    wx.request({
      url: url,
      header: {
        'content-type': 'application/json',
        'token': token
      },
      data: data,
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode !== 200 || typeof res.data !== 'object') {
          wx.showToast({
            title: '网络请求出错',
            icon: 'none',
            duration: constants.SHOW_TOAST_TIME,
          })
          return false;
        }
        if (res.data.code === constants.NO_LOGIN_CODE) {
          // 登录态失效, 重新登录
          doLogin();
        } else if (res.data.code < 0) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: constants.SHOW_TOAST_TIME,
          });
        } else {
          success && success(res.data);
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: constants.SHOW_TOAST_TIME,
        });
      },
      complete: function (res) {
        console.log(res);
        complete && complete(res);
      },
    });
  };
  // 判断是否需要验证登录
  check_login ? doLogin(request) : request();
}

/**
 * post提交
 */
function _post(url, data, success, fail, complete) {

  showLoading();

  // 构造请求参数
  data = data || {};
  let token = wx.getStorageSync('token');
  //data.token = token;
  console.log(url, data);

  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
      'token': token
    },
    method: 'POST',
    data: data,
    success: function (res) {
      wx.hideLoading();
      if (res.statusCode !== 200 || typeof res.data !== 'object') {
        wx.showToast({
          title: '网络请求出错',
          icon: 'none',
          duration: constants.SHOW_TOAST_TIME,
        })
        return false;
      }
      if (res.data.code === -100) {
        // 登录态失效, 重新登录
        doLogin();
      } else if (res.data.code < 0) {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: constants.SHOW_TOAST_TIME,
        });
      } else {
        success && success(res.data);
      }
    },
    fail: function (res) {
      wx.hideLoading();
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: constants.SHOW_TOAST_TIME,
      });
    },
    complete: function (res) {
      console.log(res);
      complete && complete(res);
    }
  });
}

export { _get, _post };