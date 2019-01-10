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
        // console.log(e.globalData.openId)
        wx.request({
            url: e.getUrl("GetListBrandByFollow"),
            data: {
                // openId: e.globalData.openId
                openId: "o_rWK5ULNm46IJqvZOEFWIj_xWVc"
            },
            success: function (jd) {
                if (jd.data.length > 0) {
                    // console.log(jd.data)
                    let logoList = [];

                    tm.setData({
                        focusList: jd.data
                    })
                }
            }
        });
    },
    cancleFocus: function () {
        var tm = this;
        // var s = event.currentTarget.dataset.index;
        // var o = tm.data.userInfo.OpenId
        // wx.request({
        //     url: e.getUrl("FollowBrand"),
        //     data: {
        //         openId: o,
        //         mainTitle: event.currentTarget.dataset.title
        //     },
        //     success: function (jd) {
        //         event._relatedInfo.anchorTargetText = "取消关注"
        //         var br = tm.data.brandRush;
        //         br[s].isFocus = !br[s].isFocus;
        //         tm.setData({
        //             brandRush: br
        //         })
        //     }
        // });
    }
})