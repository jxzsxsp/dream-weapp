
/**
＊  用法：
＊    1. 引入文件 import listBottomLoading from '@/template/list-bottom-loading'
＊    2. data里声明对象
        loadingData: {
          isLoading: 1,                   // 0显示loading，1显示没有更多了，2表示没有相关订单
          loadingText: '没有更多了'         // 1提示语 默认："我是有底线的"
          noOrderTips: '您还没有相关订单'    // 2提示语 默认："您还没有相关订单"
          noItemImgType: 1,               // 0:无订单 1:无优惠券 默认0
        }
      3. 引入插件 <listBottomLoading :loadingDate="loadingDate"></listBottomLoading>
 */
<template>
  <div class="loading">
    <div class="no-order" v-if="loadingData.isLoading == 2">
      <img :class="noItemImg.style" :src="noItemImg.img">
      <p>{{loadingData.noOrderTips?loadingData.noOrderTips:"您还没有相关订单"}}</p>
    </div>
    <div class="has-order loader" v-if="loadingData.isLoading != 2">
      <i class="iconfont icon-jiazailoading-A" v-if="loadingData.isLoading == 0"></i>
      <div class="loader-end" v-if="loadingData.isLoading == 1">
        <span class="line"></span>
        <span class="disc"></span>
        <span class="text">{{loadingData.loadingText?loadingData.loadingText:"我是有底线的"}}</span>
        <span class="disc"></span>
        <span class="line"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['loadingData'],
  data() {
    return {
      noOrderIcon: require('@/images/no-order.png'),
      noCouponIcon: require('@/images/no-coupon.png')
    }
  },
  computed: {
    noItemImg () {
      switch (this.loadingData.noItemImgType) {
        case 0:
          return ({
            img: this.noOrderIcon,
            style: 'no-order-img'
          })
        case 1:
          return ({
            img: this.noCouponIcon,
            style: 'no-coupon-img'
          })
        default:
          return ({
            img: this.noOrderIcon,
            style: 'no-order-img'
          })
      }
    }
  }
}
</script>

<style>
.no-order{
  text-align: center;
}
.no-order-img{
  width: 333rpx;
  height: 313rpx;
  margin-top: 160rpx;
}
.no-coupon-img {
  width: 225rpx;
  height: 154rpx;
  margin-top: 250rpx;
}
.no-order p{
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #999999;
}
.loader{
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    overflow: hidden;
  }
  .loader i{
    font-size: 50rpx;
    color: #666666;
    -webkit-animation: ls-loading .4s linear infinite;
    animation: ls-loading .4s linear infinite;
  }
  @keyframes ls-loading
{
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(359deg);
  }
}
@-webkit-keyframes ls-loading
{
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(359deg);
  }
}
.loader-end{
  text-align: center;
  vertical-align: middle;
}
.loader-end .line{
  height: 1rpx;
  background-color: #999999;
  width: 60rpx;
  display: inline-block;
  margin: 0 10rpx; 
  vertical-align: middle;
}
.loader-end .disc{
  width: 6rpx;
  height: 6rpx;
  display: inline-block;
  background-color: #999999;
  vertical-align: middle;
  border-radius: 50%;
}
.loader-end .text{
  font-size: 24rpx;
  color: #999999;
  line-height: 90rpx;
  margin:0 30rpx;
}
</style>
