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

let privateMethod = {
  launchAppError (e) {
    $wx.showModal({title: '提示', content: '请先下载App', showCancel: false})
      .then(res => {
        console.log(e.detail.errMsg)
      })
  }
}

$Page(null, data, lifecycle, privateMethod, {})
