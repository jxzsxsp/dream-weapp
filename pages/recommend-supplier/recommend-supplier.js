import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
}

const data = {
  shopList: [
    {
      shopName: '胖虎布行1',
      follow: true,
    },
    {
      shopName: '胖虎布行2',
      follow: false,
    },
    {
      shopName: '胖虎布行3',
      follow: true,
    }
  ]
}

const lifecycle = {
  onLoad: function (query) {
    console.log(query)

  },
}

const privateMethods = {
}

const viewAction = {
  followShop: function (d, v) {
    console.log(d, v)
  },

  cancelFollow: function (d, v) {
    console.log(d, v)
  },

  showDetail: function (d, v) {
    console.log(d, v)
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)