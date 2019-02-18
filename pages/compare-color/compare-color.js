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
    },
    {
      type: 2,
      title: 'CMC色差评定',
    }
  ],
  showStandard: false,
  showGbtStandardInfo: false,
  showCmcStandardInfo: false,
  resultDetail: {},

}

let lifecycle = {
  onLoad: function (query) {
    $wx.setNavigationBarTitle({title: '远程对色'})
    
    if (!!query.remoteId) {
      this.data.isCompare = false
      this.data.targetId = parseInt(query.remoteId)
    }
    this.setData({
      sourceId: parseInt(query.localId),
      targetId: this.data.targetId,
      isCompare: this.data.isCompare,
      standardType: this.data.standardTypeList[0]
    })
  },
  onShow: function() {
    this.getColorDetail()
  },
  onShareAppMessage: function () {
    return {
      title: '远程对色',
      path: `/pages/compare-color/compare-color?localId=${this.data.sourceId}&remoteId=${this.data.targetId}`
    }
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
  },
  showStandardInfo: function() {
    if(this.data.standardType.type === 1) {
      this.setData({
        showGbtStandardInfo: true
      })
    } else if (this.data.standardType.type === 2) {
      this.setData({
        showCmcStandardInfo: true
      })
    }
  },
  closeStandardInfo: function () {
    this.setData({
      showGbtStandardInfo: false,
      showCmcStandardInfo: false
    })
  },
  getColorDetail: function () {
    http.get(urls.pantone.compareColorDetail, {
      // mock: true,
      colorComparisonSourceId: this.data.sourceId,
      colorComparisonTargetId: this.data.targetId,
    }).then(colorDetail => {
      if (!this.data.isCompare) {
        colorDetail.targetColor.labArr = utils.fixLab(colorDetail.targetColor.lab)
        colorDetail.targetColor.rgbArr = utils.fixRgb(colorDetail.targetColor.rgb)
      }
      colorDetail.sourceColor.labArr = utils.fixLab(colorDetail.sourceColor.lab)
      colorDetail.sourceColor.rgbArr = utils.fixRgb(colorDetail.sourceColor.rgb)
      this.setData({
        colorDetail
      })

      this.getResultDetail()
    })
  },
  getResultDetail: function() {
    if(this.data.isCompare) {
      return
    }

    http.get(urls.pantone.fetchResultV2, {
      // mock: true,
      sourceId: this.data.colorDetail.sourceColor.colorId,
      sourceOriginType: this.data.colorDetail.sourceColor.originType,
      targetId: this.data.colorDetail.targetColor.colorId,
      targetOriginType: this.data.colorDetail.targetColor.originType,
    }).then(resultDetail => {
        this.setData({
          resultDetail
        })
      })
  },
}

$Page.register(null, data, lifecycle, privateMethod, viewAction)
