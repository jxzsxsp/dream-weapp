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

    if(query && query.bindId) {
      this.setData({
        authLogin: false,
        authMobile: true,
        bindId: query.bindId
      })
    }
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
        $wx.app.saveAuthInfo();
        this.navigateBack();
      } else if (res.bindId) {
        this.setData({
          authLogin: false,
          authMobile: true,
          bindId: res.bindId
        })
      }

    }).catch((res) => {
      console.log(res)
    })

  },
  getPhoneNumber: function (d, v) {
    console.log(d, v)

    const data = {
      appId: constant.APP_GLOBAL.appId,
      domainName: constant.APP_GLOBAL.domainName,
      bindId: this.data.bindId,
      rawData: '',
      signature: '',
      encryptedData: v.encryptedData,
      iv: v.iv,
    }
    
    http.postLogin(urls.login.bindWechatMobile, data).then(res => {
      $wx.app.saveAuthInfo();
      this.navigateBack();
    })

  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)