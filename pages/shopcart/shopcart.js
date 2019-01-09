var t = getApp();

Page({
    data: {
        ShopCarts: null,
        isEdite: !1,
        TotalPrice: 0,
        EditeText: "编辑",
        // selectAllStatus: !1,
        selectAllStatus: true,
        SelectskuId: [],
        SettlementText: "结算",
        isEmpty: !0,
        Suppliers: null
    },
    onLoad: function(a) {
        // var tm = this;
        a.ReferralUserId && t.setRefferUserId(a.ReferralUserId);
        // console.log("执行selectAll")
        // tm.selectAll();
    },
    loadData: function (e, Boolean) {
        console.log("loadData执行")
        var tm = this;
        wx.showLoading({});
        var a = parseFloat(0);
        t.getOpenId(function(n) {
            wx.request({
                url: t.getUrl("getShoppingCartList"),
                data: {
                    openId: n
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        var n = t.data.Data,
                            s = t.data.Data.Suppliers;
                        n.CartItemInfo.forEach(function(t, n, s) {
                            e.data.SelectskuId.indexOf(t.SkuID) >= 0 && (t.selected = !0, a = parseFloat(a) + parseFloat(t.SubTotal));
                        });
                        var o = null == n || n.length <= 0 || n.RecordCount <= 0;
                    // console.log(s.length)
                        if(s.length > 0) {
                            s[0].CartItemInfo.forEach(function (a, b) {
                                a.selected = true
                            });
                        }
                        e.setData({
                            isEmpty: o,
                            ShopCarts: n,
                            Suppliers: s,
                            TotalPrice: a.toFixed(2)
                        });

                        if (n.RecordCount > 0) {
                            wx.setTabBarBadge({
                                index: 3,
                                text: n.RecordCount.toString()
                            })
                        } else{
                            wx.removeTabBarBadge({
                                index: 3,
                            })
                        }
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
                    wx.hideLoading();
                    // if (tm.data.selectAllStatus == false) {

                    // }
                    // 默认购物车全选
                    if (Boolean) {
                        console.log("执行selectAll")
                        tm.selectAll();

                    }
                }
            });
        });
    },
    getSupplierCarts: function(t) {
        var e = this.data.Suppliers,
            a = null;
        return e.forEach(function(n, s, o) {
            n.SupplierId == t && (a = e[s]);
        }), a;
    },
    selectList: function(t) {
        console.log("执行selectList")
        var e = this,
            a = t.currentTarget.dataset.skuid,
            n = e.data.Suppliers,
            s = e.data.SelectskuId,
            o = !1;
        n.forEach(function(t, e, s) {
            n[e].CartItemInfo.forEach(function(t, e, n) {
                if (t.SkuID == a) return o = !t.selected, void(t.selected = o);
            });
        });
        var i = s.indexOf(a);
        o && i < 0 ? s.push(a) : s.splice(i, 1);
        var l = e.data.selectAllStatus;
        s.length <= 0 && (l = !1), console.log(s), e.setData({
            Suppliers: n,
            SelectskuId: s,
            selectAllStatus: l
        }), e.GetTotal();
    },
    GetTotal: function() {
        console.log("执行GetTotal")
        var t = parseFloat(0),
            e = this,
            a = e.data.ShopCarts,
            n = e.data.Suppliers;
        n.forEach(function(e, s, o) {
            (a = n[s]).CartItemInfo.forEach(function(e, a, n) {
                e.selected && (t = parseFloat(e.SubTotal) + parseFloat(t));
            });
        }), e.setData({
            TotalPrice: t.toFixed(2)
        });
    },
    selectAll: function() {
        console.log("selectAll")
        var t = this,
            e = [],
            a = !t.data.selectAllStatus,
            n = t.data.ShopCarts,
            s = t.data.Suppliers;
        s.forEach(function(t, o, i) {
            (n = s[o]).CartItemInfo.forEach(function(t, n, s) {
                t.IsValid && t.HasEnoughStock && (t.selected = a, a && e.push(t.SkuID));
            });
        }), t.setData({
            Suppliers: s,
            selectAllStatus: a,
            SelectskuId: e
            }), console.log(t.data.Suppliers),t.GetTotal();
    },
    SwitchEdite: function() {
        console.log("switchEdite")
        var t = this;
        "编辑" == t.data.EditeText ? t.setData({
            isEdite: !0,
            EditeText: "完成",
            SettlementText: "删除",
            DelskuId: ""
        }) : (t.setData({
            isEdite: !1,
            EditeText: "编辑",
            DelskuId: "",
            SettlementText: "结算",
            selectAllStatus: !0
            // }), t.selectAll());
        }));
    },
    MuseNum: function(t) {
        var e = this,
            a = t.currentTarget.dataset.index,
            n = t.currentTarget.dataset.supplierid,
            s = e.getSupplierCarts(n),
            o = s.CartItemInfo[a].Quantity;
        parseInt(o) <= 1 || e.ChangeQuantiy(e, -1, s.CartItemInfo[a].SkuID);
    },
    AddNum: function(t) {
        var e = this,
            a = t.currentTarget.dataset.index,
            n = t.currentTarget.dataset.supplierid,
            s = e.getSupplierCarts(n),
            o = s.CartItemInfo[a].Quantity;
        s.CartItemInfo[a].Stock - o <= 0 ? wx.showModal({
            title: "提示",
            content: "超出库存",
            showCancel: !1
        }) : e.ChangeQuantiy(e, 1, s.CartItemInfo[a].SkuID);
    },
    bindblurNum: function(t) {
        if (parseInt(t.detail.value) > 50) {
            wx.showModal({
                title: "提示",
                content: "限购50件",
                showCancel: !1
            })
        } else {

            var e = this,
                a = t.currentTarget.dataset.index,
                n = t.currentTarget.dataset.supplierid,
                s = e.getSupplierCarts(n),
                o = parseInt(t.detail.value),
                i = s.CartItemInfo[a].Quantity,
                l = s.CartItemInfo[a].Stock;
            (isNaN(o) || o < 1) && (o = 1), o != i && (l - o <= 0 ? wx.showModal({
                title: "提示",
                content: "超出库存",
                showCancel: !1
            }) : e.ChangeQuantiy(e, o - i, s.CartItemInfo[a].SkuID));
        }



    },
    DelCarts: function(e) {
        console.log("执行DelCarts")
        var a = this,
            n = e.currentTarget.dataset.skuid,
            s = a.data.SelectskuId;
        "" != n && t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl("delCartItem"),
                data: {
                    openId: e,
                    SkuIds: n
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        var e = s.indexOf(n);
                        e >= 0 && s.splice(e, 1), a.setData({
                            SelectskuId: s
                        });
                        if (t.data.Data.CartItemInfo.length > 0) {
                            wx.setTabBarBadge({
                                index: 3,
                                text: t.data.Data.CartItemInfo.length.toString()
                            })
                        } else {
                            wx.removeTabBarBadge({
                                index: 3
                            })
                        }
                    } else "NOUser" == t.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: t.data.ErrorResponse.ErrorMsg,
                        showCancel: !1,
                        success: function(t) {}
                    });
                },
                complete: function() {
                    a.loadData(a);
                }
            });
        });
    },
    SettlementShopCart: function() {
        console.log("执行SettlementShopCart")
        var e = this,
            a = e.data.SelectskuId.join(",");
        e.data.ShopCarts, e.data.SelectskuId;
        if (e.data.isEdite) {
            if (a <= 0) return void wx.showModal({
                title: "提示",
                content: "请选择要删除的商品",
                showCancel: !1
            });
            t.getOpenId(function(n) {
                wx.request({
                    url: t.getUrl("delCartItem"),
                    data: {
                        openId: n,
                        SkuIds: a
                    },
                    success: function(t) {
                        wx.removeTabBarBadge({
                            index: 3
                        })
                        "OK" == t.data.Status ? e.setData({
                            SelectskuId: [],
                            selectAllStatus: !1
                        }) : "NOUser" == t.data.Message ? wx.navigateTo({
                            url: "../login/login"
                        }) : wx.showModal({
                            title: "提示",
                            content: t.data.ErrorResponse.ErrorMsg,
                            showCancel: !1,
                            success: function(t) {}
                        });
                    },
                    complete: function() {
                        e.loadData(e);
                        console.log("complete")
                    }
                });
            });
        } else {
            if (a <= 0) return void wx.showModal({
                title: "提示",
                content: "请选择要结算的商品",
                showCancel: !1
            });
            t.getOpenId(function(n) {
                wx.request({
                    url: t.getUrl("CanSubmitOrder"),
                    data: {
                        openId: n,
                        skus: a
                    },
                    success: function(t) {
                        "OK" == t.data.Status ? wx.navigateTo({
                            url: "../submitorder/submitorder?productsku=" + a
                        }) : "NOUser" == t.data.Message ? wx.navigateTo({
                            url: "../login/login"
                        }) : (e.setData({
                            SelectskuId: [],
                            selectAllStatus: !1
                        }), e.loadData(e));
                    }
                });
            });
        }
    },
    ChangeQuantiy: function(e, a, n) {
        console.log("执行ChangeQuantiy")
        var tm = this;
        t.getOpenId(function(s) {
            wx.request({
                url: t.getUrl("addToCart"),
                data: {
                    openId: s,
                    SkuID: n,
                    Quantity: a
                },
                success: function(t) {
                    "OK" == t.data.Status ? e.loadData(e) : "NOUser" == t.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: t.data.ErrorResponse.ErrorMsg,
                        showCancel: !1,
                        success: function(t) {}
                    });
                },
                complete: function() {








                    // tm.selectAll();

                }
            });
        });
    },
    goToProductDetail: function(t) {
        var e = this,
            a = t.currentTarget.dataset.productid;
        e.data.isEdite || wx.navigateTo({
            url: "../productdetail/productdetail?id=" + a
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            ShopCarts: null,
            isEdite: !1,
            TotalPrice: 0,
            EditeText: "编辑",
            selectAllStatus: !1,
            SelectskuId: [],
            SettlementText: "结算",
            isEmpty: !0
        }), this.loadData(this, true);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});