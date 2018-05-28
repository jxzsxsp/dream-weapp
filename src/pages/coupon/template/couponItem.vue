<template>
  <div class="coupon-item" :class="itemData.status === 1 ? 'red' : 'grey'">
    <div class="item-left">
      <div class="price">
        <p class="price-unit">￥</p>
        <p class="price-amount">{{ itemData.couponAmount }}</p>
      </div>
      <p class="price-restrict">满{{ itemData.minTradeAmount }}元可用</p>
    </div>
    <div class="item-center" :class="itemData.status === 1 ? 'red' : 'grey'">
      <p class="title">{{ itemData.couponItemTypeText }}</p>
      <p class="use-restrict" v-if="itemData.conditionDesc">{{ itemData.conditionDesc}}</p>
      <p class="use-date" v-if="itemData.period">{{ itemData.period }}</p>
      <p class="use-date" v-if="itemData.useTime">使用于{{ itemData.useTime }}</p>
    </div>
    <div class="item-right">
      <i class="iconfont icon-img_coupon_used icon" v-if="itemData.status === 2"></i>
      <i class="iconfont icon-img_coupon_disabled icon" v-if="itemData.status === 4"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["itemData"],

}
</script>
<style>
.coupon-item {
  background-color: white;
  height: 200rpx;
  display: flex;
  border-bottom: 1rpx solid #e2e2e2; 
}
.item-left {
  display: flex;
  flex-direction: column;
  width: 246rpx;
}
.price {
  margin-top: 30rpx;
  justify-content: center;
  display: flex;
}
.price-unit {
  /* color: #999999; */
  font-size: 36rpx;
  margin-top: 20rpx;
}
.price-amount {
  /* color: #999999; */
  font-size: 72rpx;
}
.price-restrict {
  font-size: 28rpx;
  /* color: #999999; */
  text-align: center;
  margin-bottom: 36rpx;
}
.item-center {
  /* color: red; */
  display: flex;
  flex-direction: column;
  padding-left: 20rpx;
  padding-top: 34rpx;
  padding-bottom: 33rpx;
  width: 300rpx;
  justify-content: center;
}
.title {
  font-size: 36rpx;
  /* color: #999999; */
}
.use-restrict {
  font-size: 26rpx;
  color: #999999;
  margin-top: 20rpx;
}
.use-date {
  font-size: 26rpx;
  /* color: #999999; */
  margin-top: 20rpx;
}
.item-right {
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.icon {
  font-size: 120rpx;
}
.red {
  color: red;
}
.grey {
  color: #999999;
}
</style>