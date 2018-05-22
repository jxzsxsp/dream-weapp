import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      // 'pages/logs/main', 
// <<<<<<< HEAD
// =======
      // '^pages/flex/main', 
// >>>>>>> a38a3e510df055347f53be8a605a7f9963a19466
      '^pages/mine/index/main', 
      'pages/mine/login/main',
      'pages/order/detail/main',
      'pages/refundAndSaled/saledDetail/main',
      'pages/refundAndSaled/refundDetail/main',
      'pages/webView/main',
    ],


    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
}
