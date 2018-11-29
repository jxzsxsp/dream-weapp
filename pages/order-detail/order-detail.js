import { $Page, $wx } from '../../genji4mp/index'
import { http, urls } from '../../net/index';
import { constants } from '../../constants/constants';

const props = {
  loadStatus: http.defaultLoadingState(constants.DEFAULT_PAGE_SIZE)
}

const data = {
  tabStatus: [
    constants.ORDER_STATUS.ALL_ORDER,
    constants.ORDER_STATUS.INBOUNDED,
    constants.ORDER_STATUS.CHECKING_CLOTH,
    constants.ORDER_STATUS.WAIT_PAY,
    constants.ORDER_STATUS.OUTBOUNDED,
  ],
  status: constants.ORDER_STATUS.ALL_ORDER,
  list: []
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
  },
  /**
   * 查看报告
   */
  viewReport: function (d, v) {
    console.log(d, v, this.data.orderNo);
  },
  /**
   * 去付款
   */
  goPay: function (d, v) {
    console.log(d, v, this.data.orderNo);
  },
  /**
   * 去付款
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
    http.get(urls.orderDetail, { mock: true, orderNo: this.data.orderNo }).then(res => {
      console.log(res)
      this.setData(res)
    });
  },

  copy(e) {
    wx.setClipboardData({
      data: this.data.orderNo
    })
  }

}


$Page(props, data, lifecycle, privateMethod, viewAction)