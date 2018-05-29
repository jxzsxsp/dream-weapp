<template>
  <div class="container" @click="clickHandle">
    <button class="getUserInfo-btn" :class="wxUserInfo?'none':''" open-type="getUserInfo" lang="zh_CN" @click="getAuthor()"></button>
    <div class="my-account" v-if="token">
      <img class="head-pic" :src="lsUserInfo.avatar" background-size="cover" />
      <span class="ls-name">{{lsUserInfo.imNickName}}</span>
      <img class="my-account-bg" :src="myAccountBg" background-size="cover" />
    </div>
    <div class="my-account" v-if="!token">
      <img class="head-pic" :src="headPic" background-size="cover" />
      <div class="ls-name" @click="goToRegister('/pages/mine/register/main')">注册/</div>
      <div class="ls-name" @click="goToRegister('/pages/mine/login/main')">登录</div>
      <img class="my-account-bg" :src="myAccountBg" background-size="cover" />
    </div>
    <div class="my-item">
      <div class="my-title order-title">
        <div class="my-title-l my-title-item"><i class="iconfont icon-dingdan icon-red"></i><span>我的订单</span></div>
        <div class="my-title-r my-title-item" @click="navigateTo('/pages/order/list/main')">全部<i class="iconfont icon-jiantou"></i></div>
      </div>
      <div class="order-tabs">
        <div class="index-order-item" v-for="(order, index) in orderStatus" :key="index" @click="navigateTo(order.href)">
          <i v-if="(statusCount[index+1]) && token" class="superscript">{{statusCount[index+1]}}</i>
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
    <div class="mask" v-if="(isSwitch && !token) || isRegister">
      <div class="coupon-modal" :class="!isRegister? 'showReceive' : ''">
        <div class="in-coupon-modal">
          <div class="coupon-title">520元新人礼</div>
          <div v-if="!isRegister && !token" class="coupon-con">未下单用户注册登录送520元大礼包</div>
          <div v-if="isRegister" class="coupon-con">已放入你的账户 <span class="mobile">{{mobile}}</span></div>
          <img class="couponListImg" :src="couponListImg" />
        </div>
        <div v-if="!isRegister" class="go-register-btn" @click="receive()">立即领取</div>
        <div v-if="isRegister" class="follow">关注公众号可参加更多优惠</div>
        <i class="iconfont icon-quxiao" @click="hideCouponModal()"></i>
      </div>
    </div>
    <img v-if="isSwitchGif && !isRegister && !token" @click="showIconGift" class="iconGift" :src="iconGift" />
  </div>
</template>

