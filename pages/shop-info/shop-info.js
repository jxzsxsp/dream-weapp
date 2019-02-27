import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
}

const data = {
  shopId: 0,
  shopInfo: {},
  isFollow: false,
}

const lifecycle = {
  onLoad: function (query) {
    this.setData({
      shopId: query.shopId
    })
  },
  onShow: function() {
    this.getShopDetail().then(res => {
      this.setData({
        shopInfo: res,
        isFollow: res.isFollow === 1,
      })
    })
  }
}

const privateMethods = {
  getShopDetail: function () {
    return http.get(urls.shopDetail, {
      mock: true,
      shopId: this.data.shopId
    })
  },
}

const viewAction = {
  followShop: function(d) {
    this.setData({
      isFollow: !this.data.isFollow
    })
  },
  gotoShop: function(d) {
    $wx.navigateTo($wx.router.shop, {shopId: d.id})
  }
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)