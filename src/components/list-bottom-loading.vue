
/**
＊  用法：
＊    1. 引入文件 import listBottomLoading from '@/template/list-bottom-loading'
＊    2. data里声明对象
        loadingData: {
          isLoading: true,          //是否显示loading
          loadingText: '没有更多了'   // 提示语 默认："我是有底线的"
        }
      3. 引入插件 <listBottomLoading :loadingDate="loadingDate"></listBottomLoading>
 */
<template>
  <div class="loading">
    <div class="no-order" ng-if="!hasOrder">
      <img :src="noOrderIcon" alt="">
      <p>{{loadingData.noOrderTips}}</p>
    </div>
    <div class="has-order loader" ng-if="hasOrder">
      <i class="iconfont icon-jiazailoading-A" v-if="loading"></i>
      <div class="loader-end" v-if="isLoading">
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
  data: {
    noOrderIcon:require('@/images/no-order.png'),
    hasOrder: false,
    loading: true,
  },
  // created () {
  //   if(!this.loadingData.noOrderTips) this.loadingData.noOrderTips = "您还没有相关订单";

  //   if(this.loadingData.isLoading == 0){
      
  //   }else if(this.loadingData.isLoading == 1){

  //   }else if(this.loadingData.isLoading == 2){

  //   }
  // }
}
</script>

<style>
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
