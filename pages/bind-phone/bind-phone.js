import {$Page, $wx} from '../../genji4mp/index'

const props = {
  bindId: ''
}

const data = {
  phoneNumber: ''
}

const lifecycle = {
  onLoad (query) {
    this.props.bindId = query.bindId
  }
}

const viewaction = {
  goAgreement: function () {
    $wx.navigateTo($wx.router.userAgreement)
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
    let phoneNum = this.data.phoneNumber.replace(/\s*/g,"")
    if (phoneNum.length !== 11) {
      $wx.showToast({title: '请输入正确手机号', icon: 'none'})
    } else {

    }
  }
}

$Page(null, data, null, null, viewaction)