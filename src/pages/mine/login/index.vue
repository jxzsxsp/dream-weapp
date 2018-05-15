<template>
  <div class="container" >
    <div class="input-box">
      <div class="input-item">
          <i class="iconfont icon-shouji"></i>
          <input type='text' v-model="mobile" class="inputField" placeholder="请输入手机号"/>
      </div>
      <div class="input-item">
          <i class="iconfont icon-yanzhengma"></i>
          <input maxlength="6" class="inputField inputCode" v-model="code" placeholder="请输入验证码">
          <a @click="getCode(mobile,code)" class="getCodeButton">{{codeButtonMessage}}</a>
      </div>
      <button class="button-login" @click="lsLogin(mobile,code)">登录</button>
    </div>
  </div>
</template>

<script>
// import inputField from '@/components/inputField'

export default {
  data () {
    return {
      mobile: '',
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
    getUserInfo () {
      // 调用登录接口
      // wx.login({
      //   success: () => {
      //     wx.getUserInfo({
      //       success: (res) => {
      //         this.userInfo = res.userInfo
      //       }
      //     })
      //   }
      // })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    
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
    lsLogin (mobile,code){
      if(mobile!=""&&code!=""){
        this.isCanclick = true;
        if(!this.isMbilePhone(mobile)){
          wx.showToast({
            title: '请输入正确的手机号码',
            icon: 'none',
            mask: true
          })   
        }else{
          // wx.request({
          //   url: 'https://m.lianshang.cn/ef/sendFinanceSms?userCode',
          //   data: {
          //     mobile: mobile ,
          //     code:code
          //   },
          //   header: {
          //       'content-type': 'application/json' // 默认值
          //   },
          //   success: function(res) {
          //     console.log(res.data)
          //   }
          // })
        }
      }
    },
    getCode (mobile,code,button) {
      if (mobile ==''){
        wx.showToast({
          title: '请输入手机号码',
          icon: 'none',
          mask: true
        })
      }else if(!this.isMbilePhone(mobile)){
        wx.showToast({
          title: '请输入正确的手机号码',
          icon: 'none',
          mask: true
        })    
      }else{
            if(!this.isTimeDown){
              this.timedown(5);
            }else{
              console.log('点过啦')
              return;
            }
            
          // wx.request({
          //   url: 'https://m.lianshang.cn/ef/sendFinanceSms?userCode',
          //   data: {
          //     mobile: account ,
          //     type:1
          //   },
          //   header: {
          //       'content-type': 'application/json' // 默认值
          //   },
          //   success: function(res) {
          //     console.log(res.data)
          //   }
          // })
      }
    },
    isMbilePhone(s){
        var reg =/^1((3\d)|(4[579])|(5[0-3,5-9])|(7[013,5-8])|(8\d))\d{8}$/
        return reg.test(s);
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style>
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
  padding-left:5rpx;
  color:#999;
  margin-left:20rpx;

}
.getCodeButton{
    top: -10rpx;
    right:0rpx;
    font-size: 28rpx;
    width: 175rpx;
    line-height:64rpx;
    position: absolute;
    text-align: center;
    border:1rpx solid #333;
    border-radius:8rpx;
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
</style>
