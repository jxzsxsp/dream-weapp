import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
  loadingState: http.defaultLoadingState(),
}

const data = {
  shopList: []
}

const lifecycle = {
  onLoad: function (query) {
    console.log(query)
    this.refresh()
  },
  onPullDownRefresh: function () {
    this.refresh()
    $wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    let shopList = this.data.shopList

    this.getShopList().then(res => {
      console.log(res)

      this.setData({
        shopList: shopList.concat(res)
      })
    })
  },
}

const privateMethods = {
  getShopList: function () {
    return http.getList(urls.recommendSupplier, this.props.loadingState, {
      mock: true,
    })
  },
  refresh: function () {
    this.props.loadingState = http.defaultLoadingState();
    this.getShopList().then(res => {
      console.log(res)

      this.setData({
        shopList: res
      })

    })
  },
  flushShopList: function(item) {
    console.log(item)
    let shopList = this.data.shopList;

    for (let i = 0; i < shopList.length; i++) {
      if (shopList[i].id === item.id) {
        shopList[i] = item
      }
    }

    this.setData({
      shopList: shopList
    })
  }
}

const viewAction = {
  followShop: function (d, v) {
    v.isFollow = 1
    this.flushShopList(v)
  },

  cancelFollow: function (d, v) {
    console.log(v)
    v.isFollow = 0
    this.flushShopList(v)
  },

  showDetail: function (d, v) {
    console.log(d, v)
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)