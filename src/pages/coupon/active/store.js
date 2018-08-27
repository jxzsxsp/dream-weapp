import Vue from 'vue'
import Vuex from 'vuex'
import couponApi from '@/api/coupon.api.js'
Vue.use(Vuex)

let config = {
  pageNo: 1,
  pageSize: 10,
  isLockAddPageData: false
}

const store = new Vuex.Store({
  state: {
    isLoading: 0,
    couponList: [],
    getCouponStatus: false
  },
  mutations: {

  },
  actions: {
    /**
     * 获取优惠券列表
     */
    _requestCoupon (context,falseUpdate = false) {

      couponApi.getCouponList({status: 99}, falseUpdate).then((res) => {
        context.state.couponList = res.dataList;
        if(res.dataList==null || res.dataList.length==0){
          console.log('1')
          context.state.isLoading =2
          config.isLockAddPageData = false;
        }else{
          console.log('2')
          context.state.isLoading=3;
          config.isLockAddPageData = false;
        }
      })
    },
    /**
     * 领取优惠券及跳转到优惠券列表
     */
    _updateCouponStatus (context) {
      if (!context.state.getCouponStatus) {
        // 未领取优惠券领取优惠券
        couponApi.receiveCoupon().then(res => {
          context.state.getCouponStatus = true
        })
      } else {
        // 领取完跳转优惠券列表
        const url = '/pages/coupon/couponList/main'
        wx.navigateTo({url})
      }
    },
  }
});

export default store
