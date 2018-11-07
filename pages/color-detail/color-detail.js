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
    http.get(urls.pantone.colorDetail, {colorId: colorDetail.colorId, mock: true})
      .then((res) => {
        this.setData({
          colorRecipe: res.colorRecipe
        })
      })
  }
}

$Page(null, data, lifecycle, null, {})