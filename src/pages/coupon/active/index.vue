<template>
<div>
  <div v-if="loadingData.isLoading==3">
      <div class="title-container">
        <img class="title-bg" :src="titleBackground"/>
        <p class="main-title">感恩大回馈</p>
        <p class="sub-title" v-if="!getCouponStatus">恭喜您</p>
        <p class="sub-title" v-if="!getCouponStatus">红包我出，你开心就好</p>
        <p class="sub-title" v-if="getCouponStatus">感谢您的信任与支持</p>
        <p class="sub-title" v-if="getCouponStatus">优惠券已放入您的账户{{userMobile}}</p>
      </div>
      <scroll-view scroll-y class="scroll-view">
        <couponItem v-for="(itemData, index) in couponList" :key="index" :itemData="itemData" :couponStatus="selectedItem" :getCouponStatus="getCouponStatus"></couponItem>
      </scroll-view>
      <button type="warn" size="mini" class="get-coupon-btn" @click="_updateCouponStatus">{{ getCouponStatus ? '查看优惠券' : '领取' }}</button>
  </div>
  <div>
    <listBottomLoading :loadingData="loadingData"></listBottomLoading>
  </div>
</div>

</template>

<script>
import store from './store'
import couponItem from '../template/newCouponItem'
import couponApi from '@/api/coupon.api.js'
import listBottomLoading from '@/components/list-bottom-loading'

export default {
  components: {
    couponItem,
    listBottomLoading
  },

  computed: {
    userMobile () {
      return wx.getStorageSync('mobile')
    },
    titleBackground(){
      return require('@/images/coupon_title_bg.png')
    },
    couponList(){
      return store.state.couponList||[];
    },
    getCouponStatus(){
      return store.state.getCouponStatus||false;
    },
    loadingData (){
      return {
        isLoading: store.state.isLoading,
        loadingText: '',
        noOrderTips: "Oops,没有可以领取的优惠券",
        noItemImgType:1
      }
    }
  },
  methods: {
    /**
     * 领取优惠券及跳转到优惠券列表
     */
    _updateCouponStatus () {
      store.dispatch('_updateCouponStatus');
    },
  },
  onLoad () {

    store.dispatch('_requestCoupon');
  },

}

</script>
<style scoped>
.title-container {
  height: 200rpx;
  position:relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title-bg {
  position: absolute;
  z-index: -1;
  left: 0rpx;
  top: 0rpx;
  height: 200rpx;
  width: 100%;
}
.main-title {
  color: white;
  font-size: 48rpx;
}
.sub-title {
  margin-top: 10rpx;
  color: white;
  font-size: 22rpx;
}
.scroll-view {
  margin-top: 20rpx;
  height: 820rpx
}
.get-coupon-btn {
  height: 75rpx;
  width: 95%;
  background-color: #cb3f3f;
  margin-top: 50rpx;
  margin-left: 2.5%;
  margin-right: 2.5%;
}

</style>
