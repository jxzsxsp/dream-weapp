import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'
import {fixLab} from '../../utils/index'

let data = {
  colorDetail: {},
  // 左边的颜色
  sourceId: 0,
  // 右边的颜色
  targetId: 0,
  // 发起远程对色还是完成对色
  isCompare: true

}

let lifecycle = {
  onLoad: function (query) {
    $wx.setNavigationBarTitle({title: '远程对色'})
    
    let param = {colorComparisonSourceId: parseInt(query.localId)}
    // 完成对色的分享
    if (!!query.remoteId) {
      this.data.isCompare = false
      this.data.targetId = parseInt(query.remoteId)
      param.colorComparisonTargetId = parseInt(query.remoteId)
    }
    this.setData({
      sourceId: parseInt(query.localId),
      targetId: this.data.targetId,
      isCompare: this.data.isCompare
    })

    http.get(urls.pantone.compareColorDetail, param)
      .then(colorDetail => {
        if (!this.data.isCompare) {
          colorDetail.targetColor.lab = fixLab(colorDetail.targetColor.lab)
        }
        colorDetail.sourceColor.lab = fixLab(colorDetail.sourceColor.lab)
        this.setData({
          colorDetail
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
