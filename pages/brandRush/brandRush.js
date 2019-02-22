var conf = require("../../utils/config.js"),
    app = getApp();
Page({
    data: {
        brandRush: [],
        brandCate: [],
        brandCateCode: "0",
        userInfo: {},
        tagList: [],
        selectedTag: "所有品牌",
        dataIndex: 0,
        dataSize: 20,
        hasMore: true,
        selectedTag: "",
        selectedImg: "",
    },
    onLoad: function(a) {
        a.ReferralUserId && app.setRefferUserId(a.ReferralUserId);
        var tm = this;
        app.getUserInfo(function(t) {
            tm.setData({
                userInfo: t
            })
        });
      wx.showLoading({
        title: '加载中',
      })
        tm.getTag();
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
    getListGoods: function(event) {
        var tm = this;
        var cateCode = event.currentTarget.dataset.catecode;
        tm.setData({
            brandCateCode: cateCode
        });
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this.setData({
            brandRush: [],
            pageIndex: 0,
            hasMore: true
        });
        this.getList();
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        var path = '/pages/brandRush/brandRush?from=menu';
        var title = '亚太奥莱品牌热卖，能省会赚，最高返佣40%！';
        app.share(title, path)
        // app.globalData.userInfo && app.globalData.userInfo.IsReferral && (i += "&ReferralUserId=" + app.globalData.userInfo.UserId)
        // return {
        //     title: title,
        //     path: i
        // }
    },
    linkToBrandRush: function(event) {
        var barndId = event.currentTarget.dataset['brandid'];
        var brandSoruce = event.currentTarget.dataset['brandsource'];
        wx.navigateTo({
            url: '/pages/brandInfo/brandInfo?brandId=' + barndId + "&brandSource=" + brandSoruce
        });
    },

    // changeCate: function(event) {
    //     this.setData({
    //         brandRush: [],
    //         dataIndex: 0,
    //         selectedCate: event.currentTarget.dataset.catename,
    //         hasMore: true,
    //     })

    //     this.getList();
    // },
    // changeTag: function(event) {
    //     this.setData({
    //         brandRush: [],
    //         dataIndex: 0,
    //         selectedTag: event.currentTarget.dataset.tagname,
    //         hasMore: true
    //     })
    //     this.getList();
    // },
    getTag: function (event) {
        var tm = this;
        wx.request({
            url: app.getUrl("YTALGetListBrandRushTagFull"),
            data: {

            },
            success: function (jd) {
                if (jd.data.length > 0) {
                    let tagList = [];
                    jd.data.forEach(o => {
                        tagList.push(o)
                    });
                    tm.setData({
                        tagList: tagList,
                        selectedTag: jd.data[0].tagName,
                        selectedImg: jd.data[0].titlePic
                    })
                    tm.rewrite();
                }

            },
            complete:function(){
            wx.hideNavigationBarLoading()
            }
        })
    },
    getList: function() {
        var tm = this;
        wx.request({
            url: app.getUrl('YTALGetListBrandRushIsHeadByCateAndTag'),
            data: {
                cate: tm.data.selectedCate,
                tag: tm.data.selectedTag
            },
            success: function(jd) {
                if (jd.data.length > 0) {
                    let brandRushList = [];
                    jd.data.forEach(o => {
                        brandRushList.push(o)
                    });
                    tm.setData({
                        brandRush: brandRushList
                    })
                }
                tm.loadMore();
                wx.stopPullDownRefresh();
            }
        })
    },
    loadMore: function() {
        if (!this.data.hasMore) return;
        var tm = this;
        wx.request({
            url: app.getUrl('YTALGetListBrandRushByCateAndTag'),
            data: {
                cate: tm.data.selectedCate,
                tag: tm.data.selectedTag,
                pi: ++tm.data.dataIndex,
                ps: tm.data.dataSize
            },
            success: function(jd) {
                if (jd.data.length <= 20 && jd.data.length > 0) {
                    let brandRushList = [];
                    jd.data.forEach(o => {
                        brandRushList.push(o)
                    });
                    var newList = tm.data.brandRush.concat(brandRushList)
                    tm.setData({
                        brandRush: newList
                    })
                    if (jd.data.length < 20) {
                        tm.setData({
                            hasMore: false
                        })
                    }
                } else {
                    tm.setData({
                        hasMore: false
                    })
                }
            }
        })
    },
    switchRightTab: function(e) {
        // 获取item项的id，和数组的下标值
        let name = e.target.dataset.name,
            index = parseInt(e.target.dataset.index);
        let img = e.target.dataset.img

        // 把点击到的某一项，设为当前index
        this.setData({
            selectedTag: name,
            selectedImg: img
        });
        this.rewrite();
    },
    rewrite: function() {
        var tm = this

        // 接口调整以后开放 short短接口
        wx.request({
            url: app.getUrl('YTALGetListBrandRushIsHeadByTag'),
            data: {
                tag: tm.data.selectedTag
            },
            success: function(jd) {
                if (jd.data.length <= 0) return;
                let brandRushList = [];
                jd.data.forEach(o => {
                    brandRushList.push(o)
                });
                tm.setData({
                    brandRush: brandRushList
                })
                wx.stopPullDownRefresh();
                setTimeout(function () {
                    wx.hideLoading()
                }, 1000)
            }
        })
    }
})