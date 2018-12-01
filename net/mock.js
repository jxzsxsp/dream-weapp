import urls from './urls/index'

const homeInfo = {
  [urls.homeInfo]: {
    order: {
      title: "梭织面料打卷/自检",
      statusName: "待入库",
      orderNo: "234987989808",
      orderTime: "2018.9.8 12:30:36"
    },
    items: [
      {
        id: 1,
        name: "高级检验",
        item: "基础检验 电子报告 色差对比 疵点图片 疵点位置 代发货 ",
        price: "0.45-0.50 元/米",
        image: "http://img.lianshang.cn/mini-somersault/home/img_gjjy.png"
      },
      {
        id: 2,
        name: "中级检验",
        item: "基础检验 纸质报告 色差对比 疵点图片 代发货 ",
        price: "0.3 元/米",
        image: "http://img.lianshang.cn/mini-somersault/home/img_zjjy.png"
      },
      {
        id: 3,
        name: "基础检验",
        item: "基础检验 手写报告 打卷 包装 ",
        price: "0.2 元/米",
        image: "http://img.lianshang.cn/mini-somersault/home/img_jcjy.png"
      },
      {
        id: 4,
        name: "打卷/自检",
        item: "基础检验 打卷 包装",
        price: "0.1 元/米",
        image: "http://img.lianshang.cn/mini-somersault/home/img_djzj.png"
      }
    ]
  }
}

