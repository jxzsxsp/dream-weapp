import {$wx, $Page} from '../../genji4mp/index'

const data = {
  buyerMessage: '',
  messageLength: 0,
}

const lifeCycle = {
  onLoad: function (query) {
    let buyerMessage = query.buyerMessage || ''
    this.setData({
      buyerMessage,
      messageLength: buyerMessage.length
    })
  }
}

const viewAction = {
  onInput: function (d, v) {
    if (typeof(v) === 'object') {
      v = ''
    }
    this.setData({
      messageLength: v.length,
      buyerMessage: v
    })
  },
  onSubmit: function () {
    let buyerMessage = this.data.buyerMessage.replace(/\n/g, "")
    $wx.navigateBack(1, {buyerMessage})
  }
}

$Page(null, data, lifeCycle, null, viewAction)