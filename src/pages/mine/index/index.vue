<template>
  <div class="container" @click="clickHandle">
    <div class="my-account" v-if="token">
      <img class="head-pic" :src="lsUserInfo.avatar" background-size="cover"/>
      <span class="ls-name">{{lsUserInfo.imNickName}}</span>
      <img class="my-account-bg" :src="myAccountBg" background-size="cover"/>
    </div>
    <div class="my-account" v-if="!token">
      <img class="head-pic" :src="headPic" background-size="cover"/>
      <a href="/pages/mine/register/main" class="ls-name">注册/</a>
      <a href="/pages/mine/login/main" class="ls-name">登录</a>
      <img class="my-account-bg" :src="myAccountBg" background-size="cover"/>
    </div>
    <div class="my-item">
      <div class="my-title order-title">
        <div class="my-title-l my-title-item"><i class="iconfont icon-dingdan icon-red"></i><span>我的订单</span></div>
        <div class="my-title-r my-title-item" @click="navigateTo('/pages/order/list/main')">全部<i class="iconfont icon-jiantou"></i></div>
      </div>
      <div class="order-tabs">
        <div class="index-order-item" v-for="(order, index) in orderStatus" :key="index" @click="navigateTo(order.href)">
            <i v-if="(statusCount[index+1] || statusCount[index+1]==0)&&token" class="superscript">{{statusCount[index+1]}}</i>
            <i class="iconfont" :class="order.class"></i>
            <div class="order-item-text">{{order.text}}</div>
        </div>
      </div>
    </div>
    <div class="my-item my-item">
      <div class="my-title" @click="clickHandle('test click', $event)">
          <div class="my-title-l my-title-item"><i class="iconfont icon-youhuiquan icon-red"></i><span>优惠券</span></div>
          <div class="my-title-r my-title-item"><i class="iconfont icon-jiantou"></i></div>
      </div>
    </div>
    <div class="telephone">客服电话：400-821-7111（服务时间：工作日9:00-18:00）</div>
    <div class="btn btn-default btn-lg btn-color-red btn-login-out" v-if="token" @click="lsLogout">退出登录</div>
    <div class="mask" v-if="isShowCouponModal">
      <div class="coupon-modal">
        <div class="coupon-title">520元新人礼</div>
        <div class="coupon-con">未下单用户注册登录送520元大礼包</div>
        <img class="couponListImg" :src="couponListImg"/>
        <div class="go-register-btn" @click="receive()">立即领取</div>
        <i class="iconfont icon-quxiao" @click="hideCouponModal()"></i>
      </div>
    </div>
    <img class="iconGift" :src="iconGift"/> 
  </div>
</template>

<script>

import indexFucClass from './store'
import http from '@/utils/http'
var indexFuc = new indexFucClass();

export default {
  data() {
    return {
      href: "",
      token: wx.getStorageSync("token") ? wx.getSystemInfoSync("token") : "",
      lsUserInfo: wx.getStorageSync("lsUserInfo"),
      headPic: require("../../../images/headPic.png"),
      myAccountBg: require("../../../images/bg-b.png"),
      isShowCouponModal:false,
      couponListImg:require("../../../images/couponList.png"),
      iconGift:require("../../../images/newPresent.png"),
      orderStatus: [
        {
          text: "待付款",
          class: "icon-daifukuan",
          href: "/pages/order/list/main?status=1"
        },
        {
          text: "待发货",
          class: "icon-daifahuo",
          href: "/pages/order/list/main?status=2"
        },
        {
          text: "待收货",
          class: "icon-daishouhuo",
          href: "/pages/order/list/main?status=3"
        },
        {
          text: "已收货",
          class: "icon-yishouhuo",
          href: "/pages/order/list/main?status=4"
        },
        {
          text: "退款/售后",
          class: "icon-shouhou",
          href: "/pages/refundAndSaled/list/main"
        }
      ],
      statusCount: {}
    };
  },
  components: {},
  methods: {
    clickHandle(msg, ev) {
      console.log("123");
      console.log(this.lsUserInfo);
    },
    lsLogout() {
      var that = this;
      wx.showModal({
        content: "您确认退出登录吗？",
        success: function(res) {
          if (res.confirm) {
            http.post("/buyer/user/mini-app/logout/v1", {}, true, "")
            .then(
              function(resp) {
                wx.clearStorageSync("token");
                wx.clearStorageSync("lsUserInfo");
                that.token = wx.getStorageSync("token");
              },
              function(resp) {
                console.log(resp);
              });
          } else if (res.cancel) {
          }
        }
      });
    },
    navigateTo(href) {
      if (this.token) {
        wx.navigateTo({
          url: href
        });
      } else {
        wx.navigateTo({
          url: "/pages/mine/login/main"
        });
      }
    },
    hideCouponModal() {
      this.isShowCouponModal = false;
    },
    receive() {
      wx.navigateTo({
          url: "/pages/mine/register/main"
      });
    }
  },
  onLoad() {
    console.log("load");
    this.token = wx.getStorageSync("token");
    this.lsUserInfo = wx.getStorageSync("lsUserInfo");
    var that = this;
    if (this.token) {
      http.post("/buyer/trade/status/count/v1", {}, true, "").then(
        function(resp) {
          console.log(resp.statusCount);
          that.statusCount = resp.statusCount;
          // wx.getStorageSync('statusCount',resp.data.statusCount);
        },
        function(resp) {
          console.log(resp);
        }
      );
    }else{
      this.isShowCouponModal = true;
      
    }
  },
  onReady() {
    console.log("ready");
  },
  mounted() {
    console.log("mounted");
  },
  created() {
    console.log("created");
  }
};
</script>

