// components/brandName/brandName.js
var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        goodLists: {
            type: Object,
            value: '',
            observer: function (newVal, oldVal) {
                
                // console.log(newVal)
                var tm = this;
                //console.log("1" + tm.properties.goodLists)
                // wx.request({
                //     url: app.getUrl("YTALGetListBrandRushIsHead"),
                //     data: {
                //         //sku: newVal
                //     },
                //     success: function (res) {
                //         console.log(res)
                //         tm.setData({
                //             goodLists: res.data.brandName
                //         })
                //         console.log(tm.data.goodLists)

                //     }
                // });

            }
        },
        idx:{
            type: String,
            value: '',
            observer: function (newVal, oldVal) {
                
                var tm = this;
                

            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        
    },

    /**
     * 组件的方法列表
     */
    methods: {

    },
    ready() {
        var tm = this;
        var skucode = this.properties.itemsku;
        //console.log("1" + tm.properties.goodLists)
        // 在组件实例进入页面节点树时执行
    }
})