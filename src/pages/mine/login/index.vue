<template>
  <div class="container" >
    <div class="input-box">
      <div class="input-item">
          <i class="iconfont icon-shouji"></i>
          <input type='number' maxlength="11" v-model="mobile" class="inputField" v-on:input="validateValue" placeholder="请输入手机号" />
      </div>
      <div class="input-item">
          <i class="iconfont icon-yanzhengma"></i>
          <input type='number' maxlength="6" class="inputField inputCode" v-model="identificateCode" v-on:input="validateValue" placeholder="请输入验证码" />
          <button open-type="getUserInfo"  @click="getCode(mobile)" class="getCodeButton">{{codeButtonMessage}}</button>
      </div>
      <button class="button-login" :class="isCanclick? 'canClick' : ''" @click="lsLogin">登录</button>
      <div class="navigator">
        <a class="navigator-text" href="/pages/mine/register/main">去注册</a>
        <i class="iconfont icon-jiantou"></i>
      </div>
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
            title: '请输入11位手机号',
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
              // console.log(resp.token);
              wx.setStorageSync('token', resp.token);
              wx.setStorageSync('lsUserInfo', resp);
              wx.setStorageSync("mobile", resp.mobile);
              var loginToUrl = wx.getStorageSync('loginToUrl');
              if(loginToUrl){
                wx.removeStorage({"key":"loginToUrl"})
              }
              wx.redirectTo({
                url: loginToUrl || '/pages/mine/index/main'
              })
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
                   lang:'zh_CN',
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
                that.codeButtonMessage = (+time+'s后请重试');
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
  },
  onLoad() {
    console.log("onLoad");
    this.identificateCode='';
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
}
</script>

<style scoped>
@import '../common/login.css';
</style>
