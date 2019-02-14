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
                            // var r = res.data.SubMember_get_response.SubMembers;
                            // for (var i = 0; i < r.length; i++) {
                            //     if (r[i].ReferralGradeName === null) {
                            //         nn++;
                            //     }
                            // }
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
        console.log(this.properties)
        var redPacket = this.properties.fansNum;
        console.log(redPacket)
        app.getOpenId(function (t) {
            wx.request({
                url: app.getUrl("YTALSubFuns"),
                data: {
                    openId: t,
                    pageIndex: 1,
                    pageSize: 1
                },
                success: function (res) {
                    console.log(res)
                    tm.setData({
                        fansNum: res.data.SubMember_get_response.RecordCount
                    })

                }
            });
        })

        // 在组件实例进入页面节点树时执行
    }
})
