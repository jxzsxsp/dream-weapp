<template>
  <scroll-view class="scroll-view">
      <div class="status-bar">
        <img class="status-background-pic" :src="statusBackgroundPic" background-size="cover"/>
        <i class="iconfont" :class="orderStatus"></i>
        <p class="status-text">已成功</p>
      </div>

      <div>
        <div class="info-container">
          <div class="status-item">
            <p class="font-detail">申请金额</p>
            <p class="font-detail red-color">{{ '￥' + afterSaleDetail.amount }}</p>
          </div>
          <div class="seperator-line"></div>
          <div class="status-item">
            <p class="font-detail">退款类型</p>
            <p class="font-detail">退款/退货退款</p>
          </div>
          <div class="seperator-line"></div>
          <div class="status-item">
            <p class="font-detail">拒绝原因</p>
          </div>
          <div class="refuse-detail">
            <p class="font-detail">{{ afterSaleDetail.declineReason }}</p>
          </div>
          <div class="status-item">
            <p class="font-detail">查看退款凭证</p>
            <i class="iconfont icon-jiantou"></i>
          </div>
        </div>
      </div>

      <div class="info-container">
        <div class="goods-info">
          <p class="font-detail">商品信息</p>
        </div>
        <div class="goods-item" v-for="(order, index) in afterSaleDetail.refundItemList" :key="index">
          <goodsItem :itemData="itemData"></goodsItem>
        </div>
      </div>
      <orderDetail :orderDetail="afterSaleDetail"></orderDetail>
      <div class="content-footer">
        <p class="font-small-detail gray-color">如有疑问，可联系您的面料顾问</p>
        <p class="font-small-detail gray-color">客服电话：400-821-7111 (服务时间: 工作日9:00-18:00)</p>
      </div>
  </scroll-view>
</template>

<script>
import goodsItem from '@/components/goodsItem'
import orderDetail from '@/pages/refundAndSaled/template/orderDetail'

export default {
  components: {
    goodsItem,
    orderDetail
  },
  data () {
    return ({
      statusBackgroundPic: require('@/images/statusBg.png'),
      afterSaleDetail: require('./mockData'),
      itemData:{
        title: '我是商品信息我是商品头',
        itemImgUrl:require('@/images/statusBg.png'),
        'itemColorNum':'3',
        'itemColor':'白色',
        'itemStatus':'现货',
        'itemStyle':'样布',
        'price':'20.00',
        'unit':'米',
        'itemNum':'20',
        'isCloth':true
     }
    })
  },
  computed: {
    orderStatus: function () {
      let orderStatus = ''
      switch (this.afterSaleDetail.status) {
        case 1:
          orderStatus = 'icon-shijian'
          break
        case 2:
          orderStatus = 'icon-chenggong'
          break
        case 3:
          orderStatus = 'icon-quxiao'
          break
        case 4:
          orderStatus = 'icon-jujue'
          break
        default:
          break
      }
      return orderStatus
    }
  }
}
</script>

<style>
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
  flex-direction: column;
  display: flex;
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
</style>