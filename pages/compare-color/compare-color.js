import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'

let data = {
  remoteColorDetail: {}
}

let lifecycle = {
  onLoad: function (query) {
    $wx.setNavigationBarTitle({title: '远程对色'})
    http.get(urls.pantone.compareColorDetail, {colorComparisonSourceId: query.id, mock: true})
      .then(remoteColorDetail => {
        this.setData({
          remoteColorDetail
        })
      })
  },
}

$Page(null, data, lifecycle, null, {})
