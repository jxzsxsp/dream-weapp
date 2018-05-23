<template>
  <div class="container">
    <div class="order-status">
      <img class="status-bg" :src="statusBg" background-size="cover"/>
      <div class="status-content flex-style" @click="isShowRate=true">
        <div class="status-text">订单{{ orderDetail.tradeInfo.showStatus }}</div>
        <i class="iconfont icon-jiantou"></i>
      </div>
    </div>
    <div class="order-address">
        <i class="iconfont icon-zuobiao order-address-left"></i>
        <div class="order-address-detail">
           <div><span>{{ orderDetail.tradeInfo.userName }}</span><span class="telephone">{{ orderDetail.tradeInfo.mobileno }}</span></div>
           <div class="order-address-text">{{ orderDetail.addressInfo.address }}</div>
        </div>
    </div>
    <div class="order-list">
        <div class="goods-item" v-for="(itemData, index) in orderDetail.tradeItemList" :key="index">
          <goodsItem :itemData="itemData" :showCheckClothBtn=true></goodsItem>
        </div>
        <div class="goods-price-info">
            <div class="flex-style padding-style">
              <div class="goods-item-key">商品总价</div>
              <div class="goods-item-value">￥{{ orderDetail.tradeInfo.totalFee }}</div>
            </div>
            <div class="flex-style padding-style">
                <div class="goods-item-key">运费</div>
                <div class="goods-item-value">{{ orderDetail.tradeInfo.freightFee ? '￥' + orderDetail.tradeInfo.freightFee : '到付' }}</div>
            </div>
            <div class="flex-style padding-style">
                <div class="goods-item-key">优惠券</div>
                <div class="goods-item-value">-￥{{ orderDetail.tradeInfo.couponFee}}</div>
            </div>
            <div class="flex-style padding-style">
                <div class="goods-item-key">实付款</div>
                <div class="goods-item-value color-red">￥{{ orderDetail.tradeInfo.paymentFee }}</div>
            </div>
        </div>
    </div>
    <div class="order-info">
            <div class="flex-style padding-style">
              <div class="goods-item-key">订单编号</div>
              <div class="goods-item-value flex-style">
                <button class="btn-copy" @click="_copy">复制</button>
                {{ orderDetail.tradeInfo.tradeId}}
              </div>
            </div>
            <div class="flex-style padding-style">
                <div class="goods-item-key">下单时间</div>
                <div class="goods-item-value">{{ orderDetail.tradeInfo.createtime }}</div>
            </div>
            <div class="flex-style padding-style">
                <div class="goods-item-key">支付方式</div>
                <div class="goods-item-value">{{ orderDetail.tradeInfo.payMethodText }}</div>
            </div>
        </div>
    <div class="mask" v-if="isShowRate">
      <ul class="rate-modal">
      <!-- <div class="step-icon"></div> -->
      <li class="rate-list flex-style" v-for="(list, index) in rateList" :key="index">
        <i class="rate-cancel rate-icon" :class="index == 0?'rate-current':''"></i>
        <i v-if="index!=rateList.length-1" class="rate-line"></i>
        <span>{{list.memo}}</span>
        <span class="rate-time">{{list.operateTimeText}}</span>
      </li>
      <i class="iconfont icon-quxiao" @click="hideRate()"></i>
    </ul>
    </div>
  </div>
</template>

<script>
import goodsItem from '@/components/goodsItem'
import http from '@/utils/http'

export default {
  components: {
    goodsItem
  },
  data () {
    return {
      statusBg:require('@/images/statusBg.png'),
      isShowRate:false,
      orderDetail: {
        tradeInfo: {},
        addressInfo: {}
      },
      // 订单进度列表
      rateList: {},
      orderId: 0
    }
  },
  methods: {
    _getDetail () {
      http.post('/trade/detail/v3', { id: this.orderId }, true, '')
        .then((orderDetail) => {
          this.orderDetail = orderDetail
        })
    },
    _showRate() {
      this.isShowRate = false;
      http.post("/buyer/trade/progress/v1", { tradeId:this.orderId }, true, "")
        .then((progress) => {
          this.rateList = progress.list
        }
      )  
    },
    hideRate() {
      this.isShowRate=false;
    },
    _copy() {  
      wx.setClipboardData({
        data: this.orderDetail.tradeInfo.tradeId.toString(),
        success: function(res) {
          wx.showToast({
            title: '复制成功',
            icon: 'none'
          })
        },
      })
    } 
  },
  onLoad () {
    this.orderId = this.$root.$mp.query.id
    this._getDetail()
    this._showRate()
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
.goods-item {
  flex-direction: column;
  display: flex;
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
  z-index:10;
  position: relative;
}
.order-address{
  width:710rpx;
  font-size:28rpx;
  padding:20rpx;
  background:#fff;
  position:relative;
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
.check-cloth-report:hover{
  color:#333;
}
/* 进度弹框开始 */
.mask{
  width:100%;
  height:100%;
  position: fixed;
  background-color:rgba(0,0,0,0.5);
  z-index:20;
  top:0;
  left:0;
}
.rate-modal{
  width:543rpx;
  background: #fff;
  padding: 0;
  z-index:100;
  border-radius:10rpx;
  line-height:116rpx;
  padding:40rpx 40rpx;
  margin:220rpx auto;
}
.rate-list{
  font-size:30rpx;
  position:relative;
}
.rate-time{
  color:#666;
  font-size:26rpx;
}
.rate-icon{
  width:22rpx;
  height:22rpx;
  background: #D8D8D8;
  border-radius:50%;
}
.rate-current{
  background: #E26868;
}
.rate-line{
  position:absolute;
  left:10rpx;
  border-left:1rpx solid #D8D8D8;
  height:116rpx;
  top:70rpx;
}
.icon-quxiao{
  position:absolute;
  z-index:20;
  color:#fff;
  margin-top:60rpx;
  left:50%;
  margin-left:-35rpx;
  font-size:60rpx;
}
.order-address-detail{
  margin-left:70rpx;
  line-height:45rpx;
}
.icon-zuobiao{
  position:absolute;
  top:27rpx;
}
/* 进度弹框结束 */
</style>
