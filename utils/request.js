function showLoading() {
  wx.showLoading({
    title: '加载中...'
  });
}

/**
 * 执行用户登录
 */
function doLogin() {
  // 跳转授权页面
  wx.navigateTo({
    url: "/pages/login/index"
  });
}

/**
 * get请求
 */
function _get (url, data, success, fail, complete, check_login) {

  showLoading();
  
  // 构造请求参数
  data = data || {};
  data.token = wx.getStorageSync('token');
  data.wxapp_id = 10001;

  // 构造get请求
  let request = function () {
    
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      data: data,
      success: function (res) {
        if (res.statusCode !== 200 || typeof res.data !== 'object') {
          wx.showToast({
            title: '网络请求出错',
            icon: 'none'
          })
          return false;
        }
        if (res.data.code === -1) {
          // 登录态失效, 重新登录
          doLogin();
        } else if (res.data.code === 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          return false;
        } else {
          success && success(res.data);
        }
      },
      fail: function (res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {
            fail && fail(res);
          },
        });
      },
      complete: function (res) {
        wx.hideLoading();
        complete && complete(res);
      },
    });
  };
  // 判断是否需要验证登录
  check_login ? App.doLogin(request) : request();
}

/**
 * post提交
 */
function _post (url, data, success, fail, complete) {
  
  showLoading();

  // 构造请求参数
  data = data || {};
  data.token = wx.getStorageSync('token');

  wx.request({
    url: url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data: data,
    success: function (res) {
      if (res.statusCode !== 200 || typeof res.data !== 'object') {
        wx.showToast({
          title: '网络请求出错',
          icon: 'none'
        })
        return false;
      }
      if (res.data.code === -1) {
        // 登录态失效, 重新登录
        return false;
      } else if (res.data.code === 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          complete: function(res) {
            fail && fail(res);
          },
        });
        return false;
      }
      success && success(res.data);
    },
    fail: function (res) {
      wx.showToast({
        title: res.errMsg,
        icon: 'none',
        complete: function(res) {
          fail && fail(res);
        },
      });
    },
    complete: function (res) {
      wx.hideLoading();
      console.log(res);
      complete && complete(res);
    }
  });
}

export { _get, _post };