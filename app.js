import {http}  from './net/index'
import {$wx} from './genji4mp/index'

App({
  onLaunch: function () {
    // $wx.login().then(res => {
    //   http.quietLogin(res.code) 
    // })
  },

  globalData: {
    token: ''
  }
})