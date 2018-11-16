import {$wx, $Page} from '../../genji4mp/index'
import {http, urls} from '../../net/index'
import {justifyColor} from '../../utils/index'

const props = {
  loadingState: http.defaultLoadingState()
}

const data = {
  searchColorList: [],
  // 如果开始搜索了就要显示颜色列表或者无颜色提示
  isSearching: false
}

const privateMethod = {
  onReachBottom () {
    http.getPantoneList(urls.pantone.colorSearch, this.props.loadingState)
      .then((res) => {
        justifyColor(res)
        this.data.searchColorList.push(...res)
        this.setData({
          searchColorList: this.data.searchColorList
        })
      })
  },
}

const viewAction = {
  beginSearch: function (data, value) {
    if (typeof(value) === 'object') {
      value = ''
    }
    this.props.loadingState = http.defaultLoadingState()
    http.getPantoneList(urls.pantone.colorSearch, this.props.loadingState, {keyword: value})
      .then((res) => {
        justifyColor(res)
        this.setData({
          searchColorList: res,
          isSearching: true
        })
      })
  },
  searchColorClicked: function (data, value) {
    $wx.navigateTo($wx.router.colorDetail, this.data.searchColorList[data.index])
  }
}

$Page(props, data, null, privateMethod, viewAction)

