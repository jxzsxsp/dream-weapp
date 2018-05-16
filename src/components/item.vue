<template>
  <div class="item-box">
    <div class="list-item flex-style" :class="isCloth? 'hasCloth' : ''">
      <div class="item-left">
        <img class="item-img" :src="itemImgUrl"/>
      </div>
      <div class="item-center">
          <div class="item-title flex-style">
            <span class="in-item-title">{{title}}</span>
            <span>¥{{price}}{{unit}}</span>
          </div>
          <div class="item-detail flex-style">
            <div>色号:{{itemColorNum}} 颜色:{{itemColor}} 状态:{{itemStatus}}</div>
            <div>*{{itemNum}}</div>
          </div>
          <div class="item-style">{{itemStyle}}</div>
          <a v-if="isCloth" class="check-cloth-report" href="/pages/order/clothReport/main">查看验布报告</a>
      </div>
      <div class="item-right">
          <div class="item-detail"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['itemImgUrl', 'title', 'itemColorNum', 'itemColor', 'itemStatus', 'itemStyle','price','unit', 'itemNum', 'isCloth']
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
  width:550rpx;
  position:relative;
  margin-top:-25rpx;
}
.flex-style{
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.item-center{
  font-size:28rpx;
  color:#333;
  margin-left:20rpx;
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
  border-radius: 6px;
  width:183rpx;
  text-align:center;
  position:absolute;
  right:20rpx;
  bottom:20rpx;
}
</style>
