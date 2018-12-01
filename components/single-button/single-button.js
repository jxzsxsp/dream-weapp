/*
  单选组件

  数据数组,必须包含 name 和 id
  datas: [{
    name: 'xxx',
    id: 123,
  }]

  初始化选中的 id
  defaultSelectedId: 999

  选中的数据的回调
  bind:clickcallback

 */
Component({
  data: {
    selectedIndex: 999
  },
  properties: {
    datas: {
      type: Array,
      value: []
    },
    defaultSelectedId: {
      type: Number,
      value: 999
    }
  },
  ready: function () {
    this.data.datas.forEach((element, index) => {
      if (element.id === this.data.defaultSelectedId) {
        let selectedIndex = index
        this.setData({
          selectedIndex
        })
      }
    });
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