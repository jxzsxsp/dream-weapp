var conf = require("../../utils/config.js"),
    app = getApp();
Page({

            /**
             * 页面的初始数据
             */
            data: {
                nullDraw: app.getRequestUrl + "/Templates/xcxshop/images/null.png",
                isHotState: true,
                nothing: 0,
                isSoldOut: 0,
                isFocus: false,
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
                shopcartCount: 0,
                goodsImg: '',
                isSelectState: 1,
                focusList: [],
                hideCount: true,
                count: 0,
                needAni: false,
                hide_good_box: true,
                goTopStatus: false,
                goodsImages: [],
                SelectskuId: [],
                SkuID: "",
                goodsSource: "",
                codeimg: ""
            },

            /**
             * 生命周期函数--监听页面加载
             */
            onLoad: function(options) {
                var path = '/pages/goodInfo/goodInfo?brandid=' + options.brandid + '&goodid=' + options.goodid + '&goodssource=' + options.goodssource
                app.globalData.userInfo && app.globalData.userInfo.IsReferral && (path += "&ReferralUserId=" + app.globalData.userInfo.UserId)
                var tm = this;
                app.globalData.fundebug.notifyError(new Error("列表onload"), {
                    name: "brandInfo-onload",
                    metaData: options
                });

                options.ReferralUserId && app.setRefferUserId(options.ReferralUserId);

                if (options.brandId && options.brandSource) {
                    this.setData({
                        // brandId: options.brandId,
                        // brandSource: options.brandSource
                        brandId: options.brandid,
                        goodsSource: options.goodssource,
                        goodsId: options.goodid
                    })
                }
                wx.showLoading({
                    title: "加载中"
                });

                app.getUserInfo(function(t) {

                    tm.setData({
                        userInfo: t,
                        brandId: options.brandid,
                        goodsSource: options.goodssource,
                        goodsId: options.goodid
                    })
                    tm.loadMore()
                });
                wx.request({
                    url: app.getUrl("YTALGetWxAppletQrCode"),
                    data: {
                        brandId: tm.data.brandId,
                        ReferralUserId: app.globalData.userInfo.UserId,
                        goodsId: tm.data.goodsId,
                        goodsSource: tm.data.goodsSource
                    },
                    success: function(jd) {
                        var imgUrl = jd.data.url;
                        tm.setData({
                            codeimg: imgUrl
                        })


                    },
                    complete: function() {
                        wx.hideLoading();
                    }
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

            },

            /**
             * 页面上拉触底事件的处理函数
             */
            onReachBottom: function() {

            },

            /**
             * 用户点击右上角分享
             */
            onShareAppMessage: function() {

            },
            loadMore: function() {
                var tm = this;
                wx.request({
                    url: app.getUrl("YTALGetInfoGoodsInfo"),
                    data: {
                        brandId: tm.data.brandId,
                        // isSoldOut: tm.data.nothing,
                        goodsId: tm.data.goodsId,
                        goodsSource: tm.data.goodsSource
                    },
                    success: function(jd) {
                        var item = jd.data;
                        var proImg = item.goodsImages[0];
                        var arr = item.infoDesc.split(/\n/g);
                        var infoTit = arr[0]
                        var infoSize = arr[1]
                        var infoDes = arr[2]
                        var infSku = arr[3]
                        var salePrice = item.salePrice;
                        var marketPrice = '市场价￥' + item.marketPrice;
                        var marketPriceDiscount = item.marketPriceDiscount / 10;
                        tm.setData({
                            proImg: proImg,
                            infoTit: infoTit,
                            infoSize: infoSize,
                            infoDes: infoDes,
                            infSku: infSku,
                            salePrice: salePrice,
                            marketPrice: marketPrice,
                            marketPriceDiscount: marketPriceDiscount
                        })

                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                });
            },
            onCreatPic: function() {

            },
            showCode: function() {

            },
            showPoster: function() {
                    var tm = this;
                    wx.showLoading({
                        title: "加载中"
                    })

                    wx.request({
                        url: app.getUrl("YTALApplyPoster"),
                        data: {
                            brandId: tm.data.brandId,
                            ReferralUserId: app.globalData.userInfo.UserId,
                            goodsId: tm.data.goodsId,
                            goodsSource: tm.data.goodsSource
                        },
                        success: function(jd) {
                            var imgSrc = jd.data.url;
                            wx.downloadFile({
                                url: imgSrc,
                                success: function(res) {
                                    //图片保存到本地
                                    wx.saveImageToPhotosAlbum({
                                        filePath: res.tempFilePath,
                                        success: function(data) {},
                                        fail: function(err) {
                                            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                                                wx.openSetting({
                                                    success(settingdata) {
                                                        if (settingdata.authSetting['scope.writePhotosAlbum']) {} else {
                                                        }
                                                    }
                                                })
                                            }
                                        },
                                        complete: function() {
                                            wx.hideLoading();
                                        }
                                    })
                                }

                            })
                        }
                    })

                            //         // wx.saveImageToPhotosAlbum({
                            //         //     filePath: jd.data.url,
                            //         //     success: function(res) {
                            //         //         wx.hideLoading();
                            //         //     }
                            //         // })
                            //     },
                            //     complete: function() {

                            //     }

                        }
                    })