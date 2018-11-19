import {http}  from './net/index'
import {$wx} from './genji4mp/index'

App({
  onLaunch: function () {
    $wx.login().then(res => {
      http.quietLogin(res.code) 
    })
  },

  resetDevice: function () {
    this.globalData.deviceInfo.connected = false
    this.globalData.deviceInfo.heartTimer = null
    this.globalData.deviceInfo.deviceId = ''
    this.globalData.deviceInfo.deviceName = '' 
  },

  globalData: {
    token: '',
    deviceInfo: {
      connected: false,
      heartTimer: null,
      deviceId: '',
      deviceName: '',
    }
  }
})