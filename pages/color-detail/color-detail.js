import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'
import utils from '../../utils/index'

let data = {
  colorDetail: {},
  colorRecipe: {},
  favorite: false,
  originType: 1,
}

let lifecycle = {
  onLoad: function(colorDetail) {
    $wx.setNavigationBarTitle({
      title: colorDetail.categoryName
    })
    
    utils.justifyColor(colorDetail)
    colorDetail.lab = utils.fixLab(colorDetail.lab)
    this.setData({
      colorDetail: colorDetail
    })
    http.getPantone(urls.pantone.colorDetail, {colorId: parseInt(colorDetail.colorId)})
      .then((res) => {
        this.setData({
          colorRecipe: res.colorRecipe
        })
      })
    
    this.getFavorite(res => {
      this.setData({
        favorite: res.status
      })
    }, colorDetail.colorId)
  }
}

let viewAction = {
  favoriteColor: function() {
    let favorite = !this.data.favorite

    if (favorite) {
      this.addFavorite(res => {
        this.setData({
          favorite: favorite
        })
      })
    } else {
      this.cancelFavorite(res => {
        this.setData({
          favorite: favorite
        })
      })
    }
  }
}

let privateMethods = {
  getFavorite: function (callback, colorId) {
    http.get(urls.isInFavorite, { 
      mock: true, 
      colorId: colorId, 
      originType: this.data.originType 
      }).then(res => {
      callback(res);
    })
  },
  addFavorite: function (callback) {
    http.post(urls.addFavorite, {
      mock: true,
      colorId: this.data.colorDetail.colorId,
      originType: this.data.originType 
    }).then(res => {
      callback(res);
    })
  },
  cancelFavorite: function (callback) {
    http.post(urls.cancelFavorite, {
      mock: true,
      colorId: this.data.colorDetail.colorId,
      originType: this.data.originType
    }).then(res => {
      callback(res);
    })
  }
}

$Page.register(null, data, lifecycle, privateMethods, viewAction)