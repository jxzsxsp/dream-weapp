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
    this.getDataList();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({ list: [] });
    this.getDataList();
    wx.stopPullDownRefresh();
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
  /**
   * 取消验布
   */
  cancelOrder: function (d, v) {
    console.log(d, v);
  },
  /**
   * 查看报告
   */
  viewReport: function (d, v) {
    console.log(d, v);
  },
  /**
   * 去付款
   */
  goPay: function (d, v) {
    console.log(d, v);
  },

}

const privateMethod = {
  /**
   * 获取列表数据
   */
  getDataList: function () {
    http.getList(urls.orderList, this.props.loadStatus, { mock: true, status: this.data.status }).then(res => {
      console.log(res)
      let list = this.data.list.concat(res);
      this.setData({
        list: list
      })
    });
  },
}


$Page(props, data, lifecycle, privateMethod, viewAction)