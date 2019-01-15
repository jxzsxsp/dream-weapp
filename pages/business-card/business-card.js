import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
}

const data = {
  showShop: true,
  shopId: 0,
  userId: 0,
  shopInfo: {},
  userInfo: {},
  isFollow: false,
}

const lifecycle = {
  onLoad: function (query) {
    console.log(query)

    if (query.shopId && query.shopId > 0) {
      $wx.setNavigationBarTitle({
        title: '店铺名片',
      })
      this.setData({
        showShop: true,
        shopId: query.shopId,
      })

      this.getShopDetail(query.shopId).then((res) => {
        this.setData({
          shopInfo: res,
        })
      })
    }

    if (query.userId && query.userId > 0) {
      $wx.setNavigationBarTitle({
        title: '个人名片',
      })
      this.setData({
        showShop: false,
        userId: query.userId,
      })

      this.getPersonDetail(query.userId).then((res) => {
        this.setData({
          userInfo: res,
          shopId: res.shopId,
        })
      })
    }

  },
}

const privateMethods = {
  getShopDetail: function (shopId) {
    return http.get(urls.shopDetail, {
      mock: true,
      shopId: shopId
    })
  },
  getPersonDetail: function (userId) {
    return http.get(urls.personDetail, {
      mock: true,
      userId: userId
    })
  },
}

const viewAction = {
  followShop: function () {
    http.get(urls.followSupplier, {
      mock: true,
      shopId: this.data.shopId
    }).then((res) => {
      this.setData({
        isFollow: true,
      })
    })
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)