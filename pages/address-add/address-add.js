import { $Page, $wx } from '../../genji4mp/index'
import constants  from '../../constants/index'
import utils from '../../utils/index'

const data = {
  // 地址id
  id: 0,
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
  addressType: 0,
  // 是否是默认地址
  defaultAddress: false,
}

const lifeCycle = {
  onLoad: function (query) {
    // 修改地址
    if (!utils.isEmptyObject(query)) {
      console.log(query)
      $wx.setNavigationBarTitle({title: '修改地址'})
      this.setData({
        id: parseInt(query.id),
        contacts: query.contacts,
        contactMobile: query.contactMobile,
        region: [query.provinceName, query.cityName, query.districtName],
        address: query.address,
        addressType: parseInt(query.addressType),
        defaultAddress: query.default
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
}

const privateMethod = {

}

$Page.register(null, data, lifeCycle, privateMethod, viewAction)