import {$Page, $wx} from '../../genji4mp/index'
import { http, urls } from '../../net/index';
import constant from '../../constant/index'

const props = {
  bindId: '',
  type: null,
  url: 'https://m.lianshang.com/activity/springboard?ls_activity_id=174475123&ls_source_id=1010&ls_content=123'
}

const data = {
  phoneNumber: ''
}

const lifecycle = {
  onLoad: function (query) {
    this.props.bindId = query.bindId
    this.props.type = query.type
  }
}

const viewaction = {
  goAgreement: function () {
    $wx.navigateTo($wx.router.webview, {
      url: encodeURIComponent(this.props.url),
      title: '小蜥用户协议'
    })
  },
  phoneInput: function (data, value) {
    // 删除最后一个字符的时候
    if (typeof(value) === 'object') {
      this.setData({
        phoneNumber: ''
      })
      return
    }
    // 删除的时候
    if (value.length < this.data.phoneNumber.length) {
      if (value.length === 4 || value.length === 9) {
        value = value.substr(0, value.length - 1)
      }
      this.setData({
        phoneNumber: value
      }) 
      return
    }
    // 输入的时候
    if (value.length === 3 || value.length === 8) {
      value = value + ' '
    }
    this.setData({
      phoneNumber: value
    })
  },
  nextStepClicked: function () {
    let phoneNumber = this.data.phoneNumber.replace(/\s*/g,"")
    if (phoneNumber.length !== 11) {
      $wx.showToast({title: '请输入正确手机号', icon: 'none'})
    } else {
      const data = {
        mobile: phoneNumber, 
        appId: constant.APP_GLOBAL.appId, 
        domainName: constant.APP_GLOBAL.domainName,
        source: constant.APP_GLOBAL.authCodeSource.bindMobile,
        randomStr: '1234',
      }
      http.postLogin(urls.login.getAuthCode, data).then(res => {
        const data = {
          phoneNumber: phoneNumber, 
          bindId: this.props.bindId, 
          uuid: res.uuid,
          type: this.props.type
        }
        $wx.navigateTo($wx.router.inputCode, data)
      })
    }
  }
}

$Page.register(props, data, lifecycle, null, viewaction)