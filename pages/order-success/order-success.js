import {$Page, $wx} from '../../genji4mp/index'
import wxhelper from '../../genji4mp/wxhelper';

const props={
  orderId: ''
}

const lifecycle = {
  onLoad: function(query) {
    this.props.orderId = query.orderId
  }
}

const viewAction = {
  checkOrderClicked: function () {
    $wx.switchTabTo($wx.router.orderList, $wx.router.orderDetail, {orderNo: this.props.orderId})
  },
  goHomeClicked: function () {
    $wx.switchTab($wx.router.home)
  }
}

$Page.register(props, null, lifecycle, null, viewAction)