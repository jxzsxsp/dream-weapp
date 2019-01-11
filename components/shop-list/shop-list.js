// components/shop-list/shop-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array,
    title: String
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
    goRecommendSupplier: function() {
      wx.switchTab({ url: '/pages/recommend-supplier/recommend-supplier' })
    }
  }
})
