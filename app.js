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
    token: '46dd5316b856a7e391615b78a261ff1c69dd182d63edb8b3a16d21b82accfeb2'
  }
})