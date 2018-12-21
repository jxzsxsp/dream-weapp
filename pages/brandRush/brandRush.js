var conf = require("../../utils/config.js"),
    app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        brandRush: [],
        brandCate: [],
        // selectedCate: "本期特卖",
        // barndRushCate: [],
        brandCateCode: "0",
        userInfo: {},
        tagList: [],
        selectedTag: "所有品牌",
        dataIndex: 0,
        dataSize: 20,
        hasMore: true,
        selectedTag: "",
        selectedImg: "http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/6326/25/9872/92392/5c16504fE2790aba9/104958c5e6199f71.jpg!cr_1125x549_0_72!q70.jpg.dpg",

        // 重写
        curNav: 1,
        curIndex: 0

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(a) {
        a.ReferralUserId && app.setRefferUserId(a.ReferralUserId);
        var tm = this;
        app.getUserInfo(function(t) {
            tm.setData({
                userInfo: t
            })
        });
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

        // console.log(cateCode);
        tm.setData({
            brandCateCode: cateCode
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
        this.setData({
            brandRush: [],
            pageIndex: 0,
            hasMore: true
        });
        this.getList();
        // wx.stopPullDownRefresh();
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

        var i = '/pages/brandRush/brandRush?from=menu';
        var title = '亚太奥莱品牌热卖，能省会赚，最高返佣40%！';
        app.globalData.userInfo && app.globalData.userInfo.IsReferral && (i += "&ReferralUserId=" + app.globalData.userInfo.UserId)
        
        return {
            title: title,
            path: i
        }


    },
    // countDown() { //倒计时函数
    //     // 获取当前时间，同时得到活动结束时间数组
    //     let newTime = new Date().getTime();
    //     let brandRushList = this.data.brandRush;
    //     brandRushList.forEach(o => {
    //         var rushEndTime = o.rushEndTime;
    //         let endTime = new Date(rushEndTime).getTime();
    //         endTime = endTime + 8 * 60 * 60 * 1000;


    //         let obj = null;
    //         // 如果活动未结束，对时间进行处理
    //         if (endTime - newTime > 0) {
    //             let time = (endTime - newTime) / 1000;
    //             // 获取天、时、分、秒
    //             let day = parseInt(time / (60 * 60 * 24));
    //             let hou = parseInt(time % (60 * 60 * 24) / 3600);
    //             let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
    //             let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);

    //             obj = {
    //                 day: this.timeFormat(day),
    //                 hou: this.timeFormat(hou),
    //                 min: this.timeFormat(min),
    //                 sec: this.timeFormat(sec)
    //             }
    //         } else { //活动已结束，全部设置为'00'
    //             obj = {
    //                 day: '00',
    //                 hou: '00',
    //                 min: '00',
    //                 sec: '00'
    //             }
    //         }
    //         o.countDownTime = obj;
    //     });
    //     // 渲染，然后每隔一秒执行一次倒计时函数
    //     this.setData({
    //         brandRush: brandRushList
    //     })

    //     setTimeout(this.countDown, 1000);
    // },
    linkToBrandRush: function(event) {
        var barndId = event.currentTarget.dataset['brandid'];
        var brandSoruce = event.currentTarget.dataset['brandsource'];
        wx.navigateTo({
            url: '/pages/brandInfo/brandInfo?brandId=' + barndId + "&brandSource=" + brandSoruce
        });
    },

    changeCate: function(event) {
        // 初始化值
        this.setData({
            brandRush: [],
            dataIndex: 0,
            selectedCate: event.currentTarget.dataset.catename,
            hasMore: true,
            // selectedTag: "所有品牌"
        })
        // this.getTag();






        // 取消tag列表后的更改
        this.getList();
    },
    changeTag: function(event) {
        // 初始化值
        this.setData({
            brandRush: [],
            dataIndex: 0,
            selectedTag: event.currentTarget.dataset.tagname,
            hasMore: true
        })
        this.getList();
    },
    getCate: function() {
        var tm = this;
        wx.request({
            url: app.getUrl("YTALGetListBrandCate"),
            data: {

            },
            success: function(res) {
                tm.setData({
                    barndRushCate: res.data,
                    selectedCate: res.data[0]
                });
                tm.getTag();
            }
        });
    },
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
                    // tm.getList();
                    tm.rewrite();
                }
            }
        })
    },
    // getTag: function(event) {
    //     var tm = this;
    //     wx.request({
    //         url: app.getUrl("YTALGetListBrandRushTagByCate"),
    //         data: {
    //             cate: "本期特卖"
    //         },
    //         success: function(jd) {
    //             if (jd.data.length > 0) {
    //                 let tagList = [];
    //                 jd.data.forEach(o => {
    //                     tagList.push(o)
    //                 });
    //                 tm.setData({
    //                     tagList: tagList,
    //                     selectedTag: jd.data[0]
    //                 })
    //                 // tm.getList();
    //                 tm.rewrite();
    //             }
    //         }
    //     })
    // },
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
                // if (jd.data.length == 20) {
                //     let brandRushList = [];
                //     jd.data.forEach(o => {
                //         brandRushList.push(o)
                //     });
                //     var newList = tm.data.brandRush.concat(brandRushList)
                //     tm.setData({
                //         brandRush: newList
                //     })
                // } else {

                //     tm.setData({
                //         hasMore: false
                //     })
                // }
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
                console.log(jd.data)
                if (jd.data.length <= 0) return;
                let brandRushList = [];
                jd.data.forEach(o => {
                    brandRushList.push(o)
                });
                // var newList = tm.data.brandRush.concat(brandRushList)
                tm.setData({
                    brandRush: brandRushList
                })
                wx.stopPullDownRefresh();
            }
        })
    }
})