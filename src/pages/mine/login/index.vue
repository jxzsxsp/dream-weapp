<template>
  <div class="container" >
    <div class="input-box">
      <div class="input-item">
          <i class="iconfont icon-shouji"></i>
          <input type='text' v-model="mobile" class="inputField" v-on:input="validateValue" placeholder="请输入手机号" />
      </div>
      <div class="input-item">
          <i class="iconfont icon-yanzhengma"></i>
          <input maxlength="6" class="inputField inputCode" v-model="identificateCode" v-on:input="validateValue" placeholder="请输入验证码" />
          <button open-type="getUserInfo"  @click="getCode(mobile)" class="getCodeButton">{{codeButtonMessage}}</button>
      </div>
      <button class="button-login" :class="isCanclick? 'canClick' : ''" @click="lsLogin">登录</button>
    </div>
  </div>
</template>

<script>

import form from '../../../utils/formValidate'
import http from '@/utils/http'
var formValidate = new form();

export default {
  data () {
    return {
      mobile: '',
      identificateCode:'',
      code: '',
      userInfo: {},
      codeButtonMessage: '获取验证码',
      isTimeDown:false,
      isCanclick:false
    }
  },

  components: {
    // inputField
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    validateValue (){
      var that = this;
      if(this.mobile!="" && this.identificateCode!=""){
        that.isCanclick=true;
      }else{
        that.isCanclick=false;
      }
    },

    lsLogin (){
      if(this.isCanclick){
        if(!formValidate.isMobilePhone(this.mobile)){
           wx.showToast({
            title: '手机号不正确！',
            icon: 'none',
            mask: true
          })
        }else{
          var data = {
              mobile:this.mobile,
              code:this.identificateCode,
          }
          http.post('/user/fastLogin/v2', data, true, '')
          .then(
            function(resp){
              console.log(resp.token);
              wx.setStorageSync('token', resp.token);
              wx.setStorageSync('lsUserInfo', resp);
              var pages = getCurrentPages(); // 当前页面  
              var beforePage = pages[pages.length - 2]; // 前一个页面  
              console.log(beforePage);  
              if(beforePage){
                wx.navigateBack({  
                    success: function() {  
                        beforePage.onLoad(); // 执行前一个页面的onLoad方法  
                    }  
                });  
              }else{
                wx.navigateTo({
                  url: '/pages/mine/index/main'
                })
              }
            },
            function(resp){
              console.log(resp)
            }
          )
        }
      } 
    },
    getCode (mobile) {
      var that = this;
      if (formValidate.validateMobilePhone(mobile)){
        if(!this.isTimeDown){
          // 调用微信登录接口
          wx.login({
            success: (resp) => {
              this.code = resp.code;
               wx.getUserInfo({
                   withCredentials : true,
                   success: (res) => {
                    this.userInfo = res
                    // 调用获取验证码接口
                    var data={
                        mobile:mobile,
                        code:this.code,
                        encryptedData:res.encryptedData,
                        iv:res.iv
                    }
                    http.post('/buyer/user/mini-app/send-login-sms/v1', data, true, '')
                    .then(
                      function(resp){
                        console.log('9999999');
                        that.timedown(60);
                      },function(resp){
                        wx.showToast({
                          title:resp.message
                        })
                      }
                    )
                  },
                  fail:(resp) =>{
                    console.log(resp)
                  }
              })
            }
          })
        }else{
          console.log('点过啦')
          return;
        }
      }
    },
    /**
    * 倒计时
    */
    timedown(time) {
        let that = this;
        var timer1 = setInterval(function(){ 
            if(time>0){
                time--;
                that.codeButtonMessage = (+time+'秒后重发');
                that.isTimeDown = true;
            }else{
                clearInterval(timer1);
                that.codeButtonMessage = '重新发送';
                that.isTimeDown = false;
            }
        },1000)
    }
  },
  created () {
    console.log('888888')
    // 调用应用实例的方法获取全局数据
  }
}
</script>

<style scoped>
page {
  height: 100%;
}
.text{
  color:#fff;
}
.container {
  display:block;
  padding:20px 0;
}
.input-box{
  margin:20px 0;
  width:100%;
}
.input-item{
  width:88%;
  font-size:30rpx;
  margin:0 auto;
  margin-bottom:50rpx;
  position:relative;
  border-bottom:1rpx solid #ccc;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.inputField{
  width:100%;
  height:70rpx;
  padding-left:20rpx;
  color:#333;
  margin-left:20rpx;
}
.getCodeButton{
    top: -10rpx;
    right:0rpx;
    font-size: 28rpx;
    line-height:64rpx;
    position: absolute;
    text-align: center;
    border:1rpx solid #333;
    border-radius:14rpx;
    z-index:100;

}
.button-login{
  background: #CB3F3F;
  color:#DE8585;
  border-radius: 6px;
  width:88%;
  height:80rpx;
  line-height:80rpx;
  margin:0 auto;
  font-size:30rpx;
  margin-top:90rpx;
}
.iconfont{
  width:20rpx;
}
.canClick{
  color:#fff;
}
</style>
