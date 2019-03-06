import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
}

const data = {
  itemId: 0,
  isFavorite: false,
  itemDetail: {}
}

const lifecycle = {
  onLoad: function (query) {
    let itemId = 0
    if (!!query.itemId) {
      itemId = query.itemId
    } else if (!!query.scene) {
      itemId = decodeURIComponent(query.scene)
    }

    this.setData({
      itemId: itemId
    })
  },
  onShow: function() {
    this.getItemDetail().then(res => {
      this.setData({
        itemDetail: res,
        isFavorite: res.isFavorite,
      }, function() {
        this.addItemBrowseRecord()
      })
    })
  },
  onShareAppMessage: function () {
    return {
      title: this.data.itemDetail.title,
      path: `/pages/item-detail/item-detail?itemId=${this.data.itemId}`,
    }
  },
}

const privateMethods = {
  getItemDetail: function () {
    return http.get(urls.itemDetail, {
      // mock: true,
      itemId: this.data.itemId
    })
  },
  addItemBrowseRecord: function () {
    return http.get(urls.addItemBrowseRecord, {
      // mock: true,
      itemId: this.data.itemId
    })
  },
  addItemFavorite: function () {
    http.post(urls.addItemFavorite, {
      // mock: true,
      itemId: this.data.itemId,
    })
  },
  cancelItemFavorite: function () {
    http.post(urls.cancelItemFavorite, {
      // mock: true,
      itemId: this.data.itemId
    })
  },
}

const viewAction = {
  favoriteItem: function () {
    this.setData({
      isFavorite: !this.data.isFavorite
    }, function() {
      if (this.data.isFavorite) {
        this.addItemFavorite()
      } else {
        this.cancelItemFavorite()
      }
    })
  },
  gotoShopInfo: function(d) {
    $wx.navigateTo($wx.router.shopInfo, {shopId: d.shop_id})
  },
  gotoShopHome: function (d) {
    $wx.navigateTo($wx.router.shop, { shopId: d.shop_id })
  },
  gotoShopItem: function (d) {
    $wx.navigateTo($wx.router.shop, { shopId: d.shop_id, menuType: 'item' })
  },
  callPhone: function (d) {
    $wx.makePhoneCall({
      phoneNumber: d.mobile,
    })
  },
  buySubmit: function(d) {
    $wx.navigateTo($wx.router.tradeCreate, {
      type: d.type,
      itemId: this.data.itemId,
    })
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)