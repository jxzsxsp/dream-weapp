import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
}

const data = {
  id: 0,
  bizId: 0,
  bizType: 0,
  notice: {}
}

const lifecycle = {
  onLoad: function (query) {
    this.setData({
      bizType: query.bizType,
      bizId: query.bizId,
      id: query.id,
    })
  },
  onShow: function () {
    this.getNoticeDetail()
  }
}

const privateMethods = {
  getNoticeDetail: function () {
    http.get(urls.messageDetail, {
      // mock: true,
      bizType: this.data.bizType,
      bizId: this.data.bizId,
      id: this.data.id,
    }).then(res => {
      this.setData({
        notice: res,
        tradeStatus: res.tradeStatus,
      })
    })
  },
}

const viewAction = {
  callPhone: function() {
    $wx.makePhoneCall({
      phoneNumber: this.data.notice.shopMobile,
    })
  },
  confirmReceived: function () {
    http.get(urls.confirmReceived, {
      // mock: true,
      tradeId: this.data.notice.tradeId,
    }).then(res => {
      this.setData({
        tradeStatus: 50
      })
    })
  },
  gotoItemDetail: function() {
    $wx.navigateTo($wx.router.itemDetail, {
      itemId: this.data.notice.itemId,
    })
  }
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)