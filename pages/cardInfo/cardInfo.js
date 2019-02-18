var conf = require("../../utils/config.js"),
    app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardBag: [],
        cardNumber: '',
        cardPassword: '',
        balance: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var cardId = options.cardId;
        var tm = this;
        wx.request({
            url: app.getUrl("GetInfoCard"),
            data: {
                openid: app.globalData.openId,
                cardId: cardId
            },
            success: function(jd) {
                var cardList = [];
                cardList.push(jd.data);
                tm.setData({
                    cardBag: cardList,
                    cardNumber: jd.data.cardNumber,
                    balance: jd.data.balance
                });
            }
        });
    },
    cardPasswordInput: function(e) {
        this.setData({
            cardPassword: e.detail.value
        });
    },
    activeCard: function(e) {
        var pdata = this.data;
        if (pdata.cardPassword.length < 1) {
            wx.showModal({
                title: '警告',
                content: '卡券密码必输输入',
                showCancel: false
            })
        } else {
            wx.request({
                url: app.getUrl("ActiveCard"),
                data: {
                    cardPassword: pdata.cardPassword,
                    cardNumber: pdata.cardNumber,
                    openid: app.globalData.openId
                },
                success: function(res) {
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
                fail: function(res) {
                    wx.showModal({
                        title: '未知错误',
                        content: '请联系客服,或重试',
                        showCancel: false
                    })
                }
            })
        }
    }
})