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
    onLoad: function(options) {
        this.setData({
            userId: options.id
        })
        this.size = this.setCanvasSize();
        var str = "http://ytal.qkmai.com/wxsp?ReferralUserId=" + this.data.userId
        this.createQrCode(str, this.canvasId, this.size.w, this.size.h);
    },
    setCanvasSize: function() {
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
    createQrCode: function(str, canvasId, cavW, cavH) {
        QR.api.draw(str, canvasId, cavW, cavH);
    },
    // onGenQrc: function (e) {

    //     this.createQrCode(this.data.qrcStr, this.canvasId, this.size.w, this.size.h);
    // }
})