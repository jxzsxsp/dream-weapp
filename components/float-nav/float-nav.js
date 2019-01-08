// components/go-home/go-home.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    nav_select: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    goHome: function () {
      wx.reLaunch({ url: '/pages/index/index' })
    },

    goApp: function () {
    },

    launchAppError: function(e) {
      wx.showModal({ title: '提示', content: '请先下载App', showCancel: false }).then(res => {
        console.log(e.detail.errMsg)
      })
    },

    /**
     * 快捷导航 显示/隐藏
     */
    commonNav: function () {
      this.setData({
        nav_select: !this.data.nav_select
      });
    },

  }
})
