import {$wx, $Page} from '../../genji4mp/index'

let data = {
  url: ''
}

let lifecycle = {
  onLoad: function(query) {
    if (!query.title || !query.url) {
      throw new Error('webView 需要包含 title 以及 url') 
    }
    $wx.setNavigationBarTitle({
      title: query.title
    })
    this.setData({
      url: decodeURIComponent(query.url)
    })
  }
}

$Page(null, data, lifecycle, null, {})