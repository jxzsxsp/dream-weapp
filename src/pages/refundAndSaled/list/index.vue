<template>
<div>
  <div class="order-tab">
    <ul>
      <li :class="status == 1?'current':''" @click="changeStatus(1)">退款</li>
      <li :class="status == 2?'current':''" @click="changeStatus(2)">售后</li>
    </ul>
  </div>
  <div class="list">
    <ul>
      <li class="list-li" v-for="(listItem, index) in list" :key="index">
        <div class="list-top">
          <span class="lt-left">{{listItem.applyTime}}</span>
          <span class="lt-right red">{{listItem.statusText}}</span>
        </div>
        <div v-for="(item,itemIndex) in listItem.refundItemList" :key="itemIndex">
          <itemTemplate :itemData="item"></itemTemplate>
        </div>
      </li>
    </ul>
  </div>
  <listBottomLoading :loadingData="loadingData"></listBottomLoading>
</div>
</template>

<script>
import store from './store'
import listBottomLoading from '@/components/list-bottom-loading'
import itemTemplate from '@/components/goodsItem'

export default {
  components: {
    listBottomLoading,
    itemTemplate
  },
  computed: {
    loadingData (){
      return {
        isLoading: store.state.isLoading,
        loadingText: '没有更多了',
        noOrderTips: "您还没有相关订单"
      }
    },
    status (){
      return store.state.status || -1;
    },
    list(){
      return store.state.list || [];
    },
    isPullDownRefresh(){
      return store.state.isPullDownRefresh;
    }
  },
  
  // 下拉刷新
  onPullDownRefresh (){
    store.dispatch('refresh',true);
  },
  // 懒加载
  onReachBottom () {
    store.dispatch('reachBottom');
  },
  
  methods: {
    changeStatus (status) {
      store.dispatch('changeStatus',status);
    }
  },
  mounted(){
    var status = this.$root.$mp.query.status || 1;
    store.dispatch('changeStatus',status);
  },
  watch: {
    isPullDownRefresh: function(){
      wx.stopPullDownRefresh();
    }
  }
}
</script>
<style>
  page{
    background-color: #F4F4F4;
  }
  .order-tab {
    background-color: #ffffff;
    height: 88rpx;
    border-top: 1rpx solid #e2e2e2;
    border-bottom: 1rpx solid #e2e2e2;
  }
  .order-tab ul{
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    box-sizing: border-box;
    height: 88rpx;
    line-height: 88rpx;
  }
  .order-tab ul li{
    text-align: center;
    font-size: 28rpx;
    color: #666666;
    flex:1;
  }
  .order-tab ul li.current{
    border-bottom: 2px solid #CB3F3F;
    color: #CB3F3F;
  }
  .list-li{
    margin-top: 20rpx;
    background-color: #ffffff;
  }
  .list-top{
    margin-left: 20rpx;
    border-bottom: 1rpx solid #e2e2e2;
    height: 70rpx;
    line-height: 70rpx;
    color: #666666;
    font-size: 28rpx;
  }
  .list-top .lt-right{
    float: right;
    margin-right: 20rpx;
  }
  .red{
    color: #CB3F3F;
  }
  .list-bottom{
    height: 80rpx;
    line-height: 80rpx;
    text-align: right;
    color: #666666;
    font-size: 24rpx;
    padding-right: 20rpx;
  }
  .money{
    color: #CB3F3F;
    font-size: 30rpx;
  }
</style>
