import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
}

const data = {
  favorited: true,
  itemDetail: {}
}

const lifecycle = {
  onLoad: function (query) {
    this.setData({
      id: query.id
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
      id: this.data.id
    })
  },
}

const viewAction = {
  favoriteItem: function (d) {
    console.log(d)
    this.setData({
      favorited: !this.data.favorited
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