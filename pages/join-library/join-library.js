import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
  loadingState: http.defaultLoadingState(),
}

const data = {
  colorLibraryList: [],
  defaultColorLibrary: {},
  libraryId: 0,
  libraryColorIdList: [],
}

const lifecycle = {
  onLoad: function (query) {
    this.setData({
      libraryColorIdList: [query.colorId]
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
    $wx.navigateTo($wx.router.addColorLibrary, {})
  },
  joinColorLibrary: function(d, v) {
    console.log(d, v)
    this.setData({
      libraryId: d.id
    })
    this.addColorToLibrary()
    $wx.navigateBack({
      id: d.id,
      name: d.name,
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