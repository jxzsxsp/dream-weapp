var fundebug = require('./libs/fundebug.1.0.0.min.js');
fundebug.init(
  {
    apikey: '96c8207c7697b9dec9dc6fdab0a5949e72163e1ef856f5f987d0c15a31b8be67'
  })
function t(t, a, i) {
  if (Number.isNaN(t)) return 0;
  if (a.length <= 0) return parseFloat(t);
  for (var s = 0, d = a.length, l = t; s < d;) {
    var u;
    if (u = a[s], !Number.isNaN(u)) switch (i) {
      case "add":
        l = e(l, u);
        break;

      case "subtract":
        l = o(l, u);
        break;

      case "multiply":
        l = r(l, u);
        break;

      case "divide":
        l = n(l, u);
    }
    s++;
  }
  return l;
}

function e(t, e) {
  var o, r, n;
  try {
    o = t.toString().split(".")[1].length;
  } catch (t) {
    o = 0;
  }
  try {
    r = e.toString().split(".")[1].length;
  } catch (t) {
    r = 0;
  }
  return n = Math.pow(10, Math.max(o, r)), (t.toMul(n) + e.toMul(n)).toDiv(n).toFixed(n);
}

function o(t, e) {
  var o, r, n, a;
  try {
    o = t.toString().split(".")[1].length;
  } catch (t) {
    o = 0;
  }
  try {
    r = e.toString().split(".")[1].length;
  } catch (t) {
    r = 0;
  }
  return n = Math.pow(10, Math.max(o, r)), a = o >= r ? o : r, (t.toMul(n) - e.toMul(n)).toDiv(n).toFixed(a);
}

function r(t, e) {
  var o = 0,
    r = t.toString(),
    n = e.toString();
  try {
    o += r.split(".")[1].length;
  } catch (t) { }
  try {
    o += n.split(".")[1].length;
  } catch (t) { }
  return Number(r.replace(".", "")) * Number(n.replace(".", "")) / Math.pow(10, o);
}

function n(t, e) {
  var o, r, n = 0,
    a = 0;
  try {
    n = t.toString().split(".")[1].length;
  } catch (t) { }
  try {
    a = e.toString().split(".")[1].length;
  } catch (t) { }
  return o = Number(t.toString().replace(".", "")), r = Number(e.toString().replace(".", "")),
    o / r * Math.pow(10, a - n);
}

