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
  unreportList: [],
  agreeList: [],
  disagreeList: [],
  receivedList: [],
  unreportLoadingState: http.defaultLoadingState(),
  agreeLoadingState: http.defaultLoadingState(),
  disagreeLoadingState: http.defaultLoadingState(),
  receivedLoadingState: http.defaultLoadingState(),
}

const lifecycle = {
  onLoad: function (query) {
  },
  onShow: function() {
    this.refresh()
  }
}

const privateMethods = {
  loadMore: function (d, v) {
    if (d.detail === this.data.status.unreport) {
      let unreportList = this.data.unreportList
      this.getApplyList(this.data.status.unreport, this.data.unreportLoadingState).then(res => {
        this.setData({
          unreportList: unreportList.concat(res),
          unreportLoadingState: this.data.unreportLoadingState
        })
      })
    } else if (d.detail === this.data.status.agree) {
      let agreeList = this.data.agreeList
      this.getApplyList(this.data.status.agree, this.data.agreeLoadingState).then(res => {
        this.setData({
          agreeList: agreeList.concat(res),
          agreeLoadingState: this.data.agreeLoadingState
        })
      })
    } if (d.detail === this.data.status.disagree) {
      let disagreeList = this.data.disagreeList
      this.getApplyList(this.data.status.disagree, this.data.disagreeLoadingState).then(res => {
        this.setData({
          disagreeList: disagreeList.concat(res),
          disagreeLoadingState: this.data.disagreeLoadingState
        })
      })
    } if (d.detail === this.data.status.received) {
      let receivedList = this.data.receivedList
      this.getApplyList(this.data.status.received, this.data.receivedLoadingState).then(res => {
        this.setData({
          receivedList: receivedList.concat(res),
          receivedLoadingState: this.data.receivedLoadingState
        })
      })
    }
  },
  getApplyList: function (status, loadingState) {
    return http.postList(urls.applyList, loadingState, {
      // mock: true,
      tradeType: this.data.currentTabType,
      status: status,
    })
  },
  refresh: function () {
    this.setData({
      unreportLoadingState: http.defaultLoadingState(),
      agreeLoadingState: http.defaultLoadingState(),
      disagreeLoadingState: http.defaultLoadingState(),
      receivedLoadingState: http.defaultLoadingState(),
    }, function () {
      this.getApplyList(this.data.status.unreport, this.data.unreportLoadingState).then(res => {
        this.setData({
          unreportList: res,
          unreportLoadingState: this.data.unreportLoadingState
        })
      })

      this.getApplyList(this.data.status.agree, this.data.agreeLoadingState).then(res => {
        this.setData({
          agreeList: res,
          agreeLoadingState: this.data.agreeLoadingState
        })
      })

      this.getApplyList(this.data.status.disagree, this.data.disagreeLoadingState).then(res => {
        this.setData({
          disagreeList: res,
          disagreeLoadingState: this.data.disagreeLoadingState
        })
      })

      this.getApplyList(this.data.status.received, this.data.receivedLoadingState).then(res => {
        this.setData({
          receivedList: res,
          receivedLoadingState: this.data.receivedLoadingState
        })
      })
    })
    
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