<template>
  <div class="coupon-item">
    <div class="item-left">
      <div class="price">
        <p class="price-unit">￥</p>
        <p class="price-amount">88</p>
      </div>
      <p class="price-restrict">满5000可用</p>
    </div>
    <div class="item-center">
      <p class="title">仅限链尚白条支付</p>
      <p class="use-restrict">仅限首单使用</p>
      <p class="use-date">使用与2018.04.05</p>
    </div>
    <div class="item-right">
      <!-- <img class="image" :src="imgUrl"/> -->
    </div>
  </div>
</template>

<script>
export default {

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
  color: #999999;
  font-size: 36rpx;
  margin-top: 20rpx;
}
.price-amount {
  color: #999999;
  font-size: 72rpx;
}
.price-restrict {
  font-size: 28rpx;
  color: #999999;
  text-align: center;
  margin-bottom: 36rpx;
}
.item-center {
  display: flex;
  flex-direction: column;
  padding-left: 20rpx;
  padding-top: 34rpx;
  padding-bottom: 33rpx;
  width: 400rpx;
  justify-content: space-between;
}
.title {
  font-size: 36rpx;
  color: #999999;
}
.use-restrict {
  font-size: 26rpx;
  color: #999999;
}
.use-date {
  margin-top: 3rpx;
  font-size: 26rpx;
  color: #999999;
}
.item-right {
  flex: 1;
  justify-content: center;
  align-items: center;
}
.image {
  height: 120rpx;
  width: 124rpx;
}
</style>