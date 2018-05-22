<template>
  <div class="list-item">
    <div class="item-left">
      <img class="item-img" :src="itemData.itemImg"/>
    </div>
    <div class="item-center">
      <div class="item-title">{{ itemData.itemName }}</div>
      <div class="item-detail">{{ itemData.skuProperties }}</div>
      <div class="item-style">{{ itemType }}</div>
    </div>
    <div class="item-right">
      <div class="item-price-detail">
        <p class="item-price">¥{{ itemData.price }}{{ itemData.quantityUnit }}</p>
        <p class="item-quantity">×{{ itemData.quantity }}</p>
      </div>
      <p v-if="showCheckClothBtn" class="check-cloth-report" @click="_checkCloth">查看验布报告</p>
      <p class="item-status" v-if="itemData.buyerRefundStatusText">{{ itemData.buyerRefundStatusText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["itemData", "showCheckClothBtn"],
  computed: {
    itemType: function () {
      let itemType = ''
      switch (this.itemData.itemTypeId) {
        case 1:
          itemType = '样卡'
          break
        case 2:
          itemType = '样布'
          break
        case 3:
          itemType = '大货'
          break
        default:
          break
      }
      return itemType
    }
  },
  methods: {
    _checkCloth: function () {
      wx.navigateTo({
        url: `@/webView/main?url=${ this.itemData.targetUrl }`
      })
    }
  }
}
</script>

<style>
.list-item{
  display: flex;
  border-bottom:1rpx solid #eee;
  padding: 20rpx;
}
.item-img{
  width:130rpx;
  height:130rpx;
}
.item-center{
  font-size:28rpx;
  color:#333;
  margin-left:20rpx;
  height: 130rpx;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}
.item-detail{
  margin-top: 10rpx;
  color: #999;
  font-size: 24rpx;
  flex: 1;
}
.item-price-detail{
  margin-top: 10rpx;
  color: #999;
  font-size: 24rpx;
  height: 100rpx;
}
.item-quantity {
  margin-top: 10rpx;
}
.item-style{
  width:70rpx;
  height:30rpx;
  font-size: 20rpx;
  color: #FFFFFF;
  letter-spacing: 0;
  background: #EA776B;
  border-radius: 3rpx;
  line-height:30rpx;
  text-align:center;
}
.check-cloth-report{
  background: #FFFFFF;
  border: 1px solid #333333;
  border-radius: 8rpx;
  width:183rpx;
  text-align:center;
  height: 40rpx;
  font-size:24rpx;
}
.item-status {
  text-align: right;
  color: #eeb650;
}
.item-right{
  text-align:right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.item-title{
  text-overflow: ellipsis;
  height: 40rpx;
  overflow: hidden;
  white-space:nowrap;
}
</style>
