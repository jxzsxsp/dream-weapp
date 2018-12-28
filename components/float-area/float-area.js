// components/float-area/float-area.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    x: String,
    y: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    width: 0,
    height: 0,
    windowWidth: 280,
    windowHeight: 480,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function() {
      console.log(this.data.x)
    },

    move: function (e) {
      let x = e.touches[0].clientX - this.data.width / 2
      let y = e.touches[0].clientY - this.data.height / 2
      
      x = x < 0 ? 0 : x
      x = x > this.data.windowWidth - this.data.width ? this.data.windowWidth - this.data.width : x
      y = y < 0 ? 0 : y
      y = y > this.data.windowHeight - this.data.height ? this.data.windowHeight - this.data.height : y

      this.setData({
        x: x + 'px',
        y: y + 'px'
      })
    }
  },
  ready: function () {

    // 获取屏幕宽高
    try {
      const res = wx.getSystemInfoSync()
      this.setData({
        windowWidth: res.windowWidth,
        windowHeight: res.windowHeight,
      })
    } catch (err) {
      console.log(err)
    }

    console.log("windowWidth:" + this.data.windowWidth, "windowHeight:" + this.data.windowHeight)

    // 获取组件宽高
    var query = this.createSelectorQuery();
    var that = this;
    query.select('.float-container').boundingClientRect(function (rect) {
      that.setData({
        width: rect.width,
        height: rect.height
      })

      console.log("width:" + that.data.width, "height:" + that.data.height)

      // 设置初始坐标
      if (!that.data.x && !that.data.y) {
        console.log('haha', that.data.x, that.data.y)
        that.setData({
          x: (that.data.windowWidth - that.data.width) + 'px',
          y: (that.data.windowHeight - that.data.height - 130) + 'px',
        })
      }
    }).exec();

  }
})
