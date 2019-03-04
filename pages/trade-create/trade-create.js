import { $Page, $wx } from '../../genji4mp/index'
import utils from '../../utils/index'
import { http, urls } from '../../net/index';

const props = {
}

const data = {
  itemId: 0,
  type: 0, // 订单类型 1.拿色卡，2.剪米样，3.下大货
  consigneeName: '',
  consigneeMobile: '',
  region: [],
  provinceId: 0,
  provinceName: '',
  cityId: 0,
  cityName: '',
  areaId: 0,
  areaName: '',
  address: '',
  remark: '',
  canSubmit: false,
}

const lifeCycle = {
  onLoad: function (query) {
    this.setData({
      itemId: query.itemId,
      type: query.type,
    })
  }
}

const viewAction = {
  // 输入联系人，联系方式，详细地址
  finishInput(d, v) {
    switch (d.type) {
      case 'consigneeName':
        this.setData({ consigneeName: v })
        break
      case 'consigneeMobile':
        this.setData({ consigneeMobile: v })
        break
      case 'address':
        this.setData({ address: v })
        break
      case 'remark':
        this.setData({ remark: v })
      default:
        break;
    }
    this.checkCanSubmit()
  },
  // 选择地区
  changeRegion(d, v) {
    this.setData({ region: v })
  },
  // 提交
  formSubmit(d, v) {
    let data = this.data
    let param = {
      formId: v.formId,
      itemId: data.itemId,
      type: data.type,
      consigneeName: { value: data.consigneeName, hint: '姓名' },
      consigneeMobile: { value: data.consigneeMobile, hint: '手机号' },
      provinceId: 0,
      provinceName: { value: data.region[0], hint: '省市区' },
      cityId: 0,
      cityName: { value: data.region[1], hint: '省市区' },
      areaId: 0,
      areaName: { value: data.region[2], hint: '省市区' },
      address: { value: data.address, hint: '详细地址' },
      remark: data.remark,
    }
    
    http.post(urls.tradeCreate, {
      // mock: true,
      ...param
    }).then(() => {
      $wx.navigateBack(1, {}, '成功', 'success')
    })
  }
}

const privateMethods = {
  isNotEmpty: function (str) {
    return !!str && str.length > 0
  },
  checkCanSubmit: function () {
    let canSubmit = this.isNotEmpty(this.data.consigneeName)
      && this.isNotEmpty(this.data.consigneeMobile)
      && this.isNotEmpty(this.data.region)
      && this.isNotEmpty(this.data.address)
    this.setData({
      canSubmit: canSubmit
    })
  },
}

$Page.register(props, data, lifeCycle, privateMethods, viewAction)