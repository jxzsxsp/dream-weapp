import {$Page, $wx} from '../../genji4mp/index'
import { http, urls } from '../../net/index';

const data = {
  settingList: [{
    name: '收货地址', 
    icon: 'icon-ic_address'
  }],
  userInfo: {},
  userDetail: {},
}

const privateMethod = {
}

const lifecycle = {
  onLoad: function () {
    this.setData({
      userInfo: getApp().globalData.userInfo
    })
    http.post(urls.customerDetail).then(res => {
      this.setData({
        userDetail: res
      })
    })
  }
}

const viewAction = {
  itemClicked (data) {
    if (data.index === 0) {
      // 收货地址
      $wx.navigateTo($wx.router.addressList)
    }
  },
  getUserInfo (d, v) {
    if (!v.userInfo) {
      return
    }
    this.setData({
      userInfo: v.userInfo
    })
    http.quietLogin().then(res => {
      if (res.bindId) {
        // $wx.navigateTo($wx.router.bindPhone, {bindId: res.bindId} )
      }
    })
  },
}

$Page.register(null, data, lifecycle, privateMethod, viewAction)