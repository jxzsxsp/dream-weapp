var o = getApp();

Page({
    data: {
        OpenReferral: "",
        userInfo: {},
        openId: "",
        headerbg: o.getRequestUrl + "/Templates/xcxshop/images/feixiao_header.png",
        DistributionInfo: "",
        openId: "",
        subMemberList: null,
        isempty: !0,
        ExpandMemberInMonth: "",
        ExpandMemberAll: "",
        LowerUserSaleTotal: ""
    },
    onLoad: function(n) {
        n.ReferralUserId && o.setRefferUserId(n.ReferralUserId);
        var tm = this;
        var n = this;
        o.getOpenId(function(t) {
            wx.request({
                url: o.getUrl("GetReferralInfo"),
                data: {
                    openId: t
                },
                success: function(t) {
                    o.globalData.ReferralInfo = t.data.referral_get_response, tm.GetCheckData();
                }
            });
        });
        o.getUserInfo(function(t) {
            tm.setData({
                userInfo: t
            })
        });
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
                        url: "../loginwx/loginwx"
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
    },
    customerService: function() {
        wx.makePhoneCall({
            phoneNumber: '021-55697790',
            success: function() {
                console.log("正在呼叫")
            },
            fail: function() {
                console.log("呼叫失败")
            }
        })
    },
    goToLearn: function() {
        wx.navigateTo({
            url: '/pages/aboutytal/aboutytal',
        })
    },
    RefferStore: function() {
        wx.navigateTo({
            url: "../RefferStore/RefferStore"
        });
    },
    GetCheckData: function() {
        this.setData({
            DistributionInfo: o.globalData.ReferralInfo
        });
    },
    bindstoreinfo: function() {
        wx.navigateTo({
            url: "../storeInfo/storeInfo"
        });
    },
    bindyongjin: function(e) {
        wx.navigateTo({
            url: "../Splittin/Splittin"
        });
    },
    bindxiaji: function(e) {
        wx.navigateTo({
            url: "../SubMembers/SubMembers"
        });
    },
    goToVip: function() {
        wx.switchTab({
            url: '/pages/discovery/discovery'
        })
    },
    goToCode: function () {
        var tm = this;
        console.log("../myCode/myCode?id=" + tm.data.userInfo.UserId)
        // wx.navigateTo({
        //     url: "../myCode/myCode?id=" + tm.data.userInfo.UserId
        // });
        wx.navigateTo({
            url: "../a/a?id=" + tm.data.userInfo.UserId + "&src=" + tm.data.userInfo.picture
        });
    }
});