const order = {
  [urls.orderList]: {
    "list": [
      {
        "orderNo": 10001,
        "createTime": "2018-09-10 12:23:22",
        "statusName": "待入库",
        "orderName": "梭织面料打卷/自检",
        "storeName": "绍兴交易园店",
        "pickUpTypeName": "代发货至收货地址",
        "fabricVolumeList": [
          {
            "name": "共6卷"
          }
        ],
        "orderStatusSteps": {
          "active": 1,
          "list": [
            {
              "name": "下单成功"
            }, {
              "name": "等待收货"
            }
          ]
        },
        "showBtn": {
          "cancel": true,
          "report": false,
          "pay": false,
          "confirmReceive": false,
          "toEvaluate": false,
          "viewEvaluate": false
        }
      },
      {
        "orderNo": 10002,
        "createTime": "2018-09-10 12:23:22",
        "statusName": "已入库",
        "orderName": "梭织面料打卷/自检",
        "storeName": "绍兴交易园店",
        "pickUpTypeName": "代发货至收货地址",
        "fabricVolumeList": [
          {
            "name": "共6卷"
          },
          {
            "name": "入库2卷"
          }
        ],
        "orderStatusSteps": {
          "active": 2,
          "list": [
            {
              "name": "下单成功"
            },
            {
              "name": "已收货"
            },
            {
              "name": "等待验布"
            }
          ]
        },
        "showBtn": {
          "cancel": false,
          "report": false,
          "pay": false,
          "confirmReceive": false,
          "toEvaluate": false,
          "viewEvaluate": false
        }
      },
      {
        "orderNo": 10003,
        "createTime": "2018-09-10 12:23:22",
        "statusName": "验布中",
        "orderName": "梭织面料打卷/自检",
        "storeName": "绍兴交易园店",
        "pickUpTypeName": "代发货至收货地址",
        "fabricVolumeList": [
          {
            "name": "共6卷"
          },
          {
            "name": "入库2卷"
          },
          {
            "name": "验布2卷"
          }
        ],
        "orderStatusSteps": {
          "active": 2,
          "list": [
            {
              "name": "已收货"
            },
            {
              "name": "验布中"
            },
            {
              "name": "待付款"
            }
          ]
        },
        "showBtn": {
          "cancel": false,
          "report": true,
          "pay": false,
          "confirmReceive": false,
          "toEvaluate": false,
          "viewEvaluate": false
        }
      },
      {
        "orderNo": 10004,
        "createTime": "2018-09-10 12:23:22",
        "statusName": "验布完成",
        "orderName": "梭织面料打卷/自检",
        "storeName": "绍兴交易园店",
        "pickUpTypeName": "代发货至收货地址",
        "fabricVolumeList": [
          {
            "name": "共6卷"
          },
          {
            "name": "入库6卷"
          },
          {
            "name": "验布6卷"
          }
        ],
        "orderStatusSteps": {
          "active": 2,
          "list": [
            {
              "name": "已收货"
            },
            {
              "name": "验布完成"
            },
            {
              "name": "待付款"
            }
          ]
        },
        "showBtn": {
          "cancel": false,
          "report": true,
          "pay": false,
          "confirmReceive": false,
          "toEvaluate": false,
          "viewEvaluate": false
        }
      },
      {
        "orderNo": 10005,
        "createTime": "2018-09-10 12:23:22",
        "statusName": "待付款",
        "orderName": "梭织面料打卷/自检",
        "storeName": "绍兴交易园店",
        "pickUpTypeName": "代发货至收货地址",
        "fabricVolumeList": [
          {
            "name": "共6卷"
          },
          {
            "name": "入库6卷"
          },
          {
            "name": "验布6卷"
          }
        ],
        "orderStatusSteps": {
          "active": 2,
          "list": [
            {
              "name": "验布完成"
            },
            {
              "name": "待付款"
            },
            {
              "name": "待出库"
            }
          ]
        },
        "showBtn": {
          "cancel": false,
          "report": true,
          "pay": true,
          "confirmReceive": false,
          "toEvaluate": false,
          "viewEvaluate": false
        }
      },
      {
        "orderNo": 10006,
        "createTime": "2018-09-10 12:23:22",
        "statusName": "待出库",
        "orderName": "梭织面料打卷/自检",
        "storeName": "绍兴交易园店",
        "pickUpTypeName": "代发货至收货地址",
        "fabricVolumeList": [
          {
            "name": "共6卷"
          },
          {
            "name": "入库6卷"
          },
          {
            "name": "验布6卷"
          }
        ],
        "orderStatusSteps": {
          "active": 2,
          "list": [
            {
              "name": "待付款"
            },
            {
              "name": "待出库"
            },
            {
              "name": "已完成"
            }
          ]
        },
        "showBtn": {
          "cancel": false,
          "report": true,
          "pay": false,
          "confirmReceive": false,
          "toEvaluate": false,
          "viewEvaluate": false
        }
      },
      {
        "orderNo": 10007,
        "createTime": "2018-09-10 12:23:22",
        "statusName": "已出库",
        "orderName": "梭织面料打卷/自检",
        "storeName": "绍兴交易园店",
        "pickUpTypeName": "代发货至收货地址",
        "fabricVolumeList": [
          {
            "name": "共6卷"
          },
          {
            "name": "入库6卷"
          },
          {
            "name": "验布6卷"
          }
        ],
        "orderStatusSteps": {
          "active": 2,
          "list": [
            {
              "name": "待出库"
            },
            {
              "name": "已完成"
            }
          ]
        },
        "showBtn": {
          "cancel": false,
          "report": true,
          "pay": false,
          "confirmReceive": false,
          "toEvaluate": false,
          "viewEvaluate": false
        }
      }
    ],
    "hasMore": true,
    "total": 10
  },
  [urls.orderDetail]: {
    "statusName": "已评价",//状态
    "orderNo": "8980970808", //验布单号
    "storeName": "绍兴交易园店", //验布地点（ 验布坊名称）
    "pickUpTypeName": "代发货至收货地址", //取货方式
    "fabricTypeName": "", //面料类型
    "clothTypeName": "",//验布方式
    "clothTypeItem": "米数、重量、门幅、克重、电子报告、色差(匹布/缸差/边中差)对比、疵点图片、疵点位置标识、代发货、物流信息跟踪、检验售后、货物暂存服务",//验布方式项目
    "price": {
      "clothPriceDescription": "0.1元/m", //定价描述
      "proposedPriceDescription": "￥110.00", //参考价格描述
      "length": "100m", //数量 描述
      "customerDiscountDescription": "9折", //优惠VIP描述
      "discountPriceDescription": "￥110.00",//参考优惠价格描述
      "waitPayProposedPriceDescription": "￥99.00",//待支付参考价格描述  
    },
    "customerMessage": "", //买家留言
    "showBtn": {
      "cancel": true,
      "report": true,
      "pay": true,
      "confirmReceive": true,
      "toEvaluate": false,
      "viewEvaluate": false
    }
  }
}

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

