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
      this.props.bindId = query.bindId
      this.setData({
        authLogin: false,
        authMobile: true,
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
  login: function () {
    return $wx.login().then(res => {
      this.props.code = res.code
    }).then(() => {
      return $wx.getUserInfo({ withCredentials: true })
    }).then(res => {
      const data = {
        code: this.props.code,
        appId: constants.APP_GLOBAL.appId,
        domainName: constants.APP_GLOBAL.domainName,
        rawData: res.rawData,
        signature: res.signature,
        encryptedData: res.encryptedData,
        iv: res.iv
      }
      return http.getLogin(urls.login.quietLogin, data, true)
    }).catch((res) => {
      console.log(res)
    })
  },
  bindWechatMobile: function () {
    const data = {
      appId: constant.APP_GLOBAL.appId,
      domainName: constant.APP_GLOBAL.domainName,
      bindId: this.props.bindId,
      encryptedData: this.props.encryptedData,
      iv: this.props.iv,
    }

    http.postLogin(urls.login.bindWechatMobile, data).then(res => {
      $wx.app.saveAuthInfo();
      this.navigateBack();
    })
  },

}

const viewAction = {
  authorLogin: function () {
    this.login().then(res => {
      if (res.token) {
        $wx.app.saveAuthInfo();
        this.navigateBack();
      } else if (res.bindId) {
        this.props.bindId = res.bindId
        this.setData({
          authLogin: false,
          authMobile: true,
        })
      }
    }).catch((res) => {
      console.log(res)
    })
  },
  getPhoneNumber: function (d, v) {
    console.log(d, v)

    this.props.encryptedData = v.encryptedData
    this.props.iv = v.iv

    wx.checkSession({
      success: function() {
        this.bindWechatMobile()
      },
      fail: function() {
        this.login().then(res => {
          if (res.bindId) {
            this.props.bindId = res.bindId
            this.bindWechatMobile()
          }
        }).catch((res) => {
          console.log(res)
        })
      }
    })
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)