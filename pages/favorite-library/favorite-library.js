import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constant from '../../constant/index';

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
  },
  onShow: function (query) {
    this.refresh()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.refresh()
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
  onShareAppMessage: function () {
    if (this.data.selectedLibrary && this.data.selectedLibrary.name) {
      let nickName = $wx.app.globalData.userInfo.nickName
      return {
        title: `分享颜色库《${this.data.selectedLibrary.name}》给你！快来蜥奇看看吧！`,
        path: `/pages/color-library-detail/color-library-detail?id=${this.data.selectedLibrary.id}`,
        imageUrl: 'http://img50.lianshang.cn/data/share.jpg'
      }
    }
  },
  onNavigateBack: function (d) {
    console.log(d)
  },
}

const viewAction = {
  addColorLibrary: function () {
    $wx.navigateTo($wx.router.addLibrary, {})
  },
  viewColorLibrary: function(d, v) {
    console.log(d, v)

    $wx.navigateTo($wx.router.colorLibraryDetail, { id: d.detail.id, fromLibrary: true})
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
      case 'EDIT':
        $wx.navigateTo($wx.router.addLibrary, { libraryDetail: this.data.selectedLibrary, type: constant.ColorLibraryActionType.EditLibrary })
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
  confirmDelete: function () {
    this.setData({
      showDeleteConfirm: false
    })
    
    http.post(urls.deleteColorLibrary, {
      // mock: true,
      libraryId: this.data.selectedLibrary.id
    }).then(res => {
      this.refresh()
    })
  }
}

const privateMethods = {
  getColorLibraryList: function () {
    return http.getList(urls.colorLibraryList, this.props.loadingState, {
      // mock: true,
    })
  },
  refresh: function() {
    this.props.loadingState = http.defaultLoadingState();
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
  }
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)