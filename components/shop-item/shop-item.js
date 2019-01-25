// components/shop-item/shop-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shop: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    businessNames: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDetail: function onDetail() {
      this.triggerEvent('detail',
        this.properties.shop,
        { bubbles: true, composed: true });
    },

    onFollow: function onFollow() {
      this.triggerEvent('follow',
        this.properties.shop,
        { bubbles: true, composed: true });
    },

    onCancel: function onCancel() {
      this.triggerEvent('cancel',
        this.properties.shop,
        { bubbles: true, composed: true });
    },

  },
  ready: function() {
    let businesses = this.data.shop.businesses

    if(businesses && businesses.length > 0) {
      let businessNames = businesses.join(' ')
      if(businessNames.length > 18) {
        businessNames = businessNames.substring(0, 16) + '...'
      }
      this.setData({
        businessNames
      })
    }
  }
})
