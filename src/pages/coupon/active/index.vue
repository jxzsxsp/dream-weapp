<template>
<div>
  <div class="title-container">
    <img class="title-bg" :src="titleBackground"/>
    <p class="main-title">感恩大回馈</p>
    <p class="sub-title" v-if="!getCouponStatus">恭喜您</p>
    <p class="sub-title" v-if="!getCouponStatus">红包我出，你开心就好</p>
    <p class="sub-title" v-if="getCouponStatus">感谢您的信任与支持</p>
    <p class="sub-title" v-if="getCouponStatus">优惠券已放入您的账户{{userMobile}}</p>
  </div>
  <scroll-view scroll-y class="scroll-view">
    <couponItem v-for="(itemData, index) in couponList" :key="index" :itemData="itemData" :couponStatus="selectedItem"></couponItem>
  </scroll-view>
  <button type="warn" size="mini" class="get-coupon-btn" @click="_updateCouponStatus">{{ getCouponStatus ? '查看优惠券' : '领取' }}</button>
</div>
</template>

<script>
import couponItem from '../template/newCouponItem'
import couponApi from '@/api/coupon.api.js'

export default { 
  components: {
    couponItem,
  },
  data () {
    return ({
      titleBackground: require('@/images/coupon_title_bg.png'),
      couponList: [],
      getCouponStatus: false,
    })
  },
  computed: {
    userMobile () {
      return wx.getStorageSync('mobile')
    }
  },
  methods: {
    /**
     * 获取优惠券列表
     */
    _requestCoupon (falseUpdate = false) {
      couponApi.getCouponList({status: this.selectedItem}, falseUpdate).then((res) => {
        this.couponList = [...res.dataList,...res.dataList,...res.dataList,...res.dataList,...res.dataList,...res.dataList,...res.dataList]
      })
    },
    /**
     * 领取优惠券及跳转到优惠券列表
     */
    _updateCouponStatus () {
      if (!this.getCouponStatus) {
        // 未领取优惠券领取优惠券
        couponApi.updateCouponStatus().then(res => {
          this.getCouponStatus = true
        })
      } else {
        // 领取完跳转优惠券列表
        const url = '/pages/coupon/couponList/main'
        wx.navigateTo({url})
      }
    }
  },
  onLoad () {
    this._requestCoupon(true)
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
  height: 800rpx
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