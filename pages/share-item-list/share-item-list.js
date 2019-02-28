import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constant from '../../constant/index'

const props = {
}

const data = {
  shopId: 0,
  shareCode: 0,
  shopInfo: {},
  itemList: [],
  isFollow: false,
}

const lifecycle = {
  onLoad: function (query) {
    console.log(query)

    $wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4A90E2',
    })

    const scene = decodeURIComponent(query.scene)
    const scenes = scene.split(',')

    let shopId = parseInt(scenes[0])
    let shareCode = parseInt(scenes[1])

    this.setData({
      shopId: shopId,
      shareCode: shareCode,
    })
  },
  onShow: function (query) {
    this.getShopDetail()
    this.getShareItemList()
  },
}

const privateMethods = {
  getShopDetail: function () {
    return http.get(urls.shopSimpleDetail, {
      // mock: true,
      shopId: this.data.shopId
    }).then(res => {
      this.setData({
        shopInfo: res,
        isFollow: res.isFollow,
      })
    })
  },
  getShareItemList: function (positionType) {
    return http.get(urls.shareItemList, {
      // mock: true,
      shareCode: this.data.shareCode,
    }).then(res => {
      this.setData({
        itemList: res.list
      })
    })
  },
  follow: function () {
    http.get(urls.followSupplier, {
      // mock: true,
      shopId: this.data.shopId,
      source: constant.BindCustomerSource.WEAPP_VIEW,
    })
  },
  cancelFollow: function () {
    http.get(urls.unfollowSupplier, {
      // mock: true,
      shopId: this.data.shopId
    })
  },
}

const viewAction = {
  followShop: function (d) {
    this.setData({
      isFollow: !this.data.isFollow
    }, function () {
      if (this.data.isFollow) {
        this.follow()
      } else {
        this.cancelFollow()
      }
    })
  },
  gotoItemDetail: function (d) {
    $wx.navigateTo($wx.router.itemDetail, {
      itemId: d.id
    })
  },
  gotoShopHome: function () {
    $wx.navigateTo($wx.router.shop, {
      shopId: this.data.shopId
    })
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)