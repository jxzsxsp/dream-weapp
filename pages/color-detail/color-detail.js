import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'
import utils from '../../utils/index'
import constant from '../../constant/index'

let data = {
  colorDetail: {},
  colorRecipe: {},
  favorite: false,
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
      this.setData({
        favorite: false
      })
    })
  },
  cancelFavorite: function (callback) {
    return http.post(urls.cancelFavorite, {
      mock: true,
      colorId: this.data.colorDetail.colorId,
      originType: constant.ColorSource.pantone
    }).then(() => {
      this.setData({
        favorite: true
      })
    })
  }
}

$Page.register(null, data, lifecycle, privateMethods, viewAction)