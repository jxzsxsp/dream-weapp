var conf = require("../../utils/config.js"),
    app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        brandRush: [],
        brandCate: [],
        brandCateCode: "0"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // wx.navigateTo({
        //     url: '/pages/cardInfo/cardInfo?cardId=21bf09c5-de4f-4b0f-8c08-082e8e1c9d0c&ReferralUserId=1',
        // })
        //获取品牌特卖列表        
        var tm = this;
        wx.request({
            url: app.getUrl("QSHGetListBrandRush"),
            data: {},
            success: function(jd) {
                let brandRushList = [];
                jd.data.forEach(o => {                    
                    brandRushList.push(o)
                });
                tm.setData({
                    brandRush: brandRushList
                })
            }
        });
        wx.request({
            url: app.getUrl("GetListBrandCate"),
            data: {},
            success: function(jd) {
                tm.setData({
                    brandCate: jd.data
                });
            }
        });
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
    linkProductDetail: function (event) {
        wx.navigateTo({
            url: "../productdetail/productdetail?id=" + event.currentTarget.dataset.productid
        });
    },
    getListGoods: function(event) {
        var tm = this;
        var cateCode = event.currentTarget.dataset.catecode;

        console.log(cateCode);
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
    linkToBrandRush:function(event){
        var barndId = event.currentTarget.dataset['brandid'];
        var brandSoruce = event.currentTarget.dataset['brandsource'];
        wx.navigateTo({
            url: '/pages/brandInfo/brandInfo?brandId=' + barndId + "&brandSource=" + brandSoruce
        });
    }
})