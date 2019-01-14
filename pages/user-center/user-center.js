import {$Page, $wx} from '../../genji4mp/index'

const data = {
  settingList: [
    { name: '关注店铺', icon: 'icon-shoucang', half: true },
    { name: '最近浏览', icon: 'icon-ic_history', half: true },
    { name: '我的收藏', icon: 'icon-shoucang', half: false },
  ],
  userInfo: {},
  showShareImg: false,
}

const privateMethod = {
}

const lifecycle = {
  onLoad: function () {
  },

  onShow: function () {
    if ($wx.app.isBinded()) {
      this.setData({
        userInfo: $wx.app.globalData.userInfo
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: `小蜥取色`,
      path: `/pages/index/index`,
      imageUrl: 'http://img50.lianshang.cn/data/share.jpg'
    }
  },
}

const viewAction = {
  itemClicked (d, v) {
    if (d.index === 0) {
      // 关注店铺
      $wx.navigateTo($wx.router.followShop)
    } else if (d.index === 1) {
      // 最近浏览 
      $wx.navigateTo($wx.router.latestView)
    } else if (d.index === 2) {
      // 我的收藏
      $wx.navigateTo($wx.router.favoriteLibrary)
    }
  },
  callContact: function() {
    $wx.makePhoneCall({
      phoneNumber: '02161161196',
    })
  },
  showShareImg: function(d, v) {
    this.setData({
      showShareImg: true
    })
  },
  closeShareImg: function (d, v) {
    this.setData({
      showShareImg: false
    })
  },
  saveImg: function() {
  },
  getUserInfo () {
    $wx.app.bindPhone().then(res => {
      this.setData({
        userInfo: $wx.app.globalData.userInfo
      })
    })
  },
}

$Page.register(null, data, lifecycle, privateMethod, viewAction)