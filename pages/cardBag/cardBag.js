var conf = require("../../utils/config.js"),
    app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardBag: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var tm = this;
        wx.request({
            url: app.getUrl("GetInfoCardBag"),
            data: {
                openid: app.globalData.openId
            },
            success: function(jd) {
                tm.setData({
                    cardBag: jd.data
                });
            }
        });
    },
    activeCard: function(o) {

        var cardId = o.currentTarget.dataset.id;
        var cardNumber = o.currentTarget.dataset.cardnumber;
        var cardPassword=o.currentTarget.dataset.cardpassword;
        var cardBalance = o.currentTarget.dataset.balance;

        wx.showModal({
            title: '确认激活',
            content: '您正在激活卡号：' + cardNumber + "，金额: " + cardBalance + "元",
            success: function(res) {
                if (res.confirm) {
                  wx.request({
                    url: app.getUrl("ActiveCard"),
                    data: {
                      cardPassword: cardPassword,
                      cardNumber: cardNumber,
                      openid: app.globalData.openId
                    },
                    success: function (res) {
                      if (res.data.success) {
                        wx.showModal({
                          title: '成功',
                          content: res.data.message,
                          showCancel: false,
                          success(cf) {
                            if (cf.confirm) {
                              wx.navigateTo({
                                url: '/pages/userhome/userhome',
                              })
                            }
                          }
                        })
                      } else {
                        wx.showModal({
                          title: '错误',
                          content: res.data.message,
                          showCancel: false
                        })
                      }
                    },
                    fail: function (res) {
                      wx.showModal({
                        title: '未知错误',
                        content: '请联系客服,或重试',
                        showCancel: false
                      })
                    }
                  })
                }
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
    onShareAppMessage: function(o) {
        var cardId = o.target.dataset.cardid;        
        return {
            title: '送您张现金购物卡，快去买！',
                path: '/pages/cardInfo/cardInfo?cardId=' + cardId + '&ReferralUserId' + app.globalData.userInfo.UserId,
            imageUrl: '/images/donatecardbanner.png'
        }
    }
})