// index.js
// 获取应用实例
import {$wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'

Page({
  data: {
    pantoneList: []
  },
  // 事件处理函数
  searchBarClicked: function () {
    $wx.navigateTo($wx.router.searchColor)
  },
  onLoad: function () {
    http.get(urls.pantone.COLOR_CATEGORIES,{local:1})
      .then((res) => {
        this.setData({
          pantoneList: res.list
        })
      })
  },

})
