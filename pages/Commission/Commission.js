// pages/Commission/Commission.js
var t = require("../../utils/config.js"),
    a = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        openId: "",
        PageIndex: 1,
        PageSize: 10,
        SplittinList: null,
        isempty: !0,
        SplittinTotal: "",
        CanDrawSplittin: "",
        NoSettlementSplttin: "",
        DrawSplittinTotal: "",
        isDefault: true,
        DistributionInfo: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var tm = this;
        a.getUserInfo(function (t) {
            tm.setData({
                userInfo: t
            })
        });
        a.getOpenId(function (t) {
            wx.request({
                url: a.getUrl("GetReferralInfo"),
                data: {
                    openId: t
                },
                success: function (t) {
                    a.globalData.ReferralInfo = t.data.referral_get_response, tm.GetCheckData();
                }
            });
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
    onShow: function () {
        var t = this;
        t.setData({
            PageIndex: 1
        }), t.loadData(t, !1);
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
        var t = this;
        t.loadData(t, !1);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        var t = this,
            a = t.data.PageIndex + 1;
        t.setData({
            PageIndex: a
        }), t.loadData(t, !0);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    loadData: function (i, n) {
        wx.showLoading({
            title: "加载中"
        }), a.getOpenId(function (e) {
            wx.request({
                url: a.getUrl("SplittinList"),
                data: {
                    openId: e,
                    pageIndex: i.data.PageIndex,
                    pageSize: i.data.PageSize
                },
                success: function (a) {
                    if (void 0 == a.data.error_response) {
                        var e = a.data.splittin_get_response,
                            l = e.SplittinList;
                        if (n) {
                            var o = i.data.SplittinData;
                            o.push.apply(o, l), i.setData({
                                SplittinList: o,
                                SplittinTotal: i.data.SplittinTotal,
                                CanDrawSplittin: i.data.CanDrawSplittin,
                                NoSettlementSplttin: i.data.NoSettlementSplttin,
                                DrawSplittinTotal: i.data.DrawSplittinTotal
                            });
                        } else {
                            l.Total;
                            i.setData({
                                SplittinList: l,
                                isEmpty: i.data.isempty,
                                SplittinTotal: e.SplittinTotal,
                                CanDrawSplittin: e.CanDrawSplittin,
                                NoSettlementSplttin: e.NoSettlementSplttin,
                                DrawSplittinTotal: e.DrawSplittinTotal
                            });
                        }
                    } else t.showTip(a.data.error_response.errMsg);
                },
                complete: function () {
                    wx.hideLoading();
                }
            });
        });
    },

    bindSplittinDraw: function (t) {
        var tm = this;
        if (tm.data.DistributionInfo.ReferralGradeName == '试用' || !tm.data.DistributionInfo.ReferralGradeName) {
            wx.showModal({
                title: '',
                content: '您是试用VIP，不可提现，请开通永久VIP',
                success: function (res) {
                    if (res.confirm) { //这里是点击了确定以后
                        wx.navigateTo({
                            url: "../longvip/longvip"
                        });
                    } else { //这里是点击了取消以后
                        //console.log('用户点击取消')
                    }
                }
            })
        } else {
            wx.navigateTo({
                url: "../Draw/Draw"
            });
        }
    },
    changeList: function (e) {
        var tm = this;
        if (e.currentTarget.dataset.flag === tm.data.isDefault) return;
        tm.setData({
            isDefault: !tm.data.isDefault
        })
    },
    GetCheckData: function () {
        this.setData({
            DistributionInfo: a.globalData.ReferralInfo
        });

    },
    GoArticle:function(e){
        var url = "https://ytal.qkmai.com/vShop/ArticleDetails?ArticleId=" + e.currentTarget.dataset.id
        var deurl = encodeURIComponent(url)
        var s = '/pages/webPage/webPage?artUrl=' + deurl
        wx.navigateTo({
            url: s
        })
    }
})