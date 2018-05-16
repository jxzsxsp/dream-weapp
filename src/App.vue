<script>
import './iconFont/iconfont.css';
import httpClass from './utils/http'
var http = new httpClass();

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
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
