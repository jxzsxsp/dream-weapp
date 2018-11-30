import { $Page, $wx } from '../../genji4mp/index'
import { http, urls, checkParam } from '../../net/index'

const props = {
  
}

const data = {
  items: [],
  order: {}
}

const lifecycle = {
  onLoad: function (query) {
    http.get(urls.homeInfo, { mock: true }).then(res => {
      console.log(res)
      this.setData({
        items: res.items,
        order: res.order
      })
    })
  }
}

const viewAction = {
  // 去验布
  goPlaceOrder: function (d) {
    $wx.navigateTo($wx.router.placeOrder, { id: d.id })
  },

}


$Page.register(props, data, lifecycle, null, viewAction)