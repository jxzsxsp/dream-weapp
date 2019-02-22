var conf = require("../../utils/config.js"),
    app = getApp();
Page({
    data: {
        nullDraw: app.getRequestUrl + "/Templates/xcxshop/images/null.png",
        isHotState: true,
        nothing: 0,
        isSoldOut: 0,
        isFocus: false,
        brandRushInfo: [],
        brandLogo: '',
        mainTitle: '',
        subTitle: '',
        goodsId: '',
        goodsSkuId: '',
        goodsSkuName: '',
        brandSource: '',
        userInfo: {},
        showNoList: false,
        shopcartCount: 0,
        goodsImg: '',
        isSelectState: 1,
        focusList: [],
        hideCount: true,
        count: 0,
        needAni: false,
        hide_good_box: true,
        goodsImages: [],
        SelectskuId: [],
        SkuID: "",
        goodInfo: {}
    },
    onLoad: function(options) {
        // const scene = decodeURIComponent(query.scene)
        // var scene = decodeURIComponent(options.scene)

        app.globalData.fundebug.notifyError(new Error("goodInfo onload"), {
            name: "goodInfo-onload",
            metaData: options
        });
        options.ReferralUserId && app.setRefferUserId(options.ReferralUserId);

        if (options.brandId && options.goodsSource) {
            this.setData({
                brandId: options.brandId,
                goodsSource: options.goodsSource,
                brandSource: options.goodsSource,
                goodsId: options.goodsId
            })
        }
        wx.showLoading({
            title: "加载中"
        });
        var tm = this;
        app.getUserInfo(function(t) {
            tm.setData({
                userInfo: t
            })
        });
        this.getTitle();
        this.getGoodInfo()
        this.countDown();
        var that = this;
        this.busPos = {};
        this.busPos['x'] = 39;
        this.busPos['y'] = app.globalData.hh - 120;
    },

    timeFormat(param) { //小于10的格式化函数
        return param < 10 ? '0' + param : param;
    },
    linkProductDetail: function(event) {
        wx.navigateTo({
            url: "../productdetail/productdetail?id=" + event.currentTarget.dataset.productid
        });
    },
    onShow: function() {
        this.GetShopCart();
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
                complete: function(f) {
                    wx.hideLoading(), null != r && t.setData({
                        choiceProducts: r,
                        TotalNum: a
                    });
                }
            });
        });
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
    // onPullDownRefresh: function () {
    //     this.setData({
    //         brandRush: [],
    //         dataIndex: 0,
    //         hasMore: true
    //     })
    //     this.getTitle();
    // },

    goToTop: function() {
        wx.pageScrollTo({
            scrollTop: 0,
        })
        this.setData({
            goTopStatus: false
        })
    },
    onShareAppMessage: function() {
        var tm = this;
        // var title = tm.data.mainTitle;
        // var url = tm.data.brandRushInfo[0].goodsImages[0];
        // var brandId = tm.data.brandRushInfo[0].brandId;
        // var brandSource = tm.data.brandRushInfo[0].brandSource;
        // var lower = (tm.data.brandRushInfo[0].lowerDiscount / 10).toFixed(1)
        // var i = '/pages/brandInfo/brandInfo?brandId=' + brandId + "&brandSource=" + brandSource
        // app.globalData.userInfo && app.globalData.userInfo.IsReferral && (i += "&ReferralUserId=" + app.globalData.userInfo.UserId)
        // var shareInfo = {
        //     title: '【品牌特卖】' + title + ' ' + lower + '折起',
        //     path: i,
        //     imageUrl: url
        // };
        // app.globalData.fundebug.notifyError(new Error("首页分享"), {
        //     name: "首页分享",
        //     metaData: shareInfo
        // });
        // return shareInfo;
        var brandId = tm.data.brandRushInfo[0].brandId;
        var brandSource = tm.data.brandRushInfo[0].brandSource;
        var title = '【品牌特卖】' + tm.data.mainTitle + ' ' + lower + '折起';
        var path = '/pages/brandInfo/brandInfo?brandId=' + brandId + "&brandSource=" + brandSource;
        var imageUrl = tm.data.brandRushInfo[0].goodsImages[0];
        app.share(title, path, imageUrl)
    },
    countDown: function() { //倒计时函数
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime();
        var rushInfo = this.data.brandRushInfo;
        // if (rushInfo.length == 0) return;
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
    addGoodsToCart: function(event) {
        var tm = this;
        var goodsId = event.currentTarget.dataset["goodsid"];
        var salePrice = event.currentTarget.dataset["saleprice"];
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
                        brandSource: tm.data.brandSource,
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
                                    wx.hideLoading();
                                tm.touchOnGoods(event)
                                tm.setData({
                                    goodsId: '',
                                    goodsSkuId: '',
                                    goodsSkuName: '',
                                    shopcartCount: tm.data.shopcartCount + 1
                                });
                        }
                    }
                })
            }
        }
    },
    goToBuyGoods: function(event) {
        var tm = this;
        // var a = event.data.SelectskuId.join(",");
        var goodsId = event.currentTarget.dataset["goodsid"];
        var salePrice = event.currentTarget.dataset["saleprice"];
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
                        brandSource: tm.data.brandSource,
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
                                    wx.hideLoading();
                                tm.setData({
                                    goodsId: '',
                                    goodsSkuId: '',
                                    goodsSkuName: '',
                                    shopcartCount: tm.data.shopcartCount + 1
                                });
                                tm.GetShopCartAgain();
                        }
                    }
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
    fixedGoToCart: function(event) {
        wx.switchTab({
            url: '/pages/shopcart/shopcart'
        })
    },
    fixedGoToHome: function() {
        wx.switchTab({
            url: '/pages/home/home'
        })
    },
    getTitle: function() {
        var tm = this;
        //获取品牌特卖列表        
        wx.request({
            url: app.getUrl("YTALGetInfoBrandRush"),
            data: {
                // brandId: tm.data.brandId,
                // brandSource: tm.data.brandSource
                brandId: "2c9089c268833f0801688e04a5421485",
                brandSource: "dadacang"
            },
            success: function(jd) {
                if (jd.data == "") return;
                if (jd)
                    var infoList = [];
                let brandRush = jd.data;
                var obj = {
                    day: '00',
                    hou: '00',
                    min: '00',
                    sec: '00'
                }
                brandRush.countDownTime = obj;
                if (brandRush.rushEndTime != null) {
                    var month = brandRush.rushEndTime.split('-')[1];
                    var day = brandRush.rushEndTime.split('-')[2].split(' ')[0];
                    var hour = brandRush.rushEndTime.split(' ')[1].split(':')[0];
                    var min = brandRush.rushEndTime.split(' ')[1].split(':')[1];
                    brandRush.endTimeInfo = month + "/" + day + " " + hour + ":" + min;
                }
                infoList.push(brandRush);
                if (brandRush.goodsImages.length > 2) {
                    var goodsImagesThree = brandRush.goodsImages.slice(-3);
                    tm.setData({
                        goodsImages: goodsImagesThree
                    })
                }
                tm.setData({
                    brandRushInfo: infoList,
                    brandLogo: brandRush.brandLogo,
                    mainTitle: brandRush.mainTitle.replace(/&#039;/g, "\'"),
                    subTitle: brandRush.subTitle,
                    // brandSource: brandSource
                });
            },
            complete: function() {
                wx.stopPullDownRefresh();
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

    brandIsFocus: function() {
        var tm = this;
        //var s = event.currentTarget.dataset.index;
        var o = app.globalData.openId;
        wx.request({
            url: app.getUrl("YTALBrandIsFollow"),
            data: {
                // openId: o,
                openId: "o_rWK5ULNm46IJqvZOEFWIj_xWVc",
                mainTitle: tm.data.mainTitle
            },
            success: function(jd) {
                if (jd.data.status == "success") {
                    tm.setData({
                        isFocus: true
                    })
                } else {
                    tm.setData({
                        isFocus: false
                    })
                }
            }
        });
    },
    changeFocus: function(event) {
        var tm = this;
        var s = event.currentTarget.dataset.index;
        var o = app.globalData.openId
        wx.request({
            url: app.getUrl("YTALFollowBrand"),
            data: {
                openId: o,
                mainTitle: event.currentTarget.dataset.title,
                brandLogo: tm.data.brandLogo
            },
            success: function(jd) {
                tm.setData({
                    isFocus: !tm.data.isFocus
                })
            }
        });
    },
    focusList: function() {
        var tm = this;
        wx.request({
            url: app.getUrl("GetListBrandByFollow"),
            data: {
                openId: app.globalData.openId
            },
            success: function(jd) {
                if (jd.data.length > 0) {

                    let logoList = [];
                    tm.setData({
                        focusList: jd.data
                    })
                    logoList = tm.data.focusList;
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
    getGoodInfo: function() {
        var tm = this;
        wx.request({
            url: app.getUrl("YTALGetInfoGoodsInfo"),
            data: {
                goodsId: tm.data.goodsId,
                goodsSource: tm.data.goodsSource,
                brandId: tm.data.brandId
            },
            success: function(jd) {
                tm.setData({
                    goodInfo: jd.data
                })
            }
        });
    }
})