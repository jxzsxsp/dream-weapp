import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'
import utils from '../../utils/index'
import constant from '../../constant/index'

let data = {
  ColorCompareLabelType: constant.ColorCompareLabelType,
  colorDetail: {},
  // 左边的颜色
  sourceId: 0,
  // 右边的颜色
  targetId: 0,
  // 发起远程对色还是完成对色
  isCompare: true,
  showLab: true,
  showRgb: false,
  standardType: {},
  standardTypeList: [
    {
      type: 1,
      title: '国标GB/T250',
      description: '国标GB/T250',
    },
    {
      type: 2,
      title: 'CEMC',
      description: 'CMC色差评定',
    }
  ],
  showStandard: false,

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
      isCompare: this.data.isCompare,
      standardType: this.data.standardTypeList[0]
    })

    http.get(urls.pantone.compareColorDetail, param)
      .then(colorDetail => {
        if (!this.data.isCompare) {
          colorDetail.targetColor.lab = utils.fixLab(colorDetail.targetColor.lab)
        }
        colorDetail.sourceColor.lab = utils.fixLab(colorDetail.sourceColor.lab)
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

let viewAction = {
  showLabValue: function() {
    this.setData({
      showLab: true,
      showRgb: false,
    })
  },
  showRgbValue: function () {
    this.setData({
      showLab: false,
      showRgb: true,
    })
  },
  switchStandard: function() {
    this.setData({
      showStandard: true
    })
  },
  closeStandard: function () {
    this.setData({
      showStandard: false
    })
  },
  selectStandard: function(d) {
    console.log(d)
    this.setData({
      standardType: d.standard
    })
    this.closeStandard()
  }
}

$Page.register(null, data, lifecycle, privateMethod, viewAction)
