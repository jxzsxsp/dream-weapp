<template>
  <div class="container">
    <div class="order-status">
      <img class="status-bg" :src="statusBg" background-size="cover"/>
      <div class="status-content flex-style" @click="showRate()">
        <div class="status-text">订单待收货</div>
        <i class="iconfont icon-jiantou"></i>
      </div>
    </div>
    <div class="order-address">
        <i class="iconfont icon-jiantou order-address-left"></i>
        <div>
           <div><span>洛菲菲</span><span class="telephone">18397654678</span></div>
           <div class="order-address-text">上海市沪太路1111弄1号楼11楼</div>
        </div>
    </div>
    <div class="order-list">
        <item 
               :title="title" 
               :itemImgUrl="statusBg" 
               :itemColorNum="itemColorNum" 
               :itemColor="itemColor" 
               :itemStatus="itemStatus" 
               :itemStyle="itemStyle"
               :price="price"
               :unit="unit"
               :itemNum='itemNum'
               :isCloth='isCloth'
               >
            </item>
            <item 
               :title="title" 
               :itemImgUrl="statusBg" 
               :itemColorNum="itemColorNum" 
               :itemColor="itemColor" 
               :itemStatus="itemStatus" 
               :itemStyle="itemStyle"
               :price="price"
               :unit="unit"
               :itemNum='itemNum'
               :isCloth='isCloth'
               >
            </item>
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
              <div class="goods-item-value flex-style">
                <button class="btn-copy" data-clipboard-text="302929843477523494" @click="copy">复制</button>
                302929843477523494
              </div>
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
    <ul class="rate-modal" v-if="isShowRate">
      <!-- <div class="step-icon"></div> -->
      <li class="rate-list flex-style">
        <i class="rate-cancel rate-icon rate-current"></i>
        <i class="rate-line"></i>
        <span>订单已取消</span>
        <span class="rate-time">05-08 12:08:30</span>
      </li>
      <li class="rate-list flex-style">
        <i class="rate-cancel rate-icon"></i>
         <i class="rate-line"></i>
        <span>订单已取消</span>
        <span class="rate-time">05-08 12:08:30</span>
      </li>
      <li class="rate-list flex-style">
        <i class="rate-cancel rate-icon"></i>
         <i class="rate-line"></i>
        <span>订单已取消</span>
        <span class="rate-time">05-08 12:08:30</span>
      </li>
     <li class="rate-list flex-style">
        <i class="rate-cancel rate-icon"></i>
        <span>订单已取消</span>
        <span class="rate-time">05-08 12:08:30</span>
      </li>
      <i class="iconfont icon-quxiao" @click="hideRate()"></i>
    </ul>
    <div class="mask" v-if="isShowRate"></div>
  </div>
</template>

<script>
import cloth from '@/components/cloth'
import item from '@/components/item'
import Clipboard from 'clipboard'
export default {
  components: {
    cloth,
    item
  },
  data () {
    return {
     statusBg:require('../../../images/statusBg.png'),
     src:'http://img.lianshang.cn/data/common/20185/5/499_1526033223216.pdf?Expires=1526300880&OSSAccessKeyId=8zE74tGMILBOSz1R&Signature=52mdP%2FCQBU12Ck9yD%2Fu6fh9dXq0%3D',
     isShowRate:false,
     title: '我是商品信息我是商品头',
     itemColorNum:'3',
     itemColor:'白色',
     itemStatus:'现货',
     itemStyle:'样布',
     price:'20.00',
     unit:'米',
     itemNum:'20',
     isCloth:true
    }
  },
  computed: {
    
  },
  methods: {
    showRate() {
      this.isShowRate=true;
    },
    hideRate() {
      this.isShowRate=false;
    },
    copy() {  
        var clipboard = new Clipboard('.btn-copy')  
        clipboard.on('success', e => {  
          console.log('复制成功')  
          // 释放内存  
          clipboard.destroy()  
        })  
        clipboard.on('error', e => {  
          // 不支持复制  
          console.log('该浏览器不支持自动复制')  
          // 释放内存  
          clipboard.destroy()  
        })  
      } 
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
  z-index:10;
  position: relative;
}
.order-address{
  width:750rpx;
  font-size:28rpx;
  justify-content: normal;
  padding:20rpx;
  align-items: normal;
  background:#fff;
  display:flex;
  flex-direction: row;
  align-items: center;
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
  padding:0rpx 20rpx;;
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
  position:fixed;
  background-color:rgba(0,0,0,0.5);
  z-index:20;
}
.rate-modal{
  width:60%;
  background: #fff;
  padding: 0;
  margin: 0;
  position: fixed;
  z-index:100;
  top:20%;
  border-radius:10rpx;
  line-height:116rpx;
  padding:40rpx 80rpx;
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
  top:68rpx;
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
/* 进度弹框结束 */
</style>
