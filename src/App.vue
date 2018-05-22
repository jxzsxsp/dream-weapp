<script>
import './iconFont/iconfont.css';
import http from '@/utils/http'

// 登录wx.login
const quietLogin = function(){
  const token = wx.getStorageSync('token') || ''        // token
  // const systemInfo = wx.getStorageSync('systemInfo') || ''  // request请求时必须要封装的参数（由后端决定）
  if(!token){
    wx.login({
      success (res){
        if (res.code) {
          // if(systemInfo){
            // http.saveSystemInfo();
            http.quietLogin(res.code);
          // }else{
            // http.quietLogin(res.code);
            // getUserInfo(res.code);
          // }
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail () {
        wx.showToast({
          title: '获取登录信息失败，请从新登录',
          icon: 'none',
          mask: true
        })
      },
      complete () {
      }
    })
  }
}
// 获取微信user信息wx.getUserInfo
const getUserInfo = function(code){
  wx.getUserInfo({
    withCredentials: true,
    success (res){ 
      console.log(res);
      http.saveSystemInfo(res);
      http.quietLogin(code);
    },
    fail (res){
        wx.showToast({
        title: '获取用户信息失败',
        icon: 'none',
        mask: true
      })
    },
    complete () {

    }
  })
}

export default {
  created () {
    http.saveSystemInfo();
    quietLogin();
    // getUserInfo();
  },
}
</script>

<style>
page {
  height: 100%;
  background-color:#F4F4F4;
}
.container-with-footer {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #F4F4F4;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  box-sizing: border-box;
  background-color: #F4F4F4;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
