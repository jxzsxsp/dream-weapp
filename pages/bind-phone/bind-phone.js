import { $Page, $wx } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constants from '../../constants/index'

const domainName = constants.APP_GLOBAL.domainName

const data = {
  formInfo: {
    mobile: '',
    bindId: '',
    domainName,
    appId: constants.APP_GLOBAL.appId,
    authCode: '',
    uuid: ''
  },
  agreement: '',
  codeText: '发送验证码',
  errorText: '',
  timeId: null,
  canSendCode: true
}

const lifecycle = {
  onLoad: function (query) {
    console.log($wx.app.globalData);
    this.data.formInfo.bindId = query.bindId
  }
}

const viewAction = {
  // 
  goAgreement () {
    $wx.navigateTo($wx.router.webView, {
      url:  encodeURIComponent('https://m.lianshang.com/activity/springboard?ls_activity_id=162196549&ls_source_id=1010&ls_content=123')
    })
  },
  // 发送验证码
  sendCode () {
    if (!this.data.canSendCode) {
      return false
    }
    let pramas = {
      mobile: {
        type: 'tel',
        value: this.data.formInfo.mobile,
        hint: '正确的手机号码'
      },
      appId: this.data.formInfo.appId,
      domainName,
      source: 20,
      randomStr: new Date().getTime() + '_' + Math.floor(Math.random() * 1000000)
    }
    http.postLogin(urls.login.getAuthCode, pramas).then(res => {
      let formInfo = this.data.formInfo
      formInfo.uuid = res.uuid
      this.setData({
        formInfo: formInfo,
        canSendCode: false
      })
      this.codeCountdown()
    })
  },
  finishInput (d, val) {
    let formInfo = this.data.formInfo
    formInfo[d.type] = val
    this.setData({
      formInfo: formInfo
    })
  },
  changeCheckBox (d, val) {
    this.setData({
      agreement: val[0] || ''
    })
  },
  bindPhone () {
    let formInfo = this.data.formInfo
    if (!formInfo.mobile || formInfo.mobile.length !== 11 || !(/^1[3|4|5|6|7|8][0-9]\d{8}$/.test(formInfo.mobile))) {
      this.setData({
        errorText: '请输入正确的手机号码'
      })
      return false
    }
    if (!formInfo.uuid) {
      this.setData({
        errorText: '请先点击发送验证码'
      })
      return false
    }
    if (!formInfo.authCode || !formInfo.uuid) {
      this.setData({
        errorText: '请输入验证码'
      })
      return false
    }
    if (!this.data.agreement) {
      this.setData({
        errorText: '请同意《链尚检品用户协议》'
      })
      return false
    }
    this.setData({
      errorText: ''
    })
    http.postLogin(urls.login.bindMobile, formInfo).then(res => {
      // console.log(res)
      $wx.showToast({
        title: '绑定成功'
      })
      $wx.app.bindPhone().then(() => {
        this.saveScene()
        this.saveNickname();
        $wx.navigateBack()
      })
    }, err => {
      clearInterval(this.timeId)
      this.setData({
        codeText: '发送验证码',
        canSendCode: true,
        errorText: err.message
      })
      // this.setData({
      //   errorText: err.message
      // })
    })
  }
}

const privateMethod = {
  codeCountdown () {
    let scd = 60
    let codeText = scd + '’s'
    this.setData({
      codeText: codeText
    })
    this.timeId = setInterval(() => {
      scd--
      codeText = scd + '’s'
      if (scd < 0) {
        clearInterval(this.timeId)
        this.setData({
          codeText: '发送验证码',
          canSendCode: true
        })
      } else {
        this.setData({
          codeText: codeText
        })
      }
    }, 1000)
  },
  saveNickname: function () {
    $wx.login().then(res => {
      console.log(res)
    }).then(() => {
      return $wx.getUserInfo({ withCredentials: true })
    }).then(res => {
      console.log(res)
      http.post(urls.login.saveName, { name: res.userInfo.nickName }).then(res => {
        console.log(res);
      });
    });
  },
  saveScene: function () {
    const scene = wx.getStorageSync('scene') || ''
    http.post(urls.customerQR, {scene})
  }
}

$Page.register(null, data, lifecycle, privateMethod, viewAction)