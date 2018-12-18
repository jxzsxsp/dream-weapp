import {$Page, $wx} from '../../genji4mp/index'

const data = {
  settingList: [
    // {
    // name: '设备管理', icon: 'icon-ic_equipment'
    // }
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