<style scoped>
page {
  height: 100%;
  background: #f4f4f4;
}
.container {
  padding: 0;
  display: block;
}
.my-account {
  width: 750rpx;
  height: 200rpx;
  color: #fff;
  display: flex;
  font-size: 26rpx;
  background-size: 100%;
  position: relative;
}
.my-account-bg {
  width: 750rpx;
  height: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
}
.head-pic {
  width: 114rpx;
  height: 114rpx;
  border-radius: 50%;
  margin: 44rpx 26rpx 0 20rpx;
  position: relative;
  z-index: 1;
}
.ls-name {
  line-height: 200rpx;
  position: relative;
  z-index: 1;
  font-size: 30rpx;
}
.my-item {
  width: 100%;
  background: #fff;
  margin-top: 20rpx;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  font-size: 28rpx;
}
.my-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 25rpx 20rpx;
}

.my-title-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.superscript {
  height: 24rpx;
  line-height: 24rpx;
  font-size: 20rpx;
  color: #fff;
  background: #d0021b;
  position: absolute;
  right: 32rpx;
  border-radius: 50%;
  padding: 3rpx 8rpx;
}
.iconfont.icon-red {
  color: #d81e06;
  font-size: 24rpx;
  margin-right: 10rpx;
}
.iconfont.icon-jiantou {
  font-size: 22rpx;
  margin-left: 5rpx;
}
.my-title-r {
  font-size: 24rpx;
  color: #999999;
}
.order-tabs {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20rpx;
  margin-top: 10rpx;
  padding-bottom: 30rpx;
}
.index-order-item {
  width: 20%;
  text-align: center;
  font-size: 24rpx;
  color: #333;
  position: relative;
}
.order-item-text {
  padding-top: 30rpx;
}
.iconfont {
  font-size: 50rpx;
}
.telephone {
  font-size: 24rpx;
  color: #999999;
  text-align: center;
  line-height: 100rpx;
}
/* 公用样式需抽出来 */
.btn {
  color: #333;
  font-size: 32rpx;
  text-align: center;
  margin: 0 auto;
  border-radius: 8rpx;
  line-height: 70rpx;
}
.btn-lg {
  width: 90%;
}
.btn-color-red {
  color: #cb3f3f;
  border: 1rpx solid #cb3f3f;
}
.btn-login-out {
  margin-top: 300rpx;
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
.coupon-modal{
  width:543rpx;
  background: #fff;
  padding: 0;
  z-index:100;
  border-radius:10rpx;
  line-height:116rpx;
  padding:40rpx 40rpx;
  margin:120rpx auto;
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
.couponListImg{
  width:543rpx;
  height:530rpx;
}
.coupon-title{
  font-size:30rpx;
  text-align:center;
  line-height:40rpx;
  font-weight: bold;
}
.coupon-con{
  font-size:24rpx;
  text-align:center;
  line-height:60rpx;
}
.go-register-btn{
  width:100%;
  line-height:100rpx;
  text-align:center;
  background: #D0021B;
  border-radius: 13rpx;
  color:#fff;
}
.iconGift{
  width:106rpx;
  height:80rpx;
}
</style>
