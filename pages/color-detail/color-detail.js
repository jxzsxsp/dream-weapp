import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'
import utils from '../../utils/index'

let data = {
  colorDetail: {},
  colorRecipe: {},
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
  }
}

$Page.register(null, data, lifecycle, null, {})