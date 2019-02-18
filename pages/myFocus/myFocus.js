var t = require("../../utils/config.js"),
    e = getApp();
Page({
    data: {
        focusList: []
    },
    onLoad: function (options) {
        this.focusList();
    },
    focusList: function () {
        var tm = this;
        wx.request({
            url: e.getUrl("YTALGetListBrandByFollow"),
            data: {
                openId: e.globalData.userInfo.OpenId
                // openId: "o_rWK5ULNm46IJqvZOEFWIj_xWVc"
            },
            success: function (jd) {
                if (jd.data.length > 0) {
                    let logoList = [];
                    tm.setData({
                        focusList: jd.data
                    })
                }
            }
        });
    },
    cancleFocus: function (event) {
        var tm = this;
        var s = event.currentTarget.dataset.index;
        wx.request({
            url: e.getUrl("YTALFollowBrand"),
            data: {
                openId: e.globalData.userInfo.OpenId,
                mainTitle: event.currentTarget.dataset.title,
                brandLogo: event.currentTarget.dataset.logo
            },
            success: function (jd) {
                var br = tm.data.focusList.splice(s, 1);
                tm.setData({
                    focusList: tm.data.focusList
                })
            }
        });
    }
})