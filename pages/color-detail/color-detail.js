import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'

let data = {
  colorDetail: {},
  colorRecipe: {},
}

let lifecycle = {
  onLoad: function(colorDetail) {
    $wx.setNavigationBarTitle({
      title: colorDetail.categoryName
    })
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

$Page(null, data, lifecycle, null, {})