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
        title: "高级检验",
        desc: "基础检验 电子报告 色差对比 疵点图片 疵点位置 代发货 ",
        price: "0.45-0.50 元/米",
        image: "/assets/image/img_gjjy.png"
      },
      {
        id: 2,
        title: "中级检验",
        desc: "基础检验 纸质报告 色差对比 疵点图片 代发货 ",
        price: "0.3 元/米",
        image: "/assets/image/img_zjjy.png"
      },
      {
        id: 3,
        title: "基础检验",
        desc: "基础检验 手写报告 打卷 包装 ",
        price: "0.2 元/米",
        image: "/assets/image/img_jcjy.png"
      },
      {
        id: 4,
        title: "打卷/自检",
        desc: "基础检验 打卷 包装",
        price: "0.1 元/米",
        image: "/assets/image/img_djzj.png"
      }
    ]
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
  ...orderInit,
  ...calc,
  ...submit,
  ...address,
  ...defaultAddress,
}