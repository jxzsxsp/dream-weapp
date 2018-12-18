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
        hasTrial: false
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
            path: i
        }
    },
    changeTitle: function (e) {
        console.log(e)
        var tm = this;
        var flag = tm.data.chooseTitle
        tm.setData({
            chooseTitle: !flag
        })
    },
    toTrial: function () {
        // 申请试用
        console.log("点击试用")
        var tm = this;
        tm.setData({
            hasTrial: !tm.data.hasTrial
        })
    }
})