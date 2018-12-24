import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'
import utils from '../../utils/index'

let props = {
  loadingState: http.defaultLoadingState(),
  timeout: null,
}

let data = {
  colorDetail: {},
  libraryDetail: {},
  relativeColorList: [],
  colorId: 0,
  favorite: false,
  // 是从颜色库打开，还是从分享直接打开
  fromLibrary: false,
  showHint: false,
  showToast: false,
}

let lifeCycle = {
  onLoad: function (query) {
    $wx.setNavigationBarTitle({title: '取色'})
    this.setData({
      colorId: query.colorId,
      fromLibrary: !!query.fromLibrary
    })

    http.get(urls.pantone.fetchColorDetail, {colorId: parseInt(query.colorId)})
      .then(colorDetail => {
        colorDetail.lab = utils.fixLab(colorDetail.lab)
        this.setData({
          colorDetail,
        })
        return colorDetail.lab
      }).then(labs => {
        return http.getPantoneList(urls.pantone.colorSearch, this.props.loadingState, {labs})
      }).then(relativeColorList => {
        this.setData({
          relativeColorList
        })
      })

    this.getFavorite(query.colorId)
  },
  onReachBottom () {
    http.getPantoneList(urls.pantone.colorSearch, this.props.loadingState, {lab: this.data.colorDetail.lab})
      .then(colorList => {
        this.data.relativeColorList.push(...colorList)
        this.setData({
          relativeColorList: this.data.relativeColorList
        })
      })
  },
  launchAppError (e) {
    $wx.showModal({title: '提示', content: '请先下载App', showCancel: false})
      .then(() => {
        console.log(e.detail.errMsg)
      })
  },
  onNavigateBack: function (d) {
    console.log(d)

    this.clearTimeout()
    this.setToastTimeout()
    this.setData({
      showToast: true,
      libraryDetail: d.libraryDetail
    })
  },
}

let viewAction = {
  relativeColorClicked: function (data) {
    $wx.navigateTo($wx.router.colorDetail, {...this.data.relativeColorList[data.index]})
  },
  favoriteColor: function() {
    let favorite = !this.data.favorite
    if (favorite) {
      this.addFavorite()
    } else {
      this.cancelFavorite()
    }
  },
  gotoColorLibrary: function () {
    const colorDetail = this.data.colorDetail
    const color = {
      id: colorDetail.colorId,
      hexColor: colorDetail.hexColor,
      name: colorDetail.name,
    }
    this.clearTimeout()
    $wx.navigateTo($wx.router.joinLibrary, {colorList: [color]})
  }
}

let privateMethod = {
  getFavorite: function (colorId) {
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    
    http.get(urls.isInFavorite, {
      mock: true,
      colorId: colorId,
      originType: this.data.originType
    }).then(res => {
      this.setData({
        favorite: res.status
      })
    })
  },
  addFavorite: function () {
    http.post(urls.addFavorite, {
      mock: true,
      colorId: this.data.colorDetail.colorId,
      originType: this.data.originType
    }).then(() => {
      this.clearTimeout()
      this.setTimeout()
      this.setData({
        favorite: true,
        showHint: true,
      })
    })
  },
  cancelFavorite: function () {
    http.post(urls.cancelFavorite, {
      mock: true,
      colorId: this.data.colorDetail.colorId,
      originType: this.data.originType
    }).then(() => {
      this.clearTimeout()
      this.setData({
        favorite: false,
        showHint: false,
      })
    })
  },
  clearTimeout: function () {
    if (this.props.timeout) {
      clearTimeout(this.props.timeout)
      this.props.timeout = null
      this.setData({
        showHint: false,
        showToast: false
      })
    }
  },
  setTimeout: function () {
    this.props.timeout = setTimeout(() => {
      this.setData({
        showHint: false
      })
    }, 3000)
  },
  setToastTimeout: function () {
    this.props.timeout = setTimeout(() => {
      this.setData({
        showToast: false
      })
    }, 3000)
  },
}



$Page.register(props, data, lifeCycle, privateMethod, viewAction)