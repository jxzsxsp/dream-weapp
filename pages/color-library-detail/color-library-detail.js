import {$wx, $Page} from '../../genji4mp/index'
import {http, urls} from '../../net/index'
import utils from '../../utils/index'
import constant from '../../constant/index'

const libraryType =  {
  DEFAULT: false,
  CUSTOM: true,
}

const deleteType = {
  SINGLE: 0,
  MUTIPLE: 1
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
  // 是否展示 Action 弹出框
  showAction: false,
  // 是否显示删除确认
  showDeleteConfirm: false,
  // 颜色列表
  colorList: [],
  // 选中的颜色列表
  selectedColorList: [],
  // 选中的颜色
  selectedColor: {},
  // 色库详情
  libraryDetail: {},
  // 全部数量
  totalCount: 0,
  // 顶部悬停选择标签是否显示
  hideBeginSelect: true,
  // 操作列表
  actions: [{
    icon: 'icon-biaoqian',
    title: '标签',
    type: 'TAG'
  }, {
    icon: 'icon-yidong',
    title: '移动...',
    type: 'MOVE'
  }, {
    icon: 'icon-tianjia',
    title: '添加到...',
    type: 'ADD'
  }, {
    icon: 'icon-shanchu',
    title: '删除',
    type: 'DELETE'
  }]
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
  },
  onShareAppMessage: function () {
    const nickName = $wx.app.globalData.userInfo.nickName
    return {
      title: `分享${nickName}的色库《${this.data.libraryDetail.name}》给你！`,
      path: `/pages/color-library-detail/color-library-detail?id=${this.data.libraryDetail.id}`
    }
  },
  onNavigateBack: function (d) {
    const libraryDetail = d.libraryDetail
    this.setData({
      isMultiSelect: false,
    })
    switch (d.type) {
      case constant.ColorLibraryActionType.Tag:
        this.data.selectedColor.labelList = d.labelList
        this.getFullLabel([this.data.selectedColor])
        this.setData({
          colorList: this.data.colorList
        })
        break
      case constant.ColorLibraryActionType.EditLibrary:
        this.data.libraryDetail = d.libraryDetail
        this.setData({
          libraryDetail: this.data.libraryDetail
        })
        break
      case constant.ColorLibraryActionType.SaveLibrary:
        this._saveColor(libraryDetail, this.data.colorList)
        break
      case constant.ColorLibraryActionType.Add_Single:
        break
      case constant.ColorLibraryActionType.Add_Multiple:
        break
      case constant.ColorLibraryActionType.Move_Single:
        this._moveColor([this.data.selectedColor])
        break
      case constant.ColorLibraryActionType.Move_Multiple:
        this._moveColor(this.data.selectedColorList)
        break
      default:
        break;
    }
  }
}

