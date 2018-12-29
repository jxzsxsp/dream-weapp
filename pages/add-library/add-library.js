import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constant from '../../constant/index'
import utils from '../../utils/index'

const props = {
  // 编辑颜色库的类型
  type: null,
  // 要添加到新建颜色库中的颜色id列表
  libraryColorIdList: [],
  // 要添加到新建颜色库中的颜色列表
  colorList: [],
  // 原始的颜色库的 id，用于添加和移动颜色
  originLibraryId: -1,
  // 当前颜色操作的颜色库
  libraryId: -1,
}

const data = {
  canSave: false,
  name: '',
  desc: '',
}

const lifecycle = {
  onLoad: function (query) {
    if (!utils.isEmptyObject(query)) {
      this.props.type = query.type
      this.props.colorList = query.colorList || []
      this.props.libraryColorIdList = query.libraryColorIdList || []
      if (query.type === constant.ColorLibraryActionType.SaveLibrary) {
        this.props.originLibraryId = query.libraryDetail.id
        this.setData({
          name: query.libraryDetail.name,
          desc: query.libraryDetail.description,
        })
      } else if (query.type === constant.ColorLibraryActionType.EditLibrary) {
        this.props.libraryId = query.libraryDetail.id
        $wx.setNavigationBarTitle({
          title: '编辑颜色库'
        }) 
        this.setData({
          name: query.libraryDetail.name,
          desc: query.libraryDetail.description,
        })
      }
    }
  },
  onShow: function() {
    this.checkCanSave()
  },
}

const viewAction = {
  save: function () {
    this.createColorLibrary().then(res => {
      this.props.libraryId = res.data

      if (this.props.type === constant.ColorLibraryActionType.Move_Single
        || this.props.type === constant.ColorLibraryActionType.Move_Multiple) {
        this.moveColorToLibrary().then(() => {
          $wx.navigateBack(2)
        }, {}, '已移动到 ' + this.data.name)
      } else if (this.props.type === constant.ColorLibraryActionType.Add_Single
        || this.props.type === constant.ColorLibraryActionType.Add_Multiple
        ) {
        this.addColorToLibrary().then(() => {
          $wx.navigateBack(2, {}, '已加入到 ' + this.data.name)
        })
      } else if (this.props.type === constant.ColorLibraryActionType.SaveColor) {
        this.addColorToLibrary().then(() => {
          $wx.navigateTo($wx.router.settingTag, {type: constant.ColorLibraryActionType.SaveColorInNewLibrary, colorDetail: this.props.colorList[0]})
        })
      } else if (this.props.type === constant.ColorLibraryActionType.SaveLibrary) {
        this.addLibraryColorToLibrary().then(() => {
          $wx.navigateBack(1, {}, '已加入到 ' + this.data.name)
        })
      } else {
        $wx.navigateBack()
      }
    })
  },
  nameChange: function (d, v) {
    this.setData({
      name: v
    })
    this.checkCanSave()
  },
  descChange: function (d, v) {
    this.setData({
      desc: v
    })
  },
}

const privateMethods = {
  isNotEmpty: function(str) {
    return !!str && str.length > 0
  },
  checkCanSave: function () {
    this.setData({
      canSave: this.isNotEmpty(this.data.name)
    })
  },
  createColorLibrary: function () {
    let param = {
      id: this.props.libraryId,
      name: this.data.name,
      description: this.data.desc 
    }
    // 如果是添加色库，不传 id
    if (param.id === -1) {
      delete param.id
    }
    return http.post(urls.colorLibrarySave, param)
  },
  addLibraryColorToLibrary: function () {
    return http.post(urls.addColorFromLibrary, {
      libraryId: this.props.libraryId,
      originLibraryId: this.props.originLibraryId
    })
  },
  addColorToLibrary: function () {
    return http.post(urls.addColor, {
      // mock: true,
      libraryId: this.props.libraryId,
      libraryColorIdList: this.props.libraryColorIdList,
    })
  },
  moveColorToLibrary: function () {
    return http.post(urls.moveColor, {
      // mock: true,
      libraryId: this.props.libraryId,
      libraryColorIdList: this.props.libraryColorIdList,
    })
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)