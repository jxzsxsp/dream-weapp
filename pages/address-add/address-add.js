import { $Page, $wx } from '../../genji4mp/index'
import constants  from '../../constants/index'
import utils from '../../utils/index'
import { http, urls } from '../../net/index';

const props = {
  // 如果是修改，保存收货地址的id
  id: -1,
}

const data = {
  // 联系人姓名
  contacts: '',
  // 手机号
  contactMobile: '',
  // 地区数组
  region: [],
  // 详细地址
  address: '',
  // 地址类型列表
  addressTypeList: constants.ADDRESS_TYPE,
  // 地址类型
  addressType: -1,
  // 是否是默认地址
  defaultAddress: false,
}

const lifeCycle = {
  onLoad: function (query) {
    // 修改地址
    if (!utils.isEmptyObject(query)) {
      $wx.setNavigationBarTitle({title: '修改地址'})
      this.props.id = query.id
      http.post(urls.addressDetail, {id: query.id})
        .then(res => {
          this.setData({
            contacts: res.contacts,
            contactMobile: res.contactMobile,
            region: [res.provinceName, res.cityName, res.districtName],
            address: res.address,
            addressType: parseInt(res.addressType),
            defaultAddress: res.defaultAddress
          })
        })

    } 
  }
}

const viewAction = {
  // 输入联系人，联系方式，详细地址
  finishInput (d, v) {
    switch (d.type) {
      case 'contacts':
        this.setData({contacts: v})
        break
      case 'mobile':
        this.setData({contactMobile: v})
        break
      case 'detailAddress':
        this.setData({address: v})
      default:
        break;
    }
  },
  // 选择地区
  changeRegion (d, v) {
    this.setData({region: v})
  },
  // 选择地址类型
  selectAddressType (d, v) {
    this.data.addressType = v.id
    // this.setData({addressType: v.id})
  },
  // 是否默认地址
  switchChange (d, v) {
    this.setData({defaultAddress: v})
  },
  // 提交
  submit () {
    let data = this.data
    let param = {
      contacts: {value: data.contacts, hint: '联系人'},
      contactMobile: {value: data.contactMobile, hint: '联系方式'},
      provinceName: {value: data.region[0], hint: '省市区'},
      cityName: {value: data.region[1], hint: '省市区'},
      districtName: {value: data.region[2], hint: '省市区'},
      address: {value: data.address, hint: '详细地址'},
      addressType: {value: data.addressType, hint: '地址类型'},
      defaultAddress: data.defaultAddress,
    }
    let result = null
    if (this.props.id !== -1) {
      result = http.post(urls.addressUpdate, {...param, id: this.props.id})
    } else {
      result = http.post(urls.addressAdd, param)
    }
    result.then(() => {
      $wx.navigateBack()
    })
  }
}

const privateMethod = {

}

$Page.register(props, data, lifeCycle, privateMethod, viewAction)