const address = {
  [urls.addressList]:{list: [
    {
      "id":123, //id
      "contacts":"aa ", //联系人姓名
      "contactMobile":"15021825356",//联系电话
      "detailAddress":"上海市静安区沪太路1111号1号楼链尚国际大楼11层",//收货地址
      "addressType":10, //地址类型 10-仓库 20-门店 30-公司 40-工厂 99-其他
      "addressTypeName":"仓库", //地址类型
      "default":true
 },
 {
  "id":1233, //id
  "contacts":"aa ", //联系人姓名
  "contactMobile":"15021825356",//联系电话
  "detailAddress":"上海市静安区沪太路1111号1号楼链尚国际大楼11层",//收货地址
  "addressType":10, //地址类型 10-仓库 20-门店 30-公司 40-工厂 99-其他
  "addressTypeName":"仓库", //地址类型
},
{
  "id":1223, //id
  "contacts":"aa ", //联系人姓名
  "contactMobile":"15021825356",//联系电话
  "detailAddress":"上海市静安区沪太路1111号1号楼链尚国际大楼11层",//收货地址
  "addressType":10, //地址类型 10-仓库 20-门店 30-公司 40-工厂 99-其他
  "addressTypeName":"仓库", //地址类型
},
{
  "id":1243, //id
  "contacts":"aa", //联系人姓名
  "contactMobile":"15021825356",//联系电话
  "detailAddress":"上海市静安区沪太路1111号1号楼链尚国际大楼11层",//收货地址
  "addressType":10, //地址类型 10-仓库 20-门店 30-公司 40-工厂 99-其他
  "addressTypeName":"仓库", //地址类型
},
{
  "id":1253, //id
  "contacts":"aa ", //联系人姓名
  "contactMobile":"15021825356",//联系电话
  "detailAddress":"上海市静安区沪太路1111号1号楼链尚国际大楼11层",//收货地址
  "addressType":10, //地址类型 10-仓库 20-门店 30-公司 40-工厂 99-其他
  "addressTypeName":"仓库", //地址类型
},
{
  "id":1263, //id
  "contacts":"aa ", //联系人姓名
  "contactMobile":"15021825356",//联系电话
  "detailAddress":"上海市静安区沪太路1111号1号楼链尚国际大楼11层",//收货地址
  "addressType":10, //地址类型 10-仓库 20-门店 30-公司 40-工厂 99-其他
  "addressTypeName":"仓库", //地址类型
},
{
  "id":1237, //id
  "contacts":"aa ", //联系人姓名
  "contactMobile":"15021825356",//联系电话
  "detailAddress":"上海市静安区沪太路1111号1号楼链尚国际大楼11层",//收货地址
  "addressType":10, //地址类型 10-仓库 20-门店 30-公司 40-工厂 99-其他
  "addressTypeName":"仓库", //地址类型
},
{
  "id":1234, //id
  "contacts":"aa ", //联系人姓名
  "contactMobile":"15021825356",//联系电话
  "detailAddress":"上海市静安区沪太路1111号1号楼链尚国际大楼11层",//收货地址
  "addressType":10, //地址类型 10-仓库 20-门店 30-公司 40-工厂 99-其他
  "addressTypeName":"仓库", //地址类型
},
{
  "id":1235, //id
  "contacts":"aa ", //联系人姓名
  "contactMobile":"15021825356",//联系电话
  "detailAddress":"上海市静安区沪太路1111号1号楼链尚国际大楼11层",//收货地址
  "addressType":10, //地址类型 10-仓库 20-门店 30-公司 40-工厂 99-其他
  "addressTypeName":"仓库", //地址类型
},
{
  "id":12123, //id
  "contacts":"aa ", //联系人姓名
  "contactMobile":"15021825356",//联系电话
  "detailAddress":"上海市静安区沪太路1111号1号楼链尚国际大楼11层",//收货地址
  "addressType":10, //地址类型 10-仓库 20-门店 30-公司 40-工厂 99-其他
  "addressTypeName":"仓库", //地址类型
}
  ]}
}
 
const defaultAddress = {
  [urls.defaultAddress]: {

  }
}

export default {
  ...homeInfo,
  ...order,
  ...orderInit,
  ...calc,
  ...submit,
  ...address,
  ...defaultAddress,
}