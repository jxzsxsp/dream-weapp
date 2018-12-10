import {$Page, $wx} from '../../genji4mp/index'
import {http, urls} from '../../net/index'

const props = {
  STORE: 'selectStore',
  CHECKTYPE: 'checkType',
  LOGISTICTYPE: 'logisticType',
  CLOTHLENGTH: 'clothLength',
  VOLUMENUMBER: 'volumeNumber',
}

const data = {
  // 收货人
  customerDetail: {},
  // 验布坊类表
  storeList: [],
  // 面料类型
  fabricTypeList: [],
  // 验布方式
  checkTypeList: [],
  // 取货方式
  pickUpTypeList: [],

  // 选中的验布坊
  selectedStore: {},
  // 选中的验布方式
  selectedCheckType: {}, 
  // 选中的验布方式
  selectedFabricType: {unit: '米'},
  // 验布长度
  clothLength: null,
  // 验布卷数
  volumeNumber: 1,
  // 取货方式
  selectedPickUpType: {},

  // 价格详情
  priceDetail: {},
  buyerMessage: '',
}

const lifeCycle = {
  onLoad: function (query) {
    let data = this.data
    http.get(urls.orderInit).then(res => {
      data.customerDetail = res.defaultCustomerAddress || {}
      data.storeList = res.storeList
      data.fabricTypeList = res.fabricTypeList
      data.checkTypeList = res.clothTypeList
      data.pickUpTypeList = res.pickUpTypeList
    }).then(() => {
      let checkTypeIndex = parseInt(data.checkTypeList[0].id)
      // 找到选中的验布方式
      data.checkTypeList.forEach((checkType, index) => {
        if (checkType.id === parseInt(query.id)) {
          checkTypeIndex = index
        }
      });
      this.setData({
        customerDetail: data.customerDetail,
        fabricTypeList: data.fabricTypeList,
        selectedCheckType: data.checkTypeList[checkTypeIndex]
      })
    })
  },
}

const viewAction = {
  selectCustomer: function () {
    $wx.navigateTo($wx.router.addressList)
  },
  // 选择验布坊
  selectStore: function () {
    let actionList = this.data.storeList.map((store, index) => {
      return Object.assign({}, store, {type: this.props.STORE, index})
    })
    this.openActionList(actionList)
  },
  // 选择面料类型
  selectFabric: function (d, v) {
    this.setData({
      selectedFabricType: v
    })
    this.calcPrice()
  },
  // 选择验布方式
  selectCheckType: function () {
    let actionList = this.data.checkTypeList.map((checkType, index) => {
      return Object.assign({}, checkType, {type: this.props.CHECKTYPE, index})
    })
    this.openActionList(actionList)
  },
  // 选择取货方式
  selectPickUp: function () {
    let actionList = this.data.pickUpTypeList.map((logisticType, index) => {
      return Object.assign({}, logisticType, {type: this.props.LOGISTICTYPE, index})
    })
    this.openActionList(actionList)
  },
  // 弹出底部价格详情
  selectPriceDetail: function () {
    this.setData({
      showPriceDetail: true
    })
  },
  // 跳转用户留言
  selectBuyerMessage: function () {
    $wx.navigateTo($wx.router.buyerMessage, {buyerMessage: this.data.buyerMessage})
  },
  // 结束输入
  finishInput: function (d, v) {
    if (d.type === this.props.CLOTHLENGTH) {
      this.setData({
        clothLength: v
      })
      this.calcPrice()
    } else if (d.type === this.props.VOLUMENUMBER) {
      this.setData({
        volumeNumber: v
      })
    }
  },
  // 选中弹出框
  onActionSelected: function (d, v) {
    switch (v.type) {
      case this.props.STORE:
        this.setData({
          selectedStore: this.data.storeList[v.index],
        })
        break;
      case this.props.CHECKTYPE:
        this.setData({
          selectedCheckType: this.data.checkTypeList[v.index]
        })
        this.calcPrice()
        break;
      case this.props.LOGISTICTYPE:
        this.setData({
          selectedPickUpType: this.data.pickUpTypeList[v.index]
        })
        break;
      default:
        break;
    }
    this.closeAllPopup()
  },
  // 下单
  placeOrderClicked: function () {
    const data = this.data
    const param = {
      customerAddressId: {
        value: data.customerDetail.id,
        hint: '地址'
      },
      storeId: {
        value: data.selectedStore.id,
        hint: '验布坊'
      },
      customerFabricType: {
        value: data.selectedFabricType.id,
        hint: '面料类型'
      },
      customerClothType: {
        value: data.selectedCheckType.id,
        hint: '验布方式'
      },
      customerFabricUnit: {
        value: data.selectedFabricType.unit,
        hint: '单位'
      },
      customerFabricVolumes: {
        value: data.volumeNumber,
        hint: '卷数'
      },
      pickUpTypeId: {
        value: data.selectedPickUpType.id,
        hint: '取货方式'
      },
      buyerMessage: data.buyerMessage,
      customerFabricLength: data.clothLength,
    }
    http.post(urls.orderSubmit, param).then(res => {
      $wx.navigateTo($wx.router.orderSuccess, {orderId: res.orderNo})
    })
  }
}

const privateMethod = {
  // 计算价格 这期不用计算
  calcPrice: function () {
    // const data = this.data
    // // 同时存在面料类型验布方式和米数后计算
    // if (data.selectedCheckType.id && data.selectedFabricType.id && data.clothLength) {
    //   const params = {
    //     fabricMeters: data.clothLength,
    //     fabricType: data.selectedFabricType.id,
    //     unit: data.selectedFabricType.unit,
    //     clothType: data.selectedCheckType.id,
    //     mock: true
    //   }
    //   http.post(urls.orderPrice, params).then(res => {
    //     this.setData({
    //       priceDetail: res
    //     })
    //   })
    // }
  },
  canSubmit: function () {

  },
  // 打开底部弹框
  openActionList: function (actionList) {
    this.setData({
      actionList,
      showActionList: true
    })
  },
  // 关闭底部弹框
  closeAllPopup: function () {
    this.setData({
      showActionList: false,
      showPriceDetail: false
    })
  },
}


$Page.register(props, data, lifeCycle, privateMethod, viewAction)