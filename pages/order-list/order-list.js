import { $Page, $wx } from '../../genji4mp/index'
import { http, urls } from '../../net/index';
import constants from '../../constants/index';
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';

const props = {
  loadStatus: http.defaultLoadingState()
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
  list: [],
  payData: {},
  showPay: false,
}

const lifecycle = {
  onLoad: function (query) {
    this.getDataList();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.props.loadStatus = http.defaultLoadingState();
    this.setData({ list: [] });
    this.getDataList();
    $wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getDataList();
  },
}

const viewAction = {
  /**
   * 切换Tab页
   */
  onTabChange: function (d, v) {
    this.props.loadStatus = http.defaultLoadingState();
    let tabStatus = this.data.tabStatus;
    this.setData({ list: [], status: tabStatus[v.index] });
    this.getDataList();
  },
  /**
   * 查看详情
   */
  gotoDetail: function (d, v) {
    console.log(d, v);
    $wx.navigateTo($wx.router.orderDetail, { orderNo: v.orderNo })
  },
  showCancelDialog: function (d, v) {
    Dialog.confirm({
      message: '是否确认取消该验布单？'
    }).then(() => {
      console.log('confirm');
      this.cancelOrder(d, v);
    }).catch(() => {
      console.log('cancel');
    });
  },
  /**
   * 查看报告
   */
  viewReport: function (d, v) {
    console.log(d, v);
    $wx.navigateTo($wx.router.viewReport, { orderNo: v.orderNo });
  },
  /**
   * 去付款
   */
  goPay: function (d, v) {
    console.log(d, v);
    http.post(urls.detailForPay, { orderNo: v.orderNo }).then(res => {
      console.log(res)
      this.setData({ payData: res });
    });
    this.setData({showPay: true, payOrderNo: v.orderNo})
  },

  confirmPay: function () {
    $wx.navigateTo($wx.router.payPlatform, { orderNo: this.data.payOrderNo, 
      fee: this.data.payData.priceDescription })
  },

  toggleShowPay: function () {
    this.setData({ showPay: !this.data.showPay })
  },

}

const privateMethod = {
  /**
   * 获取列表数据
   */
  getDataList: function () {
    http.postList(urls.orderList, this.props.loadStatus, { status: this.data.status }).then(res => {
      console.log(res)
      let list = this.data.list.concat(res);
      this.setData({
        list: list
      })
    });
  },
  /**
   * 取消验布
   */
  cancelOrder: function (d, v) {
    console.log(d, v);

    http.post(urls.cancelOrder, { orderNo: v.orderNo }).then(res => {
      console.log(res);
      this.props.loadStatus = http.defaultLoadingState();
      this.setData({ list: [] });
      this.getDataList();
      $wx.showToast({
        title: '取消成功',
      });
    });
  },
}


$Page.register(props, data, lifecycle, privateMethod, viewAction)