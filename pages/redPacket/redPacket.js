// pages/redPacket/redPacket.js 
var e = require("../../utils/config.js"),
    t = getApp();
Page({

    /** 
     * 页面的初始数据 
     */
    data: {
        getCouponStatus: false,
        memberList:[],
        CouponId: 11,
        showUrl: ""
        
    },

    /** 
     * 生命周期函数--监听页面加载 
     */
    onLoad: function(options) {
        options.ReferralUserId && t.setRefferUserId(options.ReferralUserId);
        var tm = this;
        t.getUserInfo(function (a) {
            tm.setData({
                userInfo: a
            })
            console.log(a)
        });
        tm.onFive();
    },

    /** 
     * 生命周期函数--监听页面初次渲染完成 
     */
    onReady: function() {

    },

    /** 
     * 生命周期函数--监听页面显示 
     */
    onShow: function() {

    },

    /** 
     * 生命周期函数--监听页面隐藏 
     */
    onHide: function() {

    },

    /** 
     * 生命周期函数--监听页面卸载 
     */
    onUnload: function() {

    },

    /** 
     * 页面相关事件处理函数--监听用户下拉动作 
     */
    onPullDownRefresh: function() {

    },

    /** 
     * 页面上拉触底事件的处理函数 
     */
    onReachBottom: function() {

    },

    /** 
     * 用户点击右上角分享 
     */
    onShareAppMessage: function() {
        var i = '/pages/redPacket/redPacket?from=menu';
        t.globalData.userInfo && t.globalData.userInfo.IsReferral && (i += "&ReferralUserId=" + t.globalData.userInfo.UserId)
        // console.log(i);
        return {
            title: '恭喜您获得350元红包',
            path: i,
            imageUrl: "http://cos.qkmai.com/qkmbb/ytal/300fengmian.png  "
        }
    },
    onGetCoupon: function() {
        var tm = this;
        var e = this.data.CouponId;
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
    onFive: function(){
        var tm = this;
        console.log(t.globalData)
        t.getOpenId(function (o) {
            wx.request({
                url: t.getUrl("YTALGetListMemberByCouponId"),
                data: {
                    openId: t.globalData.userInfo.OpenId,
                    couponId: 11
                },
                success: function (a) {
                    console.log(a)
                    tm.setData({
                        memberList: a.data.memberList,
                        getCouponStatus: a.data.hasCoupon
                    })
                    console.log(tm.data.memberList)
                    // app.globalData.ReferralInfo = t.data.referral_get_response, tm.GetCheckData();
                }
            });
        })
    },
    fixedGoToHome: function () {
        wx.switchTab({
            url: '/pages/home/home'
        })
    }
})