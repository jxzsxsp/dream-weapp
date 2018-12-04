import { $Page, $wx } from '../../genji4mp/index'
import { http, urls } from '../../net/index';
import constants from '../../constants/index';

const props = {
}

const data = {
  payData: {},
  showPay: false,
}

const lifecycle = {
  onLoad: function (query) {
    this.setData({orderNo: query.orderNo});
    this.getDetail();
  },
}

const viewAction = {
  /**
   * 取消验布
   */
  cancelOrder: function (d, v) {
    console.log(d, v, this.data.orderNo);
    http.get(urls.cancelOrder, { mock: true, orderNo: this.data.orderNo }).then(res => {
      console.log(res)
      $wx.showToast({
        title: '取消成功',
      })
    });
  },
  /**
   * 查看报告
   */
  viewReport: function (d, v) {
    console.log(d, v, this.data.orderNo);
    $wx.navigateTo($wx.router.viewReport, { orderNo: this.data.orderNo });
  },
  /**
   * 去付款
   */
  goPay: function (d, v) {
    console.log(d, v, this.data.orderNo);
    http.get(urls.detailForPay, { mock: true, orderNo: this.data.orderNo }).then(res => {
      console.log(res)
      this.setData({ payData: res });
    });
    this.setData({ showPay: true });
  },

  toggleShowPay: function () {
    this.setData({ showPay: !this.data.showPay })
  },

  confirmPay: function () {
    $wx.navigateTo($wx.router.payPlatform, { orderNo: this.data.orderNo })
  },
  /**
   * 确认收货
   */
  confirmReceive: function (d, v) {
    console.log(d, v, this.data.orderNo);
  },

}

const privateMethod = {
  /**
   * 获取订单详情
   */
  getDetail: function () {
    http.get(urls.orderDetail, {orderNo: this.data.orderNo }).then(res => {
      console.log(res)
      this.setData(res)
    });
  },

  copy(e) {
    $wx.setClipboardData({
      data: this.data.orderNo
    })
  }

}


$Page.register(props, data, lifecycle, privateMethod, viewAction)