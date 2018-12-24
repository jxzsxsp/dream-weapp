import {$Page, $wx} from '../../genji4mp/index'

const data = {
  settingList: [
    { name: '我的收藏', icon: 'icon-xing' }
  ],
  userInfo: {},
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
  }
}

const viewAction = {
  itemClicked (data) {
    if (data.index === 0) {
      // 我的收藏
      $wx.navigateTo($wx.router.favoriteLibrary)
    } else if (data.index === 1) {
      // 设备管理 
      $wx.navigateTo($wx.router.deviceManager)
    }
  },
  getUserInfo () {
    $wx.app.bindPhone().then(res => {
      if (res.code === 1) {
        this.setData({
          userInfo: $wx.app.globalData.userInfo
        })
      }
    })
  },
}

$Page.register(null, data, lifecycle, privateMethod, viewAction)