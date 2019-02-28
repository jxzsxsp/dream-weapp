import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constant from '../../constant/index'

const props = {
  loadingState: http.defaultLoadingState(),
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
        title: res.shopName,
      })
    })

    this.getHomeItemList(this.data.positionType.SWIPER)
    this.getHomeItemList(this.data.positionType.HOT)
    this.getHomeItemList(this.data.positionType.NEW)
    this.getHomeItemList(this.data.positionType.NORMAL)
    this.refresh()
  },
  onPageScroll: function(d) {
    let navFixed = false
    if (d.scrollTop > 99) {
      navFixed = true
    }
    this.setData({
      navFixed: navFixed
    })
  },
  onReachBottom: function () {
    if (this.data.currentMenuType !== this.data.itemMenuType) {
      return
    }

    let itemList = this.data.itemList

    this.getItemList(this.data.currentPositionType).then(res => {
      this.setData({
        itemList: itemList.concat(res)
      })
    })
  },
}

const privateMethods = {
  getShopDetail: function () {
    return http.get(urls.shopSimpleDetail, {
      // mock: true,
      shopId: this.data.shopId
    })
  },
  getHomeItemList: function (positionType) {
    return http.get(urls.getItemListByPosition, {
      // mock: true,
      shopId: this.data.shopId,
      positionType: positionType,
    }).then(res => {
      console.log(res.list, positionType)
      if(positionType === this.data.positionType.SWIPER) {
        this.setData({
          swiperItemList: res.list
        })
      } else if (positionType === this.data.positionType.HOT) {
        this.setData({
          hotItemList: res.list
        })
      } else if (positionType === this.data.positionType.NEW) {
        this.setData({
          newItemList: res.list
        })
      } else if (positionType === this.data.positionType.NORMAL) {
        this.setData({
          normalItemList: res.list
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