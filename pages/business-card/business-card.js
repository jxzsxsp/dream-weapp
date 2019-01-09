import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
}

const data = {
}

const lifecycle = {
  onLoad: function (query) {
    console.log(query)

    if (query.shopId && query.shopId > 0) {
      $wx.setNavigationBarTitle({
        title: '店铺名片',
      })
    }

    if (query.userId && query.userId > 0) {
      $wx.setNavigationBarTitle({
        title: '个人名片',
      })
    }

  },
}

const privateMethods = {
}

const viewAction = {
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)