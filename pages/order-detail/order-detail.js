import { $Page, $wx } from '../../genji4mp/index'
import { http, urls } from '../../net/index';
import constants from '../../constants/index';
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';

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
  showCancelDialog: function () {
    Dialog.confirm({
      message: '是否确认取消该验布单？'
    }).then(() => {
      console.log('confirm');
      this.cancelOrder();
    }).catch(() => {
      console.log('cancel');
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
    http.post(urls.detailForPay, { orderNo: this.data.orderNo }).then(res => {
      console.log(res)
      this.setData({ payData: res, showPay: true });
    });
  },

  toggleShowPay: function () {
    this.setData({ showPay: !this.data.showPay })
  },

  confirmPay: function () {
    $wx.navigateTo($wx.router.payPlatform, { orderNo: this.data.orderNo, 
    fee: this.data.payData.priceDescription })
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
    http.post(urls.orderDetail, { orderNo: this.data.orderNo }).then(res => {
      console.log(res)
      this.setData(res)
    });
  },

  /**
   * 取消验布
   */
  cancelOrder: function () {
    console.log('cancelOrder');
    http.post(urls.cancelOrder, { orderNo: this.data.orderNo }).then(res => {
      console.log(res);
      this.getDetail();
      $wx.showToast({
        title: '取消成功',
      });
    });
  },

  copy(e) {
    $wx.setClipboardData({
      data: this.data.orderNo
    })
  }

}


$Page.register(props, data, lifecycle, privateMethod, viewAction)