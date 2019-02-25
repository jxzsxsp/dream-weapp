import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
}

const data = {
  id: 0,
  notice: {}
}

const lifecycle = {
  onLoad: function (query) {
    this.setData({
      bizType: query.bizType,
      bizId: query.bizId
    })
  },
  onShow: function () {
    this.getNoticeDetail()
  }
}

const privateMethods = {
  getNoticeDetail: function () {
    http.get(urls.messageDetail, {
      mock: true,
      bizType: this.data.bizType,
      bizId: this.data.bizId
    }).then(res => {
      this.setData({
        notice: res
      })
    })
  },
}

const viewAction = {
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)