import router from 'router'
import {$wx, $Page} from './genji4mp/index'
import {http} from './net/index'
App({
  onLaunch: function () {
    // mixin 生命周期
    $Page.mixinLifeCycle({onLoad: function () {
      console.log('注入成功')
    }})

    // 注册路由
    $wx.registerRouter(router)

    // 获取用户信息
    $wx.getUserInfo().then(res => {
      this.globalData.userInfo = res.userInfo
    })

    // 静默登录
    $wx.login().then(res => {
      http.quietLogin(res.code) 
      console.log(res)
    })
  },

  /**
   * 小程序全局数据
   */
  globalData: {
    // 用户信息
    userInfo: {},
    token: '46dd5316b856a7e391615b78a261ff1c69dd182d63edb8b3a16d21b82accfeb2'
  }
})