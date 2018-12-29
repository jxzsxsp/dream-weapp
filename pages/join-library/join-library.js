import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constant from '../../constant/index'

const props = {
  loadingState: http.defaultLoadingState(),
  // 要操作的颜色列表的 id
  libraryColorIdList: [],
}

const data = {
  // 颜色库列表
  colorLibraryList: [],
  // 默认颜色库
  defaultColorLibrary: {},
  // 颜色列表
  colorList: [],
}

const lifecycle = {
  onLoad: function (query) {
    console.log(query, constant)
    
    if (query.type === constant.ColorLibraryActionType.Move_Single || query.type === constant.ColorLibraryActionType.Move_Multiple) {
      $wx.setNavigationBarTitle({
        title: '颜色移动到',
      })
    } else if (query.type === constant.ColorLibraryActionType.Add_Single || query.type === constant.ColorLibraryActionType.Add_Multiple) {
      $wx.setNavigationBarTitle({
        title: '颜色添加到',
      })
    }

    this.props.type = query.type
    this.props.libraryColorIdList = query.colorList.map(item => {
      return item.id
    })

    this.setData({
      colorList: query.colorList,
    })
  },
  onShow: function (query) {
    this.props.loadingState = http.defaultLoadingState();
    this.getColorLibraryList().then(res => {
      this.setData({
        colorLibraryList: res
      })
      res.forEach((item) => {
        // type 为0 表示默认颜色库
        if (item.type === 0) {
          this.setData({
            defaultColorLibrary: item
          }) 
        }
      });
    })
  },

  onPullDownRefresh: function () {
    this.props.loadingState = http.defaultLoadingState();
    this.getColorLibraryList().then(res => {
      this.setData({
        colorLibraryList: res
      })
    })
    $wx.stopPullDownRefresh();
  },

  onReachBottom: function () {
    let colorLibraryList = this.data.colorLibraryList

    this.getColorLibraryList().then(res => {
      this.setData({
        colorLibraryList: colorLibraryList.concat(res)
      })
    })
  },
  onNavigateBack: function (d) {
    console.log(d)
  },
}

const viewAction = {
  addColorLibrary: function () {
    $wx.navigateTo($wx.router.addLibrary, { 
      type: this.props.type,
      colorList: this.data.colorList,
      libraryColorIdList: this.props.libraryColorIdList,
    })
  },
  joinColorLibrary: function(d, v) {
    let libraryDetail = d.detail
    if (this.props.type === constant.ColorLibraryActionType.Move_Single 
      || this.props.type === constant.ColorLibraryActionType.Move_Multiple) {
      this.moveColorToLibrary(d.detail.id).then(res => {
        $wx.navigateBack(1, {
          type: this.props.type,
          libraryDetail,
        })
      }, '已移动到 ' + d.detail.name)
    } else if (this.props.type === constant.ColorLibraryActionType.Add_Single || this.props.type === constant.ColorLibraryActionType.Add_Multiple) {
      this.addColorToLibrary(libraryDetail.id).then(() => { 
        $wx.navigateBack(1, {}, '已加入到' + libraryDetail.name)
      })
    } else if (this.props.type === constant.ColorLibraryActionType.SaveColor) {
      this.addColorToLibrary(libraryDetail.id).then(() => {
        $wx.navigateTo($wx.router.settingTag, {colorDetail: this.data.colorList[0], type: this.props.type})
      })
    }
  },
}

const privateMethods = {
  getColorLibraryList: function () {
    return http.getList(urls.colorLibraryList, this.props.loadingState)
  },
  addColorToLibrary: function (libraryId) {
    return http.post(urls.addColor, {
      libraryId,
      libraryColorIdList: this.props.libraryColorIdList,
    })
  },
  moveColorToLibrary: function (libraryId) {
    return http.post(urls.moveColor, {
      libraryId,
      libraryColorIdList: this.props.libraryColorIdList,
    })
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)