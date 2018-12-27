import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
}

const data = {
  maxLabelNum: 5,
  maxLabelTextNum: 8,
  colorDetail: {},
  labels: [],
  latestLabels: [],
  selected: [],
  thinkLabels: [],
  label: ''
}

const lifecycle = {
  onLoad: function(query) {
    console.log(query)
    let labels = []
    let colorDetail = query.colorDetail
    for (let i = 0; i < colorDetail.labelList.length; i++) {
      labels.push(colorDetail.labelList[i].name)
    }
    
    this.setData({
      ...query,
      labels: labels
    })

    this.getLabelList().then(res => {
      this.setData({
        latestLabels: res.labels
      })
      this.checkSelected()
    })
  },
  onShow: function () {
    this.checkSelected()
  }
}

const viewAction = {
  complete: function (d, v) {
    console.log(d, v)
    this.setLabel().then(res => {
      let labels = this.data.labels
      let labelList = []
      for (let i = 0; i < labels.length; i++) {
        labelList.push({ name: labels[i] })
      }

      $wx.navigateBack(1, {
        type: this.data.type,
        labelList: labelList
      })
    })
  },
  inputEvent: function (d, v) {
    console.log(d, v, this.data.label)

    if (this.checkLabelTextNum(v)) {
      return
    }

    this.setData({
      label: v
    })

    if (!!this.data.label) {
      let params = {
        // libraryColorId: this.data.colorDetail.id,
        labelName: this.data.label
      }

      this.getLabelList(params).then(res => {
        this.setData({
          thinkLabels: res.labels
        })
      })
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
    if(this.data.labels.length >= this.data.maxLabelNum) {
      $wx.showToast({
        title: '标签最多' + this.data.maxLabelNum + '个',
        icon: 'none'
      })
      return true
    }
    return false
  },
  checkLabelTextNum: function (value) {
    if (value.length >= this.data.maxLabelTextNum) {
      return true
    }
    return false
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
  getLabelList: function(params) {
    return http.get(urls.labelList, { 
      // mock: true, 
      ...params 
    })
  },
  setLabel: function () {
    return http.post(urls.setLabel, {
      // mock: true,
      libraryColorId: this.data.colorDetail.id, 
      labels: this.data.labels
      })
  }
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)