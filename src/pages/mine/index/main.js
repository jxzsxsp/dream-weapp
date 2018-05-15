import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '链尚',
    navigationBarBackgroundColor: '#000',
    navigationBarTextStyle: '#fff'
  }
}
