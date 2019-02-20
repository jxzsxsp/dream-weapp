// components/brandName/brandName.js
var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        goodLists: {
            type: String,
            value: '',
            observer: function (newVal, oldVal) {

                var tm = this;
                console.log("1"+ tm.data.goodLists)
                
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
        console.log("2" + tm.data.goodLists)
        // 在组件实例进入页面节点树时执行
    }
})