// components/order-item/order-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    order: Object
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
    onDetail: function onDetail() {
      this.triggerEvent('detail',
        this.properties.order,
        { bubbles: true, composed: true });
    },

    onCancel: function onCancel() {
      this.triggerEvent('cancel',
        this.properties.order,
        { bubbles: true, composed: true });
    },

    onView: function onView() {
      this.triggerEvent('view',
        this.properties.order,
        { bubbles: true, composed: true });
    },

    onPay: function onPay() {
      this.triggerEvent('pay',
        this.properties.order,
        { bubbles: true, composed: true });
    },

  }
})
