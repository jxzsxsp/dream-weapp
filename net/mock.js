import urls from './urls/index'

const orderInit = {
  [urls.orderInit]: {
    "storeList": [{
      "id": 1,
      "name": "绍兴万商路店1",
      "address": "j上海市晋安区55路55弄j"
    },{
      "id": 2,
      "name": "绍兴万商路店2",
      "address": "j上海市晋安区55路55弄j"
    },{
      "id": 3,
      "name": "绍兴万商路店3",
      "address": "j上海市晋安区55路55弄j"
    }],
    "defaultCustomerAddress": {
      "id": 1,
      "contacts": "张成辉",
      "contactMobile": "16602194415",
      "detailAddress": "上海市闵行区打呼噜,上海市闵行区打呼噜,上海市闵行区打呼噜,上海市闵行区打呼噜,上海市闵行区打呼噜,上海市闵行区打呼噜"
    },
    "fabricTypeList": [{
      "id": 1,
      "name": "针织",
      "unit": "公斤"
    },{
      "id": 2,
      "name": "梭织",
      "unit": "米"
    }], //面料类型
    "clothTypeList": [{
      "id": 1,
      "name": "高级验布",
      "item": "高级验布,高级验布,高级验布,高级验布,高级验布,高级验布,高级验布,高级验布,高级验布,高级验布,高级验布,高级验布,高级验布,高级验布"
    },{
      "id": 2,
      "name": "中级验布",
      "item": "中级验布,中级验布,中级验布,中级验布,中级验布,中级验布,中级验布,中级验布,中级验布,中级验布,中级验布,中级验布,中级验布,中级验布"
    },{
      "id": 3,
      "name": "初级验布",
      "item": "初级验布,初级验布,初级验布,初级验布,初级验布,初级验布,初级验布,初级验布,初级验布,初级验布,初级验布,初级验布,初级验布,初级验布"
    }], //验布方式
    "logisticsTypeList": [{
      "id": 1,
      "name": "用户自提"
    },{
      "id": 2,
      "name": "上梦送货"
    },{
      "id": 3,
      "name": "顺丰速递"
    }] //取货方式
  }
}

const calc = {
  [urls.orderPrice]: {
    "clothPriceDescription":"0.1元/m", //定价描述
    "proposedPriceDescription":"￥110.00", //参考价格描述
    "length":"100m", //数量 描述
    "customerDiscountDescription":"9折", //优惠VIP描述
    "discountPriceDescription":"￥11.00",//参考优惠价格描述
    "waitPayProposedPriceDescription":"￥99.00",//待支付参考价格描述
  }
}

const submit = {
  [urls.orderSubmit]: {
    orderNo: "1234"
  }
}


export default {
  ...orderInit,
  ...calc,
  ...submit
}