// components/fold/fold.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    show: {
      type: Boolean,
      value: false
    },
    status: {
      type: Number,
      value: 0
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
    toggleContent: function() {
      this.setData({
        show: !this.data.show
      })
    },
    onShow: function onShow() {
      this.triggerEvent('show',
        this.properties.status,
        { bubbles: true, composed: true });
    },
  }
})
