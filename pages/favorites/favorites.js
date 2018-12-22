import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
  loadingState: http.defaultLoadingState(),
}

const data = {
  colorLibraryList: [],
  defaultColorLibrary: {},
  showAction: false,
  showDeleteConfirm: false,
  selectedLibrary: {},
  actions: [{
    icon: 'icon-bianji',
    title: '编辑',
    type: 'EDIT'
  }, {
    icon: 'icon-fenxiang',
    title: '分享到...',
    type: 'SHARE'
  }, {
    icon: 'icon-shanchu',
    title: '删除',
    type: 'DELETE'
  }],
}

const lifecycle = {
  onLoad: function (query) {

    this.getColorLibraryList().then(res => {
      console.log(res)

      this.setData({
        colorLibraryList: res
      })

      for (let i = 0; i < res.length; i++) {
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
  viewColorLibrary: function(d, v) {
    console.log(d, v)

    $wx.navigateTo($wx.router.colorLibraryDetail, { id: d.detail.id })
  },
  showAction: function (d) {
    console.log(d)
    this.setData({
      showAction: true,
      selectedLibrary: d.detail
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
        $wx.navigateTo($wx.router.settingTag, { type: constant.ColorLibraryActionType.Tag, id: this.data.selectedColor.id })
        break
      case 'MOVE':
        $wx.navigateTo($wx.router.joinLibrary, { type: constant.ColorLibraryActionType.Move_Single, colorList: [this.data.selectedColor] })
        break
      case 'ADD':
        $wx.navigateTo($wx.router.joinLibrary, { type: constant.ColorLibraryActionType.Add_Single, colorList: [this.data.selectedColor] })
        break
      case 'SHARE':
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
}

const privateMethods = {
  getColorLibraryList: function () {
    return http.getList(urls.colorLibraryList, this.props.loadingState, {
      mock: true,
    })
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)