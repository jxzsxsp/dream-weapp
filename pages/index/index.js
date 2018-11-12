// index.js
// 获取应用实例
import {$wx, $Page} from '../../genji4mp/index'
import {http, urls} from '../../net/index'

const data = {
  pantoneList: [],
  bannerList: []
}


const lifeCycle = {
  onLoad: function () {
    http.getPantone(urls.pantone.colorCategories)
      .then(res => {
        this.setData({
          pantoneList: res.list
        })
      })
    http.get(urls.bannerList)
      .then(res => {
        this.setData({
          bannerList: res.list
        })
      })
  },
}

const viewAction = {
  // 跳转搜索
  searchBarClicked: function () {
    $wx.navigateTo($wx.router.searchColor)
  },
  // 跳转色卡详情
  pantoneCardClicked: function (data) {
    $wx.navigateTo($wx.router.colorList, this.data.pantoneList[data.index])
  }
}

$Page(null, data, lifeCycle, null, viewAction)
