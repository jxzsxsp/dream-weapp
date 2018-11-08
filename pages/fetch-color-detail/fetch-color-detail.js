import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'

let props = {
  loadingState: http.defaultLoadingState()
}

let data = {
  colorDetail: {},
  relativeColorList: [],
}

let lifeCycle = {
  onLoad: function (query) {
    $wx.setNavigationBarTitle({
      title: '取色'
    })
    http.get(urls.pantone.fetchColorDetail, {colorId: query.colorId, mock: true})
      .then(colorDetail => {
        this.setData({
          colorDetail,
        })
        return colorDetail.lab
      }).then(lab => {
        return http.getList(urls.pantone.colorSearch, this.props.loadingState, {labs: lab, mock: true})
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
        this.data.colorList.push(...colorList)
        this.setData({
          colorList: this.data.colorList
        })
      })
  }
}

let viewAction = {
  relativeColorClicked: function(data) {
    $wx.navigateTo($wx.router.colorDetail, {...this.data.relativeColorList[data.index]})
  }
}

$Page(props, data, lifeCycle, privateMethod, viewAction)