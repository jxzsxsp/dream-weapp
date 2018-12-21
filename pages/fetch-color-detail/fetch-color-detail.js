import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'
import utils from '../../utils/index'

let props = {
  loadingState: http.defaultLoadingState(),
}

let data = {
  colorDetail: {},
  relativeColorList: [],
  colorId: 0,
  favorite: false,
  // 是从颜色库打开，还是从分享直接打开
  fromLibrary: false
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
  }
}

let privateMethod = {
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
  getFavorite: function (colorId) {
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
      this.setData({
        favorite: true
      })
    })
  },
  cancelFavorite: function () {
    http.post(urls.cancelFavorite, {
      mock: true,
      colorId: this.data.colorDetail.colorId,
      originType: this.data.originType
    }).then(() => {
      this.setData({
        favorite: false
      })
    })
  }
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
  }
}

$Page.register(props, data, lifeCycle, privateMethod, viewAction)