<script>
  import indexFucClass from "./store";
  import http from "@/utils/http";
  var indexFuc = new indexFucClass();
  
  export default {
    data() {
      return {
        wxUserInfo: false,
        isRegister: false,
        href: "",
        isSwitch: false,
        isSwitchGif: false,
        mobile: wx.getStorageSync("mobile"),
        token: wx.getStorageSync("token") ? wx.getSystemInfoSync("token") : "",
        lsUserInfo: wx.getStorageSync("lsUserInfo"),
        headPic: require("../../../images/headPic.png"),
        myAccountBg: require("../../../images/bg-b.png"),
        couponListImg: require("../../../images/couponList.png"),
        iconGift: require("../../../images/newPresent.png"),
        orderStatus: [{
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
      goToRegister(url) {
        wx.navigateTo({
          url: url
        });
      },
      lsLogout() {
        var that = this;
        wx.showModal({
          content: "您确认退出登录吗？",
          success: function(res) {
            if (res.confirm) {
              http.post("/buyer/user/mini-app/logout/v1", {}, true, "").then(
                function(resp) {
                  wx.setStorageSync("token", "");
                  wx.setStorageSync("lsUserInfo", {});
                  that.token = wx.getStorageSync("token");
                },
                function(resp) {
                  console.log(resp);
                }
              );
            } else if (res.cancel) {}
          }
        });
      },
      navigateTo(href) {
        wx.navigateTo({
          url: href
        });
      },
      hideCouponModal() {
        this.isSwitch = false;
        this.isRegister = false;
        this.isSwitchGif = true;
      },
      receive() {
        wx.navigateTo({
          url: "/pages/mine/register/main"
        });
      },
      showIconGift() {
        this.isSwitch = true;
        this.isSwitchGif = false;
      },
      getAuthor() {
        this.getSetting();
      },
      getSetting() {
        var that = this;
        wx.getSetting({
          success(res) {
            if (res.authSetting["scope.userInfo"]) {
              that.wxUserInfo = true;
              http.post("/buyer/switch/coupon/v1", {}, true, "").then(resp => {
                that.isSwitch = resp.switch;
              });
            }
            if (!res.authSetting["scope.userInfo"]) {
              wx.getUserInfo({
                withCredentials: true,
                success: res => {
                  that.wxUserInfo = true;
                  wx.setStorageSync("wxUserInfo", true);
                  http.post("/buyer/switch/coupon/v1", {}, true, "").then(resp => {
                    that.isSwitch = resp.switch;
                  });
                },
                fail: resp => {
                  // 拒绝授权
                  wx.openSetting({
                    success: res => {
                      if (res.authSetting["scope.userInfo"]) {
                        console.log("111111111111");
                        that.wxUserInfo = true;
                        wx.setStorageSync("wxUserInfo", true);
                        http.post("/buyer/switch/coupon/v1", {}, true, "").then(resp => {
                          that.isSwitch = resp.switch;
                        });
                      } else {
                        console.log("22222222");
                      }
                    },
                    fail: res => {
                      if (res.authSetting["scope.userInfo"]) {}
                    }
                  });
                }
              });
            }
          },
          fail(res) {
            console.log("拒绝");
          }
        });
      }
    },
    onLoad() {
      var that = this;
      // 授权开始
      wx.getSetting({
        success(res) {
          if (res.authSetting["scope.userInfo"]) {
            that.wxUserInfo = true;
            http.post("/buyer/switch/coupon/v1", {}, true, "").then(resp => {
                that.isSwitch = resp.switch;
            });
          }
          if (!res.authSetting["scope.userInfo"]) {
            that.wxUserInfo = false;
          }
        },
        fail(res) {
          console.log("拒绝");
        }
      });
      // 授权结束
      this.token = wx.getStorageSync("token");
      this.mobile = wx.getStorageSync("mobile");
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
      }
      // 授权结束
    },
    onReady() {
      console.log("ready");
    },
    mounted() {
      console.log("mounted");
      this.isRegister = this.$root.$mp.query.isRegister;
      console.log(this.isRegister + "0999");
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
  
  .button {
    background: none;
    margin: 0;
    /* color:#fff; */
    border-radius: 0;
    border: none;
    position: static;
    padding: 0;
  }
  
  .button::after {
    border: none;
    border-radius: none;
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
    color: #fff;
    padding: 0;
  }
  
  .my-item {
    width: 100%;
    background: #fff;
    margin-top: 20rpx;
    border-top: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
    font-size: 28rpx;
    line-height: 46rpx;
    padding: 0;
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
    padding: 0;
    line-height: 50rpx;
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
  
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 20;
    top: 0;
    left: 0;
  }
  
  .coupon-modal {
    width: 523rpx;
    background: #fff;
    padding: 0;
    z-index: 100;
    border-radius: 10rpx;
    line-height: 116rpx;
    padding: 40rpx 50rpx 0;
    margin: 120rpx auto;
  }
  
  .showReceive {
    padding-bottom: 40rpx;
  }
  
  .in-coupon-modal {
    padding: 0 15rpx;
    height: 654rpx;
  }
  
  .icon-quxiao {
    position: absolute;
    z-index: 20;
    color: #fff;
    margin-top: 60rpx;
    left: 50%;
    margin-left: -35rpx;
    font-size: 60rpx;
  }
  
  .couponListImg {
    width: 497rpx;
    height: 530rpx;
  }
  
  .coupon-title {
    font-size: 48rpx;
    text-align: center;
    line-height: 40rpx;
    font-weight: bold;
  }
  
  .coupon-con {
    font-size: 24rpx;
    text-align: center;
    line-height: 60rpx;
  }
  
  .go-register-btn {
    width: 497rpx;
    line-height: 100rpx;
    text-align: center;
    background: #d0021b;
    border-radius: 13rpx;
    color: #fff;
    margin: 0 auto;
  }
  
  .iconGift {
    width: 106rpx;
    height: 80rpx;
    position: absolute;
    bottom: 107rpx;
    right: 10rpx;
  }
  
  .mobile {
    color: #d0021b;
  }
  
  .follow {
    font-size: 24rpx;
    color: #333333;
    line-height: 100rpx;
    text-align: center;
    border-top: 1rpx solid #d8d8d8;
  }
  
  .getUserInfo-btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: transparent;
  }
  
  .none {
    display: none;
  }
</style>
