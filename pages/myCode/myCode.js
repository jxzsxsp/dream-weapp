
var QR = require("../../utils/qrcode.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        qrcStr: '',
        qrcPhld: '000',
        userId: 0
    },
    canvasId: "qrcCanvas",

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            userId: options.id
        })

        this.size = this.setCanvasSize();
        var str = "http://ytal.qkmai.com/wxsp?ReferralUserId=" + this.data.userId
        console.log(str)
        this.createQrCode(str, this.canvasId, this.size.w, this.size.h);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */

    onReady: function () {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    setCanvasSize: function () {
        var size = {};
        try {
            var res = wx.getSystemInfoSync();
            var scale = 750 / 686;
            var width = res.windowWidth / scale;
            var height = width;
            size.w = width;
            size.h = height;
        } catch (e) {
            console.log("获取设备信息失败" + e);
        }
        return size;
    },
    createQrCode: function (str, canvasId, cavW, cavH) {
        QR.api.draw(str, canvasId, cavW, cavH);
    },
    // onGenQrc: function (e) {
        
    //     this.createQrCode(this.data.qrcStr, this.canvasId, this.size.w, this.size.h);
    // }
})