import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'

let props = {
  loadingState: http.defaultLoadingState(),
  colorId: 0
}

let data = {
  colorDetail: {},
  relativeColorList: [],
}

let lifeCycle = {
  onLoad: function (query) {
    this.props.colorId = query.colorId
    http.get(urls.pantone.fetchColorDetail, {colorId: query.colorId})
      .then(colorDetail => {
        this.setData({
          colorDetail,
        })
        return colorDetail.lab
      }).then(lab => {
        return http.getPantoneList(urls.pantone.colorSearch, this.props.loadingState, {labs: lab})
      }).then(relativeColorList => {
        this.setData({
          relativeColorList
        })
      })
  }
}

let privateMethod = {
  onReachBottom () {
    http.getList(urls.pantone.colorSearch, this.props.loadingState)
      .then(colorList => {
        this.data.relativeColorList.push(...colorList)
        this.setData({
          relativeColorList: this.data.relativeColorList
        })
      })
  },
  launchAppError (e) {
    $wx.showModal({title: '提示', content: '请先下载App', showCancel: false}).then(res => {
      console.log(e.detail.errMsg)
    })
  }
}

let viewAction = {
  relativeColorClicked: function (data) {
    $wx.navigateTo($wx.router.colorDetail, {...this.data.relativeColorList[data.index]})
  },
  openApp: function () {

  }
}

$Page(props, data, lifeCycle, privateMethod, viewAction)