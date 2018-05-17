import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()


export default {
  config: {
    navigationBarTitleText: "退款/售后",
    enablePullDownRefresh: true,
    backgroundTextStyle: "black",
    onReachBottomDistance: 50,
    backgroundColor: "#F4F4F4"
  }
}