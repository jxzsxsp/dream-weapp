import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'
import utils from '../../utils/index'
import constant from '../../constant/index'


let props = {
  timeout: null
}

let data = {
  colorDetail: {},
  libraryDetail: {},
  colorRecipe: {},
  favorite: false,
  showHint: false,
  showToast: false,
}

let lifecycle = {
  onLoad: function(query) {
    http.getPantone(urls.pantone.colorDetail, {colorId: query.colorId})
      .then(res => {
        $wx.setNavigationBarTitle({title: res.categoryName})
        utils.justifyColor(res)
        res.lab = utils.fixLab(res.lab)
        this.setData({
          colorRecipe: res.colorRecipe,
          colorDetail: res
        })
      })

    this.getFavorite(query.colorId)
  },
  onNavigateBack: function(d) {
    console.log(d)

    // this.clearTimeout()
    // this.setToastTimeout()
    // this.setData({
    //   showToast: true,
    //   libraryDetail: d.libraryDetail
    // })
  },
  onShareAppMessage: function () {
    return {
      title: `推荐颜色${this.data.colorDetail.name}给你`,
      path: `/pages/color-detail/color-detail?colorId=${this.data.colorDetail.colorId}`
    }
  }
}

let viewAction = {
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
      id: this.data.favoriteId,
      hexColor: colorDetail.hexColor,
      name: colorDetail.name,
    }
    this.clearTimeout()
    $wx.navigateTo($wx.router.joinLibrary, {colorList: [color]})
  }
}

let privateMethods = {
  getFavorite: function (colorId) {
    let token = wx.getStorageSync('token')
    if(!token) {
      return
    }

    http.get(urls.isInFavorite, {
      // mock: true, 
      colorId: colorId, 
      originType: constant.ColorSource.pantone
    }).then((res) => {
      this.setData({
        favorite: res.status
      })
    })
  },
  addFavorite: function () {
    return http.post(urls.addFavorite, {
      // mock: true,
      colorId: this.data.colorDetail.colorId,
      originType: constant.ColorSource.pantone
    }).then((res) => {
      this.clearTimeout()
      this.setTimeout()
      this.setData({
        showHint: true,
        favorite: true,
        favoriteId: res.data
      })
    })
  },
  cancelFavorite: function (callback) {
    return http.post(urls.cancelFavorite, {
      // mock: true,
      colorId: this.data.colorDetail.colorId,
      originType: constant.ColorSource.pantone
    }).then(() => {
      console.log(this)
      $wx.executeEvent('removeFromLibrary', {colorId: this.data.colorDetail.colorId})
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

$Page.register(props, data, lifecycle, privateMethods, viewAction)