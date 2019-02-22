var conf = require("../../utils/config.js"),
    app = getApp();
Page({
    data: {
        KeyWord: "",
        KeyWordList: ["大衣", "羽绒服", "裤", "保暖内衣", "袜子", "羊毛衫", "皮靴", "女靴", "运动鞋", "打底裤"],
        GoToUrl: "../searchresult/searchresult",
        rushGoodsList: [],
        userInfo: {},
        DistributionInfo: "",
        shopcartCount: 0,
        inputValue: "",
        dataIndex: 1,
        dataSize: 5,
        isSoldOut: 1,
        hide_good_box: true,
        goTopStatus: false,
        needAni: false,
        tagId: 3,
        nothing: 0,
        hasMore: true,
        goTopStatus: false,
        SelectskuId: [],
        SkuID: ""
    },
    onLoad: function(options) {
        // var t = this, o = "../searchresult/searchresult", r = wx.getStorageSync("keyWordList");
        // r ? (r.reverse(), t.setData({
        //     KeyWordList: r,
        //     GoToUrl: o
        // })) : t.setData({
        //     GoToUrl: o
        // });
        options.ReferralUserId && app.setRefferUserId(options.ReferralUserId);
        var tm = this;
        // tm.setData({
        //     imgUrl: options.picUrl,
        //     tagId: options.tagId
        // })
        app.getUserInfo(function(t) {
            tm.setData({
                userInfo: t,
            })
        });
        this.busPos = {};
        this.busPos['x'] = 39;
        this.busPos['y'] = app.globalData.hh - 120;
    },
    onPageScroll: function(obj) {
        if (obj.scrollTop > 363) {
            this.setData({
                goTopStatus: true
            })
        }
    },
    gotoHome: function(e) {
        wx.navigateBack({
            delta: 1
        });
    },
    onInputKeyword: function(e) {
        var t = e.detail.value;
        this.setData({
            KeyWord: t
        });
    },
    onConfirmSearch: function(e) {
        var t = e.detail.value;
        this.gotoSearch(t), this.setData({
            KeyWord: t
        });
    },
    onHistoryKeyWordClick: function(e) {
        var t = e.currentTarget.dataset.keyword;
        this.gotoSearch(t);
    },
    removeKeyWord: function(e) {
        var t = e.currentTarget.dataset.keyword,
            o = wx.getStorageSync("keyWordList");
        o && (o.reverse(), this.removeByValue(o, t), wx.setStorageSync("keyWordList", o),
            this.setData({
                KeyWordList: o
            }));
    },
    ClearKeyWord: function(e) {
        wx.showModal({
            title: "提示",
            content: "确认要清空所有历史记录吗！",
            success: function(e) {
                e.confirm && (wx.removeStorageSync("keyWordList"), wx.redirectTo({
                    url: "../search/search"
                }));
            }
        });
    },
    removeByValue: function(e, t) {
        for (var o = 0; o < e.length; o++)
            if (e[o] == t) {
                e.splice(o, 1);
                break;
            }
    },
    btngotoSearch: function() {
        this.gotoSearch(this.data.KeyWord);
    },
    gotoSearch: function(e) {
        var tm = this;
        tm.goToTop();
        var currentUrl = app.getUrl("YTALGetPageRushGoodsByTagId");
        var currentData = {
            q: tm.data.KeyWord,
            tagId: tm.data.tagId,
            isSoldOut: tm.data.nothing,
            pi: this.data.dataIndex,
            ps: this.data.dataSize
        };
        // 加载页面数据
        wx.request({
            url: currentUrl,
            data: currentData,
            success: function(jd) {

                if (jd.data.length != 0) {
                    let goodsList = [];
                    jd.data.forEach(o => {
                        goodsList.push(o)
                    });
                    // var newList = tm.data.rushGoodsList.concat(goodsList)
                    var newList = goodsList
                    tm.setData({
                        rushGoodsList: newList,
                        hasMore: true
                    })

                } else {
                    tm.setData({
                        hasMore: false,
                        rushGoodsList: []
                    })
                }
            }
        });
        // var t = this;
        // if (e.length > 0) {
        //     wx.setStorage({
        //         key: "keyword",
        //         data: e
        //     });
        //     var o = [],
        //         r = wx.getStorageSync("keyWordList");
        //     r && (o = r), -1 == o.join(",").indexOf(e) && o.push(e);
        //     var a = t.data.GoToUrl + "?keyword=" + e;
        //     t.data.GoToUrl.indexOf("searchresult") > -1 ? (wx.setStorageSync("keyWordList", o),
        //         wx.redirectTo({
        //             url: a
        //         })) : wx.switchTab({
        //         url: a,
        //         success: function(e) {
        //             wx.hideKeyboard();
        //         }
        //     });
        // }
    },
    onShow: function() {
        this.GetShopCart();
    },
    // onShareAppMessage: function () {
    //     var tm = this;
    //     var picUrl = tm.data.imgUrl;
    //     var tagId = tm.data.tagId;

    //     var i = '/pages/search/search?from=menu&tagId=' + tagId + '&picUrl=' + picUrl;
    //     var title = '亚太奥莱品牌热卖，能省会赚，最高返佣40%！';
    //     app.globalData.userInfo && app.globalData.userInfo.IsReferral && (i += "&ReferralUserId=" + app.globalData.userInfo.UserId)
    //     return {
    //         title: title,
    //         path: i,
    //         imageUrl: "http://cos.qkmai.com/qkmbb/ytal/yqfx.png"
    //     }
    // var title = '恭喜您获得350元红包';
    // var path = '/pages/redPacket/redPacket?from=menu';
    // var imageUrl = "http://cos.qkmai.com/qkmbb/ytal/300fengmian.png";
    // e.share(title, path, imageUrl)
    // },
    GetShopCart: function() {
        var tm = this;
        var t = this,
            a = 0,
            r = t.data.choiceProducts;
        app.getOpenId(function(o) {
            wx.request({
                url: app.getUrl("getShoppingCartList"),
                data: {
                    openId: o
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        tm.setData({
                            shopcartCount: t.data.Data.RecordCount
                        })
                        if (t.data.Data.CartItemInfo.length == 0) return;
                        var e = {};
                        // t.data.Data.CartItemInfo.forEach(function (t, r, o) {
                        //     t.IsValid && (void 0 != e[t.ProductId] ? e[t.ProductId] = parseInt(e[t.ProductId]) + parseInt(t.Quantity) : e[t.ProductId] = t.Quantity,
                        //         a += parseInt(t.Quantity));
                        // }), r.forEach(function (t, a, r) {
                        //     void 0 != e[t.ProductId] ? t.CartQuantity = parseInt(e[t.ProductId]) : t.CartQuantity = 0;
                        // });
                        if (t.data.TotalNum > 0) {
                            wx.setTabBarBadge({
                                index: 3,
                                text: t.data.TotalNum.toString()
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
                complete: function(f) {
                    wx.hideLoading(), null != r && t.setData({
                        choiceProducts: r,
                        TotalNum: a
                    });
                }
            });
        });
    },
    onReachBottom: function() {
        if (this.data.hasMore) {
            wx.showNavigationBarLoading();
            this.loadMore();
            wx.hideNavigationBarLoading();
        }
    },
    GetShopCartAgain: function() {
        var tm = this;
        var t = this,
            a = 0,
            r = t.data.choiceProducts;
        app.getOpenId(function(o) {
            wx.request({
                url: app.getUrl("getShoppingCartList"),
                data: {
                    openId: o
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        tm.setData({
                            SkuID: t.data.Data.CartItemInfo[0].SkuID
                        })
                        wx.request({
                            url: app.getUrl("CanSubmitOrder"),
                            data: {
                                openId: app.globalData.openId,
                                skus: tm.data.SkuID
                            },
                            success: function(t) {
                                "OK" == t.data.Status ? wx.navigateTo({
                                    url: "../submitorder/submitorder?productsku=" + tm.data.SkuID
                                }) : "NOUser" == t.data.Message ? wx.navigateTo({
                                    url: "../login/login"
                                }) : (tm.setData({
                                    SelectskuId: [],
                                }), tm.loadData(event));
                            }
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
                    wx.hideLoading(), null != r && t.setData({
                        choiceProducts: r,
                        TotalNum: a
                    });
                }
            });
        });
    },
    busAnimation: function() {
        var that = this;
        that.setData({
            needAni: true
        });
        setTimeout(function() {
            that.setData({
                needAni: false
            });
        }, 500);
    },
    touchOnGoods: function(e) {
        if (!this.data.hide_good_box) return;
        this.finger = {};
        var topPoint = {};
        this.finger['x'] = e.touches["0"].clientX;
        this.finger['y'] = e.touches["0"].clientY;
        topPoint['y'] = (this.finger['y'] < this.busPos['y'] ? this.finger['y'] - 150 : topPoint['y'] = this.busPos['y'] - 150)
        topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2 + this.busPos['x'];
        this.linePos = app.bezier([this.busPos, topPoint, this.finger], 30);
        this.startAnimation(e);
    },
    startAnimation: function(e) {
        var index = 0,
            that = this,
            bezier_points = that.linePos['bezier_points'];
        this.setData({
            hide_good_box: false,
            bus_x: that.finger['x'],
            bus_y: that.finger['y']
        })
        var len = bezier_points.length;
        index = len
        this.timer = setInterval(function() {
            for (let i = index - 1; i > -1; i--) {
                that.setData({
                    bus_x: bezier_points[i]['x'],
                    bus_y: bezier_points[i]['y']
                })
                if (i < 1) {
                    clearInterval(that.timer);
                    that.setData({
                        hide_good_box: true
                    })
                }
            }
        }, 25);
    },
    selectSkuId: function(event) {
        // if(event.currentTarget.dataset("count") == 0) return;
        var skuId = event.currentTarget.dataset["skuid"];
        var skuName = event.currentTarget.dataset["skuname"];
        var goodsId = event.currentTarget.dataset["goodsid"];
        var goodsImage = event.currentTarget.dataset["img"]
        var tm = this;
        if (tm.data.goodsSkuId != skuId) {
            wx.showLoading({
                title: '加载中',
            })
        }
        tm.setData({
            goodsSkuId: skuId,
            goodsSkuName: skuName,
            goodsId: goodsId,
            goodsImg: goodsImage
        });
        if (tm.data.goodsSkuId == skuId) {

            setTimeout(function() {
                wx.hideLoading()
            }, 1000)
        }
    },
    goToBuyGoods: function(event) {
        var tm = this;
        var goodsId = event.currentTarget.dataset["goodsid"];
        var salePrice = event.currentTarget.dataset["saleprice"];
        var brandSource = event.currentTarget.dataset["source"];
        if (goodsId != tm.data.goodsId) {
            wx.showModal({
                title: '',
                content: '请选择商品规格',
                showCancel: false
            })
        } else {
            if (tm.data.skuId == "") {
                wx.showModal({
                    title: '',
                    content: '请选择商品规格',
                    showCancel: false
                })
            } else {
                wx.showLoading({
                    title: "加载中"
                });

                wx.request({
                    url: app.getUrl("YTALPostAddGoodsToCart"),
                    data: {
                        skuId: tm.data.goodsSkuId,
                        skuName: tm.data.goodsSkuName,
                        goodsId: tm.data.goodsId,
                        openId: app.globalData.openId,
                        brandSource: brandSource,
                        salePrice: salePrice
                    },
                    success: function(res) {
                        var jd = res.data;
                        switch (jd.status) {
                            default: wx.showModal({
                                title: '提示',
                                content: jd.message,
                                showCancel: false
                            })
                            break;
                            case 'success':
                                    // wx.setTabBarBadge({
                                    //     index: 3,
                                    //     text: t.data.TotalNum.toString()
                                    // })
                                    // wx.showModal({
                                    // title: '',
                                    // content: '成功加入购物车',
                                    // cancelText: "再逛逛",
                                    // confirmText: "去结算",
                                    // success(res) {
                                    //     if (res.confirm) {
                                    //         wx.switchTab({
                                    //             url: '/pages/shopcart/shopcart'
                                    //         })
                                    //     } else if (res.cancel) {

                                    //     }
                                    // }
                                    wx.hideLoading();
                                // tm.touchOnGoods(event)
                                // wx.showModal({
                                //     title: '',
                                //     content: '成功加入购物车',
                                //     cancelText: "去结算",
                                //     confirmText: "再逛逛",
                                //     success(res) {
                                //         if (res.confirm) {

                                //         } else if (res.cancel) {
                                //             wx.switchTab({
                                //                 url: '/pages/shopcart/shopcart'
                                //             })

                                //         }
                                //     }
                                // })
                                tm.setData({
                                    goodsId: '',
                                    goodsSkuId: '',
                                    goodsSkuName: '',
                                    shopcartCount: tm.data.shopcartCount + 1
                                });
                                tm.GetShopCartAgain();

                                // wx.switchTab({
                                //     url: '/pages/shopcart/shopcart'
                                // })
                        }
                    }
                })
            }
        }
    },
    addGoodsToCart: function(event) {

        var tm = this;
        var goodsId = event.currentTarget.dataset["goodsid"];
        var salePrice = event.currentTarget.dataset["saleprice"];
        var cartSource = event.currentTarget.dataset["source"];
        if (goodsId != tm.data.goodsId) {
            wx.showModal({
                title: '',
                content: '请选择商品规格',
                showCancel: false
            })
        } else {
            if (tm.data.skuId == "") {
                wx.showModal({
                    title: '',
                    content: '请选择商品规格',
                    showCancel: false
                })
            } else {
                wx.showLoading({
                    title: '加载中',
                })
                wx.request({
                    url: app.getUrl("YTALPostAddGoodsToCart"),
                    data: {
                        skuId: tm.data.goodsSkuId,
                        skuName: tm.data.goodsSkuName,
                        goodsId: tm.data.goodsId,
                        openId: app.globalData.openId,
                        brandSource: cartSource,
                        salePrice: salePrice
                    },
                    success: function(res) {
                        wx.hideLoading();
                        var jd = res.data;
                        switch (jd.status) {
                            default: wx.showModal({
                                title: '提示',
                                content: jd.message,
                                showCancel: false
                            })
                            break;
                            case 'success':
                                    tm.touchOnGoods(event)
                                // wx.showModal({
                                //     title: '',
                                //     content: '成功加入购物车',
                                //     cancelText: "去结算",
                                //     confirmText: "再逛逛",
                                //     success(res) {
                                //         if (res.cancel) {
                                //             wx.switchTab({
                                //                 url: '/pages/shopcart/shopcart'
                                //             })
                                //         } else if (res.confirm) {

                                //         }
                                //     }
                                // })
                                tm.setData({
                                    goodsId: '',
                                    goodsSkuId: '',
                                    goodsSkuName: '',
                                    shopcartCount: tm.data.shopcartCount + 1
                                });
                        }
                    },
                    complete: function(res) {}
                })
            }
        }

    },
    previewImg: function(event) {
        var imgSrc = event.currentTarget.dataset['imgsrc'];
        var imgs = event.currentTarget.dataset['imgs'];

        wx.previewImage({
            current: imgSrc,
            urls: imgs
        })
    },
    filterNum: function(value, count) {
        var num = Number(value)
        return num.toFixed(count)
    },
    copy: function(e) {
        wx.setClipboardData({
            data: e.target.dataset.val,
            success: function(res) {
                wx.showToast({
                    title: '复制成功',
                });
            }
        });
    },
    fixedGoToCart: function() {
        wx.switchTab({
            url: '/pages/shopcart/shopcart'
        })
    },
    fixedGoToHome: function() {
        wx.switchTab({
            url: '/pages/home/home'
        })
    },
    // bindKeyInput:function(e){
    //     this.setData({
    //         inputValue: e.detail.value
    //     })
    // },
    goToResult: function() {
        var tm = this;
        tm.goToTop();
        var currentUrl = app.getUrl("YTALGetPageRushGoodsByTagId");
        var currentData = {
            q: tm.data.KeyWord,
            tagId: tm.data.tagId,
            isSoldOut: tm.data.nothing,
            pi: this.data.dataIndex,
            ps: this.data.dataSize
        };
        // 加载页面数据
        wx.request({
            url: currentUrl,
            data: currentData,
            success: function(jd) {

                if (jd.data.length != 0) {
                    let goodsList = [];
                    jd.data.forEach(o => {
                        goodsList.push(o)
                    });
                    // var newList = tm.data.rushGoodsList.concat(goodsList)
                    var newList = goodsList
                    tm.setData({
                        rushGoodsList: newList,
                        hasMore: true
                    })

                } else {
                    tm.setData({
                        hasMore: false,
                        rushGoodsList: []
                    })
                }
            }
        });
    },
    loadMore: function() {
        if (!this.data.hasMore) return;
        // wx.showLoading({
        //     title: "加载中"
        // });
        var tm = this;
        var currentUrl = app.getUrl("YTALGetPageRushGoodsByTagId");
        var currentData = {
            q: tm.data.KeyWord,
            tagId: tm.data.tagId,
            isSoldOut: tm.data.nothing,
            pi: ++this.data.dataIndex,
            ps: this.data.dataSize
        };
        // 加载页面数据
        wx.request({
            url: currentUrl,
            data: currentData,
            success: function(jd) {

                if (jd.data.length != 0) {
                    let goodsList = [];
                    jd.data.forEach(o => {
                        goodsList.push(o)
                    });
                    var newList = tm.data.rushGoodsList.concat(goodsList)
                    tm.setData({
                        rushGoodsList: newList
                    })
                } else {
                    tm.setData({
                        hasMore: false
                    })
                }

            }
        });
    },
    sharePro: function(event) {
        var brandid = event.currentTarget.dataset.brandid;
        var goodid = event.currentTarget.dataset.goodid;
        var goodssource = event.currentTarget.dataset.goodssource;
        wx.navigateTo({
            url: '/pages/poster/poster?brandid=' + brandid + '&goodid=' + goodid + '&goodssource=' + goodssource,
        })
        // wx.showModal({
        //     title: '',
        //     content: '敬请期待',
        //     showCancel: false
        // })
    },
    onKeyWordClick: function(e) {
        var tm = this;
        var KeyWord = e.target.dataset.keyword;
        tm.setData({
            KeyWord: KeyWord
        })
    },
    goToTop: function() {
        wx.pageScrollTo({
            scrollTop: 0,
        })
        this.setData({
            goTopStatus: false
        })
    },
});