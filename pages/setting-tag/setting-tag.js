import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
  maxLabelNum: 5,
  maxLabelTextNum: 8
}

const data = {
  maxLabelNum: 5,
  libraryColorId: 1,
  color: '#FD7CB0',
  name: 'PANTONE C 201',
  labels: [],
  latestLabels: [],
  selected: [],
  thinkLabels: [],
  label: ''
}

const lifecycle = {
  onLoad: function(query) {
    console.log(query)
    this.getLabelList(res => {
      this.setData({
        latestLabels: res.labels
      })
    })
  },
  onShow: function() {
    this.checkSelected()
  }
}

const viewAction = {
  complete: function (d, v) {
    console.log(d, v)
    this.setLabel();
  },
  inputEvent: function (d, v) {
    console.log(d, v, this.data.label)

    if (this.checkLabelTextNum(v)) {
      this.setData({
        label: this.data.label
      })
      return
    }

    this.setData({
      label: v
    })

    if (!!this.data.label) {
      let params = {
        libraryColorId: this.data.libraryColorId,
        labelName: this.data.label
      }

      this.getLabelList(res => {
        this.setData({
          thinkLabels: res.labels
        })
      }, params)
    } else {
      this.setData({
        thinkLabels: []
      })
    }
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
      thinkLabels: [],
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
  },
  selectThink: function (d, v) {
    console.log(d, v)

    let labels = this.data.labels

    this.setData({
      thinkLabels: [],
      label: ''
    })

    if (labels.indexOf(d.label) > -1) {
      return
    }

    if (this.checkLabelNum()) {
      return
    }

    labels.push(d.label)
    this.setData({
      labels: labels,
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
  },
  getLabelList: function(callback, params) {
    http.get(urls.labelList, { mock: true, ...params }).then(res => {
      console.log(res);
      callback(res);
    })
  },
  setLabel: function () {
    http.post(urls.setLabel, {
      mock: true,
      libraryColorId: this.data.libraryColorId, 
      labels: this.data.labels
      }).then(res => {
      console.log(res);
    })
  }
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)