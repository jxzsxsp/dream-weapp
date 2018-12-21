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
  originType: 0,
  selfFetch: true,
}

let lifeCycle = {
  onLoad: function (query) {
    $wx.setNavigationBarTitle({title: '取色'})
    this.setData({
      colorId: query.colorId
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

    this.getFavorite(res => {
      this.setData({
        favorite: res.status
      })
    }, query.colorId)
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

let viewAction = {
  relativeColorClicked: function (data) {
    $wx.navigateTo($wx.router.colorDetail, {...this.data.relativeColorList[data.index]})
  },
  favoriteColor: function () {
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

$Page.register(props, data, lifeCycle, privateMethod, viewAction)