import {$wx, $Page} from '../../genji4mp/index'
import {http, urls} from '../../net/index'
import utils from '../../utils/index'

const props = {
  loadingState: http.defaultLoadingState(),
  timeout: null,
  keyword: '',
}

const data = {
  searchColorList: [],
  // 如果开始搜索了就要显示颜色列表或者无颜色提示
  isSearching: false
}

const lifeCycle = {
  onReachBottom () {
    this.searchColor(true)
  },
}

const viewAction = {
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
  searchColorClicked: function (data, value) {
    $wx.navigateTo($wx.router.colorDetail, this.data.searchColorList[data.index])
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
        utils.justifyColor(res)
        if (addMore) {
          this.data.searchColorList.push(...res)
        } else {
          this.data.searchColorList = res
        }
        this.setData({
          searchColorList: this.data.searchColorList,
          isSearching: true
        })
      }) 
  },
}

$Page.register(props, data, lifeCycle, privateMethod, viewAction)

