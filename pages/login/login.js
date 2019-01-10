import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constants from '../../constant/index'

const props = {
}

const data = {
  authLogin: true,
  authMobile: false
}

const lifecycle = {
  onLoad: function (query) {
    console.log(query)

  },
}

const privateMethods = {

  /**
   * 授权成功 跳转回原页面
   */
  navigateBack: function () {
    let pages = getCurrentPages();
    
    if (pages.length > 1) {
      $wx.navigateBack()
    } else {
      $wx.switchTab($wx.router.mainPage)
    }
  },

}

const viewAction = {
  authorLogin: function(d, v) {

    let code = ''
    return $wx.login().then(res => {
      code = res.code
    }).then(() => {
      return $wx.getUserInfo({ withCredentials: true })
    }).then(res => {
      const data = { 
        code, 
        appId: constants.APP_GLOBAL.appId, 
        domainName: constants.APP_GLOBAL.domainName, 
        rawData: res.rawData, 
        signature: res.signature, 
        encryptedData: res.encryptedData, 
        iv: res.iv 
      }
      return http.getLogin(urls.login.quietLogin, data, true)
    }).then(res => {
      if (res.token) {
        return { code: 1, message: '获取token成功' }
      } else if (res.bindId) {
        return { code: -2, message: '需要绑定手机号', bindId: res.bindId }
      }

      this.setData({
        authLogin: false,
        authMobile: true
      })

      // $wx.app.saveAuthInfo();
      // this.navigateBack();
    }).catch((res) => {
      console.log(res)
    })

  },
  getPhoneNumber: function (d, v) {
    console.log(d, v)

  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)