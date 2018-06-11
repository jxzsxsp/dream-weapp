import Vue from 'vue'
import Vuex from 'vuex'
import Mine from '@/pages/mine/index/store'

export const pages = {
  cityLocation: 'mine/cityLocation/',
  mine: 'mine/index/',
  login: 'mine/login/',
  register: 'mine/register/',
  orderDetail: 'order/detail/',
  orderList: 'order/list/',
  couponList: 'coupon/couponList/',
  refundAndSaledList: 'refundAndSaled/list/',
  refundDetail: 'refundAndSaled/refundDetail/',
  saledDetail: 'refundAndSaled/saledDetail/',
}

Vue.use(Vuex)
export default store = new Vuex.store({
  modules: {
    [pages.mine]: Mine,
  }
})