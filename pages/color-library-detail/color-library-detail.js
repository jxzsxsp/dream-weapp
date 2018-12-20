import {$wx, $Page} from '../../genji4mp/index'
import {http, urls} from '../../net/index'

const libraryType =  {
  DEFAULT: false,
  CUSTOM: true,
}

const props = {
  loadingState: http.defaultLoadingState(),
  // 颜色库id
  libraryId: 0,
  // 当前滚动量
  scrollTop: 0,
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
  // 选中的颜色列表
  selectedColorList: [],
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
    this.getColorList()
  },
  onPageScroll: function (e) {
    this.props.scrollTop = e.scrollTop
    // 选择颜色的时候直接返回
    if (this.data.isMultiSelect) {
      return
    }
    this.showHeader()
  },
  onReachBottom: function () {
    this.getColorList()
  }
}

const viewAction = {
  beginSelect: function () {
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
  resetSelect: function () {
    this.data.colorList.forEach(item => {
      item.isSelected = false;
    })
    this.setData({
      selectedColorList: [],
      colorList: this.data.colorList,
      canEdit: false
    })
  },
  selectColor: function (d) {
    if (!this.data.isMultiSelect) {
      return
    }
    let selectedColor = {}
    if (d.type === 'select') {
      selectedColor = this.data.colorList[d.index]
    } else if (d.type === 'unselect') {
      selectedColor = this.data.selectedColorList[d.index]
    }
    this.setSelectedColorList(selectedColor)
    this.setColorList(selectedColor)
    this.setCanEdit()

    this.setData({
      colorList: this.data.colorList,
      selectedColorList: this.data.selectedColorList,
      canEdit: this.data.canEdit
    })
  },
  doMore: function (d) {
    if (this.data.isMultiSelect) {
      return
    }
  },
  editLibrary: function () {

  },
  shareLibrary: function () {

  },
}

const privateMethod = {
  // 获取完整的 label
  getFullLabel: function (labelList) {
    if (!labelList || labelList.length === 0) {
      return ''
    }
    switch (labelList.length) {
      case 1:
        return labelList[0].name
      case 2:
        return labelList[0].name + '·' + labelList[1].name
      default:
        return labelList[0].name + '·' + labelList[1].name + '·' + labelList[2].name
    }
  },
  // 获取类表
  getColorList: function () {
    http.getList(urls.colorLibraryDetail, this.props.loadingState, {mock: true}).then(res => {
      $wx.setNavigationBarTitle({
        title: this.props.loadingState.others.library.name
      })
      const colorList = res.map((item) => {
        item.isSelected = false
        item.fullLabel = this.getFullLabel(item.labelList)
        return item
      })
      colorList.forEach(element => {
        this.data.colorList.push(element)
      });
      this.setData({
        colorList: this.data.colorList,
        libraryDetail: this.props.loadingState.others.library,
        totalCount: this.props.loadingState.totalCount,
      }) 
    })
  },
  // 控制是否显示悬浮头部
  showHeader: function () {
    let query = wx.createSelectorQuery()
    query.select('#select').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(res => {
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
  },
  // 重置选中的颜色
  setSelectedColorList: function (selectedColor) {
    if (selectedColor.isSelected) {
      let colorIndex = -1
      this.data.selectedColorList.forEach((value, index) => {
        if (value.id === selectedColor.id) {
          colorIndex = index
        }
      })
      if (colorIndex > -1) { 
        this.data.selectedColorList.splice(colorIndex, 1); 
      } 
    } else {
      this.data.selectedColorList.unshift(selectedColor)
    }
  },
  // 重置所有颜色的选中
  setColorList: function (selectedColor) {
    this.data.colorList.forEach(item => {
      if (item.id === selectedColor.id) {
        item.isSelected = !item.isSelected
      }
    })
  },
  setCanEdit: function () {
    if (this.data.selectedColorList.length > 0) {
      this.data.canEdit = true
    } else {
      this.data.canEdit = false
    }
  }
}

$Page.register(props, data, lifeCycle, privateMethod, viewAction)