<template>
  <div class="container">
    <div class="order-status">
      <img class="status-bg" :src="statusBg" background-size="cover"/>
      <div class="status-content flex-style">
        <div class="status-text">订单待收货</div>
        <i class="iconfont icon-jiantou"></i>
      </div>
    </div>
    <div class="order-address flex-style">
        <i class="iconfont icon-jiantou order-address-left"></i>
        <div>
           <div><span>洛菲菲</span><span class="telephone">18397654678</span></div>
           <div class="order-address-text">上海市沪太路1111弄1号楼11楼</div>
        </div>
    </div>
    <div class="order-list">
        <div class="goods-info padding-style">这里是商品信息</div>
        <div class="goods-info padding-style">这里是商品信息</div>
        <div class="goods-price-info">
            <div class="flex-style padding-style">
              <div class="goods-item-key">商品总价</div>
              <div class="goods-item-value">¥456.00</div>
            </div>
            <div class="flex-style padding-style">
                <div class="goods-item-key">运费</div>
                <div class="goods-item-value">¥456.00</div>
            </div>
            <div class="flex-style padding-style">
                <div class="goods-item-key">优惠券</div>
                <div class="goods-item-value">-¥456.00</div>
            </div>
            <div class="flex-style padding-style">
                <div class="goods-item-key">实付款</div>
                <div class="goods-item-value color-red">¥456.00</div>
            </div>
        </div>
    </div>
    <div class="order-info">
            <div class="flex-style padding-style">
              <div class="goods-item-key">订单编号</div>
              <div class="goods-item-value flex-style"><i class="btn-copy">复制</i>302929843477523494</div>
            </div>
            <div class="flex-style padding-style">
                <div class="goods-item-key">下单时间</div>
                <div class="goods-item-value">2018-05-08 19:00:12</div>
            </div>
            <div class="flex-style padding-style">
                <div class="goods-item-key">支付方式</div>
                <div class="goods-item-value">支付宝</div>
            </div>
        </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
     statusBg:require('../../../images/statusBg.png'),
    }
  },
  computed: {
    
  },
  methods: {
    
  }
}

</script>
<style>
page{
  background: #F4F4F4;
}
.container{
  height:100%;
  padding:0;
  background: #eee;
}
.order-status{
  width:100%;
  position:relative;
  margin-bottom:20rpx;
}
.status-bg{
  width:100%;
  height:140rpx;
  position:absolute;
  z-index:0;
}
.flex-style{
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.status-content{
  padding:0 20rpx;
  line-height:140rpx;
  color:#fff;
  font-size:34rpx;
  z-index:100;
  position: relative;
}
.order-address{
  width:750rpx;
  font-size:28rpx;
  justify-content: normal;
  padding:20rpx;
  align-items: normal;
  background:#fff;
}
.order-address-left{
  margin-right:20rpx;
  margin-left:20rpx;
}
.order-address-text{
  color:#666;
}
.telephone{
  margin-left:50rpx;
}
.order-list{
  padding:20rpx 20rpx;;
  width:100%;
  margin-top:20rpx;
  background: #FFFFFF;
  border-top: 1rpx solid #DBDBDB;
  border-bottom: 1rpx solid #DBDBDB;
}
.goods-info{
  border-bottom:1rpx solid #DBDBDB;
}
.goods-price-info{
  padding-top:10rpx;
}
.padding-style{
  padding:0rpx 20rpx;
  font-size:28rpx;
  line-height:56rpx;
}
.goods-item-key{
  color:#666;
}
.goods-item-value{
  color:#000;
}
.color-red{
  color:#CB3F3F;
}
.order-info{
  width:100%;
  background:#fff;
  border:1rpx solid #DBDBDB;
  margin-top:20rpx;
}
.btn-copy{
  font-size:24rpx;
  color:#666;
  border:1rpx solid #666;
  margin-right:20rpx;
  line-height:30rpx;
  padding:0 10rpx;
  border-radius:8rpx;
}

</style>
