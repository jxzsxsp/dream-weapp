// pages/webPage/webPage.js
var t = require("../../utils/config.js"),
    app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        artUrl: 'https://ytal.qkmai.com/articles',
        isNum: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.artUrl) {
            this.setData({
                artUrl: decodeURIComponent(options.artUrl)
            })
        }
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
    onShareAppMessage: function (s) {
        // console.log(s)
        // var url = "https://ytal.qkmai.com/vShop/ArticleDetails?ArticleId=" + event.currentTarget.dataset.id
        var deurl = encodeURIComponent("https://ytal.qkmai.com/vShop/ArticleDetails?ArticleId=5")
        var x = '/pages/webPage/webPage?artUrl=' + deurl


        app.globalData.userInfo && app.globalData.userInfo.IsReferral && (x += "&ReferralUserId=" + app.globalData.userInfo.UserId)
        // console.log(x)
        return {
            path:x
        }
        app.globalData.fundebug.notifyError(new Error("webview文章"), {
            name: "webview",
            metaData: x
        });
    },
    goHome: function (e) {
        console.log(e)
    }
})