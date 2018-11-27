import {$Page, $wx} from '../../genji4mp/index'

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
    //TODO: 跳转到详情
  },
  goHomeClicked: function () {
    $wx.redirectTo()
  }
}

$Page(props, null, lifecycle)