import { $Page, $wx } from '../../genji4mp/index'
import { http, urls, checkParam } from '../../net/index'

const props = {
  
}

const data = {
  items: [],
  order: {},
  active: false,
}

const lifecycle = {
  onShow: function (query) {
    this.homeInit();
  },

  onPullDownRefresh: function () {
    this.homeInit();
    $wx.stopPullDownRefresh();
  },
}

const viewAction = {
  // 去验布
  goPlaceOrder: function (d) {
    if(this.data.active) {
      return false;
    }
    this.setData({ active: true });
    $wx.app.bindPhone().then(res => {
      console.log(res)
      this.setData({ active: false });
      $wx.navigateTo($wx.router.placeOrder, { id: d.id })
    })
  },
  /**
   * 查看详情
   */
  gotoDetail: function (d, v) {
    console.log(d, v, this.data);
    $wx.navigateTo($wx.router.orderDetail, { orderNo: this.data.order.orderNo })
  },

}

const privateMethod = {
  homeInit: function() {
    http.post(urls.homeInfo).then(res => {
      console.log(res)
      this.setData({
        items: res.items,
        order: res.order
      })
    })
  }
}


$Page.register(props, data, lifecycle, privateMethod, viewAction)