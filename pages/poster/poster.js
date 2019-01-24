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
        SkuID: ""
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
                brandId: "2c9089c26870a9020168742c1e262fc9",
                brandSource: "dadacang"
            })
        }
        wx.showLoading({
            title: "加载中"
        });

        app.getUserInfo(function(t) {

            tm.setData({
                userInfo: t,
                brandId: "2c9089c26870a9020168742c1e262fc9",
                brandSource: "dadacang"
            })
            tm.loadMore()
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
            url: app.getUrl("YTALGetListRushGoods"),
            data: {
                brandId: tm.data.brandId,
                isSoldOut: tm.data.nothing,
                goodsSource: tm.data.brandSource,
                pi: 1,
                ps: 1
            },
            success: function(jd) {
                console.log(jd)
                var item = jd.data[0];
                
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
    onCreatPic:function(){
        wx.saveImageToPhotosAlbum({
            success(res) { }
        })
    }
})