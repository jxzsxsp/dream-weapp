var conf = require("../../utils/config.js"),
    app = getApp();
Page({
    data: {
        nullDraw: app.getRequestUrl + "/Templates/xcxshop/images/null.png",
        isHotState: true,
        nothing: 0,
        isSoldOut: 0,
        brandRushInfo: [],
        rushGoodsList: [],
        brandLogo: '',
        mainTitle: '',
        subTitle: '',
        goodsId: '',
        goodsSkuId: '',
        goodsSkuName: '',
        brandSoruce: '',
        userInfo: {},
        brandId: "",
        brandSource: "",
        imgUrl: 'http://cos.qkmai.com/qkmbb/myytal/wdbjs.png',
        tagId: 0,
        dataIndex: 0,
        dataSize: 5,
        hasMore: true,
        shopcartCount: 0,
        goodsImg: '',
        hideCount: true,
        count: 0,
        needAni: false,
        hide_good_box: true,
        goTopStatus: false,
        SelectskuId: [],
        SkuID: ""
    },
    onLoad: function(options) {
        options.ReferralUserId && app.setRefferUserId(options.ReferralUserId);
        var tm = this;
        tm.setData({
            imgUrl: options.picUrl,
            tagId: options.tagId
        })
        app.getUserInfo(function(t) {
            tm.setData({
                userInfo: t,
            })
        });

        // 执行倒计时函数
        this.getListGoodsData();
        this.countDown();
        var that = this;
        this.busPos = {};
        this.busPos['x'] = 39;
        this.busPos['y'] = app.globalData.hh - 120;
    },
    onShow: function() {
        this.GetShopCart()
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
                complete: function() {
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
    loadMore: function() {
        if (!this.data.hasMore) return;
        var tm = this;
        var currentUrl = app.getUrl("YTALGetPageRushGoodsByTagId");
        var currentData = {
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
    onShareAppMessage: function() {
        var tm = this;
        var picUrl = tm.data.imgUrl;
        var tagId = tm.data.tagId;

        // var i = '/pages/screening/screening?from=menu&tagId=' + tagId + '&picUrl=' + picUrl;
        // var title = '亚太奥莱品牌热卖，能省会赚，最高返佣40%！';
        // app.globalData.userInfo && app.globalData.userInfo.IsReferral && (i += "&ReferralUserId=" + app.globalData.userInfo.UserId)
        // return {
        //     title: title,
        //     path: i,
        //     imageUrl: "http://cos.qkmai.com/qkmbb/ytal/yqfx.png"
        // }
        var title = '亚太奥莱品牌热卖，能省会赚，最高返佣40%！';
        var path = '/pages/screening/screening?from=menu&tagId=' + tagId + '&picUrl=' + picUrl;
        var imageUrl = "http://cos.qkmai.com/qkmbb/ytal/yqfx.png";
        app.share(title, path, imageUrl)
    },
    timeFormat(param) { //小于10的格式化函数
        return param < 10 ? '0' + param : param;
    },
    linkProductDetail: function(event) {
        wx.navigateTo({
            url: "../productdetail/productdetail?id=" + event.currentTarget.dataset.productid
        });
    },
    countDown: function() { //倒计时函数
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime();
        var rushInfo = this.data.brandRushInfo;
        rushInfo.forEach(o => {
            var rushEndTime = o.rushEndTime.replace('\-', '/').replace('\-', '/');
            let endTime = new Date(rushEndTime).getTime();
            //endTime = endTime + 8 * 60 * 60 * 1000;

            let obj = null;
            // 如果活动未结束，对时间进行处理
            if (endTime - newTime > 0) {
                let time = (endTime - newTime) / 1000;
                // 获取天、时、分、秒
                let day = parseInt(time / (60 * 60 * 24));
                let hou = parseInt(time % (60 * 60 * 24) / 3600);
                let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
                let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);

                obj = {
                    day: this.timeFormat(day),
                    hou: this.timeFormat(hou),
                    min: this.timeFormat(min),
                    sec: this.timeFormat(sec)
                }
            } else { //活动已结束，全部设置为'00'
                obj = {
                    day: '00',
                    hou: '00',
                    min: '00',
                    sec: '00'
                }
            }
            o.countDownTime = obj;
        })
        // 渲染，然后每隔一秒执行一次倒计时函数
        this.setData({
            brandRushInfo: rushInfo
        })
        setTimeout(this.countDown, 1000);
    },
    selectSkuId: function(event) {
        // if(event.currentTarget.dataset("count") == 0) return;
        var skuId = event.currentTarget.dataset["skuid"];
        var skuName = event.currentTarget.dataset["skuname"];
        var goodsId = event.currentTarget.dataset["goodsid"];
        var goodsImage = event.currentTarget.dataset["img"]
        var tm = this;
        tm.setData({
            goodsSkuId: skuId,
            goodsSkuName: skuName,
            goodsId: goodsId,
            goodsImg: goodsImage
        });
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
                        wx.hideLoading();
                        switch (jd.status) {
                            default: wx.showModal({
                                title: '提示',
                                content: jd.message,
                                showCancel: false
                            })
                            break;
                            case 'success':
                                    wx.hideLoading();
                                tm.setData({
                                    goodsId: '',
                                    goodsSkuId: '',
                                    goodsSkuName: '',
                                    shopcartCount: tm.data.shopcartCount + 1
                                });
                                tm.GetShopCartAgain();
                        }
                    },
                    fail: function (res) {
                        wx.hideLoading()
                        wx.showModal({
                            title: '提示',
                            content: '加入购物车失败'
                        })
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

    getListGoodsData: function() {
        var tm = this;
        wx.request({
            url: app.getUrl("YTALGetPageRushGoodsByTagId"),
            data: {
                tagId: tm.data.tagId,
                isSoldOut: tm.data.isSoldOut,
                pi: ++tm.data.dataIndex,
                ps: tm.data.dataSize
            },
            success: function(jd) {
                if (jd.data.length == 0) {
                    return;
                } else {
                    if (jd.data.length != 0) {
                        let goodsList = [];
                        jd.data.forEach(o => {
                            goodsList.push(o)
                        });
                        var newList = tm.data.rushGoodsList.concat(goodsList)
                        tm.setData({
                            rushGoodsList: newList
                        })
                    }
                    if (jd.data.length == tm.data.dataSize) {
                        wx.stopPullDownRefresh();
                    } else {
                        tm.setData({
                            hasMore: false
                        })
                    }
                }
            }
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
    onShowHotSell: function(event) {
        var tm = this;
        var isFlagNum = event.currentTarget.dataset.state;
        if (isFlagNum == tm.data.nothing) {
            return
        } else {
            tm.setData({
                nothing: (tm.data.nothing == 0 ? 1 : 0),
                dataIndex: 1
            })
            wx.request({
                url: app.getUrl("YTALGetPageRushGoodsByTagId"),
                data: {
                    tagId: tm.data.tagId,
                    isSoldOut: isFlagNum,
                    pi: 1,
                    ps: tm.data.dataSize
                },
                success: function(jd) {
                    if (jd.data.length == 0) {
                        tm.setData({
                            rushGoodsList: []
                        })
                        return;
                    } else {
                        if (jd.data.length != 0) {
                            let goodsList = [];
                            jd.data.forEach(o => {
                                goodsList.push(o)
                            });
                            tm.setData({
                                rushGoodsList: goodsList,
                                brandSoruce: jd.data.goodsSource
                            })
                        }
                        if (jd.data.length == tm.data.dataSize) {
                            wx.stopPullDownRefresh();
                        } else {
                            tm.setData({
                                hasMore: false
                            })
                        }
                    }
                }
            });
        }
    },
    onPageScroll: function(obj) {
        if (obj.scrollTop > 363) {
            this.setData({
                goTopStatus: true
            })
        }
    },
    goToTop: function() {
        wx.pageScrollTo({
            scrollTop: 0,
        })
        this.setData({
            goTopStatus: false
        })
    },
    previewImg: function(event) {
        var imgSrc = event.currentTarget.dataset['imgsrc'];
        var imgs = event.currentTarget.dataset['imgs'];
        wx.previewImage({
            current: imgSrc,
            urls: imgs
        })
    },
    sharePro: function(event) {
        var brandid = event.currentTarget.dataset.brandid;
        var goodid = event.currentTarget.dataset.goodid;
        var goodssource = event.currentTarget.dataset.goodssource;
        wx.navigateTo({
            url: '/pages/poster/poster?brandid=' + brandid + '&goodid=' + goodid + '&goodssource=' + goodssource,
        })
    }
})