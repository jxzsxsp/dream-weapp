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
    } catch (t) {}
    try {
        o += n.split(".")[1].length;
    } catch (t) {}
    return Number(r.replace(".", "")) * Number(n.replace(".", "")) / Math.pow(10, o);
}

function n(t, e) {
    var o, r, n = 0,
        a = 0;
    try {
        n = t.toString().split(".")[1].length;
    } catch (t) {}
    try {
        a = e.toString().split(".")[1].length;
    } catch (t) {}
    return o = Number(t.toString().replace(".", "")), r = Number(e.toString().replace(".", "")),
        o / r * Math.pow(10, a - n);
}

Number.prototype.toFixed = function(t) {
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
}, String.prototype.toAdd = function() {
    var e = parseFloat(this);
    return isNaN(e) && (e = 0), t(e, arguments, "add");
}, Number.prototype.toAdd = function() {
    return t(this, arguments, "add");
}, String.prototype.toSub = function() {
    var e = parseFloat(this);
    return isNaN(e) && (e = 0), t(e, arguments, "subtract");
}, Number.prototype.toSub = function() {
    return t(this, arguments, "subtract");
}, String.prototype.toMul = function() {
    var e = parseFloat(this);
    return isNaN(e) && (e = 0), t(e, arguments, "multiply");
}, Number.prototype.toMul = function() {
    return t(this, arguments, "multiply");
}, String.prototype.toDiv = function() {
    var e = parseFloat(this);
    return isNaN(e) && (e = 0), t(e, arguments, "divide");
}, Number.prototype.toDiv = function() {
    return t(this, arguments, "divide");
}, App({
    onLaunch: function() {},
    getUserInfo: function(t) {
        var e = this;
        e.globalData.userInfo && "0" == e.globalData.isReloadUser ? ("function" == typeof t && t(e.globalData.userInfo),
            wx.hideNavigationBarLoading()) : (e.globalData.isReloadUser = "0", wx.showNavigationBarLoading(),
            e.getOpenId(function(o) {
                wx.request({
                    url: e.getUrl("LoginByOpenId"),
                    data: {
                        openId: o
                    },
                    success: function(o) {
                        "OK" == o.data.Status ? (e.globalData.userInfo = o.data.Data, "function" == typeof t && t(e.globalData.userInfo)) : wx.redirectTo({
                            // url: "../login/login"
                            url: "../loginwx/loginwx"
                        });
                    },
                    complete: function() {
                        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
                    }
                });
            }));
    },
    setRefferUserId: function(t) {
        wx.setStorageSync("ReferralUserId", t);
    },
    getRefferUserId: function(t) {
        return wx.getStorageSync("ReferralUserId");
    },
    getOpenId: function(t) {
        var e = this;
        "" != e.globalData.openId && void 0 != e.globalData.openId ? "function" == typeof t && t(e.globalData.openId) : wx.login({
            success: function(o) {
                o.code ? wx.request({
                    url: e.getUrl("GetOpenId"),
                    data: {
                        appid: e.globalData.appId,
                        secret: e.globalData.secret,
                        js_code: o.code
                    },
                    success: function(o) {
                        void 0 != o.data && void 0 != o.data.openid && (e.globalData.openId = o.data.openid,
                            "function" == typeof t && t(e.globalData.openId));
                    }
                }) : console.log("获取用户登录态失败！" + o.errMsg);
            }
        });
    },
    getWxUserInfo: function(t) {
        var e = this;
        e.globalData.wxUserInfo ? "function" == typeof t && t(e.globalData.wxUserInfo) : wx.login({
            success: function(o) {
                if (o.code) {
                    var r = o.code;
                    wx.getUserInfo({
                        success: function(o) {
                            wx.request({
                                url: e.getUrl("GetOpenId"),
                                data: {
                                    appid: e.globalData.appId,
                                    secret: e.globalData.secret,
                                    js_code: r
                                },
                                success: function(r) {
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
                        fail: function() {
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
    setUserInfo: function(t) {
        this.globalData.userInfo = t;
    },
    orderPay: function(t, e, o) {
        var r = this;
        r.getOpenId(function(n) {
            wx.request({
                url: r.getUrl("GetPayParam"),
                data: {
                    openId: n,
                    orderId: t
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        var r = t.data.Data;
                        wx.requestPayment({
                            timeStamp: r.timeStamp,
                            nonceStr: r.nonceStr,
                            package: "prepay_id=" + r.prepayId,
                            signType: "MD5",
                            paySign: r.sign,
                            success: function(t) {
                                wx.showModal({
                                    title: "提示",
                                    content: "支付成功！",
                                    showCancel: !1,
                                    success: function(t) {
                                        t.confirm && wx.redirectTo({
                                            url: "../orderlist/orderlist?status=" + e
                                        });
                                    }
                                });
                            },
                            fail: function(t) {
                                wx.showModal({
                                    title: "提示",
                                    // content: "支付失败！",
                                    content: "尚未支付，等待付款",
                                    showCancel: !1,
                                    success: function(t) {
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
                        success: function(t) {
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
    getUrl: function(t) {
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
    bezier: function(points, times) {
        // 0、以3个控制点为例，点A,B,C,AB上设置点D,BC上设置点E,DE连线上设置点F,则最终的贝塞尔曲线是点F的坐标轨迹。
        // 1、计算相邻控制点间距。
        // 2、根据完成时间,计算每次执行时D在AB方向上移动的距离，E在BC方向上移动的距离。
        // 3、时间每递增100ms，则D,E在指定方向上发生位移, F在DE上的位移则可通过AD/AB = DF/DE得出。
        // 4、根据DE的正余弦值和DE的值计算出F的坐标。
        // 邻控制AB点间距
        var bezier_points = [];
        var points_D = [];
        var points_E = [];
        const DIST_AB = Math.sqrt(Math.pow(points[1]['x'] - points[0]['x'], 2) + Math.pow(points[1]['y'] - points[0]['y'], 2));
        // 邻控制BC点间距
        const DIST_BC = Math.sqrt(Math.pow(points[2]['x'] - points[1]['x'], 2) + Math.pow(points[2]['y'] - points[1]['y'], 2));
        // D每次在AB方向上移动的距离
        const EACH_MOVE_AD = DIST_AB / times;
        // E每次在BC方向上移动的距离 
        const EACH_MOVE_BE = DIST_BC / times;
        // 点AB的正切
        const TAN_AB = (points[1]['y'] - points[0]['y']) / (points[1]['x'] - points[0]['x']);
        // 点BC的正切
        const TAN_BC = (points[2]['y'] - points[1]['y']) / (points[2]['x'] - points[1]['x']);
        // 点AB的弧度值
        const RADIUS_AB = Math.atan(TAN_AB);
        // 点BC的弧度值
        const RADIUS_BC = Math.atan(TAN_BC);
        // 每次执行
        for (var i = 1; i <= times; i++) {
            // AD的距离
            var dist_AD = EACH_MOVE_AD * i;
            // BE的距离
            var dist_BE = EACH_MOVE_BE * i;
            // D点的坐标
            var point_D = {};
            point_D['x'] = dist_AD * Math.cos(RADIUS_AB) + points[0]['x'];
            point_D['y'] = dist_AD * Math.sin(RADIUS_AB) + points[0]['y'];
            points_D.push(point_D);
            // E点的坐标
            var point_E = {};
            point_E['x'] = dist_BE * Math.cos(RADIUS_BC) + points[1]['x'];
            point_E['y'] = dist_BE * Math.sin(RADIUS_BC) + points[1]['y'];
            points_E.push(point_E);
            // 此时线段DE的正切值
            var tan_DE = (point_E['y'] - point_D['y']) / (point_E['x'] - point_D['x']);
            // tan_DE的弧度值
            var radius_DE = Math.atan(tan_DE);
            // 地市DE的间距
            var dist_DE = Math.sqrt(Math.pow((point_E['x'] - point_D['x']), 2) + Math.pow((point_E['y'] - point_D['y']), 2));
            // 此时DF的距离
            var dist_DF = (dist_AD / DIST_AB) * dist_DE;
            // 此时DF点的坐标
            var point_F = {};
            point_F['x'] = dist_DF * Math.cos(radius_DE) + point_D['x'];
            point_F['y'] = dist_DF * Math.sin(radius_DE) + point_D['y'];
            bezier_points.push(point_F);
        }
        return {
            'bezier_points': bezier_points
        };
    }
}), Number.prototype.toFixed = function(t) {
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