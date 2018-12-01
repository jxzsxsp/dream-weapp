import { $Page } from '../../genji4mp/index'
import constants  from '../../constants/index'
import utils from '../../utils/index'

const data = {
  contacts: '',
  contactMobile: '',
  district: '',
  address: '',
  addressType: 0,
  defaultAddress: false,
}

const lifeCycle = {
  onLoad: function (query) {
    // 修改地址
    !utils.isEmptyObject(query) && this.setData({
      contacts: query.contracts,
      contactMobile: query.contactMobile,
      district: query.district,
      address: query.address,
      addressType: query.addressType,
      defaultAddress: query.defaultAddress
    })
  }
}

const viewAction = {
  switchChange (d, v) {
    console.log(v)
  },
  finishInput (d, v) {
    switch (d.type) {
      case 'contacts':
        this.setData({})
        break;
    
      default:
        break;
    }
  }
}

const privateMethod = {

}

$Page.register(null, data, lifeCycle, privateMethod, viewAction)