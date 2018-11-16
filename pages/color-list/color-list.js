import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'

let props = {
  categoryId: 0,
  loadingState: http.defaultLoadingState()
}

let data = {
  colorList: {}
}

let privateMethod = {
  onReachBottom () {
    http.getPantoneList(urls.pantone.colorSearch, this.props.loadingState)
      .then(colorList => {
        this.data.colorList.push(...colorList)
        this.setData({
          colorList: this.data.colorList
        })
      })
  }
}

let lifeCycle = {
  onLoad: function (colorDetail) {
    this.props.categoryId = colorDetail.id
    $wx.setNavigationBarTitle({
      title: colorDetail.name
    })
    http.getPantoneList(urls.pantone.colorSearch, this.props.loadingState, {categoryId: this.props.categoryId})
      .then(colorList => {
        this.setData({
          colorList
        })
      }) 
  }
}

let viewAction = {
  beginSearch: function (data, value) {
    if (typeof(value) === 'object') {
      value = ''
    }
    this.props.loadingState = http.defaultLoadingState()
    http.getPantoneList(urls.pantone.colorSearch, this.props.loadingState, {keyword: value, categoryId: this.props.categoryId})
      .then((colorList) => {
        this.setData({
          colorList
        })
      })
  },

  colorClicked: function (data) {
    $wx.navigateTo($wx.router.colorDetail, {...this.data.colorList[data.index]})
  }
}

$Page(props, data, lifeCycle, privateMethod, viewAction)