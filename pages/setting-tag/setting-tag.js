import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constant from '../../constant/index'

const props = {
  type: -1
}

const data = {
  maxLabelNum: 5,
  maxLabelTextNum: 14,
  colorDetail: {},
  labels: [],
  latestLabels: [],
  selected: [],
  // 联想的 label
  thinkLabels: [],
  // 当前输入的 label
  label: ''
}

const lifecycle = {
  onLoad: function(query) {
    console.log(query)
    // 存在 type 表示是收藏后添加标签
    if (!!query.type) {
      this.props.type = query.type
    }

    let colorDetail = query.colorDetail
    this.setData({
      colorDetail
    })

    // 获取当前颜色的标签
    this.getLabelList({libraryColorId: query.colorDetail.id}).then(res => {
      this.setData({
        labels: res.labels
      })
      this.checkSelected()
    })

    // 获取当前颜色的最近标签
    this.getLabelList().then(res => {
      this.setData({
        latestLabels: res.labels
      })
      this.checkSelected()
    })
  },
}

const viewAction = {
  complete: function (d, v) {
    console.log(d, v)
    this.setLabel().then(res => {
      switch (this.props.type) {
        case constant.ColorLibraryActionType.SaveColor:
          $wx.navigateBack(2, {}, '标签设置成功')
          break
        case constant.ColorLibraryActionType.SaveColorInNewLibrary:
          $wx.navigateBack(3, {}, '标签设置成功')
          break
        default:
          $wx.navigateBack()
          break
      }
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