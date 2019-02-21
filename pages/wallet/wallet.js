var t = require("../../utils/config.js"),
    a = getApp();
Page({
    data: {
        balance: "",
        userInfo: {},
        openId: "",
        PageIndex: 1,
        PageSize: 10,
        BalanceList: [],
        isempty: !0,
        SplittinTotal: "",
        CanDrawSplittin: "",
        NoSettlementSplttin: "",
        DrawSplittinTotal: "",
        isDefault: true,
        DistributionInfo: "",
        dataIndex: 0,
        hasMore:true,
        isBalance: true
    },
    onLoad: function(options) {
        var tm = this;
        a.getUserInfo(function(t) {
            tm.setData({
                userInfo: t
            })
            tm.loadMore()    
        });
        a.getOpenId(function(t) {
            wx.request({
                url: a.getUrl("GetReferralInfo"),
                data: {
                    openId: t
                },
                success: function(t) {
                    a.globalData.ReferralInfo = t.data.referral_get_response, tm.GetCheckData();
                }
            });
        });
    },
    onShow: function() {
        var t = this;
        // t.setData({
        //     PageIndex: 1
        // }), t.loadData(t, !1);
    },
    onPullDownRefresh: function() {
        var t = this;
        // t.loadData(t, !1);
        t.loadMore();
    },
    onReachBottom: function() {
        var t = this;
            // a = t.data.PageIndex + 1;
        // t.setData({
        //     PageIndex: a
        // }), t.loadData(t, !0);
        t.loadMore();
    },
    loadData: function(i, n) {
        wx.showLoading({
            title: "加载中"
        }), a.getOpenId(function(e) {
            wx.request({
                url: a.getUrl("YTALGetMemberBalanceList"),
                data: {
                    openId: e,
                    pageIndex: i.data.PageIndex,
                    pageSize: i.data.PageSize
                },
                success: function(a) {
                    if (void 0 == a.data.error_response) {
                        var e = a.data,
                            l = e.list;
                        if (n) {
                            var o = i.data.SplittinData;
                            o.push.apply(o, l), i.setData({
                                BalanceList: o,

                            });
                        } else {
                            l.Total;
                            i.setData({
                                BalanceList: l,
                                balance: e.balance
                            });
                        }
                    } else t.showTip(a.data.error_response.errMsg);
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        });
    },
    changeList: function(e) {
        var tm = this;
        if (e.currentTarget.dataset.flag === tm.data.isDefault) return;
        tm.setData({
            isDefault: !tm.data.isDefault
        })
    },
    GetCheckData: function() {
        this.setData({
            DistributionInfo: a.globalData.ReferralInfo
        });

    },
    GoArticle: function(e) {
        var url = "https://ytal.qkmai.com/vShop/ArticleDetails?ArticleId=" + e.currentTarget.dataset.id
        var deurl = encodeURIComponent(url)
        var s = '/pages/webPage/webPage?artUrl=' + deurl
        wx.navigateTo({
            url: s
        })
    },
    loadMore: function () {
        var tm = this;
        wx.showLoading({
            title: "加载中"
        });
        wx.request({
            url: a.getUrl("YTALGetMemberBalanceList"),
            data: {
                openId: tm.data.userInfo.OpenId,
                // openId: "o_rWK5f-5hvhMrySuLW5L7d_vTwA",
                pageIndex: ++tm.data.dataIndex,
                pageSize: tm.data.PageSize
            },
            success: function (res) {
                if (res.data.list.length != 10) {
                    tm.setData({
                        hasMore: false
                    })
                }
                var oldList = tm.data.BalanceList
                var newList = oldList.concat(res.data.list)
                tm.setData({
                    BalanceList: newList,
                    balance: res.data.balance
                })
                wx.hideLoading();
            },
            complete: function () {
                wx.hideLoading();
            }
        });
    }
})