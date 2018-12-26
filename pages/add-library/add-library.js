import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constant from '../../constant/index'
import utils from '../../utils/index'

const props = {
  // 编辑颜色库的类型
  type: null,
  libraryDetail: {},
  libraryColorIdList: [],
}

const data = {
  canSave: false,
  libraryId: '',
  name: '',
  desc: '',
}

const lifecycle = {
  onLoad: function (query) {
    if (!utils.isEmptyObject(query)) {
      this.props.type = query.type
      this.props.libraryDetail = query.libraryDetail
      // 除了分享跳到该界面，其他都是编辑颜色库
      if (query.type !== constant.ColorLibraryActionType.SaveLibrary) {
        $wx.setNavigationBarTitle({
          title: '编辑颜色库'
        })
        this.setData({
          libraryId: query.libraryDetail.id
        }) 
      }
      this.setData({
        name: query.libraryDetail.name,
        desc: query.libraryDetail.description,
        libraryColorIdList: query.libraryColorIdList || []
      })
    }
  },
  onShow: function() {
    this.checkCanSave()
  },
}

const viewAction = {
  save: function () {
    this.createColorLibrary().then(res => {
      this.setData({
        libraryId: res.data
      })

      if (this.props.type === constant.ColorLibraryActionType.Move_Single
        || this.props.type === constant.ColorLibraryActionType.Move_Multiple) {
        this.moveColorToLibrary().then(() => {
          $wx.navigateBack(2)
        }, {}, '已移动到 ' + this.data.name)
      } else if (this.props.type === constant.ColorLibraryActionType.Add_Single
        || this.props.type === constant.ColorLibraryActionType.Add_Multiple
        || this.props.type === constant.ColorLibraryActionType.SaveColor
        ) {
        this.addColorToLibrary().then(() => {
          $wx.navigateBack(2, {}, '已加入到 ' + this.data.name)
        })
      } else if (this.props.type === constant.ColorLibraryActionType.SaveLibrary) {
        this.addColorToLibrary().then(() => {
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
    return http.post(urls.colorLibrarySave, {
      // mock: true,
      id: this.data.libraryId,
      name: this.data.name,
      description: this.data.desc
    })
  },
  addColorToLibrary: function () {
    return http.post(urls.addColor, {
      // mock: true,
      libraryId: this.data.libraryId,
      libraryColorIdList: this.props.libraryColorIdList,
    })
  },
  moveColorToLibrary: function () {
    return http.post(urls.moveColor, {
      // mock: true,
      libraryId: this.data.libraryId,
      libraryColorIdList: this.props.libraryColorIdList,
    })
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)