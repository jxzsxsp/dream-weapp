<template>
  <scroll-view class="scroll-view">
    <div class="container-with-footer">
      <div class="content-header">
        <div class="status-bar">
          <img class="status-background-pic" :src="statusBackgroundPic" background-size="cover"/>
          <i class="iconfont" :class="orderStatus"></i>
          <p class="status-text"> 已成功 </p>
        </div>
        <div>
          <div class="info-container" v-if="afterSaleDetail.refund.refundStatus === 2">
            <div class="status-item">
              <p class="font-detail">退款金额</p>
              <p class="font-detail red-color"> ￥90.00 </p>
            </div>
            <div class="seperator-line"></div>
            <div class="status-item">
              <p class="font-detail">查看退款凭证</p>
              <i class="iconfont icon-jiantou"></i>
            </div>
          </div>
          <div class="info-container" v-if="afterSaleDetail.refund.refundStatus === 2">
            <div class="status-item">
              <p class="font-detail">赔付方式</p>
              <p class="font-detail">无需打款</p>
            </div>
          </div>
          <div class="info-container" v-if="afterSaleDetail.refund.refundStatus === 2">
            <div class="status-item">
              <p class="font-detail">拒绝原因</p>
            </div>
            <div class="refuse-detail">
              <p class="font-detail">与描述不与描述与描述不与描述与描述不与描述与描述不与描述与描述不与描述与描述不与描述与描述不与描述与描述不与描述与描述不与描述与描述不与描述与描述不与描述与描述不与描述与描述不与描述与描述不与描述</p>
            </div>
          </div>
        </div>
        <div class="info-container">
          <div class="goods-info">
            <p class="font-detail">商品信息</p>
          </div>
          <div class="goods-item" v-for="(order, index) in afterSaleDetail.refundItemList" :key="index">
            <img class="goods-img" :src="statusBackgroundPic"/>
            <div class="goods-info-detail">
              

            </div>
          </div>
        </div>
        <div class="info-container">
          <div class="order-item">
            <p class="font-detail gray-color"> 订单编号: &nbsp;&nbsp; </p>
            <p class="font-detail"> 0987654312121212</p>
          </div>
          <div class="order-item">
            <p class="font-detail gray-color"> 下单时间: &nbsp;&nbsp; </p>
            <p class="font-detail"> 0987654312121212</p>
          </div>
          <div class="order-item">
            <p class="font-detail gray-color"> 申请时间: &nbsp;&nbsp; </p>
            <p class="font-detail"> 0987654312121212</p>
          </div>
          <div class="order-item">
            <p class="font-detail gray-color"> 申请原因: &nbsp;&nbsp; </p>
            <p class="font-detail"> 0987654312121212</p>
          </div>
          <div class="order-item">
            <p class="font-detail gray-color"> 赔付要求: &nbsp;&nbsp; </p>
            <p class="font-detail"> 0987654312121212</p>
          </div>
          <div class="order-item" v-if="afterSaleDetail.refund.refundStatus !== 1">
            <p class="font-detail gray-color"> 完成时间: &nbsp;&nbsp; </p>
            <p class="font-detail"> 0987654312121212</p>
          </div>
        </div>
      </div>
      <div class="content-footer">
        <p class="font-small-detail gray-color"> 如有疑问，可联系您的面料顾问 </p>
        <p class="font-small-detail gray-color"> 客服电话：400-821-7111 (服务时间: 工作日9:00-18:00) </p>
      </div>
    </div>
  </scroll-view>
</template>

<script>
export default {
  data () {
    return ({
      statusBackgroundPic: require('../../../../images/statusBg.png'),
      afterSaleDetail: require('./mockData')
    })
  },
  computed: {
    orderStatus: function () {
      let orderStatus = ''
      switch (this.afterSaleDetail.refund.refundStatus) {
        case 1:
          orderStatus = 'icon-shijian'
          break;
        case 2:
          orderStatus = 'icon-chenggong'
          break;
        case 3:
          orderStatus = 'icon-quxiao'
          break;
        case 4:
          orderStatus = 'icon-jujue'
          break;
        default:
          break;
      }
      return orderStatus
    },
  }
}

</script>

<style>
.content-header {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}
.status-bar {
  margin-bottom: 22rpx; 
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 1;
  align-items: center;
  height: 140rpx;
}
.status-background-pic {
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
}
.iconfont {
  font-size: 40rpx;
  color: white;
  margin-left: 21rpx;
}
.status-text {
  margin-left: 10rpx;
  color: white;
  size: 36rpx;
}
.info-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 22rpx;
  background: #FFFFFF;
  border: 1rpx solid #DBDBDB;
  border-left: none;
  border-right: none;
}
.status-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
}
.red-color {
  color: red;
}
.gray-color {
  color: #666666;
}
.font-detail {
  font-size: 28rpx;
}
.font-small-detail {
  font-size: 24rpx;
}
.seperator-line {
  height: 1rpx;
  background: #DBDBDB;
  margin-left: 20rpx;
}
.icon-jiantou {
  color: #999999;
}
.refuse-detail {
  padding-left: 40rpx;
  padding-right: 40rpx;
  padding-top: 5rpx;
  padding-bottom: 20rpx;
  min-height: 100rpx;
}
.goods-info {
  display: flex;
  margin-left: 20rpx;
  flex-direction: column;
  justify-content: center;
  height: 80rpx;
}
.goods-item {
  display: flex;
  height: 170rpx;
  align-items: center;
}
.goods-img {
  margin-left: 20rpx;
  height: 130rpx;
  width: 130rpx;
}
.goods-info-detail {
  margin-left: 20rpx;
  margin-right: 20rpx;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: red;
  height: 130rpx;
}
.order-item {
  display: flex;
  margin-left: 20rpx;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
  height: 40rpx;
}
.content-footer {
  margin-bottom: 20rpx;
  margin-top: 80rpx;
  position: flex;
  flex-direction: column;
  align-items: center;
  height: 66rpx;
  text-align: center;

}
</style>