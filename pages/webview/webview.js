import { $Page, $wx } from '../../genji4mp/index';

const data = {
  url: null
}

const lifecycle = {
  onLoad: function (query) {
    if (!!query.title) {
      $wx.setNavigationBarTitle({
        title: query.title
      })
    }
    let url = decodeURIComponent(query.url)
    this.setData({
      url
    })
  },
}

$Page.register(null, data, lifecycle)