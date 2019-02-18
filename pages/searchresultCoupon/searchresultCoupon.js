var t = getApp();
Page({
    data: {
        ProductList: null,
        SortBy: "",
        SortOrder: "asc",
        KeyWord: "",
        CategoryId: "",
        PageIndex: 1,
        PageSize: 10,
        Num: 0,
        SortClass: "",
        CurrentProduct: null,
        CurrentSku: null,
        selectedSkuContent: null,
        isShowSkuSelectBox: !1,
        index: 0,
        TotalNum: 0,
        ShowCartIcon: !0,
        imgUrl: ''
    },
    onLoad: function(q) {
        var tm = this;
        q.ReferralUserId && t.setRefferUserId(q.ReferralUserId);

        var pages = getCurrentPages() //获取加载的页面

        var currentPage = pages[pages.length - 1] //获取当前页面的对象

        var url = currentPage.route //当前页面url
        var options = currentPage.options //如果要获取url中所带的参数可以查看options

        if (q.imgUrl) {
            this.setData({
                imgUrl: q.picUrl
            })
        }
        // this.setData({
        //     imgUrl: q.picUrl
        // })


        var a = wx.getStorageSync("keyword");
        void 0 == a && (a = "");
        var e = q.cid;
        void 0 == e ? e = "" : a = "";
        var r = this;
        r.setData({
            KeyWord: a,
            CategoryId: e
        }), r.loadData(r, !1);
    },
    onShow: function() {
        this.GetShopCart();
    },
    onSearch: function(t) {
        var a = this;
        a.setData({
            PageIndex: 1
        }), a.loadData(a, !1);
    },
    onReachBottom: function() {
        var t = this,
            a = t.data.PageIndex + 1;
        t.setData({
            PageIndex: a
        }), t.loadData(t, !0);
    },
    bindKeyWordInput: function(t) {
        this.setData({
            KeyWord: t.detail.value
        });
    },
    onConfirmSearch: function(t) {
        var a = this,
            e = t.detail.value;
        a.setData({
            KeyWord: e,
            PageIndex: 1
        }), a.loadData(a, !1);
    },
    bindBlurInput: function(t) {
        wx.hideKeyboard();
    },
    gotoKeyWordPage: function(t) {
        wx.navigateTo({
            url: "../search/search"
        });
    },
    onSortClick: function(t) {
        var a = this,
            e = t.target.dataset.sortby,
            r = t.currentTarget.dataset.num,
            u = "asc",
            n = "shengxu";
        a.data.SortOrder == u && (u = "desc", n = "jiangxu"), a.setData({
            PageIndex: 1,
            SortBy: e,
            SortOrder: u,
            Num: r,
            SortClass: n
        }), a.loadData(a, !1);
    },
    goToProductDetail: function(t) {
        var a = t.currentTarget.dataset.productid,
            e = t.currentTarget.dataset.activeid,
            r = "../productdetail/productdetail?id=" + a;
        1 == t.currentTarget.dataset.activetype && (r = "../countdowndetail/countdowndetail?id=" + e),
            wx.navigateTo({
                url: r
            });
    },
    onShareAppMessage: function() {
        var tm = this;
        var i = '';
        var title = '商品列表'
        if (tm.data.CouponId) {
            title = "领取优惠券"
            i = '/pages/searchresult/searchresult?CouponId=' + tm.data.CouponId;
        } else {
            i = '/pages/searchresult/searchresult?CategoryId=' + tm.data.CategoryId;
        }
        e.globalData.userInfo && e.globalData.userInfo.IsReferral && (i += "&ReferralUserId=" + e.globalData.userInfo.UserId)
        return {
            title: title,
            path: i,
            // imageUrl: brandBg
        }
    },
    loadData: function(a, e) {
        wx.showNavigationBarLoading(), t.getOpenId(function(r) {
            wx.request({
                // url: t.getUrl("GetProducts"),
                url: t.getUrl("YTALGetListProductByCouponId"),
                data: {
                    openId: r,
                    couponId: a.data.CategoryId,
                    pageIndex: a.data.PageIndex,
                    pageSize: a.data.PageSize,
                    sortBy: a.data.SortBy,
                    sortOrder: a.data.SortOrder
                    // openId: r,
                    // keyword: a.data.KeyWord,
                    // cId: a.data.CategoryId,
                    // pageIndex: a.data.PageIndex,
                    // pageSize: a.data.PageSize,
                    // sortBy: a.data.SortBy,
                    // sortOrder: a.data.SortOrder
                },
                success: function(t) {
                    if (t.statusCode == 200) {
                        var r = t.data;
                        if (e) {
                            var u = a.data.ProductList;
                            u.push.apply(u, r), a.setData({
                                ProductList: u
                            });
                        } else a.setData({
                            ProductList: r
                        });
                    } else "NOUser" == t.data.Message || wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                },
                complete: function() {
                    wx.hideNavigationBarLoading();
                }
            });
        });
    },
    GetShopCart: function() {
        var a = this,
            e = 0;
        t.getOpenId(function(r) {
            wx.request({
                // url: t.getUrl("getShoppingCartList"),
                url: t.getUrl("getShoppingCartList"),
                data: {
                    openId: r
                },
                success: function(t) {
                    "OK" == t.data.Status ? t.data.Data.CartItemInfo.forEach(function(t, a, r) {
                        t.IsValid && (e += parseInt(t.Quantity));
                    }) : "NOUser" == t.data.Message || wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                },
                complete: function() {
                    wx.hideLoading(), a.setData({
                        TotalNum: e
                    });
                }
            });
        });
    },
    findProductById: function(t) {
        return this.data.ProductList.find(function(a) {
            return a.ProductId == t;
        });
    },
    setProductCartQuantity: function(t, a, e) {
        var r = this,
            u = !1,
            n = r.data.ProductList,
            d = n.find(function(a) {
                return a.ProductId == t;
            });
        if (d) {
            switch (a = parseInt(a), e) {
                case "=":
                    d.CartQuantity = a;
                    break;

                case "+":
                    d.CartQuantity += a;
            }
            d.CartQuantity < 0 && (d.CartQuantity = 0), u = !0;
        }
        if (u) {
            var o = {
                ProductList: n
            };
            r.setData(o);
        }
    },
    setSkuCartQuantity: function(t, a, e) {
        var r = this,
            u = !1,
            n = r.data.CurrentProduct;
        if (n && n.Skus) {
            var d = n.Skus.find(function(a) {
                    return a.SkuId == t;
                }),
                o = r.data.CurrentSku;
            if (d) {
                switch (a = parseInt(a), e) {
                    case "=":
                        d.CartQuantity = a;
                        break;

                    case "+":
                        d.CartQuantity += a;
                }
                d.CartQuantity < 0 && (d.CartQuantity = 0), o && o.SkuId == d.SkuId && (o.CartQuantity = d.CartQuantity),
                    u = !0;
            }
        }
        if (u) {
            var i = {
                CurrentProduct: n,
                CurrentSku: o
            };
            r.setData(i);
        }
    },
    catchAddCart: function(a) {
        var e = this,
            r = a.currentTarget;
        if (1 != r.dataset.activetype) {
            var u = r.dataset.productid,
                n = r.dataset.operator,
                d = parseInt(n + "1"),
                o = r.dataset.opensku,
                i = e.findProductById(u);
            if (!i.HasSKU || i.HasSKU && "false" == o) {
                var s = r.dataset.sku;
                e.addToCart(u, s, d);
            } else wx.showLoading({
                title: "商品信息加载中..."
            }), t.getOpenId(function(a) {
                wx.request({
                    url: t.getUrl("GetProductSkus"),
                    data: {
                        ProductId: u,
                        openId: a
                    },
                    success: function(t) {
                        if (wx.hideLoading(), "OK" == t.data.Status) {
                            var a = t.data.Data,
                                r = a.DefaultSku,
                                u = [];
                            null != a && a.SkuItems.forEach(function(t, a, e) {
                                t.AttributeValue.reverse(), t.AttributeValue[0].UseAttributeImage = "selected";
                                var r = new Object();
                                r.ValueId = t.AttributeValue[0].ValueId, r.Value = t.AttributeValue[0].Value, r.attributeid = t.AttributeId,
                                    u.push(r);
                            }), e.setData({
                                CurrentProduct: a,
                                CurrentSku: r,
                                selectedskuList: u,
                                selectedSku: r.SkuId
                            }), e.showSkuDOM();
                        }
                    },
                    complete: function() {}
                });
            });
        } else wx.navigateTo({
            url: "../countdowndetail/countdowndetail?id=" + r.dataset.activeid
        });
    },
    onSkuClick: function(t) {
        var a = this,
            e = t.target.dataset.indexcount,
            r = t.target.id,
            u = t.target.dataset.skuvalue,
            n = t.target.dataset.attributeid;
        if (0 != t.target.dataset.enablevalue) {
            var d = new Object();
            d.ValueId = r, d.Value = u, d.attributeid = n;
            var o = this.data.selectedskuList;
            o[e] = d;
            var i = "",
                s = this.data.CurrentProduct,
                c = this.data.CurrentProduct.SkuItems;
            s.SkuItems.length == o.length && !0;
            for (var l = s.ProductId, f = 0; f < o.length; f++) {
                var g = o[f];
                void 0 != g && (i += "" == i ? g.Value : "," + g.Value, l += "_" + g.ValueId);
            }
            for (var h = 0; h < s.SkuItems[e].AttributeValue.length; h++) s.SkuItems[e].AttributeValue[h].ValueId == r ? s.SkuItems[e].AttributeValue[h].UseAttributeImage = "selected" : s.SkuItems[e].AttributeValue[h].UseAttributeImage = "False";
            var S = null;
            this.data.CurrentProduct.Skus.forEach(function(t, e, r) {
                for (var u = !0, n = 0; n < o.length; n++) - 1 == t.SkuId.indexOf("_" + o[n].ValueId) && (u = !1);
                if (u && c.length == o.length) return S = t, l = t.SkuId, void(a.data.buyAmount = t.CartQuantity > 0 ? t.CartQuantity : 1);
            });
            var I = a.data.CurrentProduct.Skus;
            this.data.CurrentProduct.SkuItems.forEach(function(t, a) {
                if (t.AttributeId != n) {
                    for (var e = [], r = 0; r < o.length; r++) void 0 != o[r] && t.AttributeId != o[r].attributeid && e.push(o[r]);
                    t.AttributeValue.forEach(function(t, a) {
                        for (var r = 0, u = 0; u < I.length; u++) {
                            for (var n = e.length, d = 0, o = I[u].SkuId, i = 0; i < e.length; i++) o.indexOf("_" + e[i].ValueId) >= 0 && d++;
                            o.indexOf("_" + t.ValueId) >= 0 && n == d && (r = 1);
                        }
                        t.Enable = r;
                    });
                }
            }), this.setData({
                selectedskuList: o,
                selectedSku: l,
                selectedSkuContent: i,
                SkuItemList: c,
                CurrentProduct: s,
                CurrentSku: S
            });
        }
    },
    addToCart: function(a, e, r) {
        var u = this;
        !e || e.lenght < 1 ? wx.showModal({
            title: "提示",
            content: "请选择规格",
            showCancel: !1
        }) : t.getOpenId(function(n) {
            wx.request({
                url: t.getUrl("addToCart"),
                data: {
                    openId: n,
                    SkuID: e,
                    Quantity: r
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        u.setProductCartQuantity(a, r, "+"), u.setSkuCartQuantity(e, r, "+");
                        var n = parseInt(u.data.TotalNum);
                        u.setData({
                            TotalNum: n + parseInt(r)
                        });
                    } else "NOUser" == t.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: t.data.ErrorResponse.ErrorMsg,
                        showCancel: !1,
                        success: function(t) {}
                    });
                }
            });
        });
    },
    hideSkuDOM: function() {
        this.setData({
            isShowSkuSelectBox: !1,
            ShowCartIcon: !0
        });
    },
    showSkuDOM: function() {
        this.setData({
            isShowSkuSelectBox: !0,
            ShowCartIcon: !1
        });
    }
});