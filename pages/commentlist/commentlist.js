require("../../utils/config.js");
var a = getApp();
Page({
    data: {
        ReviewInfo: null,
        positive: 0,
        commentList: null,
        pageIndex: 1,
        pageSize: 10,
        commentType: 0,
        ProductId: null
    },
    onLoad: function(e) {
        var t = this,
            s = e.id;
        t.setData({
            ProductId: s
        }), wx.request({
            url: a.getUrl("StatisticsReview"),
            data: {
                ProductId: s
            },
            success: function(a) {
                if ("OK" == a.data.Status) {
                    var e = a.data.Data,
                        s = 100 * (e.reviewNum1 / e.reviewNum).toFixed(4);
                    t.setData({
                        ReviewInfo: e,
                        positive: s
                    });
                } else "NOUser" == a.data.Message ? wx.navigateTo({
                    url: "../login/login"
                }) : wx.showModal({
                    title: "提示",
                    content: a.data.Message,
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }
        }), t.loadData(t, !1);
    },
    prevImage: function(a) {
        var e = this,
            t = a.target.dataset.index,
            s = a.target.dataset.src,
            n = [],
            i = e.data.commentList[t];
        "" != i.ImageUrl1 && n.push(i.ImageUrl1), "" != i.ImageUrl2 && n.push(i.ImageUrl2),
            "" != i.ImageUrl3 && n.push(i.ImageUrl3), "" != i.ImageUrl4 && n.push(i.ImageUrl4),
            "" != i.ImageUrl5 && n.push(i.ImageUrl5), e.setData({
                ImgList: n
            }), wx.previewImage({
                current: s,
                urls: e.data.ImgList
            });
    },
    loadData: function(e, t) {
        a.getOpenId(function(s) {
            wx.request({
                url: a.getUrl("LoadReview"),
                data: {
                    openId: s,
                    PageIndex: e.data.pageIndex,
                    PageSize: e.data.pageSize,
                    type: e.data.commentType,
                    ProductId: e.data.ProductId
                },
                success: function(a) {
                    if (console.log(a), "OK" == a.data.Status) {
                        var s = a.data.Data;
                        if (t) {
                            var n = e.data.commentList;
                            n.push.apply(n, s), e.setData({
                                commentList: n
                            });
                        } else e.setData({
                            commentList: s
                        });
                    } else "NOUser" == a.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: a.data.Message,
                        showCancel: !1,
                        success: function(a) {
                            a.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            });
        });
    },
    bingComment: function(a) {
        var e = this,
            t = a.currentTarget.dataset.typeid;
        e.setData({
            pageIndex: 1,
            commentType: t
        }), e.loadData(e, !1);
    },
    onReachBottom: function() {
        var a = this,
            e = a.data.pageIndex;
        e = parseInt(e) + 1, a.setData({
            pageIndex: e
        }), a.loadData(a, !0);
    }
});