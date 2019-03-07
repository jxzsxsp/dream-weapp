// components/item/item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    trade: { // 属性名
      type: Object,
      value: {},
      observer: function(newVal, oldVal, changedPath) {
        let title = newVal.title

        if (title.length > 14) {
          title = title.substring(0, 13) + '...'
        }
        this.setData({
          title
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: '',
    showReason: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onReceive: function onReceive() {
      this.triggerEvent('receive',
        this.properties.trade,
        { bubbles: true, composed: true });
    },
    showReason: function() {
      // wx.showModal({
      //   title: '拒绝原因',
      //   content: this.properties.trade.remark,
      //   showCancel: false,
      //   confirmColor: '#0156fe',
      // })
      this.setData({
        showReason: !this.data.showReason,
      })
    },
  },
})
