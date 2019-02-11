2e1611


// pages/myFocus/myFocus.js
var t = require("../../utils/config.js"),
    e = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        focusList: []
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.focusList();
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