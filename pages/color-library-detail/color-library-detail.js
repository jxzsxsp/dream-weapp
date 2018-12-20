import {$wx, $Page} from '../../genji4mp/index'
import {http, urls} from '../../net/index'

const FIXEDHEADER = 'fixed-header'

const libraryType =  {
  DEFAULT: false,
  CUSTOM: true,
}

const props = {
  loadingState: http.defaultLoadingState(),
  // 颜色库id
  libraryId: 0,
}

const data = {
  // 是否色库已被删除
  isDeleted: false,
  // 是否是从分享卡片而来
  isShared: false,
  // 是否是多选状态
  isMultiSelect: false,
  // 多选状态下是否可以操作
  canEdit: false,
  // 是否是自定义色库
  isCustom: libraryType.CUSTOM,
  // 颜色列表
  colorList: [],
  // 色库详情
  libraryDetail: {},
  // 全部数量
  totalCount: 0,
  // 顶部悬停选择标签是否显示
  hideBeginSelect: true,
}

const lifeCycle = {
  onLoad: function (query) {
    this.props.libraryId = query.id
    http.getList(urls.colorLibraryDetail, this.props.loadingState, {mock: true}).then(res => {
      $wx.setNavigationBarTitle({
        title: this.props.loadingState.others.library.name
      })
      this.setData({
        colorList: res,
        libraryDetail: this.props.loadingState.others.library,
        totalCount: this.props.loadingState.totalCount,
      })
    })
  },
  onPageScroll: function (e) {
    this.props.scrollTop = e.scrollTop
    // 选择颜色的时候直接返回
    if (this.data.isMultiSelect) {
      return
    }
    let query = wx.createSelectorQuery()
    query.select('#select').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(res => {
      console.log(res[0].top)
      if (res[0].top <= 0 && this.data.hideBeginSelect === true) {
        this.setData({
          hideBeginSelect: false
        })
      } else if (res[0].top > 0 && this.data.hideBeginSelect !== true) {
        this.setData({
          hideBeginSelect: true
        })
      }
    })
  }

}

const viewAction = {
  selectColor: function () {
    this.setData({
      isMultiSelect: !this.data.isMultiSelect
    })
  },
  cancelSelect: function () {
    this.setData({
      isMultiSelect: !this.data.isMultiSelect
    })
    // 必须手动滚动一像素，否则可能会有两个开始选择标题栏
    wx.pageScrollTo({scrollTop: this.props.scrollTop + 1})
  },
  test: function () {
    console.log('haha')
  }
}

const privateMethod = {

}

$Page.register(props, data, lifeCycle, privateMethod, viewAction)