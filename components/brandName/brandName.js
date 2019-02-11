// components/brandName/brandName.js
var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        itemsku: {
            type: String,
            value: '',
            observer: function(newVal, oldVal) {

                var tm = this;
                wx.request({
                    url: app.getUrl("YTALGetGoodsBrand"),
                    data: {
                        sku: newVal
                    },
                    success: function (res) {

                        tm.setData({
                            brandName: res.data.brandName
                        })

                    }
                });
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        brandName: "品牌名称"
    },

    /**
     * 组件的方法列表
     */
    methods: {

    },
    ready() {
        var tm = this;
        var skucode = this.properties.itemsku;
        wx.request({
            url: app.getUrl("YTALGetGoodsBrand"),
            data: {
                sku: skucode
            },
            success: function(res) {

                tm.setData({
                    brandName: res.data.brandName
                })

            }
        });
        // 在组件实例进入页面节点树时执行
    }
})