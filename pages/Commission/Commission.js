var t = require("../../utils/config.js"),
    a = getApp();
Page({
    data: {
        userInfo: {},
        openId: "",
        PageIndex: 1,
        PageSize: 10,
        SplittinList: [],
        isempty: !0,
        SplittinTotal: "",
        CanDrawSplittin: "",
        NoSettlementSplttin: "",
        DrawSplittinTotal: "",
        isDefault: true,
        DistributionInfo: "",
        hasMore: true,
        dataIndex: 0
    },
    onLoad: function(options) {
        var tm = this;
        a.getUserInfo(function(t) {
            tm.setData({
                userInfo: t
            })
        });
        a.getOpenId(function(t) {
            wx.request({
                url: a.getUrl("GetReferralInfo"),
                data: {
                    openId: t
                    // openId: "o_rWK5f-5hvhMrySuLW5L7d_vTwA"
                },
                success: function(t) {
                    a.globalData.ReferralInfo = t.data.referral_get_response, tm.GetCheckData();
                }
            });
        });
    },
    onShow: function() {
        var tm = this;
        tm.loadMore()
    },
    onPullDownRefresh: function() {
        var t = this;
        t.setData({
            dataIndex: 0,
            hasMore: true
        })
        t.loadMore();
    },
    onReachBottom: function() {
        var t = this;
        t.data.hasMore ? t.loadMore() : ""
    },
    bindSplittinDraw: function(t) {
        var tm = this;
        if (tm.data.DistributionInfo.ReferralGradeName == '试用' || !tm.data.DistributionInfo.ReferralGradeName) {
            wx.showModal({
                title: '',
                content: '您是试用VIP，不可提现，请开通永久VIP',
                success: function(res) {
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
    loadMore: function() {
        var tm = this;
        wx.showLoading({
            title: "加载中"
        });
        wx.request({
            url: a.getUrl("SplittinList"),
            data: {
                openId: tm.data.userInfo.OpenId,
                // openId: "o_rWK5f-5hvhMrySuLW5L7d_vTwA",
                pageIndex: ++tm.data.dataIndex,
                pageSize: tm.data.PageSize
            },
            success: function(res) {
                if (res.data.splittin_get_response.SplittinList.length != 10) {
                    tm.setData({
                        hasMore: false
                    })
                }
                var oldList = tm.data.SplittinList
                var newList = oldList.concat(res.data.splittin_get_response.SplittinList)
                tm.setData({
                    SplittinList: newList,
                    SplittinTotal: res.data.splittin_get_response.SplittinTotal,
                    CanDrawSplittin: res.data.splittin_get_response.CanDrawSplittin,
                    NoSettlementSplttin: res.data.splittin_get_response.NoSettlementSplttin,
                    DrawSplittinTotal: res.data.splittin_get_response.DrawSplittinTotal
                })
                wx.hideLoading();
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    }
})