import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '链尚',
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark",
    navigationBarBackgroundColor: '#131313',
    navigationBarTextStyle: '#fff'
  }
}
