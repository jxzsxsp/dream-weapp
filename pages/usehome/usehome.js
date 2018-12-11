var o = getApp();

Page({
    data: {
        OpenReferral: "",
        userInfo: {}
    },
    onLoad: function(n) {
        this.setData({
            OpenReferral: o.globalData.siteInfo.OpenReferral
        });
    },
    onShow: function() {
        var o = this;
        o.loadData(o);
    },
    onPullDownRefresh: function() {
        var n = this;
        o.globalData.userInfo = null, n.loadData(n);
    },
    loadData: function(n) {
        var n = this;
        o.globalData.isReloadUser = "1", o.getUserInfo(function(t) {
            n.setData({
                userInfo: t
            }), t.IsTrustLogon ? o.globalData.siteInfo.QuickLoginIsForceBindingMobbile && !t.CellPhoneVerification && wx.redirectTo({
                url: "../phonevefcode/phonevefcode"
            }) : o.globalData.siteInfo.UserLoginIsForceBindingMobbile && !t.CellPhoneVerification && wx.redirectTo({
                url: "../phonevefcode/phonevefcode"
            });
        });
    },
    bindStatue: function(o) {
        var n = o.currentTarget.dataset.key;
        wx.navigateTo({
            url: "../orderlist/orderlist?status=" + n
        });
    },
    bindApply: function(o) {
        wx.navigateTo({
            url: "../applylist/applylist"
        });
    },
    bindMyCardBag: function(o) {
        wx.navigateTo({
            url: "../cardBag/cardBag"
        });
    },
    bindMyAddressTap: function(o) {
        wx.navigateTo({
            url: "../address/address"
        });
    },
    bindMyCouponsTap: function(o) {
        wx.navigateTo({
            url: "../coupon/coupon"
        });
    },
    bindPointTap: function(o) {
        wx.navigateTo({
            url: "../points/points"
        });
    },
    ExitLoginout: function() {
        o.getOpenId(function(n) {
            wx.request({
                url: o.getUrl("logout"),
                data: {
                    openId: n
                },
                success: function(o) {
                    wx.redirectTo({
                        url: "../login/login"
                    });
                }
            });
        });
    },
    bindTelPhone: function(o) {
        var n = o.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: n
        });
    },
    bindExtension: function(n) {
        0 != o.globalData.userInfo.ReferralStatus && 2 != o.globalData.userInfo.ReferralStatus ? wx.navigateTo({
            url: "../applicationResult/applicationResult"
        }) : wx.navigateTo({
            url: "../applicationpromotion/applicationpromotion"
        });
    },
    bindDistribution: function(o) {
        wx.navigateTo({
            url: "../Distribution/Distribution"
        });
    }
});