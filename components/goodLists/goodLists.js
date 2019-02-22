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
        linkToBrandRush(event) {
            const myEventDetail = {} // detail对象，提供给事件监听函数
            const myEventOption = {} // 触发事件的选项
            this.triggerEvent('myevent', myEventDetail, myEventOption)

            var barndId = event.currentTarget.dataset['brandid'];
            var brandSoruce = event.currentTarget.dataset['brandsource'];
            wx.navigateTo({
                url: '/pages/brandInfo/brandInfo?brandId=' + barndId + "&brandSource=" + brandSoruce
            });

        }
    },
    ready() {
        var tm = this;
        
        // 在组件实例进入页面节点树时执行
    }
})