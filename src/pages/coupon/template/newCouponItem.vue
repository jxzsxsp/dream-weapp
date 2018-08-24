<template>
  <div class="coupon-item">
    <img class="coupon-item-bg" :src="couponItemBg"/>
    <div class="item-left">
      <div class="price">
        <p class="price-unit">￥</p>
        <p class="price-amount">{{ itemData.couponAmount }}</p>
      </div>
      <p class="price-restrict">满{{ itemData.minTradeAmount }}元可用</p>
    </div>
    <div class="item-center">
      <p class="title">{{ itemData.couponItemTypeText }}</p>
      <p class="use-restrict">{{ itemData.conditionDesc}}</p>
      <p class="use-date">{{ itemData.period }}</p>
      <p class="use-date" v-if="itemData.remainDays>10">使用于{{ itemData.period }}</p>
      <p class="use-date" v-if="itemData.remainDays<=10 && itemData.remainDays>0">还剩{{ itemData.remainDays }}天到期</p>
    </div>
    <div class="item-right">
      <i class="iconfont icon-ic_coupon_ylq icon" v-if="getCouponStatus"></i>
    </div>
  </div>
</template>

<script>
//FIXME: 这里要删除 couponStatus 展示页不需要
export default {
  props: ["itemData", "couponStatus","getCouponStatus"],
  data () {
    return {
      couponItemBg: require('@/images/coupon_item.png')
    }
  }

}
</script>
<style scoped>
.coupon-item {
  height: 200rpx;
  display: flex;
  position: relative;
}
.coupon-item-bg {
  z-index: -1;
  position: absolute;
  top: 15rpx;
  left: 2.5%;
  height: 180rpx;
  width: 95%;
}
.item-left {
  display: flex;
  flex-direction: column;
  width: 246rpx;
  color: #FFFFFF;

}
.price {
  margin-top: 40rpx;
  align-content: center;
  margin-left: 30rpx;
  justify-content: flex-start;
  display: flex;
  height: 140rpx;
}
.price-unit {
  margin-top: 50rpx;
  font-size: 20rpx;
  text-align: end;
}
.price-amount {
  /* color: #999999; */
  font-size: 70rpx;
}
.price-restrict {
  font-size: 24rpx;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: left;
  margin-bottom: 30rpx;
  margin-left: 40rpx
}
.item-center {

  display: flex;
  flex-direction: column;
  padding-left: 60rpx;
  padding-top: 34rpx;
  padding-bottom: 33rpx;
  width: 300rpx;
  justify-content: center;
  align-content: center;

}
.title{
  color: #333333;
  font-size: 26rpx;
}
.use-restrict {
  color: #333333;
  font-size: 26rpx;

}
.use-date {
  color: #333333;
  font-size: 26rpx;
}
.item-right {
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.icon {
  font-size: 120rpx;
  color: #999999;
}
</style>
