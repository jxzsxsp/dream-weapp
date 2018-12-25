import {$wx, $Page} from '../../genji4mp/index'
import {http, urls} from '../../net/index'

const States = [{
  title: '申请提交中...',
  subtitle: '',
  image: 'detail_state'
}, {
  title: '申请已提交!',
  subtitle: '您已提交试用申请，工作人员审核通过后会与您联系，请耐心等待！',
  image: 'success_state'
}, {
  title: '申请失败',
  subtitle: '请重新提交',
  image: 'fail_state'
}, {
  title: '申请已通过!',
  subtitle: '您的试用申请已通过，工作人员会与您联系，请保持手机畅通',
  image: 'success_state'
}, {
  title: '申请未通过',
  subtitle: '',
  image: 'fail_state'
}]

const props = {
  inStack: false,
}

const data = {
  state: {
    title: '申请提交中...',
    subtitle: '',
    image: 'detail_state' 
  }
}

const lifeCycle = {
  onLoad: function () {
    if ($wx.app.isBinded()) { 
      this.applyFacility()
    } else {
      $wx.app.bindPhone()
    }
  },
  onShow: function () {
    // inStack 表示从绑定手机页回退
    if (this.props.inStack) {
      if ($wx.app.isBinded()) {
        this.applyFacility()
      } else {
        this.setData({
          state: States[2]
        })
      }
    }
    this.props.inStack = true;
  }
}

const privateMethod = {
  applyFacility: function () {
    http.post(urls.applyFacility).then(res => {
      switch (res.status) {
        case 10:
          this.setData({
            state: States[1]
          })
          break
        case 20:
          this.setData({
            state: States[2]
          })
          break
        case 30:
          this.setData({
            state: States[3]
          })
          break
        case 40:
          this.setData({
            state: States[4]
          })
          break
        default:
          break
      }
    }) 
  }
}

$Page.register(props, data, lifeCycle, privateMethod)