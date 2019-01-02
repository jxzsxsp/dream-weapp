var conf = require("../../utils/config.js"),
    app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
        showNoList: false,
        dataIndex: 0,
        dataSize: 5,
        hasMore: true,
        shopcartCount: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.brandId && options.brandSource) {
            this.setData({
                brandId: options.brandId,
                brandSource: options.brandSource
            })
        }
        wx.showLoading({
            title: "正在加载"
        });
        var tm = this;
        app.getUserInfo(function(t) {
            tm.setData({
                userInfo: t,
                brandId: options.brandId,
                brandSource: options.brandSource
            })
        });

        // 执行倒计时函数    
        this.getTitle();
        this.countDown();
        //this.goodsListNew();
    },

    timeFormat(param) { //小于10的格式化函数
        return param < 10 ? '0' + param : param;
    },
    linkProductDetail: function(event) {
        wx.navigateTo({
            url: "../productdetail/productdetail?id=" + event.currentTarget.dataset.productid
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
                        // console.log(t.data)
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
                    // console.log(f)
                    wx.hideLoading(), null != r && t.setData({
                        choiceProducts: r,
                        TotalNum: a
                    });
                }
            });
        });
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
        this.setData({
            brandRush: [],
            dataIndex: 0,
            hasMore: true
        })
        this.getTitle();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
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
        wx.request({
            url: app.getUrl("YTALGetListRushGoods"),
            data: {
                brandId: tm.data.brandId,
                goodsSource: tm.data.brandSource,
                pi: ++tm.data.dataIndex,
                ps: tm.data.dataSize
            },
            success: function(jd) {
                if (jd.data.length <= 5 && jd.data.length > 0) {
                    let goodsList = [];
                    jd.data.forEach(o => {
                        goodsList.push(o)
                    });
                    var newList = tm.data.rushGoodsList.concat(goodsList)
                    tm.setData({
                        rushGoodsList: newList
                    })
                    if (jd.data.length < 5) {
                        tm.setData({
                            hasMore: false
                        })
                    }
                } else {

                    tm.setData({
                        hasMore: false
                    })
                }
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        var tm = this;
        var title = tm.data.brandRushInfo[0].mainTitle;
        var url = tm.data.brandRushInfo[0].goodsImages[0];
        var brandId = tm.data.brandRushInfo[0].brandId;
        var brandSource = tm.data.brandRushInfo[0].brandSource;
        var lower = (tm.data.brandRushInfo[0].lowerDiscount / 10).toFixed(1)
        return {
            title: '【品牌特卖】' + title + ' ' + lower + '折起',
            path: '/pages/brandInfo/brandInfo?brandId=' + brandId + "&brandSource=" + brandSource,
            imageUrl: url
        }
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
        var tm = this;
        tm.setData({
            goodsSkuId: skuId,
            goodsSkuName: skuName,
            goodsId: goodsId
        });
    },
    addGoodsToCart: function(event) {
        var tm = this;
        var goodsId = event.currentTarget.dataset["goodsid"];
        var salePrice = event.currentTarget.dataset["saleprice"];
        if (goodsId != tm.data.goodsId) {
            wx.showModal({
                title: '请选择商品规格',
                content: '',
            })
        } else {
            if (tm.data.skuId == "") {
                wx.showModal({
                    title: '请选择商品规格',
                    content: '',
                })
            } else {
                wx.showLoading({
                    // title: '加载中~~~',
                })
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
                                wx.showModal({
                                    title: '',
                                    content: '成功加入购物车',
                                    cancelText: "去结算",
                                    confirmText: "再逛逛",
                                    success(res) {
                                        if (res.confirm) {

                                        } else if (res.cancel) {
                                            wx.switchTab({
                                                url: '/pages/shopcart/shopcart'
                                            })

                                        }
                                    }
                                })
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
    getTitle: function() {
        var tm = this;
        //获取品牌特卖列表        
        wx.request({

            url: app.getUrl("YTALGetInfoBrandRush"),
            data: {
                brandId: tm.data.brandId,
                brandSource: tm.data.brandSource
            },
            success: function(jd) {
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
                tm.setData({
                    brandRushInfo: infoList,
                    brandLogo: brandRush.brandLogo,
                    mainTitle: brandRush.mainTitle,
                    subTitle: brandRush.subTitle,

                    // brandSource: brandSource
                });
                tm.goodsListNew();
                wx.stopPullDownRefresh();
            },
            complete: function() {
                wx.stopPullDownRefresh();
            }
        });
    },
    goodsListNew: function() {
        var tm = this;
        wx.request({
            url: app.getUrl("YTALGetListRushGoods"),
            data: {
                brandId: tm.data.brandId,
                goodsSource: tm.data.brandSource,
                pi: ++tm.data.dataIndex,
                ps: tm.data.dataSize
            },
            success: function(jd) {
                if (jd.data.length == 0 && tm.data.rushGoodsList.length == 0) {
                    tm.setData({
                        showNoList: true,
                        hasMore: false
                    })
                } else {
                    // console.log(jd.data.length)
                    if (jd.data.length != 0) {

                        let goodsList = [];
                        jd.data.forEach(o => {
                            goodsList.push(o)
                        });
                        var newList = tm.data.rushGoodsList.concat(goodsList)
                        tm.setData({
                            rushGoodsList: newList
                        })
                    } else if (jd.data.length < 5) {
                        tm.setData({
                            hasMore: false
                        })
                    }
                }
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    }
})