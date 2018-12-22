import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constant from '../../constant/index'

const props = {
  loadingState: http.defaultLoadingState(),
}

const data = {
  colorLibraryList: [],
  defaultColorLibrary: {},
  libraryId: 0,
  libraryColorIdList: [],
  colorList: [],
  type: 0,
}

const lifecycle = {
  onLoad: function (query) {
    console.log(query, constant)
    
    if (query.type === constant.ColorLibraryActionType.Move_Single || query.type === constant.ColorLibraryActionType.Move_Multiple) {
      $wx.setNavigationBarTitle({
        title: '移动到颜色库',
      })
    } else if (query.type === constant.ColorLibraryActionType.Add_Single || query.type === constant.ColorLibraryActionType.Add_Multiple) {
      $wx.setNavigationBarTitle({
        title: '添加到颜色库',
      })
    }

    let libraryColorIdList = []
    if(query.colorList && query.colorList.length > 0) {
      let colorList = query.colorList
      for(let i = 0; i < colorList.length; i++) {
        libraryColorIdList.push(colorList[i].id)
      }
    }

    this.setData({
      ...query,
      libraryColorIdList: libraryColorIdList
    })

    this.getColorLibraryList().then(res => {
      console.log(res)

      this.setData({
        colorLibraryList: res
      })

      for(let i = 0; i < res.length; i++) {
        if (res[i].type === 0) {
          this.setData({
            defaultColorLibrary: res[i]
          })
          break
        }
      }

    })
  },
  onShow: function (query) {
    this.props.loadingState = http.defaultLoadingState();
    this.getColorLibraryList().then(res => {
      console.log(res)

      this.setData({
        colorLibraryList: res
      })
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.props.loadingState = http.defaultLoadingState();
    this.getColorLibraryList().then(res => {
      console.log(res)

      this.setData({
        colorLibraryList: res
      })
    })
    $wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let colorLibraryList = this.data.colorLibraryList

    this.getColorLibraryList().then(res => {
      console.log(res)

      this.setData({
        colorLibraryList: colorLibraryList.concat(res)
      })
    })
  },
}

const viewAction = {
  addColorLibrary: function () {
    $wx.navigateTo($wx.router.addLibrary, {})
  },
  joinColorLibrary: function(d, v) {
    console.log(d, v)
    this.setData({
      libraryId: d.detail.id
    })
    this.addColorToLibrary()
    $wx.navigateBack({
      type: this.data.type,
      libraryDetail: d.detail
    })
  },
}

const privateMethods = {
  getColorLibraryList: function () {
    return http.getList(urls.colorLibraryList, this.props.loadingState, {
      mock: true,
    })
  },
  addColorToLibrary: function () {
    return http.post(urls.addColor, {
      mock: true,
      libraryId: this.data.libraryId,
      libraryColorIdList: this.data.libraryColorIdList,
    })
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)