import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constant from '../../constant/index'

const props = {
  loadingState: http.defaultLoadingState(),
}

const data = {
  shopList: [],
}

const lifecycle = {
  onLoad: function(query) {
    this.setData({
      isAuthorizationPermit: $wx.app.globalData.appUserInfo.isAuthorizationPermit
    })
  },
  onShow: function (query) {
    this.refresh()
  },
  onPullDownRefresh: function () {
    this.refresh()
    $wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    let shopList = this.data.shopList

    this.getShopList().then(res => {
      console.log(res)

      this.setData({
        shopList: shopList.concat(res)
      })
    })
  },
}

const privateMethods = {
  getShopList: function () {
    return http.getList(urls.recommendSupplier, this.props.loadingState, {
      // mock: true,
    })
  },
  refresh: function () {
    this.props.loadingState = http.defaultLoadingState();
    this.getShopList().then(res => {
      this.setData({
        shopList: res
      })
    })
  },
  flushShopList: function(item) {
    let shopList = this.data.shopList

    for (let i = 0; i < shopList.length; i++) {
      if (shopList[i].id === item.id) {
        shopList[i] = item
        break
      }
    }

    this.setData({
      shopList: shopList
    })
  },
  bindCustomer: function (shopId) {
    return http.post(urls.bindCustomer, {
      // mock: true,
      shopId: shopId,
      source: constant.BindCustomerSource.WEAPP_VIEW,
    })
  },
  sharingAuthorization: function() {
    return http.postLogin(urls.login.sharingAuthorization, {})
  },
  follow: function(v) {
    http.get(urls.followSupplier, {
      // mock: true,
      shopId: v.id,
      source: constant.BindCustomerSource.WEAPP_VIEW,
    }).then((res) => {
      v.isFollow = 1
      this.flushShopList(v)
    })
  },
  show: function(v) {
    v.showDetail = !v.showDetail
    this.flushShopList(v)
    if (v.showDetail) {
      this.bindCustomer(v.id)
    }
  }
}

const viewAction = {
  followShop: function (d, v) {

    if (this.data.isAuthorizationPermit === 0) {
      let _this = this

      wx.showModal({
        title: '蜥奇申请',
        content: '与店铺运营方共享您的昵称、头像、手机号码',
        showCancel: true,
        confirmText: '允许',
        confirmColor: '#0ea2ef',
        cancelText: '拒绝',
        success: function (e) {
          console.log(e)
          if (e.confirm) {
            _this.sharingAuthorization()

            _this.follow(v)
          }
        }
      })
    } else {
      this.follow(v)
    }

  },

  cancelFollow: function (d, v) {
    http.get(urls.unfollowSupplier, {
      // mock: true,
      shopId: v.id
    }).then((res) => {
      v.isFollow = 0
      this.flushShopList(v)
    })
  },

  showDetail: function (d, v) {

    if (this.data.isAuthorizationPermit === 0) {
      let _this = this
      
      wx.showModal({
        title: '蜥奇申请',
        content: '与店铺运营方共享您的昵称、头像、手机号码',
        showCancel: true,
        confirmText: '允许',
        confirmColor: '#0ea2ef',
        cancelText: '拒绝',
        success: function (e) {
          console.log(e)
          if (e.confirm) {
            _this.sharingAuthorization()

            _this.show(v)
          }
        }
      })
    } else {
      this.show(v)
    }

  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)