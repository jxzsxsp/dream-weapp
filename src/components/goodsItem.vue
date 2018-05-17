<template>
  <div class="list-item">
    <div class="item-left">
      <img class="item-img" :src="itemData.itemImgUrl"/>
    </div>
    <div class="item-center">
      <div class="item-title">{{itemData.title}}</div>
      <div class="item-detail">色号:{{itemData.itemColorNum}} 颜色:{{itemData.itemColor}} 状态:{{itemData.itemStatus}}</div>
      <div class="item-style">{{itemData.itemStyle}}</div>
    </div>
    <div class="item-right">
      <div class="item-detail">
        <span>¥{{itemData.price}}{{unit}}</span>
        <div>×{{itemData.itemNum}}</div>
        <div>&nbsp;</div>
      </div>
      <p v-if="itemData.isCloth" class="check-cloth-report" @click="_checkCloth">查看验布报告</p>
      <p v-if="itemData.status">{{ itemData.status }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["itemData"],
  methods: {
    _checkCloth: function () {
      wx.navigateTo({
        url: '../../webView/main?url=http://www.baidu.com'
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
  color: #999;
  font-size: 24rpx;
  margin-top: 10rpx;
  flex: 1;
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
  right:20rpx;
  bottom:20rpx;
  height: 40rpx;
  font-size:24rpx;
}
.item-right{
  text-align:right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
