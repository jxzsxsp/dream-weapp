<template>
  <scroll-view>
    <div class="coupon-tab">
      <div :class="selectedItem === 1 ? 'selected-tab-item' : 'tab-item'" @click="selectTab(1)">未使用({{ remainCouponCount }})</div>
      <div :class="selectedItem === 2 ? 'selected-tab-item' : 'tab-item'" @click="selectTab(2)">已使用</div>
      <div :class="selectedItem === 4 ? 'selected-tab-item' : 'tab-item'" @click="selectTab(4)">已失效</div>
    </div>
    
    <div class="coupon-tab-placeholder"></div>
    <couponItem v-for="(itemData, index) in couponList" :key="index" :itemData="itemData" :couponStatus="selectedItem"></couponItem>
    <listBottomLoading :loadingData="loadingData"></listBottomLoading>
  </scroll-view>
</template>

<script>
import couponItem from '../template/couponItem'
import couponApi from '@/api/coupon.api.js'
import listBottomLoading from '@/components/list-bottom-loading'

export default { 
  components: {
    couponItem,
    listBottomLoading,
  },
  data () {
    return ({
      // 根据优惠券状态设置，1-未使用   2-已使用， 4- 已失效
      selectedItem: 1,
      loadingStatus: 0,
      couponList: [],
      remainCouponCount: 0,
    })
  },
  computed: {
    loadingData () {
      return ({
        isLoading: this.loadingStatus,
        loadingText: '没有更多了',
        noOrderTips: "亲，没有优惠呦"
      })
    }
  },
  methods: {
    selectTab (tabIndex) {
      if (tabIndex !== this.selectedItem) {
        this.couponList = []
        this.selectedItem = tabIndex
      }
      this._requestCoupon()
    },
    // 调用网络请求
    _requestCoupon () {
      couponApi.getCouponList({status: this.selectedItem}).then((res) => {
        console.log(res)
        this.loadingStatus = res.loadingStatus
        this.couponList = res.dataList
        if (this.selectedItem === 1) {
          this.remainCouponCount = res.totalCount
        }
      })
    }
  },
  onLoad () {
    // 外部跳转进来默认为未使用
    this.selectedItem = Number(this.$root.$mp.query.status) || 1
    this._requestCoupon()
  },
  // 上拉刷新
  onReachBottom () {
    this._requestCoupon()
  }
}

</script>
<style>
.coupon-tab-placeholder {
  height: 110rpx;
}
.coupon-tab {
  z-index: 1;
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  height: 88rpx;
  border-top: 1rpx solid #e2e2e2;
  border-bottom: 1rpx solid #e2e2e2;
  position: fixed;
  left: 0rpx;
  right: 0rpx;
  top: 0rpx;
}
.selected-tab-item {
  flex: 1;
  line-height: 87rpx;
  text-align: center;
  height: 90rpx;
  border-bottom: 2px solid #CB3F3F;
  color: #CB3F3F;
}
.tab-item {
  flex: 1;
  height: 90rpx;
  text-align: center;
  line-height: 88rpx;
  align-items: center;
  justify-content: center;
}
</style>