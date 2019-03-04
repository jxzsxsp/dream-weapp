import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
  loadingState: http.defaultLoadingState(),
}

const data = {
  status: { //状态 10.未回复，20.已同意，30.已拒绝，40.已发货，50.已收货
    unreport: 10,
    agree: 20,
    disagree: 30,
    received: 50,
  },
  yangkaType: 1, //订单类型 1.色卡，2.米样，3.大货
  miyangType: 2,
  currentTabType: 1,
  allData: {
    "10": {
      list: [],
      loadingState: http.defaultLoadingState(),
      show: false,
    },
    "20": {
      list: [],
      loadingState: http.defaultLoadingState(),
      show: false,
    },
    "30": {
      list: [],
      loadingState: http.defaultLoadingState(),
      show: false,
    },
    "50": {
      list: [],
      loadingState: http.defaultLoadingState(),
      show: false,
    },
  },
}

const lifecycle = {
  onLoad: function (query) {
  },
  onShow: function() {
  }
}

const privateMethods = {
  loadMore: function (d, v) {
    let list = this.data.allData[d.detail].list
    let loadingState = this.data.allData[d.detail].loadingState
    this.getApplyList(d.detail, loadingState).then(res => {
      let allData = this.data.allData
      allData[d.detail].list = list.concat(res)
      allData[d.detail].loadingState = loadingState
      this.setData({
        allData: allData
      })
    })
  },
  getApplyList: function (status, loadingState) {
    return http.postList(urls.applyList, loadingState, {
      mock: true,
      tradeType: this.data.currentTabType,
      status: status,
    })
  },
  showList: function (d, v) {
    let show = !this.data.allData[d.detail].show
    if (show) {
      let loadingState = http.defaultLoadingState()
      this.getApplyList(d.detail, loadingState).then(res => {
        let allData = this.data.allData
        allData[d.detail].list = res
        allData[d.detail].show = show
        allData[d.detail].loadingState = loadingState
        this.setData({
          allData: allData
        })
      })
    } else {
      let allData = this.data.allData
      allData[d.detail].show = show
      this.setData({
        allData: allData
      })
    }
  },
}

const viewAction = {
  toggleTabType: function(d) {
    this.setData({
      currentTabType: d.type,
    }, function() {
      this.refresh()
    })
  },
  confirmReceived: function (d, v) {
    http.get(urls.confirmReceived, {
      // mock: true,
      tradeId: v.id,
    })
  }
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)