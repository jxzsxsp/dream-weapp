// index.js
// 获取应用实例
import {$wx, $Page} from '../../genji4mp/index'
import {http, urls} from '../../net/index'

const lifeCycle = {
  onLoad: function () {
    http.get(urls.pantone.COLOR_CATEGORIES, {local:1})
      .then((res) => {
        this.setData({
          pantoneList: res.list
        })
      })
  },
}

const viewAction = {
  // 跳转搜索
  searchBarClicked: function (e,v) {
    console.log(e)

    console.log(v)
    $wx.navigateTo($wx.router.searchColor)
  },
}

const data = {
  pantoneList: []
}

$Page(null, data, lifeCycle, null, viewAction)

// $Page({
//   data: {
//     pantoneList: []
//   },
//   viewAction,
//   lifeCycle

// })


// Page({
//   data: {
//     pantoneList: []
//   },
//   // 跳转搜索
//   searchBarClicked: function () {
//     $wx.navigateTo($wx.router.searchColor)
//   },
//   onLoad: function () {
//     http.get(urls.pantone.COLOR_CATEGORIES, {local:1})
//       .then((res) => {
//         this.setData({
//           pantoneList: res.list
//         })
//       })
//   },

// })
