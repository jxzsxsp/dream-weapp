import router from 'router'
import {$wx} from './genji4mp/index'
App({
  onLaunch: function () {
    $wx.registerRouter(router)
  },

  /**
   * 小程序全局数据
   */
  globalData: {

  }
})