var conf = require("../../utils/config.js"),
    app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        brandRush: [],
        brandCate: [],
        selectedCate: "本期特卖",
        barndRushCate: [],
        brandCateCode: "0",
        userInfo: {},
        tagList: [],
        selectedTag: "所有品牌",
        dataIndex: 0,
        dataSize: 20,
        hasMore: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var tm = this;
        app.getUserInfo(function(t) {
            tm.setData({
                userInfo: t
            })
        });
        tm.getCate();
        // tm.getTag();
        // wx.navigateTo({
        //     url: '/pages/cardInfo/cardInfo?cardId=21bf09c5-de4f-4b0f-8c08-082e8e1c9d0c&ReferralUserId=1',
        // })

        // 加载页面获取
        // wx.request({
        //     url: app.getUrl("YTALGetListBrandCate"),
        //     data: {

        //     },
        //     success: function(res) {
        //         tm.setData({
        //             barndRushCate: res.data
        //         })
        //     }
        // });
        // 执行倒计时函数
        this.countDown();
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

    },
    countDown() { //倒计时函数
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime();
        let brandRushList = this.data.brandRush;
        brandRushList.forEach(o => {
            var rushEndTime = o.rushEndTime;
            let endTime = new Date(rushEndTime).getTime();
            endTime = endTime + 8 * 60 * 60 * 1000;


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
    changeTag: function (event) {
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
            success: function (res) {
                tm.setData({
                    barndRushCate: res.data
                });
                tm.getTag();
            }
        });
    },
    getTag: function(event) {
        var tm = this;
        wx.request({
            url: app.getUrl("YTALGetListBrandRushTagByCate"),
            data: {
                cate: tm.data.selectedCate
            },
            success: function(jd) {
                let tagList = [];
                jd.data.forEach(o => {
                    tagList.push(o)
                });
                tm.setData({
                    tagList: tagList
                })
                tm.getList();
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
    }
})