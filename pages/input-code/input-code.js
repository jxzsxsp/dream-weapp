import {$wx, $Page} from '../../genji4mp/index'
import {http, urls} from '../../net/index'

const props = {
  bindId: '',
  mobile: '',
  uuid: '',
}

const data = {
  verifyCodeArr: [
    {num: '', focus: false},
    {num: '', focus: false},
    {num: '', focus: false},
    {num: '', focus: false},
    {num: '', focus: false},
    {num: '', focus: false}
  ],
  test: '',
}

const lifecycle = {
  onLoad (query) {
    this.props.bindId = query.bindId
    this.props.mobile = query.phoneNumber
    this.props.uuid = query.uuid
  }
}

const privateMethods = {
  getVerifyCode () {
    return this.data.verifyCodeArr.reduce((preCode, item) => {
      return preCode + item.num
    }, '')
  }
}

const viewAction = {
  nextStepClicked () {
    const verifyCode = this.getVerifyCode()
    if (verifyCode.length !== 6) {
      $wx.showToast({title: '验证码输入错误', icon: 'none'})
      return
    }

    const data = {
      bindId: this.props.bindId,
      mobile: this.props.mobile,
      uuid: this.props.uuid,
      authCode: verifyCode,
    }
    http.postLogin(urls.login.bindMobile, data)
      .then(() => {
        return $wx.showToast({title: '绑定成功'})
      }).then(() => {
        $wx.navigateBack({delta: 2})
      })
  },

  codeInputed (data, value) {
    // 删除的情况
    if (typeof(value) === "object") {
      this.data.verifyCodeArr[data.index].num = ''
      // 第一个输入框，不设置 focus，其余切换 focus
      if (data.index !== 0) {
        this.data.verifyCodeArr.forEach((code, index) => {
          if (index === data.index - 1) {
            code.focus = true 
          } else {
            code.focus = false
          }
        });
      } 
      this.setData({
        verifyCodeArr: this.data.verifyCodeArr
      }) 
      return
    }

    // 输入的情况
    if (data.index !== 5) {
      this.data.verifyCodeArr.forEach((code, index) => {
        if (index === data.index + 1) {
          code.focus = true 
        } else {
          code.focus = false
        }
      });
    }
    this.data.verifyCodeArr[data.index].num = value
    this.setData({
      verifyCodeArr: this.data.verifyCodeArr
    })
  }
}

$Page(props, data, lifecycle, privateMethods, viewAction)