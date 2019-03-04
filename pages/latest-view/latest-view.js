import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constant from '../../constant/index'

const props = {
  loadingState: http.defaultLoadingState(),
}

const data = {
  shopList: []
}

const lifecycle = {
  onShow: function (query) {
    this.refresh()
  },
  onPullDownRefresh: function () {
    this.refresh()
    $wx.stopPullDownRefresh();
  },
  // onReachBottom: function () {
  //   let shopList = this.data.shopList

  //   this.getShopList().then(res => {
  //     console.log(res)

  //     this.setData({
  //       shopList: shopList.concat(res)
  //     })
  //   })
  // },
}

const privateMethods = {
  getShopList: function () {
    return http.get(urls.browseHistory, {
      // mock: true,
    })
  },
  refresh: function () {
    this.props.loadingState = http.defaultLoadingState();
    this.getShopList().then(res => {
      console.log(res)
      if (res.list) {
        this.setData({
          shopList: res.list
        })
      }
    })
  },
  flushShopList: function (item) {
    let shopList = this.data.shopList

    for (let i = 0; i < shopList.length; i++) {
      if (shopList[i].id === item.id) {
        shopList[i] = item
        break
      }
    }

    this.setData({
      shopList: shopList
    })
  }
}

const viewAction = {
  followShop: function (d, v) {
    http.get(urls.followSupplier, {
      // mock: true,
      shopId: v.id,
      source: constant.BindCustomerSource.WEAPP_VIEW,
    }).then((res) => {
      v.isFollow = 1
      this.flushShopList(v)
    })
  },

  cancelFollow: function (d, v) {
    http.get(urls.unfollowSupplier, {
      // mock: true,
      shopId: v.id
    }).then((res) => {
      v.isFollow = 0
      this.flushShopList(v)
    })
  },

  showDetail: function (d, v) {
    // v.showDetail = !v.showDetail
    // this.flushShopList(v)
    $wx.navigateTo($wx.router.shop, {
      shopId: v.id,
    })
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)