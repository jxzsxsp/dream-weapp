Component({
  data: {
    selectedIndex: 999
  },
  properties: {
    datas: {
      type: Array,
      value: []
    },
  },
  methods: {
    onTap: function (value) {
      this.setData({
        selectedIndex: value.target.dataset.index
      })
      this.triggerEvent('clickcallback', {value: this.data.datas[this.data.selectedIndex]})
    }
  }
})