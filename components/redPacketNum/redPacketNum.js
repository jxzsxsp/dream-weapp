// components/redPacketNum/redPacketNum.js
var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        redPacketNum: {
            type: String,
            value: '',
            observer: function(newVal, oldVal) {

                var tm = this;
                app.getOpenId(function(t) {
                    wx.request({
                        url: app.getUrl("YTALGetMemberBalanceList"),
                        data: {
                            openId: t,
                            pageIndex: 1,
                            pageSize: 1
                        },
                        success: function(res) {
                            console.log("aaa:" + res.data.balance)
                            tm.setData({
                                redPacketNum: tm.toFix(res.data.balance, 2)
                            })

                        }
                    });
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        redPacketNum: null
    },

    /**
     * 组件的方法列表
     */
    methods: {
        toFix: function(value, count) {
            var num = parseFloat(value)
            return num.toFixed(count)
        }
    },
    pageLifetimes: {
        show() {
            var tm = this;
            var redPacket = this.properties.redPacketNum;
            app.getOpenId(function(t) {
                wx.request({
                    url: app.getUrl("YTALGetMemberBalanceList"),
                    data: {
                        openId: t,
                        pageIndex: 1,
                        pageSize: 1
                    },
                    success: function(res) {
                        console.log("bbb:" + res.data.balance)
                        tm.setData({
                            redPacketNum: tm.toFix(res.data.balance, 2)
                        })

                    }
                });
            })
        }
    }

})