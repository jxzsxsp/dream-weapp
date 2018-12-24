import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'
import utils from '../../utils/index'
import constant from '../../constant/index'


let props = {
  timeout: null
}

let data = {
  colorDetail: {},
  colorRecipe: {},
  favorite: false,
  showHint: false,
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
      id: colorDetail.colorId,
      hexColor: colorDetail.hexColor,
      name: colorDetail.name,
    }
    $wx.navigateTo($wx.router.joinLibrary, {colorList: [color]})
  }
}

let privateMethods = {
  getFavorite: function (colorId) {
    return http.get(urls.isInFavorite, { 
      mock: true, 
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
      mock: true,
      colorId: this.data.colorDetail.colorId,
      originType: constant.ColorSource.pantone
    }).then(() => {
      this.clearTimeout()
      this.setTimeout()
      this.setData({
        showHint: true,
        favorite: true
      })
    })
  },
  cancelFavorite: function (callback) {
    return http.post(urls.cancelFavorite, {
      mock: true,
      colorId: this.data.colorDetail.colorId,
      originType: constant.ColorSource.pantone
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
    }
  },
  setTimeout: function () {
    this.props.timeout = setTimeout(() => {
      this.setData({
        showHint: false
      })
    }, 3000)
  }
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)