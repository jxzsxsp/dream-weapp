<template>
  <div class="info-container">
    <div class="order-item">
      <p class="font-detail gray-color">订单编号: &nbsp;&nbsp;</p>
      <p class="font-detail">{{ orderDetail.tradeId }}</p>
    </div>
    <div class="order-item">
      <p class="font-detail gray-color">下单时间: &nbsp;&nbsp;</p>
      <p class="font-detail">{{ orderDetail.orderTime }}</p>
    </div>
    <div class="order-item">
      <p class="font-detail gray-color">申请时间: &nbsp;&nbsp;</p>
      <p class="font-detail">{{ orderDetail.applyTime }}</p>
    </div>
    <div class="order-item">
      <p class="font-detail gray-color">申请原因: &nbsp;&nbsp;</p>
      <p class="font-detail">{{ orderDetail.refundDesc || '无' }}</p>
    </div>
    <div class="order-item">
      <p class="font-detail gray-color">赔付要求: &nbsp;&nbsp;</p>
      <p class="font-detail">{{ orderDetail.compensateDesc || '无' }}</p>
    </div>
    <div class="order-item" v-if="orderDetail.status !== 1">
      <p class="font-detail gray-color">完成时间: &nbsp;&nbsp;</p>
      <p class="font-detail">{{ orderDetail.refundFinishTime }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["orderDetail"]
}
</script>

<style>
.info-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 22rpx;
  background: #FFFFFF;
  border: 1rpx solid #DBDBDB;
  border-left: none;
  border-right: none;
}
.order-item {
  display: flex;
  margin-left: 20rpx;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
  height: 40rpx;
}
.font-detail {
  font-size: 28rpx;
}
.gray-color {
  color: #666666;
}
</style>