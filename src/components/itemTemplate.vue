<template>
  <div class="item-box">
    <div class="list-item flex-style" :class="itemData.isCloth? 'hasCloth' : ''">
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
            <div>&nbsp</div>
          </div>
          <a v-if="itemData.isCloth" class="check-cloth-report" href="/pages/webView/main">查看验布报告</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["itemData"]   
}
</script>

<style>
.item-box{
  display:block;
}
.list-item{
  position:relative;
  border-bottom:1rpx solid #eee;
  padding:20rpx 20rpx 0 20rpx;
}
.hasCloth{
  padding-bottom:40rpx;
}
.item-img{
  width:130rpx;
  height:130rpx;
}
.item-title{
  
}
.item-flex-style{
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.item-center{
  font-size:28rpx;
  color:#333;
  margin-left:20rpx;
  line-height:45rpx;
  width:60%;
}
.item-detail{
  color:#999;
  font-size:24rpx;
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
  position:absolute;
  right:20rpx;
  bottom:20rpx;
  line-height:52rpx;
  font-size:24rpx;
}
.item-right{
  text-align:right;
  width:20%;
}
</style>
