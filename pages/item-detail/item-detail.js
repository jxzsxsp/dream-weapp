import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
}

const data = {
  itemId: 0,
  favorited: true,
  itemDetail: {}
}

const lifecycle = {
  onLoad: function (query) {
    this.setData({
      itemId: query.itemId
    })
  },
  onShow: function() {
    this.getItemDetail().then(res => {
      this.setData({
        itemDetail: res
      })
    })
  }
}

const privateMethods = {
  getItemDetail: function () {
    return http.get(urls.itemDetail, {
      mock: true,
      id: this.data.itemId
    })
  },
  addItemFavorite: function () {
    http.get(urls.addItemFavorite, {
      mock: true,
      itemId: this.data.itemId,
    })
  },
  cancelItemFavorite: function () {
    http.get(urls.cancelItemFavorite, {
      mock: true,
      itemId: this.data.itemId
    })
  },
}

const viewAction = {
  favoriteItem: function (d) {
    this.setData({
      favorited: !this.data.favorited
    }, function() {
      if(this.data.favorited) {
        this.addItemFavorite()
      } else {
        this.cancelItemFavorite()
      }
    })
  },
  gotoShop: function(d) {
    $wx.navigateTo($wx.router.shopInfo, {shopId: d.shop_id})
  },
  callPhone: function (d) {
    $wx.makePhoneCall({
      phoneNumber: d.mobile,
    })
  },
  buySeka: function(d) {
    $wx.navigateTo($wx.router.shopInfo)
  },
  buyMiyang: function (d) {
    $wx.navigateTo($wx.router.shopInfo)
  }
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)