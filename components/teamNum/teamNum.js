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
                                teamNum: (res.data.SubMember_get_response.LowerUserSaleTotal).toFixed(1)
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
    methods: {

    },
    ready() {
        var tm = this;
        console.log(this.properties)
        var redPacket = this.properties.teamNum;
        console.log(redPacket)
        app.getOpenId(function (t) {
            wx.request({
                url: app.getUrl("YTALSubMembers"),
                data: {
                    openId: t,
                    pageIndex: 1,
                    pageSize: 1
                },
                success: function (res) {
                    console.log(res)
                    tm.setData({
                        teamNum: (res.data.SubMember_get_response.LowerUserSaleTotal).toFixed(1)
                    })

                }
            });
        })

        // 在组件实例进入页面节点树时执行
    }
})
