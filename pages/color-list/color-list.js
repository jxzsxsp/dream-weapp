import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'

let props = {
  categoryId: 0,
  loadingState: http.defaultLoadingState(24)
}

let data = {
  colorList: {}
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
  },
  onReachBottom () {
    this.searchColor(true)
  }
}

let viewAction = {
  onInput: function (data, value) {
    console.log(value)
    this.setKeyword(value)
    this.clearTimeoutSearch()
    this.setTimeoutSearch()
  },
  beginSearch: function (data, value) {
    this.setKeyword(value)
    this.searchColor(false)
  },

  colorClicked: function (data) {
    $wx.navigateTo($wx.router.colorDetail, {colorId: this.data.colorList[data.index].colorId})
  }
}

const privateMethod = {
  setTimeoutSearch: function () {
    this.props.timeout = setTimeout(() => {
      this.searchColor(false)
    }, 500)
  },
  clearTimeoutSearch: function () {
    if (this.props.timeout) {
      clearTimeout(this.props.timeout)
      this.props.timeout = null
    }
  },
  setKeyword: function (value) {
    if (typeof(value) === 'object') {
      value = ''
    } 
    this.props.keyword = value
  },
  /* 搜索颜色方法，addMore 表示搜索后面页面还是重新搜索第一页 */
  searchColor: function (addMore) {
    if (!this.props.keyword) {
      return
    }
    if (!addMore) {
      this.props.loadingState = http.defaultLoadingState()
    }
    http.getPantoneList(urls.pantone.colorSearch, this.props.loadingState, {keyword: this.props.keyword}).then((res) => {
        if (addMore) {
          this.data.colorList.push(...res)
        } else {
          this.data.colorList = res
        }
        this.setData({
          colorList: this.data.colorList,
          isSearching: true
        })
      }) 
  },
}

$Page.register(props, data, lifeCycle, privateMethod, viewAction)