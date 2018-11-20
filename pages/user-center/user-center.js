import {$Page, $wx} from '../../genji4mp/index'
import { http } from '../../net/index';

const data = {
  settingList: [
    // {
    // name: '设备管理', icon: 'icon-ic_equipment'
    // }
  ],
  userInfo: {},
}

const privateMethod = {
  getUserInfo (e) {
    if (!e.detail.userInfo) {
      return
    }
    this.setData({
      userInfo: e.detail.userInfo
    })
    http.quietLogin().then(res => {
      if (res.bindId) {
        $wx.navigateTo($wx.router.bindPhone, {bindId: res.bindId} )
      }
    })
  },
}

const lifecycle = {
  onLoad: function () {
    $wx.getUserInfo().then(res => {
      this.setData({
        userInfo: res.userInfo
      })
    })
  }
}

const viewAction = {
  itemClicked (data) {
    if (data.index === 0) {
      // 设备管理 
      $wx.navigateTo($wx.router.deviceManager)
    }
  }
}

$Page(null, data, lifecycle, privateMethod, viewAction)