const viewAction = {
  saveLibrary: function () {
    $wx.navigateTo($wx.router.addLibrary, {type: constant.ColorLibraryActionType.SaveLibrary, libraryDetail: this.data.libraryDetail})
  },
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
  selectCell: function (d) {
    if (this.data.isMultiSelect) {
      return
    }
    const selectedCell = this.data.colorList[d.index]
    if (selectedCell.originType === constant.ColorSource.pantone) {
      $wx.navigateTo($wx.router.colorDetail, {colorId: selectedCell.colorId})
    } else if (selectedCell.originType === constant.ColorSource.selfFetch) {
      $wx.navigateTo($wx.router.fetchColorDetail, {colorId: selectedCell.colorId, fromLibrary: true})
    }
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
  showAction: function (d) {
    if (this.data.isMultiSelect) {
      return
    }
    this.setData({
      showAction: true,
      selectedColor: this.data.colorList[d.index]
    })
  },
  closeAction: function () {
    this.setData({
      showAction: false,
    })
  },
  closeDeleteConfirm: function () {
    this.setData({
      showDeleteConfirm: false
    })
  },
  doAction: function (d) {
    this.closeAction()
    switch (d.type) {
      case 'TAG':
        $wx.navigateTo($wx.router.settingTag, {type: constant.ColorLibraryActionType.Tag, colorDetail: this.data.selectedColor})
        break
      case 'MOVE':
        $wx.navigateTo($wx.router.joinLibrary, {type: constant.ColorLibraryActionType.Move_Single, colorList: [this.data.selectedColor]})
        break
      case 'ADD':
        $wx.navigateTo($wx.router.joinLibrary, {type: constant.ColorLibraryActionType.Add_Single, colorList: [this.data.selectedColor]})
        break
      case 'DELETE':
        this.setData({
          showAction: false,
          showDeleteConfirm: true
        })
        break
      default:
        break
    }
  },
  editLibrary: function () {
    $wx.navigateTo($wx.router.addLibrary, {type: constant.ColorLibraryActionType.EditLibrary, libraryDetail: this.data.libraryDetail})
  },
  shareLibrary: function () {

  },
  addColors: function () {
    $wx.navigateTo($wx.router.joinLibrary, {type: constant.ColorLibraryActionType.Add_Multiple, colorList: this.data.selectedColorList})
  },
  moveColors: function () {
    $wx.navigateTo($wx.router.joinLibrary, {type: constant.ColorLibraryActionType.Move_Multiple, colorList: this.data.selectedColorList})
  },
  deleteColors: function() {
    this.setData({
      showDeleteConfirm: true
    })
  },
  confirmDelete: function () {
    this.setData({
      showDeleteConfirm: false
    })
    if (this.data.isMultiSelect) {
      this._deleteColors(deleteType.MUTIPLE)
    } else {
      this._deleteColors(deleteType.SINGLE)
    }
  }
}

const privateMethod = {
  // 获取完整的标签
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
    http.getList(urls.colorLibraryDetail, this.props.loadingState, {
      mock: true, 
      libraryId: this.props.libraryId
      }).then(res => {
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
  // 选中的移出数组，没选中的移到数组第一个
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
  // 选中的状态设为未选中，未选中的状态设为选中
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
  },
  _deleteColors: function (type) {
    let deletedColors = []
    if (deleteType.SINGLE === type) {
      deletedColors.push(this.data.selectedColor)
    } else if (deleteType.MUTIPLE === type) {
      deletedColors.push(...this.data.selectedColorList)
    }
    let deletedColorIds = deletedColors.map(item => {
      return  item.id
    })
    http.post(urls.deleteColor, {
      mock: true, 
      libraryColorIdList: deletedColorIds
      }).then(() => {
      this.data.colorList = utils.removeArrayInArray(this.data.colorList, deletedColorIds, 'id')
      this.data.selectedColorList = utils.removeArrayInArray(this.data.selectedColorList, deletedColorIds, 'id')
      this.setCanEdit()
      this.setData({
        colorList: this.data.colorList,
        selectedColorList: this.data.selectedColorList,
        canEdit: this.data.canEdit
      })
    })
  },
  _saveColor: function (libraryDetail, colorList) {
    const libraryColorIdList = colorList.map(item => {
      return item.id
    })
    http.post(urls.addColor, {libraryId: libraryDetail.id, libraryColorIdList})
      .then(() => {
        $wx.showToast({title: '已添加到'+library.name})
      })
  },
  _moveColor: function (colorList) {
    let movedColorIds = colorList.map(item => {
      return  item.id
    })
    this.data.colorList = utils.removeArrayInArray(this.data.colorList, movedColorIds, 'id')
    this.data.selectedColorList = utils.removeArrayInArray(this.data.selectedColorList, movedColorIds, 'id')
    this.setCanEdit()
    this.setData({
      selectedColorList: this.data.selectedColorList,
      colorList: this.data.colorList,
      canEdit: this.data.canEdit
    })
  }
}

$Page.register(props, data, lifeCycle, privateMethod, viewAction)