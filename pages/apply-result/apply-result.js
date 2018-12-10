import {$wx, $Page} from '../../genji4mp/index'
import {http, urls} from '../../net/index'

const props = {
  states: [{
    title: '申请提交中...',
    subtitle: '',
    image: 'detail_state'
  }, {
    title: '申请已提交!',
    subtitle: '您已提交试用申请，工作人员审核通过',
    image: 'success_state'
  }, {
    title: '申请失败',
    subtitle: '请重新提交',
    image: 'fail_state'
  }],
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
  onLoad: function (query) {
    this.props.inStack = true;
    if ($wx.app.isBinded()) { 
      http.post(urls.applyFacility)
        .then(res => {
          this.setData({
            state: this.props.states[1]
          })
        }).catch(error => {
          this.setData({
            state: this.props.states[2]
          })
        })
    } else {
      $wx.app.bindPhone().then(res => {
        if (res.code === 1) {
          this.setData({
            state: this.props.states[1]
          })
        }
      })
    }
  },
  onShow: function () {
    // inStack 表示从绑定手机页回退
    if (this.props.inStack) {
      http.post(urls.applyFacility)
        .then(res => {
          this.setData({
            state: this.props.states[1]
          })
        }).catch(error => {
          this.setData({
            state: this.props.states[2]
          })
        })
      }
  }
}

$Page.register(props, data, lifeCycle)