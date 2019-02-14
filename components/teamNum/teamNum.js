// components/teamNum/teamNum.js
var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        teamNum: {
            type: String,
            value: '',
            observer: function (newVal, oldVal) {
                var tm = this;
                app.getOpenId(function (t) {
                    wx.request({
                        url: app.getUrl("YTALSubMembers"),
                        data: {
                            openId: t,
                            pageIndex: 1,
                            pageSize: 1
                        },
                        success: function (res) {
                            tm.setData({
                                teamNum: (res.data.SubMember_get_response.LowerUserSaleTotal).toFixed(2)
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
        teamNum: null
    },

    /**
     * 组件的方法列表
     */
    methods: {},
    ready() {
        var tm = this;
        var redPacket = this.properties.teamNum;
        app.getOpenId(function (t) {
            wx.request({
                url: app.getUrl("YTALSubMembers"),
                data: {
                    openId: t,
                    pageIndex: 1,
                    pageSize: 1
                },
                success: function (res) {
                    tm.setData({
                        teamNum: (res.data.SubMember_get_response.LowerUserSaleTotal).toFixed(2)
                    })
                }
            });
        })

        // 在组件实例进入页面节点树时执行
    }
})
