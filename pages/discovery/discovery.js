var conf = require("../../utils/config.js"),
    app = getApp();
// pages/discovery/discovery.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var tm=this;
        app.getUserInfo(function (t) {
            tm.setData({
                userInfo: t
            })            
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

var tm=this;

        console.log('/pages/discovery/discovery?ReferralUserId=' + tm.data.userInfo.UserId)
        return {
            title: '加入亚太奥莱VIP，能省会赚，最高返40%！',
            path: '/pages/discovery/discovery?ReferralUserId=' + tm.data.userInfo.UserId
        }
    }
})