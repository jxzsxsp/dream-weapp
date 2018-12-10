import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'
import {justifyColor, fixLab} from '../../utils/index'

let data = {
  colorDetail: {},
  colorRecipe: {},
}

let lifecycle = {
  onLoad: function(colorDetail) {
    $wx.setNavigationBarTitle({
      title: colorDetail.categoryName
    })
    
    justifyColor(colorDetail)
    colorDetail.lab = fixLab(colorDetail.lab)
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