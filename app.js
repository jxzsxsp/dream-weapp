import router from 'router'
import {$wx, $Page} from './genji4mp/index'
import constants from './constant/index'
import {http, urls} from './net/index'
import utils from './utils/index';

App({
  onLaunch: function () {
    // mixin 生命周期
    $Page.mixinLifeCycle({onLoad: function () {
      console.log('注入成功')
    }})

    // 注册路由
    $wx.registerRouter(router)

    // 校验授权情况
    this.saveAuthInfo().then(res => {
      this.getAppUserInfo()
    })
    // this.saveAuthInfo().then((res) => {
    //   if (res.code === -1) {
    //     $wx.navigateTo($wx.router.login)
    //   } else if (res.code === -2) {
    //     $wx.navigateTo($wx.router.login, { bindId: res.bindId })
    //   }
    // })
  },

  // 绑定手机号,主动调用前必须先授权
  bindPhone: function (callbackType = 0) {
    return this.saveAuthInfo().then(res => {
      let authRes = res
      if (res.code === -1) {
        console.error('zachary抛出: 绑定手机号前必须授权')
        return new Promise((res, rej) => {
          rej(authRes)
        })
      }
      if (res.code === -2) {
        $wx.navigateTo($wx.router.login, {bindId: res.bindId, type: callbackType})
        return new Promise((res, rej) => {
          rej(authRes)
        })
      }
      return authRes
    })
  },

  // 是否已经绑定好手机号
  isBinded () {
    return !!this.globalData.token && !utils.isEmptyObject(this.globalData.userInfo)
  },

  // 校验并保存当前授权和绑定状态
  saveAuthInfo () {
    let code = ''
    return $wx.login().then(res => {
      code = res.code
    }).then(() => {
      return $wx.getUserInfo({withCredentials: true})
    }).then(res => {
      this.globalData.userInfo = res.userInfo
      const data = {code, appId: constants.APP_GLOBAL.appId, domainName: constants.APP_GLOBAL.domainName, rawData: res.rawData, signature: res.signature, encryptedData: res.encryptedData, iv: res.iv}
      return http.getLogin(urls.login.quietLogin, data, true)
    }).then(res => {
      if (res.token) {
        this.globalData.token = res.token
        wx.setStorageSync('token', res.token)
        return {code: 1, message: '获取token成功'}
      } else if (res.bindId) {
        return {code: -2, message: '需要绑定手机号', bindId: res.bindId}
      }
    }).catch((res) => {
      return {code: -1, message: '未授权'}
    })
  },

  getAppUserInfo: function() {
    return http.getLogin(urls.login.getUserInfo, {}, true).then(res => {
      this.globalData.appUserInfo = res
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
    // 用户信息
    userInfo: {},
    appUserInfo: {},
    deviceInfo: {
      connected: false,
      heartTimer: null,
      deviceId: '',
      deviceName: '',
    }
  }
})