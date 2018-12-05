import {$Page, $wx} from '../../genji4mp/index'
import { http, urls } from '../../net/index';
import { isObject, isEmptyObject } from '../../utils/jshelper';

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
      $wx.navigateTo($wx.router.addressList)
    }
  },
  getUserInfo () {
    $wx.app.bindPhone().then(res => {
      console.log(res)
    })
  },
}

$Page.register(null, data, lifecycle, privateMethod, viewAction)