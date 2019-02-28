import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
}

const data = {
  itemList: []
}

const lifecycle = {
  onLoad: function (query) {
  },
  onShow: function (query) {
    this.refresh()
  },
  onPullDownRefresh: function () {
    this.refresh()
    $wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    let itemList = this.data.itemList

    this.getItemList().then(res => {
      this.setData({
        itemList: itemList.concat(res)
      })
    })
  },
}

const privateMethods = {
  getItemList: function () {
    return http.getList(urls.itemFavoriteList, this.props.loadingState, {
      // mock: true,
    })
  },
  refresh: function () {
    this.props.loadingState = http.defaultLoadingState();
    this.getItemList().then(res => {
      if (res) {
        this.setData({
          itemList: res
        })
      }
    })
  },
}

const viewAction = {
  showDetail: function (d, v) {
    $wx.navigateTo($wx.router.itemDetail, {
      id: d.id
    })
  }
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)