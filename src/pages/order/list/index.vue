<template>
<div>
  <div class="order-tab">
    <ul>
      <li class="current">全部</li>
      <li>待付款</li>
      <li>待发货</li>
      <li>待收货</li>
      <li>已收货</li>
    </ul>
  </div>
  <div class="list">
    <ul>
      <li class="list-li" v-for="(order, index) in orderList" :key="index">
        <div class="list-top">
          <span class="lt-left">{{order.tradeInfo.createtime}}</span>
          <span class="lt-right red">{{order.tradeInfo.showStatus}}</span>
        </div>
        <div v-for="(item,itemIndex) in order.tradeItemList" :key="itemIndex">
          <itemTemplate :itemData="item"></itemTemplate>
        </div>
        <div class="list-bottom">
          共{{order.tradeItemList.lenght}}件商品，合计 
          <span class="money">¥{{order.tradeInfo.payableFee}}</span> 
          （含运费¥{{order.tradeInfo.freightFee}}）
        </div>
      </li>
    </ul>
  </div>
  <listBottomLoading :loadingData="loadingData"></listBottomLoading>
</div>


</template>

<script>
// Use Vuex
import store from './store'
import listBottomLoading from '@/components/list-bottom-loading'
import itemTemplate from '../template/itemTemplate'