Number.prototype.toFixed = function (t) {
  e = this + "";
  if (t || (t = 0), -1 == e.indexOf(".") && (e += "."), e += new Array(t + 1).join("0"),
    new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (t + 1) + "})?)\\d*$").test(e)) {
    var e = "0" + RegExp.$2,
      o = RegExp.$1,
      r = RegExp.$3.length;
    return r == t + 2 && (e = (r = e.match(/\d/g)).join("").replace(new RegExp("(\\d+)(\\d{" + t + "})\\d$"), "$1.$2")),
      e = e.substr(1), (o + e).replace(/\.$/, "");
  }
  return this + "";
}, String.prototype.toAdd = function () {
  var e = parseFloat(this);
  return isNaN(e) && (e = 0), t(e, arguments, "add");
}, Number.prototype.toAdd = function () {
  return t(this, arguments, "add");
}, String.prototype.toSub = function () {
  var e = parseFloat(this);
  return isNaN(e) && (e = 0), t(e, arguments, "subtract");
}, Number.prototype.toSub = function () {
  return t(this, arguments, "subtract");
}, String.prototype.toMul = function () {
  var e = parseFloat(this);
  return isNaN(e) && (e = 0), t(e, arguments, "multiply");
}, Number.prototype.toMul = function () {
  return t(this, arguments, "multiply");
}, String.prototype.toDiv = function () {
  var e = parseFloat(this);
  return isNaN(e) && (e = 0), t(e, arguments, "divide");
}, Number.prototype.toDiv = function () {
  return t(this, arguments, "divide");
}, App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    this.screenSize();
  },
  getUserInfo: function (t) {
    var e = this;
    e.globalData.userInfo && "0" == e.globalData.isReloadUser ? ("function" == typeof t && t(e.globalData.userInfo),
      wx.hideNavigationBarLoading()) : (e.globalData.isReloadUser = "0", wx.showNavigationBarLoading(),
        e.getOpenId(function (o) {
          wx.request({
            url: e.getUrl("LoginByOpenId"),
            data: {
              openId: o
            },
            success: function (o) {
              "OK" == o.data.Status ? (e.globalData.userInfo = o.data.Data, "function" == typeof t && t(e.globalData.userInfo)) : wx.redirectTo({
                // url: "../login/login"
                url: "../loginwx/loginwx"
              });
            },
            complete: function () {
              wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
          });
        }));
  },
  setRefferUserId: function (t) {
    wx.setStorageSync("ReferralUserId", t);
  },
  getRefferUserId: function (t) {
    return wx.getStorageSync("ReferralUserId");
  },
  getOpenId: function (t) {
    var e = this;
    "" != e.globalData.openId && void 0 != e.globalData.openId ? "function" == typeof t && t(e.globalData.openId) : wx.login({
      success: function (o) {
        o.code ? wx.request({
          url: e.getUrl("GetOpenId"),
          data: {
            appid: e.globalData.appId,
            secret: e.globalData.secret,
            js_code: o.code
          },
          success: function (o) {
            void 0 != o.data && void 0 != o.data.openid && (e.globalData.openId = o.data.openid,
              "function" == typeof t && t(e.globalData.openId));
          }
        }) : console.log("获取用户登录态失败！" + o.errMsg);
      }
    });
  },
  getWxUserInfo: function (t) {
    var e = this;
    e.globalData.wxUserInfo ? "function" == typeof t && t(e.globalData.wxUserInfo) : wx.login({
      success: function (o) {
        if (o.code) {
          var r = o.code;
          wx.getUserInfo({
            success: function (o) {
              wx.request({
                url: e.getUrl("GetOpenId"),
                data: {
                  appid: e.globalData.appId,
                  secret: e.globalData.secret,
                  js_code: r
                },
                success: function (r) {
                  if (void 0 != r.data && void 0 != r.data.openid) {
                    var n = {
                      openId: r.data.openid,
                      nikeName: o.userInfo.nickName,
                      unionId: "",
                      headImage: o.userInfo.avatarUrl,
                      encryptedData: o.encryptedData,
                      session_key: r.data.session_key,
                      iv: o.iv
                    };
                    e.globalData.wxUserInfo = n, "function" == typeof t && t(e.globalData.wxUserInfo);
                  }
                }
              });
            },
            fail: function () {
              wx.navigateTo({
                url: '../loginwx/loginwx',
              })
              //获取用户信息失败后。请跳转授权页面
              // wx.showModal({
              //     title: '警告',
              //     content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
              //     success: function(res) {
              //         if (res.confirm) {
              //             console.log('用户点击确定')
              //             wx.navigateTo({
              //                 url: '../loginwx/loginwx',
              //             })
              //         }
              //     }
              // })
            }
          });
        } else console.log("获取用户登录态失败！" + o.errMsg);
      }
    });
  },
  setUserInfo: function (t) {
    this.globalData.userInfo = t;
  },
  orderPay: function (t, e, o) {
    var r = this;
    r.getOpenId(function (n) {
      wx.request({
        url: r.getUrl("GetPayParam"),
        data: {
          openId: n,
          orderId: t
        },
        success: function (t) {
          if ("OK" == t.data.Status) {
            var r = t.data.Data;
            wx.requestPayment({
              timeStamp: r.timeStamp,
              nonceStr: r.nonceStr,
              package: "prepay_id=" + r.prepayId,
              signType: "MD5",
              paySign: r.sign,
              success: function (t) {
                wx.showModal({
                  title: "提示",
                  content: "支付成功！",
                  showCancel: !1,
                  success: function (t) {
                    t.confirm && wx.redirectTo({
                      url: "../orderlist/orderlist?status=" + e
                    });
                  }
                });
              },
              fail: function (t) {
                wx.showModal({
                  title: "提示",
                  // content: "支付失败！",
                  content: "尚未支付，等待付款",
                  showCancel: !1,
                  success: function (t) {
                    o || t.confirm && wx.redirectTo({
                      url: "../orderlist/orderlist?status=" + e
                    });
                  }
                });
              }
            });
          } else wx.showModal({
            title: "提示",
            content: t.data.Message,
            showCancel: !1,
            success: function (t) {
              o || t.confirm && wx.redirectTo({
                url: "../orderlist/orderlist?status=" + e
              });
            }
          });
        }
      });
    });
  },
  getRequestUrl: "https://ytal.qkmai.com",
  getUrl: function (t) {
    return "https://ytal.qkmai.com/API/WeChatApplet.ashx?action=" + t;
  },
  globalData: {
    appId: "wx779e355e765faaf5",
    secret: "35d168891cd61dda57f99d825bb3a927",
    userInfo: null,
    siteInfo: null,
    ReferralInfo: null,
    openId: "",
    wxUserInfo: null,
    isReloadUser: "0",
    QQMapKey: "Z3HBZ-4YTCU-6MHVX-42F6K-MRPIH-YQB5W",
    loginByOpenId: "LoginByOpenId",
    loginByUserName: "LoginByUserName",
    quickLogin: "QuickLogin",
    getIndexData: "GetIndexData",
    GetIndexProductData: "GetIndexProductData",
    getProducts: "GetProducts",
    getProductDetail: "GetProductDetail",
    getCountDownProductDetail: "GetCountDownProductDetail",
    userGetCoupon: "UserGetCoupon",
    loadCoupon: "LoadCoupon",
    LoadSiteCoupon: "LoadSiteCoupon",
    getUserShippingAddress: "GetUserShippingAddress",
    addShippingAddress: "AddShippingAddress",
    updateShippingAddress: "UpdateShippingAddress",
    setDefaultShippingAddress: "SetDefaultShippingAddress",
    GetShippingAddressById: "GetShippingAddressById",
    delShippingAddress: "DelShippingAddress",
    AddWXChooseAddress: "AddWXChooseAddress",
    orderList: "OrderList",
    closeOrder: "CloseOrder",
    finishOrder: "FinishOrder",
    getLogistic: "GetLogistic",
    getPayParam: "GetPayParam",
    getShoppingCart: "GetShoppingCart",
    sumbitOrder: "SumbitOrder",
    getRegionsOfProvinceCity: "GetRegionsOfProvinceCity",
    getRegions: "GetRegions",
    GetRegionByLatLng: "GetRegionByLatLng",
    getAllCategories: "GetAllCategories",
    loadOrderProduct: "GetOrderProduct",
    loadReview: "LoadReview",
    loadCouponDetails: "GetCouponDetail",
    getAfterSalePreCheck: "AfterSalePreCheck",
    getTopListBrandRush: "GetTopListBrandRush"
  },
  screenSize: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var ww = res.windowWidth;
        var hh = res.windowHeight;
        that.globalData.ww = ww;
        that.globalData.hh = hh;
      }
    })
  },
  bezier: function (pots, amount) {
    var pot;
    var lines;
    var ret = [];
    var points;
    for (var i = 0; i <= amount; i++) {
      points = pots.slice(0);
      lines = [];
      while (pot = points.shift()) {
        if (points.length) {
          lines.push(pointLine([pot, points[0]], i / amount));
        } else if (lines.length > 1) {
          points = lines;
          lines = [];
        } else {
          break;
        }
      }
      ret.push(lines[0]);
    }
    function pointLine(points, rate) {
      var pointA, pointB, pointDistance, xDistance, yDistance, tan, radian, tmpPointDistance;
      var ret = [];
      pointA = points[0];
      pointB = points[1];
      xDistance = pointB.x - pointA.x;
      yDistance = pointB.y - pointA.y;
      pointDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2);
      tan = yDistance / xDistance;
      radian = Math.atan(tan);
      tmpPointDistance = pointDistance * rate;
      ret = {
        x: pointA.x + tmpPointDistance * Math.cos(radian),
        y: pointA.y + tmpPointDistance * Math.sin(radian)
      };
      return ret;
    }
    return {
      'bezier_points': ret
    };
  },
}), Number.prototype.toFixed = function (t) {
  e = this + "";
  if (t || (t = 0), -1 == e.indexOf(".") && (e += "."), e += new Array(t + 1).join("0"),
    new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (t + 1) + "})?)\\d*$").test(e)) {
    var e = "0" + RegExp.$2,
      o = RegExp.$1,
      r = RegExp.$3.length;
    return r == t + 2 && (e = (r = e.match(/\d/g)).join("").replace(new RegExp("(\\d+)(\\d{" + t + "})\\d$"), "$1.$2")),
      e = e.substr(1), (o + e).replace(/\.$/, "");
  }
  return this + "";
};