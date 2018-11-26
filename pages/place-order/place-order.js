import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'

const data = {
  // 收货人
  customerDetail: null,

  selectedStore: {},
  selectedFabricType: {},
  selectedCheckType: {},
  selectedLogisticType: {},
  buyerMessage: '123',
  priceDetail: {},
  showPriceDetail: false,

  clothLength: 0,
  volumeNumber: 1,

  fabricTypeList: [{id: 1, name:"123"}, {id: 2, name: "332"}],
}

const lifeCycle = {
  onLoad: function () {
    
  }
}

const viewAction = {
  selectStore: function () {
  },
  selectFabric: function (d, v) {
  },
  selectedCheckType: function () {

  },
  selectLogistic: function () {
  },
  finishInput: function (d, v) {
    console.log(d)
    console.log(v)
  },
}

const privateMethod = {
  volumeNumberChange: function (d) {
    console.log(d.detail)
  }
}


$Page(null, data, lifeCycle, privateMethod, viewAction)