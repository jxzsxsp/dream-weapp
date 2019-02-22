var t = require("../../utils/config.js"),
    app = getApp();
Page({
    data: {
        artUrl: 'https://ytal.qkmai.com/articles',
        isNum: false
    },
    onLoad: function(options) {
        if (options.artUrl) {
            this.setData({
                artUrl: decodeURIComponent(options.artUrl)
            })
        }
    },
    onShareAppMessage: function(s) {
        var deurl = encodeURIComponent("https://ytal.qkmai.com/vShop/ArticleDetails?ArticleId=5")
        var path = '/pages/webPage/webPage?artUrl=' + deurl
        // app.globalData.userInfo && app.globalData.userInfo.IsReferral && (x += "&ReferralUserId=" + app.globalData.userInfo.UserId)
        // return {
        //     path: path
        // }
        // app.globalData.fundebug.notifyError(new Error("webview文章"), {
        //     name: "webview",
        //     metaData: path
        // });
        app.share(path)
    }
})