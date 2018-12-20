var conf = require("../../utils/config.js"),
    app = getApp();
// pages/discovery/discovery.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        chooseTitle: true,
        hasTrial: false,
        isDefault: true,
        DistributionInfo: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        options.ReferralUserId && app.setRefferUserId(options.ReferralUserId);
        var tm = this;
        app.getUserInfo(function(t) {
            tm.setData({
                userInfo: t
            })
        });


        app.getOpenId(function(t) {
            wx.request({
                url: app.getUrl("GetReferralInfo"),
                data: {
                    openId: t
                },
                success: function(t) {
                    app.globalData.ReferralInfo = t.data.referral_get_response, tm.GetCheckData();
                }
            });
        });
        // tm.setData({
        //     DistributionInfo: app.globalData.ReferralInfo
        // });
    },

    GetCheckData: function() {
        this.setData({
            DistributionInfo: app.globalData.ReferralInfo
        });
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
        var i = '/pages/discovery/discovery?from=menu';
        app.globalData.userInfo && app.globalData.userInfo.IsReferral && (i += "&ReferralUserId=" + app.globalData.userInfo.UserId)
        console.log(i);
        return {
            title: '加入亚太奥莱VIP，能省会赚，最高返40%！',
            path: i,
            imageUrl: "https://qkmai-1257905846.cos.ap-shanghai.myqcloud.com/qkmbb/ytal/yqfx.png"
        }
    },
    changeTitle: function(e) {
        console.log(e)
        var tm = this;
        var flag = tm.data.chooseTitle
        tm.setData({
            chooseTitle: !flag
        })
    },
    toTrial: function() {
        // 申请试用
        var tm = this;


        // app.getOpenId(function(t) {
        //     wx.request({
        //         url: app.getUrl("GetReferralInfo"),
        //         data: {
        //             openId: t
        //         },
        //         success: function(t) {
        //             app.globalData.ReferralInfo = t.data.referral_get_response, tm.GetCheckData();
        //         }
        //     });
        // });





        // wx.request({
        //     url: app.getUrl("YTALSignupDistribution"),
        //     data: {
        //         openId: tm.data.userInfo.UserId
        //     },
        //     success: function () {
        //         app.getOpenId(function (t) {
        //             wx.request({
        //                 url: app.getUrl("GetReferralInfo"),
        //                 data: {
        //                     openId: t
        //                 },
        //                 success: function (t) {
        //                     app.globalData.ReferralInfo = t.data.referral_get_response, n.GetCheckData();
        //                 }
        //             });
        //         });
        //     }
        // })





        tm.setData({
            hasTrial: !tm.data.hasTrial
        })


        // DistributionInfo.ReferralGradeName  接口调用成功
    },
    changeList: function(e) {


        var tm = this;
        console.log(e.currentTarget.dataset.flag === tm.data.isDefault);
        if (e.currentTarget.dataset.flag === tm.data.isDefault) return;
        tm.setData({
            isDefault: !tm.data.isDefault
        })

    }
})