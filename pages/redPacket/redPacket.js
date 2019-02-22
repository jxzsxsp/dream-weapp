// pages/redPacket/redPacket.js 
var e = require("../../utils/config.js"),
    t = getApp();
Page({
    data: {
        getCouponStatus: false,
        memberList: [],
        CouponId: "",
        showUrl: ""
    },
    onLoad: function(options) {
        options.ReferralUserId && t.setRefferUserId(options.ReferralUserId);
        var tm = this;
        t.getUserInfo(function(a) {
            tm.setData({
                userInfo: a
            })
        });
        tm.onFive();
    },
    onShareAppMessage: function() {
        // var i = '/pages/redPacket/redPacket?from=menu';
        // t.globalData.userInfo && t.globalData.userInfo.IsReferral && (i += "&ReferralUserId=" + t.globalData.userInfo.UserId)
        // return {
        //     title: '恭喜您获得350元红包',
        //     path: i,
        //     imageUrl: "http://cos.qkmai.com/qkmbb/ytal/300fengmian.png"
        // }
        var title = '恭喜您获得350元红包';
        var path = '/pages/redPacket/redPacket?from=menu';
        var imageUrl = "http://cos.qkmai.com/qkmbb/ytal/300fengmian.png";
        t.share(title, path, imageUrl)
    },
    onGetCoupon: function(event) {
        var tm = this;
        var e = event.currentTarget.dataset.couponid;
        var that = this;
        "" == e || parseInt(e) <= 0 ? wx.showModal({
            title: "提示",
            content: "领取的优惠券不存在",
            showCancel: !1,
            success: function(e) {
                e.confirm && wx.navigateBack({
                    delta: 1
                });
            }
        }) : t.getOpenId(function(o) {
            wx.request({
                url: t.getUrl("UserGetCoupon"),
                data: {
                    openId: o,
                    couponId: e
                },
                success: function(e) {
                    "OK" == e.data.Status ? (wx.showModal({
                        title: "提示",
                        content: e.data.Message,
                        showCancel: !1
                    }), that.setData({
                        getCouponStatus: true
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

    },
    onFive: function() {
        var tm = this;
        t.getOpenId(function(o) {
            wx.request({
                url: t.getUrl("YTALGetListMemberByCouponId"),
                data: {
                    openId: t.globalData.userInfo.OpenId,
                    couponId: 28
                },
                success: function(a) {
                    tm.setData({
                        memberList: a.data.memberList,
                        getCouponStatus: a.data.hasCoupon
                    })
                    // app.globalData.ReferralInfo = t.data.referral_get_response, tm.GetCheckData();
                }
            });
        })
    },
    fixedGoToHome: function() {
        wx.switchTab({
            url: '/pages/home/home'
        })
    }
})