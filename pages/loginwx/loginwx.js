// pages/loginwx/loginwx.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
    bindGetUserInfo: function(e) {
        var that = this;
        //此处授权得到userInfo
        console.log(e.detail.userInfo);
        //接下来写业务代码
        //最后，记得返回刚才的页面


        app.getWxUserInfo(function(a) {
            var s = app.getRefferUserId();
            wx.request({
                url: app.getUrl("QuickLogin"),
                data: {
                    openId: a.openId,
                    nickName: a.nikeName,
                    unionId: a.unionId,
                    headImage: a.headImage,
                    encryptedData: a.encryptedData,
                    session_key: a.session_key,
                    iv: a.iv,
                    ReferralUserId: s
                },
                success: function(a) {
                    void 0 == a.data.error_response ? a.data.Data.IsBindUser ? (app.setUserInfo(a.data.Data),
                        wx.switchTab({
                            url: "../usehome/usehome"
                        })) : wx.redirectTo({
                        url: "../relationlogin/relationlogin"
                    }) : hishop.showTip(a.data.error_response.sub_msg);
                }
            });
        });



        wx.navigateBack({
            delta: 12
        })

    }
})