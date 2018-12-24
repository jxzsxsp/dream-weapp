var QRCodeJS = require("../../utils/1.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        canvasUrl: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var tm = this;
        var str = "http://ytal.qkmai.com/wxsp?ReferralUserId=" + options.id
        var src = options.src
        QRCodeJS.qrApi.draw(str, "logoQRCode", 275, 275, null, src);


        
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
    saveCode: function () {
        // wx.canvasToTempFilePath({
        //     x: 100,
        //     y: 200,
        //     width: 50,
        //     height: 50,
        //     destWidth: 100,
        //     destHeight: 100,
        //     canvasId: 'logoQRCode',
        //     success(res) {
        //         console.log(res.tempFilePath)

        //     }
        // })
        // var tm = this;
        // wx.canvasToTempFilePath({
        //     x: 100,
        //     y: 200,
        //     width: 50,
        //     height: 50,
        //     destWidth: 100,
        //     destHeight: 100,
        //     canvasId: 'logoQRCode',
        //     success(res) {
        //         console.log(res.tempFilePath)
        //         tm.setData({
        //             canvasUrl: res.tempFilePath
        //         })
        //     },
        //     complete(res) {
        //         console.log(res)
        //     }
        // })
    }
})