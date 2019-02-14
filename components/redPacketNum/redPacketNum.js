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
                            // var x = res.data.SubMember_get_response.ExpandMemberAll;
                            // x = parseFloat(x).toFixed(2)
                            tm.setData({
                                redPacketNum: (res.data.balance).toFixed(2)
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
    methods: {},
    ready() {
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
                    tm.setData({
                        redPacketNum: (res.data.balance).toFixed(2)
                    })

                }
            });
        })

        // 在组件实例进入页面节点树时执行
    }
})