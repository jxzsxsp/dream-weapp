import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
  loadingState: http.defaultLoadingState(),
}

const data = {
  noticeList: [],
}

const lifecycle = {
  onLoad: function (query) {
  },
  onShow: function (query) {
    this.refresh()
  },
  onPullDownRefresh: function () {
    this.refresh()
    $wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    let noticeList = this.data.noticeList

    this.getNoticeList().then(res => {
      this.setData({
        noticeList: noticeList.concat(res)
      })
    })
  },
}

const privateMethods = {
  getNoticeList: function () {
    return http.getList(urls.messageList, this.props.loadingState, {
      mock: true,
    })
  },
  refresh: function () {
    this.props.loadingState = http.defaultLoadingState();
    this.getNoticeList().then(res => {
      if (res) {
        this.setData({
          noticeList: res
        })
      }
    })
  },
  flushNoticeList: function (item) {
    let noticeList = this.data.noticeList

    for (let i = 0; i < noticeList.length; i++) {
      if (noticeList[i].id === item.id) {
        noticeList[i] = item
        break
      }
    }

    this.setData({
      noticeList: noticeList
    })
  },

}

const viewAction = {
  showDetail: function (d, v) {
    $wx.navigateTo($wx.router.noticeDetail, {
      bizType: d.type,
      bizId: d.id
    })
  }
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)