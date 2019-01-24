// components/splittinNum/splittinNum.js
var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        splittinNum: {
            type: String,
            value: '',
            observer: function (newVal, oldVal) {

                var tm = this;
                app.getOpenId(function (t) {
                    wx.request({
                        url: app.getUrl("SplittinList"),
                        data: {
                            openId: t,
                            pageIndex: 1,
                            pageSize: 1
                        },
                        success: function (res) {
                            tm.setData({
                                splittinNum: res.data.splittin_get_response.SplittinTotal
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
        splittinNum: null
    },

    /**
     * 组件的方法列表
     */
    methods: {

    },
    ready() {
        var tm = this;
        console.log(this.properties)
        var splittinNum = this.properties.splittinNum;
        //console.log(redPacket)
        app.getOpenId(function (t) {
            wx.request({
                url: app.getUrl("SplittinList"),
                data: {
                    openId: t,
                    pageIndex: 1,
                    pageSize: 1
                },
                success: function (res) {
                    console.log(res)
                    tm.setData({
                        splittinNum: res.data.splittin_get_response.SplittinTotal
                    })

                }
            });
        })

        // 在组件实例进入页面节点树时执行
    }
})