var orderList =  [
      {
        "tradeInfo": {
          "shopId": 0,
          "showStatus": "已取消",
          "showStatusId": 11,
          "tradeId": 1737730580040234,
          "userName": "juanqi",
          "userId": 13,
          "buyerIMUserName": "LS-13",
          "createtime": "2017-02-14 11:38:58",
          "mobileno": "13818250402",
          "totalFee": 1,
          "modifyFee": 0,
          "payableFee": 1,
          "couponFee": 0,
          "paymentFee": 0,
          "status": "CANCEL",
          "statusId": 6,
          "payTime": "",
          "deliverTime": "",
          "receiveTime": "",
          "cancelRemainingTime": 0,
          "payTypeId": 0,
          "totalPeriod": 0,
          "payPeriod": 0,
          "refundStatus": 0,
          "orderType": 0,
          "stagingStatus": 0,
          "stagingStatusText": "",
          "showPayableFeeTitle": "应付金额",
          "showPayableFee": "1.00",
          "feeType": 0,
          "clothCheckStatus": 0,//0:未验布,1:验布完成 2.验布中 3.申请验布(新增) 4.待验布 5验布关闭    1即验布完成，2/3/4表示验布服务
          "canApplyClothCheck":true,//是否可以申請验布
          "memo": "",
          "useCoupon": false
        },
        "tradeItemList": [
          {
            "tradeId": 1737730580040234,
            "skuId": 796031,
            "itemId": 131171792,
            "itemName": "aaa",
            "itemImg": "http://imgtest.lianshang.cn/data/common/20168/5/6115_1471501251139.jpg?x-oss-process=style/p_w_80",
            "itemType": "SWATCH",
            "itemTypeId": 2,
            "outerSku": "",
            "skuProperties": "紫红色/现货",
            "quantity": 1,
            "quantityUnit": "米",
            "price": 1,
            "currencyUnit": 2,
            "adjustFee": 0,
            "itemRootCategoryId": 2,
            "itemTypeDisplayIndicate": 5,
            "itemAmount": 1,
            "priceAndUnit": "",
            "skuValues": "紫红色/现货",
            "memo": "",
            "targetUrl": "",//如果有链接,表明可以跳转,没有不跳转
            "clothCheckStatus": 0, //1.未开始  4.待确认  7.验布完成
            "clothCheckStatusText": "不验布",
            "buyerRefundStatus":1,//买家退款状态. 1买家申请 2.审核通过 3.审核拒绝 4.撤回申请
            "buyerRefundStatusText":"退款中,等待审核",
            "refundButtonText":"查看退款",//为空则不展示按钮
            "refundButtonTargetUrl":"https://m.lianshang.com/refund/detail/1111"
          }
        ],
        "shopInfo": {
          "shopId": 2010004,
          "shopStatus": 1,
          "shopName": "ls-86",
          "shopLogo": "http://img.lianshang.cn/data/user/s/20161/5/8485_1452920346723.jpg",
          "closeReasonType": 0,
          "closeReasonRemark": "",
          "shopScore": 35,
          "shopLevel": 1,
          "platform": 1,
          "normalInvoice": 0,
          "vatInvoice": 0,
          "location": "唐山市",
          "shopIMUserName": "LS-2010004",
          "companyNature": 1,
          "companyNatureName": "生产商",
          "companyBusinessNames": "梭织棉纺涤棉布、提花",
          "close": false
        },
        "isShowStagingTips": false,
        "logisticInfo": {
          "logisticsType": "NO",
          "logisticsCompanyId": 0,
          "logisticsCompanyName": "任意物流",
          "logisticsSn": "",
          "logisticsTypeId": 0,
          "logisticsTypeText": "任意物流",
          "tradeStatusId": 6
        },
        "stagingRefuseReason": "",
        "isHasMultiTradeItem": false,
        "isIousTrade":true,//是否支持白条支付方式
      },
      {
        "tradeInfo": {
          "shopId": 0,
          "showStatus": "已取消",
          "showStatusId": 11,
          "tradeId": 1737730580040234,
          "userName": "juanqi",
          "userId": 13,
          "buyerIMUserName": "LS-13",
          "createtime": "2017-02-14 11:38:58",
          "mobileno": "13818250402",
          "totalFee": 1,
          "modifyFee": 0,
          "payableFee": 1,
          "couponFee": 0,
          "paymentFee": 0,
          "status": "CANCEL",
          "statusId": 6,
          "payTime": "",
          "deliverTime": "",
          "receiveTime": "",
          "cancelRemainingTime": 0,
          "payTypeId": 0,
          "totalPeriod": 0,
          "payPeriod": 0,
          "refundStatus": 0,
          "orderType": 0,
          "stagingStatus": 0,
          "stagingStatusText": "",
          "showPayableFeeTitle": "应付金额",
          "showPayableFee": "1.00",
          "feeType": 0,
          "clothCheckStatus": 0,//0:未验布,1:验布完成 2.验布中 3.申请验布(新增) 4.待验布 5验布关闭    1即验布完成，2/3/4表示验布服务
          "canApplyClothCheck":true,//是否可以申請验布
          "memo": "",
          "useCoupon": false
        },
        "tradeItemList": [
          {
            "tradeId": 1737730580040234,
            "skuId": 796031,
            "itemId": 131171792,
            "itemName": "aaa",
            "itemImg": "http://imgtest.lianshang.cn/data/common/20168/5/6115_1471501251139.jpg?x-oss-process=style/p_w_80",
            "itemType": "SWATCH",
            "itemTypeId": 2,
            "outerSku": "",
            "skuProperties": "紫红色/现货",
            "quantity": 1,
            "quantityUnit": "米",
            "price": 1,
            "currencyUnit": 2,
            "adjustFee": 0,
            "itemRootCategoryId": 2,
            "itemTypeDisplayIndicate": 5,
            "itemAmount": 1,
            "priceAndUnit": "",
            "skuValues": "紫红色/现货",
            "memo": "",
            "targetUrl": "",//如果有链接,表明可以跳转,没有不跳转
            "clothCheckStatus": 0, //1.未开始  4.待确认  7.验布完成
            "clothCheckStatusText": "不验布",
            "buyerRefundStatus":1,//买家退款状态. 1买家申请 2.审核通过 3.审核拒绝 4.撤回申请
            "buyerRefundStatusText":"退款中,等待审核",
            "refundButtonText":"查看退款",//为空则不展示按钮
            "refundButtonTargetUrl":"https://m.lianshang.com/refund/detail/1111"
          }
        ],
        "shopInfo": {
          "shopId": 2010004,
          "shopStatus": 1,
          "shopName": "ls-86",
          "shopLogo": "http://img.lianshang.cn/data/user/s/20161/5/8485_1452920346723.jpg",
          "closeReasonType": 0,
          "closeReasonRemark": "",
          "shopScore": 35,
          "shopLevel": 1,
          "platform": 1,
          "normalInvoice": 0,
          "vatInvoice": 0,
          "location": "唐山市",
          "shopIMUserName": "LS-2010004",
          "companyNature": 1,
          "companyNatureName": "生产商",
          "companyBusinessNames": "梭织棉纺涤棉布、提花",
          "close": false
        },
        "isShowStagingTips": false,
        "logisticInfo": {
          "logisticsType": "NO",
          "logisticsCompanyId": 0,
          "logisticsCompanyName": "任意物流",
          "logisticsSn": "",
          "logisticsTypeId": 0,
          "logisticsTypeText": "任意物流",
          "tradeStatusId": 6
        },
        "stagingRefuseReason": "",
        "isHasMultiTradeItem": false,
        "isIousTrade":true,//是否支持白条支付方式
      }
    ]




export default {
  components: {
    listBottomLoading,
    itemTemplate
  },
  data: {
    loadingData: {
      isLoading: false,
      // loadingText: '没有更多了'  
    },
    orderList: orderList
  },
  computed: {
    count () {
      // return store.state.count
    }
  },
  // 下拉刷新
  onPullDownRefresh (){

    wx.stopPullDownRefresh();
  },
  // 懒加载
  onReachBottom () {

  },
  methods: {
    // increment () {
    //   store.commit('increment')
    // },
    // decrement () {
    //   store.commit('decrement')
    // }
  },
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
