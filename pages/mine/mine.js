import {$Page, $wx} from '../../genji4mp/index'
import { http, urls } from '../../net/index';

const data = {
  settingList: [{
    name: '收货地址', 
    icon: 'icon-ic_custom_address'
  }],
  userInfo: {},
  userDetail: {},
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
      http.post(urls.customerDetail).then(res => {
        this.setData({
          userDetail: res
        })
      })
    }
  }
}

const viewAction = {
  itemClicked (data) {
    if (data.index === 0) {
      // 收货地址
      $wx.navigateTo($wx.router.addressList, {comeFrom: 1})
    }
  },
  getUserInfo () {
    $wx.app.bindPhone().then(res => {
      if (res.code === 1) {
        this.setData({
          userInfo: $wx.app.globalData.userInfo
        })
        http.post(urls.customerDetail).then(res => {
          this.setData({
            userDetail: res
          })
        })
      }
    })
  },
}

$Page.register(null, data, lifecycle, privateMethod, viewAction)