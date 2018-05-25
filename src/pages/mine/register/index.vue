<template>
  <div class="container" >
    <div class="input-box">
      <div class="input-item">
          <i class="iconfont icon-ic_user_name"></i>
          <input type='text' maxlength="20" v-model="name" class="inputField" v-on:input="validateValue" placeholder="请输入姓名" />
      </div>
      <div class="input-item">
          <i class="iconfont icon-ic_company_name"></i>
          <input type='text' maxlength="20" v-model="companyName" class="inputField" v-on:input="validateValue" placeholder="请输入公司名称/店铺名称" />
      </div>
      <div class="input-item">
          <i class="iconfont icon-shouji"></i>
          <input type='text' v-model="mobile" class="inputField" v-on:input="validateValue" placeholder="请输入手机号" />
      </div>
      <div class="input-item last-input-item">
          <i class="iconfont icon-yanzhengma"></i>
          <input maxlength="6" class="inputField inputCode" v-model="identificateCode" v-on:input="validateValue" placeholder="请输入验证码" />
          <button open-type="getUserInfo"  @click="getCode(mobile)" class="getCodeButton">{{codeButtonMessage}}</button>
      </div>
       <div class="argeement flex-style">
          <i class="iconfont" :class="iconClass" @click="_readAgreement()"></i>
          <span class="agreement-text flex-style">我已阅读并同意 
            <a :href="'/pages/webView/main?url=' +  msitesHost +'/subject/service/register_agreement.html'" class="agreement-xieyi">《链尚用户注册协议》</a>
          </span>
      </div>
      <button class="button-login" :class="isCanclick? 'canClick' : ''" @click="lsRegister">注册</button>
      <div class="navigator">
        <a class="navigator-text" href="/pages/mine/login/main">已有账号，登录</a>
        <i class="iconfont icon-jiantou"></i>
      </div>
    </div>
  </div>
</template>

<script>

import form from '../../../utils/formValidate'
import http from '@/utils/http'
import config from '@/config/env'
var formValidate = new form();

export default {
  data () {
    return {
      name:'',
      companyName:'',
      mobile: '',
      identificateCode:'',
      code: '',
      userInfo: {},
      codeButtonMessage: '获取验证码',
      isTimeDown:false,
      isCanclick:false,
      isRead:false,
      msitesHost: config.msitesBaseUrl,
      iconClass:'icon-ic_gou_kong'
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
      if(this.mobile!="" && this.identificateCode!="" && this.name!="" && this.companyName!="" && this.isRead){
        that.isCanclick=true;
      }else{
        that.isCanclick=false;
      }
    },

    lsRegister (){
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
    },
    _readAgreement() {
      if(this.iconClass == 'icon-ic_gou_kong'){
        this.iconClass = 'icon-ic_gou_shi'
        this.isRead = true;
      }else{
        this.iconClass = 'icon-ic_gou_kong'
        this.isRead = false;
      }
      if(this.mobile!="" && this.identificateCode!="" && this.name!="" && this.companyName!=""){
        this.isCanclick = true;
      }else{
        this.isCanclick = false;
      }
      
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
