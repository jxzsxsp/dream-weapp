<template>
  <div class="container">
    <div class="my-account" v-if="token">
      <img class="head-pic" :src="headPic" background-size="cover"/>
      <span class="ls-name">秀</span>
    </div>
    <div class="my-account">
      <img class="head-pic" :src="headPic" background-size="cover"/>
      <a href="/pages/mine/login/main" class="ls-name">立即登录</a>
    </div>
    <div class="my-item">
      <div class="my-title order-title">
        <div class="my-title-l my-title-item"><i class="iconfont icon-dingdan icon-red"></i><span>我的订单</span></div>
        <div class="my-title-r my-title-item">全部<i class="iconfont icon-jiantou"></i></div>
      </div>
      <div class="order-tabs">
        <div class="order-item" v-for="(order, index) in orderStatus" :key="index">
            <i class="iconfont" :class="order.class"></i>
            <div class="order-item-text">{{order.text}}</div>
        </div>
        <!-- <div class="order-item">
            <i class="iconfont icon-daifahuo"></i>
            <div class="order-item-text">待发货</div>
        </div>
        <div class="order-item">
            <i class="iconfont icon-daishouhuo"></i>
            <div class="order-item-text">待收货</div>
        </div>
        <div class="order-item">
            <i class="iconfont icon-yishouhuo"></i>
            <div class="order-item-text">已收货</div>
        </div>
        <div class="order-item">
            <i class="iconfont icon-shouhou"></i>
            <div class="order-item-text">退款／售后</div>
        </div> -->
      </div>
    </div>
    <div class="my-item my-item">
      <div class="my-title" @click="clickHandle('test click', $event)">
          <div class="my-title-l my-title-item"><i class="iconfont icon-youhuiquan icon-red"></i><span>优惠券</span></div>
          <div class="my-title-r my-title-item"><i class="iconfont icon-jiantou"></i></div>
      </div>
    </div>
    <div class="telephone">客服电话：400-821-7111（服务时间：工作日9:00-18:00）</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      href:'',
      token:'',
      headPic : require('../../../images/headPic.png'),
      orderStatus:[
        {text:'待付款',class:'icon-daifukuan'},
        {text:'待发货',class:'icon-daifahuo'},
        {text:'待收货',class:'icon-daishouhuo'},
        {text:'已收货',class:'icon-yishouhuo'},
        {text:'退款／售后',class:'icon-shouhou'}
      ]
    }
  },
  components: {
    
  },
  methods: {
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },
  created () {
   
  },
}
</script>

<style>
page{
  height:100%;
  background:#F4F4F4;
}
.container {
  padding:0;
  display:block;
}
.my-account {
  width:750rpx;
  height:200rpx;
  background:#000;
  color:#fff;
  display:flex;
  font-size:26rpx;
  background-size:100%
}
.head-pic{
  width:100rpx;
  height:100rpx;
  border-radius: 50%;
  margin:44rpx 20rpx 0 20rpx;
}
.ls-name{
  line-height:200rpx;
}
 .my-item{
   width:100%;
   background:#fff;
   margin-top:20rpx;
   border-top: 1px solid #DBDBDB;
   border-bottom: 1px solid #DBDBDB;
   font-size:28rpx;
 }
 .my-title{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding:25rpx 20rpx;
 }

 .my-title-item{
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
 }
 .iconfont.icon-red{
   color:#d81e06;
   font-size:24rpx;
   margin-right:10rpx;
 }
 .iconfont.icon-jiantou{
   font-size:22rpx;
   margin-left:5rpx;
 }
 .my-title-r{
    font-size: 24rpx;
    color: #999999;
 }
 .order-tabs{
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding:0 20rpx;
    margin-top:10rpx;
    padding-bottom:30rpx;
 }
 .order-item{
   text-align:center;
   font-size:24rpx;
   color:#333;
 }
 .order-item-text{
   padding-top:30rpx;
 }
 .iconfont{
   font-size:50rpx;
 }
 .telephone{
   font-size: 24rpx;
   color: #999999;
   text-align:center;
   line-height:100rpx;
 }
</style>
