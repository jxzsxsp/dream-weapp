var t = require("../../utils/config.js"),
    e = getApp();

Page({
    data: {
        isShow: true,
        userInfo: {},
        pageIndex: 1,
        pageSize: 5,
        isDataEnd: !1,
        choiceProducts: [],
        brandRush: [],
        refreshSuccess: !0,
        keyword: "",
        TopicUrl: "",
        VersionNumber: "",
        TopicData: [],
        RequestUrl: e.getRequestUrl,
        CurrentProduct: null,
        CurrentSku: null,
        selectedSkuContent: null,
        isShowSkuSelectBox: !1,
        selectedCate: "全场直播",
        TotalNum: 0,
        dataIndex: 0,
        dataSize: 5,
        cateId: 0,
        totalCount: 0,
        barndRushCate: [],
        hasMore: true,
        topArr: [],
        bottomArr: [],
        toggleText: false,
        currentId: 0,
        topLogoList: [],
        focusList: [],
        isTooLow: false
    },
    onShow: function() {
        this.GetShopCart();
        // this.getLogo();
        // this.getCate();
        // wx.hideNavigationBarLoading();
        // this.countDown();
    },
    GetShopCart: function() {
        var t = this,
            a = 0,
            r = t.data.choiceProducts;
        e.getOpenId(function(o) {
            wx.request({
                url: e.getUrl("getShoppingCartList"),
                data: {
                    openId: o
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        var e = {};
                        t.data.Data.CartItemInfo.forEach(function(t, r, o) {
                            t.IsValid && (void 0 != e[t.ProductId] ? e[t.ProductId] = parseInt(e[t.ProductId]) + parseInt(t.Quantity) : e[t.ProductId] = t.Quantity,
                                a += parseInt(t.Quantity));
                        }), r.forEach(function(t, a, r) {
                            void 0 != e[t.ProductId] ? t.CartQuantity = parseInt(e[t.ProductId]) : t.CartQuantity = 0;
                        });

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
                    if (t.data.TotalNum > 0) {
                        wx.setTabBarBadge({
                            index: 3,
                            text: t.data.TotalNum.toString()
                        })
                    }
                }
            });
        });
    },
    onLoad: function(a) {
        var tm = this;
        wx.hideTabBar({})
        if (a.q) {
            var q = decodeURIComponent(a.q);
            var str = q.split("=");
            // console.log(str[1])
            e.setRefferUserId(str[1]);
        }
        a.ReferralUserId && e.setRefferUserId(a.ReferralUserId);
        e.getUserInfo(function(t) {
            tm.setData({
                userInfo: t
            })
        });
        var r, o, n = this;
        // if (e.globalData.userInfo && e.globalData.userInfo.IsReferral) {
        //     var u = e.globalData.ReferralInfo.ShopName;
        //     wx.setNavigationBarTitle({
        //         title: u
        //     });
        // } else a.ReferralUserId ? (r = a.ReferralUserId, e.getOpenId(function(t) {
        //     wx.request({
        //         url: e.getUrl("GetReferralInfo"),
        //         data: {
        //             openId: t,
        //             ReferralUserId: r
        //         },
        //         success: function(t) {
        //             o = t.data.referral_get_response.ShopName, wx.setNavigationBarTitle({
        //                 title: o
        //             });
        //         }
        //     });
        // })) : wx.setNavigationBarTitle({
        //     title: "亚太奥莱"
        // });
        n = this;
        e.getOpenId(function(a) {
            var r = {
                openId: a
            };
            wx.showNavigationBarLoading(), t.httpGet(e.getUrl(e.globalData.getIndexData), r, n.getHomeData);
        });
        // this.getCate();
        wx.getSystemInfo({
            success: function(res) {
                var x = res.version
                var reg = new RegExp("/.", "g");
                var s = x.replace(".", "").replace(".", "");
                tm.compareVersion(x,'6.6.1')
                // console.log(tm.compareVersion(x, '6.6.1'))
                if (tm.compareVersion(x, '6.6.1') == -1) {
                    wx.hideTabBar({})
                    // tm.setData({
                    //     isTooLow: true
                    // })

                    wx.showModal({
                        title: '提示',
                        content: '您的微信版本过低请先升级您的微信版本',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                // wx.hideTabBar({})
                                tm.setData({
                                    isTooLow: true
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                } else {


                    // tm.setData({
                    //     TopicData: {
                    //         id: 201811161906894,
                    //         type: 9,
                    //         content: {
                    //             showType: 1,
                    //             space: 0,
                    //             dataset: [{
                    //                 linkType: 10,
                    //                 link: '/pages/brandInfo/brandInfo?brandId=2c9089c267ee854f0168086b840d32ef&brandSource=dadacang',
                    //                 pic: "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/28564/12/3956/53695/5c2ca953E8f239d0b/094dd2f2b6538372.jpg!cr_1125x549_0_72!q70.jpg.dpg"
                    //             }]
                    //         }
                    //     }
                    // })

                    tm.focusList()
                    // console.log(1)
                    tm.getLogo();
                    tm.getCate();
                    wx.hideNavigationBarLoading();
                    // tm.countDown();
                }
            },
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    timeFormat(param) { //小于10的格式化函数
        return param < 10 ? '0' + param : param;
    },
    linkBrandRushInfo: function(event) {
        wx.navigateTo({
            url: "../brandInfo/brandInfo?rushCode=" + event.currentTarget.dataset.rushcode
        });
    },
    linkProductDetail: function(event) {
        wx.navigateTo({
            url: "../productdetail/productdetail?id=" + event.currentTarget.dataset.productid
        });
    },
    ClickSwiper: function(t) {
        var e = this,
            a = t.currentTarget.dataset.link,
            r = t.currentTarget.dataset.showtype;
        e.JumpUrlByType(r, a);
    },
    JumpUrlByType: function(t, a) {
        switch (console.log(t), t) {
            case 10:
                wx.navigateTo({
                    url: a
                });
                break;
            case 26:
            case 14:
            case 19:
                0 == (a = a.toLowerCase()).indexOf("wx") && -1 == a.indexOf("/") ? wx.navigateToMiniProgram({
                    appId: a,
                    extarData: {},
                    envVersion: "develop",
                    success: function(t) {
                        console.log(t);
                    }
                }) : (-1 == a.indexOf("http://") && -1 == a.indexOf("https://") && (a = e.getRequestUrl + a),
                    console.log(a), wx.navigateTo({
                        url: "../outurl/outurl?url=" + encodeURIComponent(a)
                    }));
                break;

            case 23:
                wx.makePhoneCall({
                    phoneNumber: a
                });
                break;

            case 7:
            case 8:
                wx.switchTab({
                    url: a
                });
                break;

            default:
                wx.navigateTo({
                    url: a
                });
        }
    },
    onShareAppMessage: function(event) {
        var i = '/pages/home/home?from=menu';
        var title = '亚太奥莱品牌热卖，能省会赚，最高返佣40%！';
        if (event.from == 'menu') {} else {
            var lower = (parseFloat(event.target.dataset['lower']) / 10).toFixed(1);
            var barndId = event.target.dataset['brandid'];
            var brandSoruce = event.target.dataset['brandsource'];
            var brandName = event.target.dataset['maintitle'];
            var brandBg = event.target.dataset['bg'];
            // console.log(event.target.dataset['lower'] / 10)
            // console.log(lower)
            i = '/pages/brandInfo/brandInfo?brandId=' + barndId + "&brandSource=" + brandSoruce;
            title = '【品牌特卖】' + brandName + ' ' + lower + '折起';
        }
        e.globalData.userInfo && e.globalData.userInfo.IsReferral && (i += "&ReferralUserId=" + e.globalData.userInfo.UserId)
        return {
            title: title,
            path: i,
            imageUrl: brandBg
        }

    },
    getHomeData: function(t) {
        var a = this;
        "NOUser" != t.Message ? ("OK" == t.Status ? (a.getHomeProductData(a.data.pageIndex, !0),
            a.setData({
                refreshSuccess: !0,
                imageList: t.Data.ImgList,
                //countDownList: t.Data.CountDownList,
                TopicUrl: t.Data.HomeTopicPath,
                VersionNumber: t.Data.Vid
            }), e.globalData.siteInfo = t.Data.SiteInfo, a.CheckVersionNumber(a)) : wx.showToast({
            title: "系统数据异常"
        }), wx.hideNavigationBarLoading()) : wx.navigateTo({
            url: "../login/login"
        });
    },
    getHomeProductData: function(a, r) {
        // var o = this;
        // void 0 == r && (r = !1), a < 1 && (a = 1), e.getOpenId(function(n) {
        //     var u = {
        //         openId: n,
        //         pageIndex: a,
        //         pageSize: o.data.pageSize
        //     };
        //     wx.showLoading && wx.showLoading({
        //         title: "首页数据加载中..."
        //     }), t.httpGet(e.getUrl(e.globalData.GetIndexProductData), u, function(t) {
        //         if ("OK" == t.Status) {
        //             var e = o.data.choiceProducts;
        //             if (t.Data.ChoiceProducts.length > 0) {
        //                 for (var n in t.Data.ChoiceProducts) {
        //                     var u = t.Data.ChoiceProducts[n];
        //                     e.push(u);
        //                 }
        //                 var i = {
        //                     choiceProducts: e
        //                 };
        //                 (!t.Data.ChoiceProducts || t.Data.ChoiceProducts.length < o.data.pageSize) && (i.isDataEnd = !0), 
        //                 r && (i.pageIndex = a + 1), o.setData(i);
        //             }
        //         }
        //         wx.hideLoading();
        //     });
        // });
    },
    CheckVersionNumber: function(t) {
        var e = wx.getStorageSync("versionnumber");
        null == e || "" == e || "undefined" == e || parseInt(e) < parseInt(t.data.VersionNumber) ? (wx.setStorageSync("versionnumber", t.data.VersionNumber),
            t.DownloadTopcis(t)) : t.HomeTopicData(t);
    },
    DownloadTopcis: function(t) {
        wx.request({
            url: t.data.TopicUrl,
            dataType: "json",
            success: function(t) {
                wx.setStorage({
                    key: "topiclist",
                    data: t.data.LModules
                });
            },
            complete: function() {
                t.HomeTopicData(t);
            }
        });
    },
    HomeTopicData: function(t) {
        var tm = this;
        wx.getStorage({
            key: "topiclist",
            success: function(e) {
                t.setData({
                    TopicData: e.data
                });
            },
            complete: function() {}
        });
    },
    bindSearchInput: function(t) {
        var e = t.detail.value;
        e.length > 0 && this.setData({
            keyword: e
        });
    },
    bindConfirmSearchInput: function(t) {
        var e = t.detail.value;
        e.length > 0 && (wx.setStorage({
            key: "keyword",
            data: e
        }), wx.switchTab({
            url: "../searchresult/searchresult",
            success: function(t) {
                wx.hideKeyboard();
            }
        }));
    },
    bindBlurInput: function(t) {
        wx.hideKeyboard();
    },
    bindSearchAction: function(t) {
        var e = this.data.keyword;
        e.length > 0 && (wx.setStorage({
            key: "keyword",
            data: e
        }), wx.switchTab({
            url: "../searchresult/searchresult",
            success: function(t) {
                wx.hideKeyboard();
            }
        }));
    },
    gotoKeyWordPage: function(t) {
        wx.navigateTo({
            url: "../search/search"
        });
    },
    findProductById: function(t) {
        return this.data.choiceProducts.find(function(e) {
            return e.ProductId == t;
        });
    },
    setProductCartQuantity: function(t, e, a) {
        var r = this,
            o = !1,
            n = r.data.choiceProducts,
            u = n.find(function(e) {
                return e.ProductId == t;
            });
        if (u) {
            switch (e = parseInt(e), a) {
                case "=":
                    u.CartQuantity = e;
                    break;
                case "+":
                    u.CartQuantity += e;
            }
            u.CartQuantity < 0 && (u.CartQuantity = 0), o = !0;
        }
        if (o) {
            var i = {
                choiceProducts: n
            };
            r.setData(i);
        }
    },
    setSkuCartQuantity: function(t, e, a) {
        var r = this,
            o = !1,
            n = r.data.CurrentProduct;
        if (n && n.Skus) {
            var u = n.Skus.find(function(e) {
                    return e.SkuId == t;
                }),
                i = r.data.CurrentSku;
            if (u) {
                switch (e = parseInt(e), a) {
                    case "=":
                        u.CartQuantity = e;
                        break;

                    case "+":
                        u.CartQuantity += e;
                }
                u.CartQuantity < 0 && (u.CartQuantity = 0), i && i.SkuId == u.SkuId && (i.CartQuantity = u.CartQuantity),
                    o = !0;
            }
        }
        if (o) {
            var s = {
                CurrentProduct: n,
                CurrentSku: i
            };
            r.setData(s);
        }
    },
    catchAddCart: function(t) {
        var a = this,
            r = t.currentTarget,
            o = r.dataset.productid,
            n = r.dataset.activeid;
        if (1 != r.dataset.activetype) {
            var u = r.dataset.operator,
                i = parseInt(u + "1"),
                s = r.dataset.opensku,
                c = a.findProductById(o);
            if (!c.HasSKU || c.HasSKU && "false" == s) {
                var d = r.dataset.sku;
                a.addToCart(o, d, i);
            } else wx.showLoading && wx.showLoading({
                title: "商品规格数据加载..."
            }), e.getOpenId(function(t) {
                wx.request({
                    url: e.getUrl("GetProductSkus"),
                    data: {
                        ProductId: o,
                        openId: t
                    },
                    success: function(t) {
                        if (wx.hideLoading(), "OK" == t.data.Status) {
                            var e = t.data.Data,
                                r = e.DefaultSku,
                                o = [];
                            null != e && e.SkuItems.forEach(function(t, e, a) {
                                t.AttributeValue.reverse(), t.AttributeValue[0].UseAttributeImage = "selected";
                                var r = new Object();
                                r.ValueId = t.AttributeValue[0].ValueId, r.Value = t.AttributeValue[0].Value, o.push(r);
                            }), a.setData({
                                CurrentProduct: e,
                                CurrentSku: r,
                                selectedskuList: o,
                                selectedSku: r.SkuId
                            }), a.showSkuDOM();
                        }
                    },
                    complete: function() {}
                });
            });
        } else wx.navigateTo({
            url: "../countdowndetail/countdowndetail?id=" + n
        });
    },
    onSkuClick: function(t) {
        var e = this,
            a = t.target.dataset.indexcount,
            r = t.target.id,
            o = t.target.dataset.skuvalue,
            n = new Object();
        n.ValueId = r, n.Value = o;
        var u = this.data.selectedskuList;
        u[a] = n;
        var i = "",
            s = this.data.CurrentProduct,
            c = this.data.CurrentProduct.SkuItems;
        s.SkuItems.length, u.length;
        for (var d = s.ProductId, l = 0; l < u.length; l++) {
            var h = u[l];
            void 0 != h && (i += "" == i ? h.Value : "," + h.Value, d += "_" + h.ValueId);
        }
        for (var f = 0; f < s.SkuItems[a].AttributeValue.length; f++) s.SkuItems[a].AttributeValue[f].ValueId == r ? s.SkuItems[a].AttributeValue[f].UseAttributeImage = "selected" : s.SkuItems[a].AttributeValue[f].UseAttributeImage = "False";
        var g = null;
        this.data.CurrentProduct.Skus.forEach(function(t, a, r) {
            for (var o = !0, n = 0; n < u.length; n++) void 0 != u[n] && -1 != t.SkuId.indexOf("_" + u[n].ValueId) || (o = !1);
            if (o && c.length == u.length) return g = t, d = t.SkuId, void(e.data.buyAmount = t.CartQuantity > 0 ? t.CartQuantity : 1);
        }), this.setData({
            selectedskuList: u,
            selectedSku: d,
            selectedSkuContent: i,
            SkuItemList: c,
            CurrentProduct: s,
            CurrentSku: g
        });
    },
    addToCart: function(t, a, r) {
        var o = this;
        !a || a.lenght < 1 ? wx.showModal({
            title: "提示",
            content: "请选择规格",
            showCancel: !1
        }) : e.getOpenId(function(n) {
            wx.request({
                url: e.getUrl("addToCart"),
                data: {
                    openId: n,
                    SkuID: a,
                    Quantity: r
                },
                success: function(e) {
                    "OK" == e.data.Status ? (o.setProductCartQuantity(t, r, "+"), o.setSkuCartQuantity(a, r, "+")) : "NOUser" == e.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: e.data.ErrorResponse.ErrorMsg,
                        showCancel: !1,
                        success: function(t) {}
                    });
                },
                complete: function() {
                    var t = parseInt(o.data.TotalNum);
                    o.setData({
                        TotalNum: t + parseInt(r)
                    });

                    if (o.data.TotalNum > 0) {
                        wx.setTabBarBadge({
                            index: 3,
                            text: o.data.TotalNum.toString()
                        })
                    }
                }
            });
        });
    },
    hideSkuDOM: function() {
        this.setData({
            isShowSkuSelectBox: !1
        });
    },
    showSkuDOM: function() {
        this.setData({
            isShowSkuSelectBox: !0
        });
    },
    bindCountDownTap: function(t) {
        var e = t.currentTarget.dataset.countdownid;
        wx.navigateTo({
            url: "../countdowndetail/countdowndetail?id=" + e
        });
    },
    bindGoodsTap: function(t) {
        var e = t.currentTarget.dataset.productid,
            a = t.currentTarget.dataset.activeid,
            r = "../productdetail/productdetail?id=" + e;
        1 == t.currentTarget.dataset.activetype && (r = "../countdowndetail/countdowndetail?id=" + a),
            wx.navigateTo({
                url: r
            });
    },
    onReachBottom: function() {
        var t = this;
        if (1 == t.data.refreshSuccess) {
            var e = t.data.pageIndex;
            t.getHomeProductData(e, !0);
        }
    },
    countDown() { //倒计时函数
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime();
        let brandRushList = this.data.brandRush;
        brandRushList.forEach(o => {
            if (o.rushEndTime != null) {
                // console.log(o.rushEndTime)
                var rushEndTime = o.rushEndTime.replace('\-', '/').replace('\-', '/');
                // console.log(rushEndTime)
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
            }
        });
        // 渲染，然后每隔一秒执行一次倒计时函数
        this.setData({
            brandRush: brandRushList
        })

        setTimeout(this.countDown, 1000);
    },
    linkToBrandRush: function(event) {
        var barndId = event.currentTarget.dataset['brandid'];
        var brandSoruce = event.currentTarget.dataset['brandsource'];
        wx.navigateTo({
            url: '/pages/brandInfo/brandInfo?brandId=' + barndId + "&brandSource=" + brandSoruce
        });
    },
    previewImg: function(event) {
        var imgSrc = event.currentTarget.dataset['imgsrc'];
        var imgs = event.currentTarget.dataset['imgs'];
        wx.previewImage({
            current: imgSrc,
            urls: imgs
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

        this.setData({
            brandRush: [],
            pageIndex: 0,
            dataIndex: 0,
            hasMore: true
        });
        this.loadTop();
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
    getCate: function() {
        var tm = this;
        wx.request({
            url: e.getUrl("YTALGetListCateInfoIncludeBrandCount"),
            data: {},
            success: function(res) {
                tm.setData({
                    barndRushCate: res.data,
                    selectedCate: res.data[0].cateName
                })
                tm.defaultList();
                wx.stopPullDownRefresh();
            }
        });
    },
    defaultList: function() {
        var tm = this
        wx.request({
            url: e.getUrl("YTALGetListBrandRushIsHead"),
            data: {},
            success: function(res) {
                if (res.data.length > 0) {
                    let topArrList = [];
                    res.data.forEach(o => {
                        var obj = {
                            day: '00',
                            hou: '00',
                            min: '00',
                            sec: '00'
                        }
                        o.countDownTime = obj;
                        if (o.rushEndTime != null) {
                            var month = o.rushEndTime.split('-')[1];
                            var day = o.rushEndTime.split('-')[2].split(' ')[0];
                            var hour = o.rushEndTime.split(' ')[1].split(':')[0];
                            var min = o.rushEndTime.split(' ')[1].split(':')[1];

                            o.endTimeInfo = month + "/" + day + " " + hour + ":" + min;
                        }
                        topArrList.push(o)
                    });
                    tm.setData({
                        topArr: topArrList,
                        brandRush: topArrList
                    });
                }
                wx.request({
                    url: e.getUrl("YTALGetPageBrandRush"),
                    data: {
                        pi: ++tm.data.dataIndex,
                        ps: 5
                    },
                    success: function(res) {
                        if (res.data.length == 5) {
                            let bottomArrList = [];
                            res.data.forEach(o => {
                                var obj = {
                                    day: '00',
                                    hou: '00',
                                    min: '00',
                                    sec: '00'
                                }
                                o.countDownTime = obj;
                                if (o.rushEndTime != null) {
                                    var month = o.rushEndTime.split('-')[1];
                                    var day = o.rushEndTime.split('-')[2].split(' ')[0];
                                    var hour = o.rushEndTime.split(' ')[1].split(':')[0];
                                    var min = o.rushEndTime.split(' ')[1].split(':')[1];
                                    o.endTimeInfo = month + "/" + day + " " + hour + ":" + min;
                                }
                                bottomArrList.push(o)
                            });
                            var newList = tm.data.topArr.concat(bottomArrList)
                            tm.setData({
                                bottomArr: bottomArrList,
                                brandRush: newList
                            })
                        } else {
                            tm.setData({
                                hasMore: false
                            })
                        }
                    }
                })
            },
            complete: function() {
                wx.stopPullDownRefresh();
            }
        });
    },
    loadTop: function() {
        var tm = this;
        var currentUrl = '';
        var currentData = {};
        if (tm.data.selectedCate == "全场直播") {
            currentUrl = e.getUrl("YTALGetListBrandRushIsHead");
            currentData = {}
        } else {
            currentUrl = e.getUrl("YTALGetListBrandRushIsHeadByCate");
            currentData = {
                cate: this.data.selectedCate
            }
        }
        wx.request({
            url: currentUrl,
            data: currentData,
            success: function(jd) {
                wx.hideLoading();
                let brandRushList = [];
                jd.data.forEach(o => {
                    var obj = {
                        day: '00',
                        hou: '00',
                        min: '00',
                        sec: '00'
                    }
                    o.countDownTime = obj;
                    if (o.rushEndTime != null) {
                        var month = o.rushEndTime.split('-')[1];
                        var day = o.rushEndTime.split('-')[2].split(' ')[0];
                        var hour = o.rushEndTime.split(' ')[1].split(':')[0];
                        var min = o.rushEndTime.split(' ')[1].split(':')[1];

                        o.endTimeInfo = month + "/" + day + " " + hour + ":" + min;
                    }
                    brandRushList.push(o)
                });
                tm.setData({
                    brandRush: brandRushList
                })
                tm.loadMore();
            },
            complete: function() {
                wx.stopPullDownRefresh();
            }
        });
    },
    refreshData: function() {
        var tm = this;
        wx.request({
            url: e.getUrl("YTALGetPageBrandRush"),
            data: {
                pi: ++tm.data.dataIndex,
                ps: 5
            },
            success: function(res) {
                if (res.data.length == 5) {
                    let bottomArrList = [];
                    res.data.forEach(o => {
                        var obj = {
                            day: '00',
                            hou: '00',
                            min: '00',
                            sec: '00'
                        }
                        o.countDownTime = obj;
                        if (o.rushEndTime != null) {
                            var month = o.rushEndTime.split('-')[1];
                            var day = o.rushEndTime.split('-')[2].split(' ')[0];
                            var hour = o.rushEndTime.split(' ')[1].split(':')[0];
                            var min = o.rushEndTime.split(' ')[1].split(':')[1];
                            o.endTimeInfo = month + "/" + day + " " + hour + ":" + min;
                        }
                        bottomArrList.push(o)
                    });
                    var newList = tm.data.topArr.concat(bottomArrList)
                    tm.setData({
                        bottomArr: bottomArrList,
                        brandRush: newList
                    })
                } else {
                    tm.setData({
                        hasMore: false
                    })
                }
            }
        })
    },
    changeCate: function(event) {
        wx.showLoading({
            mask:true
        });
        this.setData({
            brandRush: [],
            dataIndex: 0,
            selectedCate: event.currentTarget.dataset.catename,
            hasMore: true
        })
        var tm = this;
        tm.loadTop();
    },
    loadMore: function() {
        if (!this.data.hasMore) return;
        var tm = this;
        var currentUrl = '';
        var currentData = {
            pi: ++this.data.dataIndex,
            ps: this.data.pageSize,
            cate: this.data.selectedCate
        };
        if (tm.data.selectedCate == "全场直播") {
            currentUrl = e.getUrl("YTALGetPageBrandRush");
        } else {
            currentUrl = e.getUrl("YTALGetPageBrandRushByCate");
        }
        wx.request({
            url: currentUrl,
            data: currentData,
            success: function(jd) {
                if (jd.data.length != 0) {
                    let brandRushList = [];
                    jd.data.forEach(o => {
                        var obj = {
                            day: '00',
                            hou: '00',
                            min: '00',
                            sec: '00'
                        }
                        o.countDownTime = obj;
                        if (o.rushEndTime != null) {
                            var month = o.rushEndTime.split('-')[1];
                            var day = o.rushEndTime.split('-')[2].split(' ')[0];
                            var hour = o.rushEndTime.split(' ')[1].split(':')[0];
                            var min = o.rushEndTime.split(' ')[1].split(':')[1];

                            o.endTimeInfo = month + "/" + day + " " + hour + ":" + min;
                        }
                        brandRushList.push(o)
                    });
                    tm.setData({
                        brandRush: tm.data.brandRush.concat(brandRushList)
                    })
                } else {
                    tm.setData({
                        hasMore: false
                    })
                }
            },
            complete: function() {
                wx.hideNavigationBarLoading();
            }

        });
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
    toggleHide: function(e) {
        var tm = this;
        // console.log(tm.data.currentId,e.currentTarget.dataset.id)
        if (tm.data.currentId == 0) {
            tm.setData({
                currentId: e.currentTarget.dataset.id,
                toggleText: !tm.data.toggleText
            })
        } else {
            if (tm.data.currentId != e.currentTarget.dataset.id) {
                tm.setData({
                    currentId: e.currentTarget.dataset.id,
                });
                if (!tm.data.toggleText) {

                    tm.setData({
                        toggleText: !tm.data.toggleText
                    });
                }
            } else {
                tm.setData({
                    toggleText: !tm.data.toggleText
                });
            }
        }
    },
    happyEarn: function() {
        wx.navigateTo({
            url: '/pages/screening/screening?picUrl=https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/6822/31/9032/161822/5c0f578dE04dbed1a/cb0be7a8eabaa9ff.jpg!cr_1125x549_0_72!q70.jpg.dpg&tagId=2',
        })
    },
    getLogo: function() {
        var tm = this;
        wx.request({
            url: e.getUrl("YTALGetTopListBrandRushIsHead"),
            data: {

            },
            success: function(jd) {
                if (jd.data.length != 0) {
                    let logoList = [];
                    jd.data.forEach(o => {
                        logoList.push(o)
                    });
                    tm.setData({
                        topLogoList: logoList
                    })
                }
            }
        });
    },
    goView: function(e) {
        var url = "https://ytal.qkmai.com/vShop/ArticleDetails?ArticleId=" + e.currentTarget.dataset.id
        var deurl = encodeURIComponent(url)
        var s = '/pages/webPage/webPage?artUrl=' + deurl
        wx.navigateTo({
            url: s
        })
    },
    focusList: function() {
        var tm = this;
        // console.log(e.globalData.openId)
        wx.request({
            url: e.getUrl("GetListBrandByFollow"),
            data: {
                openId: e.globalData.openId
            },
            success: function(jd) {
                if (jd.data.length > 0) {
                    console.log(jd.data)
                    let logoList = [];

                    tm.setData({
                        focusList: jd.data
                    })
                }
            }
        });
    },
    changeFocus: function(event) {
        var tm = this;
        var s = event.currentTarget.dataset.index;
        var o = e.globalData.openId
        wx.request({
            url: e.getUrl("FollowBrand"),
            data: {
                openId: o,
                mainTitle: event.currentTarget.dataset.title
            },
            success: function(jd) {
                event._relatedInfo.anchorTargetText = "取消关注"
                var br = tm.data.brandRush;
                br[s].isFocus = !br[s].isFocus;
                tm.setData({
                    brandRush: br
                })
            }
        });
    },
    onCloseBtn: function() {
        this.setData({
            isShow: false
        })
        wx.showTabBar({})
    },
    onGetLink: function() {
        wx.navigateTo({
            url: '../redPacket/redPacket',
        })
    },

    compareVersion: function(v1, v2) {
        v1 = v1.split('.')
        v2 = v2.split('.')
        var len = Math.max(v1.length, v2.length)

        while (v1.length < len) {
            v1.push('0')
        }
        while (v2.length < len) {
            v2.push('0')
        }

        for (var i = 0; i < len; i++) {
            var num1 = parseInt(v1[i])
            var num2 = parseInt(v2[i])

            if (num1 > num2) {
                return 1
            } else if (num1 < num2) {
                return -1
            }
        }
        return 0
    }

});