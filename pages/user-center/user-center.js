import {$Page, $wx} from '../../genji4mp/index'

const data = {
  settingList: [{
    name: '设备管理', icon: 'icon-ic_equipment'
  }, {
    name: '用户答疑', icon: 'icon-ic_QA'
  }, {
    name: '设置', icon: 'icon-ic_setting'
  }],
  userInfo: {},
}

const privateMethod = {
  getUserInfo (e) {
    this.setData({
      userInfo: e.detail.userInfo
    })
  },
  bindPhone () {
    
  }
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


$Page(null, data, lifecycle, privateMethod, {})