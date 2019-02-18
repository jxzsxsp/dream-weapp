require("../../utils/config.js");
var n = getApp();
Page({
    data: {},
    onLoad: function(o) {
        this.setData({
            UserName: n.globalData.wxUserInfo.nikeName,
            HeadImg: n.globalData.wxUserInfo.headImage
        });
    },
    quickRegister: function() {
        wx.navigateTo({
            url: "../relationphone/relationphone"
        });
    },
    quickLogin: function() {
        wx.navigateTo({
            url: "../relationregister/relationregister"
        });
    }
});