import router from 'router'
import {$wx, $Page} from './genji4mp/index'
App({
  onLaunch: function () {
    $Page.mixinLifeCycle({onLoad: function () {
      console.log('注入成功')
    }})
    $wx.registerRouter(router)
  },

  /**
   * 小程序全局数据
   */
  globalData: {

  }
})