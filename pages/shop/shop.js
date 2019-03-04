import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constant from '../../constant/index'

const props = {
  loadingState: http.defaultLoadingState(),
  homeLoadingState: http.defaultLoadingState(),
}

const data = { //位置类型（10.轮播位，20.新品区，30.爆款区, 40.普通区）
  positionType: {
    SWIPER: 10,
    NEW: 20,
    HOT: 30,
    NORMAL: 40
  },
  currentPositionType: 30,
  homeMenuType: 'home',
  itemMenuType: 'item',
  currentMenuType: 'home',
  shopId: 0,
  shopInfo: {},
  isFollow: false,
  navFixed: false,
  swiperItemList: [],
  hotItemList: [],
  newItemList: [],
  normalItemList: [],
  itemList: [],
}

const lifecycle = {
  onLoad: function (query) {
    $wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4A90E2',
    })

    this.setData({
      shopId: query.shopId,
    })
  },
  onShow: function () {
    this.getShopDetail().then(res => {
      this.setData({
        shopInfo: res,
        isFollow: res.isFollow,
      })
      $wx.setNavigationBarTitle({
        title: '',
      })
    })

    this.getHotItemList()
    this.homeRefresh(this.data.positionType.NORMAL)
    this.refresh()
  },
  onPageScroll: function(d) {
    let navFixed = false
    let title = ''
    if (d.scrollTop > 99) {
      navFixed = true
      title = this.data.shopInfo.shopName
    }
    this.setData({
      navFixed: navFixed
    })
    $wx.setNavigationBarTitle({
      title: title,
    })
  },
  onReachBottom: function () {
    if (this.data.currentMenuType !== this.data.itemMenuType) {
      let normalItemList = this.data.normalItemList

      this.getHomeItemList(this.data.positionType.NORMAL).then(res => {
        this.setData({
          normalItemList: normalItemList.concat(res)
        })
      })
    } else {
      let itemList = this.data.itemList

      this.getItemList(this.data.currentPositionType).then(res => {
        this.setData({
          itemList: itemList.concat(res)
        })
      })
    }

  },
  onShareAppMessage: function () {
    return {
      title: this.data.shopInfo.shopName
    }
  },
}

const privateMethods = {
  getShopDetail: function () {
    return http.get(urls.shopSimpleDetail, {
      // mock: true,
      shopId: this.data.shopId
    })
  },
  getHotItemList: function () {
    return http.get(urls.homeItemList, {
      // mock: true,
      shopId: this.data.shopId
    }).then(res => {
      this.setData({
        swiperItemList: res[this.data.positionType.SWIPER],
        hotItemList: res[this.data.positionType.HOT],
        newItemList: res[this.data.positionType.NEW],
      })
    })
  },
  getHomeItemList: function (positionType) {
    return http.getList(urls.getItemListByPosition, this.props.homeLoadingState, {
      // mock: true,
      shopId: this.data.shopId,
      positionType: positionType,
    })
  },
  homeRefresh: function (positionType) {
    this.props.homeLoadingState = http.defaultLoadingState();
    this.getHomeItemList(positionType).then(res => {
      if (positionType === this.data.positionType.SWIPER) {
        this.setData({
          swiperItemList: res
        })
      } else if (positionType === this.data.positionType.HOT) {
        this.setData({
          hotItemList: res
        })
      } else if (positionType === this.data.positionType.NEW) {
        this.setData({
          newItemList: res
        })
      } else if (positionType === this.data.positionType.NORMAL) {
        this.setData({
          normalItemList: res
        })
      }
    })
  },
  getItemList: function (positionType) {
    return http.getList(urls.getItemListByPosition, this.props.loadingState, {
      // mock: true,
      shopId: this.data.shopId,
      positionType: positionType,
    })
  },
  refresh: function () {
    this.props.loadingState = http.defaultLoadingState();
    this.getItemList(this.data.currentPositionType).then(res => {
      if (res) {
        this.setData({
          itemList: res
        })
      }
    })
  },
  follow: function () {
    http.get(urls.followSupplier, {
      // mock: true,
      shopId: this.data.shopId,
      source: constant.BindCustomerSource.WEAPP_VIEW,
    })
  },
  cancelFollow: function () {
    http.get(urls.unfollowSupplier, {
      // mock: true,
      shopId: this.data.shopId
    })
  },
}

const viewAction = {
  followShop: function (d) {
    this.setData({
      isFollow: !this.data.isFollow
    }, function() {
      if(this.data.isFollow) {
        this.follow()
      } else {
        this.cancelFollow()
      }
    })
  },
  toggleMenu: function (d) {
    this.setData({
      currentMenuType: d.type,
    })
  },
  togglePositionType: function (d) {
    this.setData({
      currentPositionType: d.type,
    }, function() {
      this.refresh()
    })
  },
  gotoItemDetail: function(d) {
    $wx.navigateTo($wx.router.itemDetail, {
      itemId: d.id
    })
  }
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)