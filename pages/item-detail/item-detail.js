import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
}

const data = {
  itemDetail: {}
}

const lifecycle = {
  onLoad: function (query) {
    this.setData({
      id: query.id
    })
  },
  onShow: function() {
    this.getItemDetail().then(res => {
      this.setData({
        itemDetail: res
      })
    })
  }
}

const privateMethods = {
  getItemDetail: function () {
    return http.get(urls.itemDetail, {
      mock: true,
      id: this.data.id
    })
  },
}

const viewAction = {
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)