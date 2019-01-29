import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constants from '../../constant/index'

const props = {
  isOverwrite: 0,
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
    console.log(pages)
    
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
      appId: constants.APP_GLOBAL.appId,
      domainName: constants.APP_GLOBAL.domainName,
      bindId: this.props.bindId,
      encryptedData: this.props.encryptedData,
      iv: this.props.iv,
      isOverwrite: this.props.isOverwrite,
    }

    http.postLogin(urls.login.bindWechatMobile, data).then(res => {
      console.log(res)
      
      if (res.code === '111') {
        let _this = this
        wx.showModal({
          title: '确认绑定',
          content: res.tips,
          showCancel: true,
          confirmText: '继续绑定',
          success: function (e) {
            if (e.confirm) {
              _this.props.isOverwrite = 1
              _this.bindWechatMobile()
            }
          }
        })
        return
      }

      $wx.app.saveAuthInfo().then((res) => {
        this.navigateBack()
      })
    })
  },

}

const viewAction = {
  authorLogin: function () {
    this.login().then(res => {
      if (res.token) {
        $wx.app.saveAuthInfo().then((res) => {
          this.navigateBack()
        })
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

    if (v.errMsg !== 'getPhoneNumber:ok') {
      wx.showModal({
        title: '警告',
        content: '若不授权获取手机，则无法注册会员！',
        showCancel: false
      })
      return
    }

    let _this = this

    this.props.encryptedData = v.encryptedData
    this.props.iv = v.iv

    wx.checkSession({
      success: function() {
        _this.bindWechatMobile()
      },
      fail: function() {
        _this.login().then(res => {
          if (res.bindId) {
            _this.props.bindId = res.bindId
            _this.bindWechatMobile()
          }
        }).catch((res) => {
          console.log(res)
        })
      }
    })
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)