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
  }]
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
  },
  onShow: function () {
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
  }
}

$Page.register(props, data, lifeCycle)