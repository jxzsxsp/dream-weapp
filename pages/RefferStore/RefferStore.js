var e = require("../../utils/config.js"), o = getApp();

Page({
    data: {},
    onLoad: function(e) {
        e.ReferralUserId && o.setRefferUserId(e.ReferralUserId), this.setData({
            RefferImg: o.globalData.ReferralInfo.ReferralPosterUrl,
            QrCodeUrl: o.globalData.ReferralInfo.QrCodeWidth,
            Qwidth: o.globalData.ReferralInfo.QrCodeWidth
        });
    },
    onShareAppMessage: function(a) {
        // var r;
        // return o.globalData.userInfo && o.globalData.userInfo.IsReferral && (r = "/pages/home/home?ReferralUserId=" + o.globalData.userInfo.UserId), 
        // {
        //     title: o.globalData.ReferralInfo.ShopName,
        //     path: r,
        //     success: function(o) {
        //         e.showTip("分享成功", "success");
        //     },
        //     fail: function(o) {
        //         e.showTip("分享失败", "error");
        //     }
        // };
        var title = o.globalData.ReferralInfo.ShopName;
        var path = "/pages/home/home";
        e.share(title, path)
    }
});