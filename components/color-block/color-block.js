Component({
  properties: {
    colorList: {
      type: Array | Object,
      value: [],
      observer(newValue) {
        if (newValue instanceof Array) {
          this.setData({
            colorList: newValue.reverse()
          })
        } else {
          this.setData({
            colorList: [newValue]
          })
        }
      }
    }
  },

  pageLifetimes: {
    show: function () {
      console.log(this.data.colorList)
    },
  },
  methods: {
  }
})