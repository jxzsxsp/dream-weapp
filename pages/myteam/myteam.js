var e = require("../../utils/config.js"), a = getApp();

Page({
    data: {
        openId: "",
        PageIndex: 1,
        PageSize: 10,
        subMemberList: null,
        isempty: !0,
        ExpandMemberInMonth: "",
        ExpandMemberAll: "",
        LowerUserSaleTotal: ""
    },
    onLoad: function (e) { },
    onReady: function () { },
    onShow: function () {
        var e = this;
        e.setData({
            PageIndex: 1
        }), e.loadData(e, !1);
    },
    onHide: function () { },
    onUnload: function () { },
    onPullDownRefresh: function () {
        var e = this;
        e.loadData(e, !1);
    },
    onReachBottom: function () {
        var e = this, a = e.data.PageIndex + 1;
        e.setData({
            PageIndex: a
        }), e.loadData(e, !0);
    },
    // onShareAppMessage: function() {},
    loadData: function (t, n) {
        var tm = this;
        wx.showLoading({
            title: "加载中"
        }), a.getOpenId(function (o) {
            wx.request({
                url: a.getUrl("SubMembers"),
                data: {
                    openId: o,
                    // openId: 'o_rWK5YTqOJ2ruCGdsjZn4YJ8ovI',
                    pageIndex: t.data.PageIndex,
                    pageSize: t.data.PageSize
                },
                success: function (a) {
                    // if (!tm.data.subMemberList && a.data.SubMember_get_response.SubMembers.length == 0) return;

                    if (void 0 == a.data.error_response) {
                        var o = a.data.SubMember_get_response, r = o.SubMembers;
                        if (n) {
                            // var s = t.data.subMemberData;
                            // s.push.apply(s, r), t.setData({
                            //     subMemberList: s,
                            //     ExpandMemberInMonth: t.data.ExpandMemberInMonth,
                            //     ExpandMemberAll: t.data.ExpandMemberAll,
                            //     LowerUserSaleTotal: t.data.LowerUserSaleTotal
                            // });
                            var s = t.data.subMemberList.concat(r)
                            t.setData({
                                subMemberList: s,
                                ExpandMemberInMonth: t.data.ExpandMemberInMonth,
                                ExpandMemberAll: t.data.ExpandMemberAll,
                                LowerUserSaleTotal: t.data.LowerUserSaleTotal
                            });

                        } else {
                            r.Total;
                            t.setData({
                                subMemberList: r,
                                isEmpty: t.data.isempty,
                                ExpandMemberInMonth: o.ExpandMemberInMonth,
                                ExpandMemberAll: o.ExpandMemberAll,
                                LowerUserSaleTotal: o.LowerUserSaleTotal
                            });
                        }
                    } else e.showTip(a.data.error_response.errMsg);
                },
                complete: function () {
                    wx.hideLoading();
                }
            });
        });
    },
    GoArticle: function (e) {
        var url = "https://ytal.qkmai.com/vShop/ArticleDetails?ArticleId=" + e.currentTarget.dataset.id
        var deurl = encodeURIComponent(url)
        var s = '/pages/webPage/webPage?artUrl=' + deurl
        wx.navigateTo({
            url: s
        })
    }
});