// components/region/region.js
var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        region: {
            type: Object,
            value: '',
            observer: function (newVal, oldVal) {

            }
        },
        idx: {
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
    
    ready() {
        var tm = this;

        // 在组件实例进入页面节点树时执行
    }
})