import {$wx, $Page} from '../../genji4mp/index'
import {http, urls} from '../../net/index'
import utils from '../../utils/index'
import constant from '../../constant/index'

const libraryType =  {
  DEFAULT: 0,
  CUSTOM: 1,
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
  // 是否是从颜色库列表中进入
  fromLibrary: false,
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
    title: '移动到...',
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
    if (!!query.fromLibrary) {
      this.setData({
        fromLibrary: true
      })
    }
    this.props.libraryId = query.id
  },
  onShow: function () {
    if (!this.data.isMultiSelect) {
      this.getColorList(true)
    }
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
  onNavigateBack: function () {
    this.setData({
      isMultiSelect: false,
      selectedColorList: [],
      canEdit: false
    })
  }
}

const viewAction = {
  // 收藏颜色库
  saveLibrary: function () {
    const libraryColorIdList = this.data.colorList.map(item => {
      return item.id
    })
    $wx.navigateTo($wx.router.addLibrary, {type: constant.ColorLibraryActionType.SaveLibrary, libraryDetail: this.data.libraryDetail, libraryColorIdList})
  },
  // 点击选择后
  beginSelect: function () {
    this.setData({
      isMultiSelect: !this.data.isMultiSelect
    })
  },
  // 点击取消后
  cancelSelect: function () {
    this.resetSelectedColorList()
    this.setData({
      isMultiSelect: !this.data.isMultiSelect,
    })
    // 必须手动滚动一像素，否则可能会有两个开始选择标题栏
    wx.pageScrollTo({scrollTop: this.props.scrollTop + 1})
  },
  // 点击重置后
  resetSelect: function () {
    this.resetSelectedColorList()
  },
  // 点击 Cell 后
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
  // 多选的时候选中或者反选
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

    // this.setData({
      // colorList: this.data.colorList,
      // selectedColorList: this.data.selectedColorList,
    // })
  },
  // 展示颜色的具体操作
  showAction: function (d) {
    if (this.data.isMultiSelect) {
      return
    }
    this.setData({
      showAction: true,
      selectedColor: this.data.colorList[d.index]
    })
  },
  // 关闭颜色的具体操作
  closeAction: function () {
    this.setData({
      showAction: false,
    })
  },
  // 关闭删除确认
  closeDeleteConfirm: function () {
    this.setData({
      showDeleteConfirm: false
    })
  },
  // 执行颜色的具体操作
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
  // 编辑颜色库
  editLibrary: function () {
    $wx.navigateTo($wx.router.addLibrary, {type: constant.ColorLibraryActionType.EditLibrary, libraryDetail: this.data.libraryDetail})
  },
  // 点击添加多个颜色
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
  // 删除或者移动时需要移动总数量
  minusTotalCount: function (count) {
    this.props.loadingState.totalCount -= count
    this.setData({
      totalCount: this.props.loadingState.totalCount
    })
  },
  // 获取完整的标签
  getFullLabel: function (labelList) {
    if (!labelList || labelList.length === 0) {
      return ''
    }
    let labelString = labelList.reduce((prev, current) => {
      return prev + current.name + '·'
    }, '')
    return labelString.slice(0, labelString.length -1 )
  },
  // 获取类表
  getColorList: function (reset = false) {
    if (reset) {
      this.props.loadingState = http.defaultLoadingState()
    }
    http.getList(urls.colorLibraryDetail, this.props.loadingState, {
      libraryId: this.props.libraryId
      }).then(res => {
        if (!this.props.loadingState.others.library) {
          this.setData({
            isDeleted: true
          })
          return
        }
        $wx.setNavigationBarTitle({
          title: this.props.loadingState.others.library.name
        })
        const colorList = res.map((item) => {
          item.isSelected = false
          item.fullLabel = this.getFullLabel(item.labelList)
          return item
        })
        if (reset) {
          this.data.colorList = colorList
        } else {
          colorList.forEach(element => {
            this.data.colorList.push(element)
          });
        }
        this.setData({
          colorList: this.data.colorList,
          libraryDetail: this.props.loadingState.others.library,
          isCustom: this.props.loadingState.others.library.type,
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
    if (this.data.selectedColorList.length > 0) {
      this.data.canEdit = true
    } else {
      this.data.canEdit = false
    }
    this.setData({
      canEdit: this.data.canEdit,
      selectedColorList: this.data.selectedColorList
    })
  },
  // 选中的状态设为未选中，未选中的状态设为选中
  setColorList: function (selectedColor) {
    this.data.colorList.forEach(item => {
      if (item.id === selectedColor.id) {
        item.isSelected = !item.isSelected
      }
    })
    this.setData({
      colorList: this.data.colorList
    })
  },
  // 重置
  resetSelectedColorList: function () {
    this.data.colorList.forEach(item => {
      item.isSelected = false;
    })
    this.setData({
      selectedColorList: [],
      colorList: this.data.colorList,
      canEdit: false
    }) 
  },
  // 删除多个颜色或者单个颜色
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
      libraryColorIdList: deletedColorIds
      }).then(() => {
      this.data.colorList = utils.removeArrayInArray(this.data.colorList, deletedColorIds, 'id')
      this.resetSelectedColorList()
      this.minusTotalCount(deletedColorIds.length)
      if (this.data.colorList.length === 0) {
        this.setData({
          isMultiSelect: false
        })
      }
      this.setData({
        colorList: this.data.colorList,
      })
    })
  },
  // 移动单个颜色以及多个颜色调用
  _moveColor: function (colorList) {
    let movedColorIds = colorList.map(item => {
      return  item.id
    })
    this.data.colorList = utils.removeArrayInArray(this.data.colorList, movedColorIds, 'id')
    this.resetSelectedColorList()
    this.minusTotalCount(colorList.length)
    this.setData({
      colorList: this.data.colorList,
      isMultiSelect: false
    })
  }
}

$Page.register(props, data, lifeCycle, privateMethod, viewAction)