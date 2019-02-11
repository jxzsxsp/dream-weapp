// components/fansNum/fansNum.js
var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        fansNum: {
            type: String,
            value: '',
            observer: function (newVal, oldVal) {
                var tm = this;
                app.getOpenId(function (t) {
                    wx.request({
                        url: app.getUrl("YTALSubFuns"),
                        data: {
                            openId: t,
                            pageIndex: 1,
                            pageSize: 1
                        },
                        success: function (res) {
                            tm.setData({
                                fansNum: res.data.SubMember_get_response.RecordCount
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
        fansNum: null
    },

    /**
     * 组件的方法列表
     */
    methods: {

    },
    ready() {
        var tm = this;
        var redPacket = this.properties.fansNum;
        app.getOpenId(function (t) {
            wx.request({
                url: app.getUrl("YTALSubFuns"),
                data: {
                    openId: t,
                    pageIndex: 1,
                    pageSize: 1
                },
                success: function (res) {
                    tm.setData({
                        fansNum: res.data.SubMember_get_response.RecordCount
                    })

                }
            });
        })

        // 在组件实例进入页面节点树时执行
    }
})
