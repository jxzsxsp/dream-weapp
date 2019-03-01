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
                                splittinNum: (res.data.splittin_get_response.SplittinTotal).toFixed(2)
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
    pageLifetimes: {
        show() {
            var tm = this;
            var splittinNum = this.properties.splittinNum;
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
                            // splittinNum: res.data.splittin_get_response.SplittinTotal
                            splittinNum: (res.data.splittin_get_response.SplittinTotal).toFixed(2)
                        })
                    }
                });
            })
            // 在组件实例进入页面节点树时执行
        }
    }
    
})