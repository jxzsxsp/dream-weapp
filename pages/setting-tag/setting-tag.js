import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constant from '../../constant/index'

const props = {
  maxLabelNum: 5,
  maxLabelTextNum: 8
}

const data = {
  libraryColorId: 1,
  color: '#FD7CB0',
  name: 'PANTONE C 201',
  labels: [],
  latestLabels: ['注意前后间隙', '标签1', '标签2', '标签3', '标签4', '标签5', '标签6'],
  selected: [],
  thinkLabels: [],
  label: ''
}

const lifecycle = {
  onLoad(query) {
  },
  onShow() {
    this.checkSelected()
  }
}

const viewAction = {
  complete: function (d, v) {
    console.log(d, v)

  },
  inputEvent: function (d, v) {
    console.log(d, v, this.data.label)
    if (this.checkLabelTextNum(d)) {
      this.setData({
        label: this.data.label
      })
      return
    }

    this.setData({
      label: v
    })
  },
  confirmEvent: function (d, v) {
    console.log(d, v)

    if(!v) {
      return
    }

    if (this.checkLabelNum()) {
      this.setData({
        label: ''
      })
      return
    }

    let labels = this.data.labels
    labels.push(v)
    this.setData({
      labels: labels,
      label: ''
    })

    this.checkSelected()
  },
  removeLabel: function(d, v) {
    console.log(d, v)
    let labels = this.data.labels
    this.setData({
      labels: this.removeArr(labels, d.index)
    })

    this.checkSelected()
  },
  selectLabel: function (d, v) {
    console.log(d, v)

    let labels = this.data.labels

    if (labels.indexOf(d.label) > -1) {
      return
    }

    if (this.checkLabelNum()) {
      return
    }

    labels.push(d.label)
    this.setData({
      labels: labels
    })

    this.checkSelected()
  }
}

const privateMethods = {
  checkLabelNum: function (labels) {
    if(this.data.labels.length >= this.props.maxLabelNum) {
      $wx.showToast({
        title: '标签最多' + this.props.maxLabelNum + '个',
        icon: 'none'
      })
      return true
    }
  },
  checkLabelTextNum: function (value) {
    if (this.data.label.length >= this.props.maxLabelTextNum
      && value.length >= this.props.maxLabelTextNum) {
      $wx.showToast({
        title: '标签名最多' + this.props.maxLabelTextNum + '个字',
        icon: 'none'
      })
      return true
    }
  },
  removeArr: function (arr, dx) {
    if (isNaN(dx) || dx > arr.length) { return arr }

    for (var i = 0, n = 0; i < arr.length; i++) {
      if (arr[i] != arr[dx]) {
        arr[n++] = arr[i]
      }
    }
    arr.length -= 1

    return arr
  },
  checkSelected: function() {
    let selected = []
    let latestLabels = this.data.latestLabels
    let labels = this.data.labels

    for(let i = 0; i < latestLabels.length; i++) {
      selected[i] = labels.indexOf(latestLabels[i]) > -1
    }

    this.setData({
      selected: selected
    })
  }
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)