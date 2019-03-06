import urls from './urls/index'
let colorLibraryDetail = {
  [urls.colorLibraryDetail]: {
    "library": {
      "id": 1,
      "name": "春季流行色",
      "type":0, //颜色库类型 1-自定义库 0-默认库
      "description": "这里是备注这里是备注这里是备注这里是备注这里是备注这里是备注这里是备注这里是备注这里是备注这里是备注这里是备注这里是备注这里是备注这里是备注这里是备注这里是备注"
    },
    "list": [{
      "id": 1,
      "colorId": 11,
      "originType": 1, //颜色来源的类型 0 自取色 1 潘通色
      "name": "PANTONG 3514CP",
      "rgb": "187,40,48",
      "hexColor": "#837475",
      "labelList": [{
          "id": 1,
          "name": "LV色"
        },
        {
          "id": 2,
          "name": "网红色"
        }
      ]
    },{
      "id": 2,
      "colorId": 11,
      "originType": 1, //颜色来源的类型 0 自取色 1 潘通色
      "name": "PANTONG 3514CP",
      "rgb": "187,40,48",
      "hexColor": "#F777AB",
      "labelList": [{
          "id": 1,
          "name": "LV色"
        },
        {
          "id": 2,
          "name": "网红色"
        }
      ]
    },{
      "id": 3,
      "colorId": 11,
      "originType": 1, //颜色来源的类型 0 自取色 1 潘通色
      "name": "PANTONG 3514CP",
      "rgb": "187,40,48",
      "hexColor": "#ab3491",
      "labelList": [{
          "id": 1,
          "name": "LV色"
        },
        {
          "id": 2,
          "name": "网红色"
        }
      ]
    },{
      "id": 4,
      "colorId": 11,
      "originType": 1, //颜色来源的类型 0 自取色 1 潘通色
      "name": "PANTONG 3514CP",
      "rgb": "187,40,48",
      "hexColor": "#F777AB",
      "labelList": [{
          "id": 1,
          "name": "LV色"
        },
        {
          "id": 2,
          "name": "网红色"
        }
      ]
    },{
      "id": 5,
      "colorId": 11,
      "originType": 1, //颜色来源的类型 0 自取色 1 潘通色
      "name": "PANTONG 3514CP",
      "rgb": "25,25,55",
      "hexColor": "#F777AB",
      "labelList": [{
          "id": 1,
          "name": "LV色"
        },
        {
          "id": 2,
          "name": "网红色"
        }
      ]
    },{
      "id": 16,
      "colorId": 11,
      "originType": 1, //颜色来源的类型 0 自取色 1 潘通色
      "name": "PANTONG 3514CP",
      "rgb": "255,255,255",
      "hexColor": "#F777AB",
      "labelList": [{
          "id": 1,
          "name": "LV色"
        },
        {
          "id": 2,
          "name": "网红色"
        }
      ]
    },{
      "id": 33,
      "colorId": 11,
      "originType": 1, //颜色来源的类型 0 自取色 1 潘通色
      "name": "PANTONG 3514CP",
      "rgb": "255,255,255",
      "hexColor": "#F777AB",
      "labelList": [{
          "id": 1,
          "name": "LV色"
        },
        {
          "id": 2,
          "name": "网红色"
        }
      ]
    },{
      "id": 123,
      "colorId": 11,
      "originType": 1, //颜色来源的类型 0 自取色 1 潘通色
      "name": "PANTONG 3514CP",
      "rgb": "255,255,255",
      "hexColor": "#F777AB",
      "labelList": [{
          "id": 1,
          "name": "LV色"
        },
        {
          "id": 2,
          "name": "网红色"
        }
      ]
    },{
      "id": 1124,
      "colorId": 11,
      "originType": 1, //颜色来源的类型 0 自取色 1 潘通色
      "name": "PANTONG 3514CP",
      "rgb": "255,255,255",
      "hexColor": "#F777AB",
      "labelList": [{
          "id": 1,
          "name": "LV色"
        },
        {
          "id": 2,
          "name": "网红色"
        }
      ]
    },{
      "id": 1234,
      "colorId": 11,
      "originType": 1, //颜色来源的类型 0 自取色 1 潘通色
      "name": "PANTONG 3514CP",
      "rgb": "255,255,255",
      "hexColor": "#F777AB",
      "labelList": [{
          "id": 1,
          "name": "LV色"
        },
        {
          "id": 2,
          "name": "网红色"
        }
      ]
    }],
    "totalCount": 12,
    "hasMore": true
  },
  [urls.deleteColor]: {

  },
  [urls.isInFavorite]: {
    "status": true // true 已经收藏 false 未收藏
  },
  [urls.addFavorite]: 1,
  [urls.cancelFavorite]: {},
  [urls.colorLibraryList]: {
    "list": [
      {
        "id": 1,
        "name": "默认收藏",
        "description": "默认收藏",
        "colorCount": "0",
        "lastColorUpdateTime": "",
        "timeLabel": "",
        "colorIcon": "",
        "type": 0 // 1-自定义库 0-默认库
      },
      {
        "id": 2,
        "name": "春季流行色",
        "description": "春季流行色",
        "colorCount": "52",
        "lastColorUpdateTime": "",
        "timeLabel": "1小时前",
        "colorIcon": "#8B572A",
        "type": 1 // 1-自定义库 0-默认库
      },
      {
        "id": 3,
        "name": "冬季流行色",
        "description": "冬季流行色",
        "colorCount": "16",
        "lastColorUpdateTime": "",
        "timeLabel": "12天前",
        "colorIcon": "#0156FE",
        "type": 1 // 1-自定义库 0-默认库
      },
      {
        "id": 4,
        "name": "2017畅销色",
        "description": "2017畅销色",
        "colorCount": "32",
        "lastColorUpdateTime": "",
        "timeLabel": "1个月前",
        "colorIcon": "#F5A623",
        "type": 1 // 1-自定义库 0-默认库
      },
      {
        "id": 2,
        "name": "春季流行色",
        "description": "春季流行色",
        "colorCount": "52",
        "lastColorUpdateTime": "",
        "timeLabel": "1小时前",
        "colorIcon": "#8B572A",
        "type": 1 // 1-自定义库 0-默认库
      },
      {
        "id": 3,
        "name": "冬季流行色",
        "description": "冬季流行色",
        "colorCount": "16",
        "lastColorUpdateTime": "",
        "timeLabel": "12天前",
        "colorIcon": "#0156FE",
        "type": 1 // 1-自定义库 0-默认库
      },
      {
        "id": 4,
        "name": "2017畅销色",
        "description": "2017畅销色",
        "colorCount": "32",
        "lastColorUpdateTime": "",
        "timeLabel": "1个月前",
        "colorIcon": "#F5A623",
        "type": 1 // 1-自定义库 0-默认库
      },
      {
        "id": 2,
        "name": "春季流行色",
        "description": "春季流行色",
        "colorCount": "52",
        "lastColorUpdateTime": "",
        "timeLabel": "1小时前",
        "colorIcon": "#8B572A",
        "type": 1 // 1-自定义库 0-默认库
      },
      {
        "id": 3,
        "name": "冬季流行色",
        "description": "冬季流行色",
        "colorCount": "16",
        "lastColorUpdateTime": "",
        "timeLabel": "12天前",
        "colorIcon": "#0156FE",
        "type": 1 // 1-自定义库 0-默认库
      },
      {
        "id": 4,
        "name": "2017畅销色",
        "description": "2017畅销色",
        "colorCount": "32",
        "lastColorUpdateTime": "",
        "timeLabel": "1个月前",
        "colorIcon": "#F5A623",
        "type": 1 // 1-自定义库 0-默认库
      },
      {
        "id": 2,
        "name": "春季流行色",
        "description": "春季流行色",
        "colorCount": "52",
        "lastColorUpdateTime": "",
        "timeLabel": "1小时前",
        "colorIcon": "#8B572A",
        "type": 1 // 1-自定义库 0-默认库
      },
      {
        "id": 3,
        "name": "冬季流行色",
        "description": "冬季流行色",
        "colorCount": "16",
        "lastColorUpdateTime": "",
        "timeLabel": "12天前",
        "colorIcon": "#0156FE",
        "type": 1 // 1-自定义库 0-默认库
      },
      {
        "id": 4,
        "name": "2017畅销色",
        "description": "2017畅销色",
        "colorCount": "32",
        "lastColorUpdateTime": "",
        "timeLabel": "1个月前",
        "colorIcon": "#F5A623",
        "type": 1 // 1-自定义库 0-默认库
      },
    ],
    "totalCount": 100,
    "hasMore": true
  },
  [urls.colorLibrarySave]: 1,
  [urls.pantone.fetchResultV2]: {
    "cie1976ColorFastnessLevel": "1-2",
    "cie1976ColorCompareResult": "2.22",
    "cie2000ColorFastnessLevel": "1-2",
    "cie2000ColorCompareResult": "1.2",
    "cmcColorFastnessLevel": "1-2",
    "cmcColorCompareResult": "1.2",
    "cmcChromaticAberrationLevel": "细微色差", // cmc标准色差描述
    "colorCompareDetailList": [
      {
        "colorCompareType": "L", // L, A, B
        "colorCompareValue": "12.0",
        "colorCompareLabelType": 0, // 1-偏白,2-偏暗,3-偏红,4-偏绿,5-偏黄,6-偏蓝,0-无偏差
        "colorCompareLabel": "无偏差",
        "maxValue": 1 //1-最大色差
      },
      {
        "colorCompareType": "a", // L, A, B
        "colorCompareValue": "22.0",
        "colorCompareLabelType": 4, // 1-偏白,2-偏暗,3-偏红,4-偏绿,5-偏黄,6-偏蓝
        "colorCompareLabel": "偏绿",
        "maxValue": 0 //1-最大色差
      },
      {
        "colorCompareType": "b", // L, A, B
        "colorCompareValue": "32.0",
        "colorCompareLabelType": 6, // 1-偏白,2-偏暗,3-偏红,4-偏绿,5-偏黄,6-偏蓝
        "colorCompareLabel": "偏蓝",
        "maxValue": 0 //1-最大色差
      }
    ]
  },
  [urls.pantone.compareColorDetail]: {
    "sourceColor": {
      "id": 1,
      "deviceId": "1323",
      "colorId": 12,
      "originType": 1,
      "rgb": "0,64,128",
      "hexColor": "#1673DF",
      "lab": "23.79,116.79,-227.87",
      "cmyk": ""
    },
    "targetColor": {
      "id": 1,
      "deviceId": "1323",
      "colorId": 12,
      "originType": 1,
      "rgb": "128,172,255",
      "hexColor": "#1673DF",
      "lab": "23.79,116.79,-227.87",
      "cmyk": "",
      "comparisonScore": 12.21
    }
  }
}

let colorLabel = {
  [urls.labelList]: {
    "labels": ['注意前后间隙', '标签1', '标签2', '标签3', '标签4', '标签5', '标签6', '标签5', '标签6']
  },
  [urls.setLabel]: {}
}

let shop = {
  [urls.recommendSupplier]: {
    "list":
      [
        {
          "id": 1,
          "logo": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
          "name": "胖虎纺织",
          "shopBusinessDtos": [
            {
              "businessName": "针织布"
            },
            {
              "businessName": "丝光棉"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "纯棉"
            }
          ],
          "mobile": "13311111111",
          "address": "绍兴市柯桥区某某龙东大道178号201室",
          "isFollow": 0 //1.关注 0. 未关注
        },
        {
          "id": 2,
          "logo": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
          "name": "胖虎纺织",
          "shopBusinessDtos": [
            {
              "businessName": "针织布"
            },
            {
              "businessName": "丝光棉"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "纯棉"
            }
          ],
          "mobile": "13311111111",
          "address": "绍兴市柯桥区某某龙东大道178号201室",
          "isFollow": 1 //1.关注 0. 未关注
        },
        {
          "id": 3,
          "logo": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
          "name": "胖虎纺织",
          "shopBusinessDtos": [
            {
              "businessName": "针织布"
            },
            {
              "businessName": "丝光棉"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "纯棉"
            }
          ],
          "mobile": "13311111111",
          "address": "绍兴市柯桥区某某龙东大道178号201室",
          "isFollow": 0 //1.关注 0. 未关注
        },
        {
          "id": 4,
          "logo": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
          "name": "胖虎纺织",
          "shopBusinessDtos": [
            {
              "businessName": "针织布"
            },
            {
              "businessName": "丝光棉"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "纯棉"
            }
          ],
          "mobile": "13311111111",
          "address": "绍兴市柯桥区某某龙东大道178号201室",
          "isFollow": 1 //1.关注 0. 未关注
        },
        {
          "id": 5,
          "logo": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
          "name": "胖虎纺织",
          "shopBusinessDtos": [
            {
              "businessName": "针织布"
            },
            {
              "businessName": "丝光棉"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "纯棉"
            }
          ],
          "mobile": "13311111111",
          "address": "绍兴市柯桥区某某龙东大道178号201室",
          "isFollow": 1 //1.关注 0. 未关注
        }
      ],
    "hasMore": true,
    "total": 100
  },
  [urls.followSupplier]: {
    "code": 200,
    "message": "成功"
  },
  [urls.unfollowSupplier]: {
    "code": 200,
    "message": "成功"
  },
  [urls.followList]: {
    "list":
      [
        {
          "id": 1,
          "logo": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
          "name": "胖虎纺织",
          "businesses": [
            {
              "businessName": "针织布"
            },
            {
              "businessName": "丝光棉"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "纯棉"
            }
          ],
          "mobile": "13311111111",
          "address": "绍兴市柯桥区某某龙东大道178号201室",
          "isFollow": 0 //1.关注 0. 未关注
        },
        {
          "id": 2,
          "logo": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
          "name": "胖虎纺织",
          "businesses": [
            {
              "businessName": "针织布"
            },
            {
              "businessName": "丝光棉"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "纯棉"
            }
          ],
          "mobile": "13311111111",
          "address": "绍兴市柯桥区某某龙东大道178号201室",
          "isFollow": 1 //1.关注 0. 未关注
        },
        {
          "id": 3,
          "logo": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
          "name": "胖虎纺织",
          "businesses": [
            {
              "businessName": "针织布"
            },
            {
              "businessName": "丝光棉"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "纯棉"
            }
          ],
          "mobile": "13311111111",
          "address": "绍兴市柯桥区某某龙东大道178号201室",
          "isFollow": 0 //1.关注 0. 未关注
        },
        {
          "id": 4,
          "logo": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
          "name": "胖虎纺织",
          "businesses": [
            {
              "businessName": "针织布"
            },
            {
              "businessName": "丝光棉"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "纯棉"
            }
          ],
          "mobile": "13311111111",
          "address": "绍兴市柯桥区某某龙东大道178号201室",
          "isFollow": 1 //1.关注 0. 未关注
        },
        {
          "id": 5,
          "logo": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
          "name": "胖虎纺织",
          "businesses": [
            {
              "businessName": "针织布"
            },
            {
              "businessName": "丝光棉"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "纯棉"
            }
          ],
          "mobile": "13311111111",
          "address": "绍兴市柯桥区某某龙东大道178号201室",
          "isFollow": 1 //1.关注 0. 未关注
        }
      ],
    "hasMore": true,
    "total": 100
  },
  [urls.browseHistory]: {
    "list":
      [
        {
          "id": 1,
          "logo": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
          "name": "胖虎纺织",
          "businesses": [
            {
              "businessName": "针织布"
            },
            {
              "businessName": "丝光棉"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "纯棉"
            }
          ],
          "mobile": "13311111111",
          "address": "绍兴市柯桥区某某龙东大道178号201室",
          "isFollow": 0 //1.关注 0. 未关注
        },
        {
          "id": 2,
          "logo": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
          "name": "胖虎纺织",
          "businesses": [
            {
              "businessName": "针织布"
            },
            {
              "businessName": "丝光棉"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "纯棉"
            }
          ],
          "mobile": "13311111111",
          "address": "绍兴市柯桥区某某龙东大道178号201室",
          "isFollow": 1 //1.关注 0. 未关注
        },
        {
          "id": 3,
          "logo": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
          "name": "胖虎纺织",
          "businesses": [
            {
              "businessName": "针织布"
            },
            {
              "businessName": "丝光棉"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "纯棉"
            }
          ],
          "mobile": "13311111111",
          "address": "绍兴市柯桥区某某龙东大道178号201室",
          "isFollow": 0 //1.关注 0. 未关注
        },
        {
          "id": 4,
          "logo": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
          "name": "胖虎纺织",
          "businesses": [
            {
              "businessName": "针织布"
            },
            {
              "businessName": "丝光棉"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "纯棉"
            }
          ],
          "mobile": "13311111111",
          "address": "绍兴市柯桥区某某龙东大道178号201室",
          "isFollow": 1 //1.关注 0. 未关注
        },
        {
          "id": 5,
          "logo": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
          "name": "胖虎纺织",
          "businesses": [
            {
              "businessName": "针织布"
            },
            {
              "businessName": "丝光棉"
            },
            {
              "businessName": "牛仔"
            },
            {
              "businessName": "纯棉"
            }
          ],
          "mobile": "13311111111",
          "address": "绍兴市柯桥区某某龙东大道178号201室",
          "isFollow": 1 //1.关注 0. 未关注
        }
      ],
    "hasMore": true,
    "total": 100
  },
  [urls.shopDetail]: {
    "id": 5,
    "logo": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
    "name": "胖虎纺织",
    "businesses": [
      {
        "businessName": "针织布"
      },
      {
        "businessName": "丝光棉"
      },
      {
        "businessName": "牛仔"
      },
      {
        "businessName": "纯棉"
      }
    ],
    "mobile": "13311111111",
    "address": "绍兴市柯桥区某某龙东大道178号201室绍兴市柯桥区某某龙东大道178号201室",
    "isFollow": 1 //1.关注 0. 未关注
  },
  [urls.personDetail]: {
    "userId": 1,
    "name": "张三", //备注
    "avatar": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",  //头像
    "post": "店长", //职位
    "shopId": 2, //店铺id
    "shopName": "玩仍无法", //店铺名称
    "mobile": "3456789987", //店铺手机
    "qrCodeImageUrl": "https://wx.qlogo.cn/mmopen/vi_32/EmicNAg/132",  //小程序码
    "address": "绍兴市柯桥区某某龙东大道178号201室",  //店铺地址  
    "businessNameList": [{
      "id": 1,
      "name": "妞仔"
    }, {
      "id": 2,
      "name": "无纺布"
    }
    ]
  },
}

let item = {
  [urls.itemDetail]: {
    "title": "商品",
    "itemCode": "LD323D",
    "imageUrlList": ["http://img50.lianshang.cn/data/user/c/20192/5/2188835777607_img.jpg", "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png"],
    "itemProperties": [
      {
        "propertyId": 12,
        "name": "品名",
        "propertyValue": "卫衣布"
      },
      {
        "propertyId": 20,
        "name": "门幅",
        "propertyValue": "50cm"
      },
      {
        "propertyId": 21,
        "name": "克重",
        "propertyValue": "50 g/m"
      }
    ],
    "itemPriceInfo": {
      "isNegotiateSwatchPrice": 0,
      "swatchPrice": 23.3,
      "swatchMeasurementUnit": "米",
      "swatchPriceUnit": 1,
      "swatchPriceUnitName": "元",
      "isNegotiateLargeCargoPrice": 0,
      "largeCargoPrice": 3223.32,
      "largeCargoMeasurementUnit": "公斤",
      "largeCargoPriceUnit": 1,
      "largeCargoPriceUnitName": "元"
    },
    "detailImageUrlList": ["http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png", "http://img50.lianshang.cn/data/user/c/20192/5/2188835777607_img.jpg"],
    "sampleImageUrlList": ["http://img50.lianshang.cn/data/user/c/20192/5/2188835777607_img.jpg", "http://img50.lianshang.cn/data/user/c/20192/5/2188835777607_img.jpg"],
    "isFavorite": true,
    "shopInfo": {
      "id": 1,
      "name": "链尚店铺",
      "logo": "http://img50.lianshang.cn/data/user/c/20192/5/2188835777607_img.jpg",
      "mobile": "13524630281"
    }
  },
  [urls.addItemFavorite]: {
    "code": 200,
    "message": "成功"
  },
  [urls.cancelItemFavorite]: {
    "code": 200,
    "message": "成功"
  },
  [urls.tradeCreate]: {
    "id": 212
  },
  [urls.shopSimpleDetail]: {
    "shopId": 32,
    "shopName": "Laura Thomas",
    "logoUrl": "http://img50.lianshang.cn/data/user/c/20192/5/2188835777607_img.jpg",
    "itemCountOnSales": 251,
    "isFollow": true
  },
  [urls.messageUnreadNum]: {
    "totalCount": 10
  },
  [urls.applyList]: {
    "list": [
      {
        "id": 1,
        "itemId": 1,
        "title": "牛奶丝绒针面料名字万一很长很长",
        "itemCode": "B-201026",
        "productName": "无纺布",
        "shopId": 1,
        "shopName": "一万纺织",
        "remark": "过年期间不发货，过些日子再来吧！",
        "logisticsSn": "2999182042123",
        "createTime": "1-2 11:03",
        "customerId": 1,
        "customerName": "申请人名称",
        "status": 10,
        "statusName": "未回复"
      },
      {
        "id": 2,
        "itemId": 1,
        "title": "牛奶丝绒针面料名字万一很长很长2",
        "itemCode": "B-201026",
        "productName": "无纺布",
        "shopId": 1,
        "shopName": "一万纺织",
        "remark": "过年期间不发货，过些日子再来吧！",
        "logisticsSn": "2999182042123",
        "createTime": "1-2 11:03",
        "customerId": 1,
        "customerName": "申请人名称",
        "status": 20,
        "statusName": "已同意"
      },
      {
        "id": 3,
        "itemId": 1,
        "title": "牛奶丝绒针面料名字万一很长很长3",
        "itemCode": "B-201026",
        "productName": "无纺布",
        "shopId": 1,
        "shopName": "一万纺织",
        "remark": "过年期间不发货，过些日子再来吧！",
        "logisticsSn": "2999182042123",
        "createTime": "1-2 11:03",
        "customerId": 1,
        "customerName": "申请人名称",
        "status": 30,
        "statusName": "已拒绝"
      },
      {
        "id": 4,
        "itemId": 1,
        "title": "牛奶丝绒针面料名字万一很长很长4",
        "itemCode": "B-201026",
        "productName": "无纺布",
        "shopId": 1,
        "shopName": "一万纺织",
        "remark": "过年期间不发货，过些日子再来吧！",
        "logisticsSn": "2999182042123",
        "createTime": "1-2 11:03",
        "customerId": 1,
        "customerName": "申请人名称",
        "status": 40,
        "statusName": "已发货"
      },
      {
        "id": 5,
        "itemId": 1,
        "title": "牛奶丝绒针面料名字万一很长很长5",
        "itemCode": "B-201026",
        "productName": "无纺布",
        "shopId": 1,
        "shopName": "一万纺织",
        "remark": "过年期间不发货，过些日子再来吧！",
        "logisticsSn": "2999182042123",
        "createTime": "1-2 11:03",
        "customerId": 1,
        "customerName": "申请人名称",
        "status": 50,
        "statusName": "已收货"
      },
    ],
    "hasMore": true,
    "totalCount": 100
  },
  [urls.itemFavoriteList]: {
    "list": [
      {
        "id": 1,
        "title": "牛奶丝针面料",
        "itemCode": "123456",
        "productName": "痲纺",
        "largeCargoPrice": "¥ 38.6",
        "largeCargoMeasurementUnit": "米",
        "isNegotiateLargeCargoPrice": "true",
        "largeCargoPriceUnit": "元",
        "imageUrl": "http://img50.lianshang.cn/data/user/c/20192/5/2188835777607_img.jpg"
      },
      {
        "id": 2,
        "title": "牛奶丝针面料",
        "itemCode": "123456",
        "productName": "痲纺",
        "largeCargoPrice": "¥ 38.6",
        "largeCargoMeasurementUnit": "米",
        "isNegotiateLargeCargoPrice": "true",
        "largeCargoPriceUnit": "元",
        "imageUrl": "http://img50.lianshang.cn/data/user/c/20192/5/2188835777607_img.jpg"
      }
    ],
    "hasMore": "true",
    "totalCount": "100"
  },
  [urls.messageList]: {
    "list": [
      {
        "id": 1,
        "title": "拿样卡申请",
        "content": "消息内容",
        "messageType": 1,
        "bizType": 1,
        "itemCode": "12890",
        "itemTitle": "32s 75*75全面仿…",
        "shopId": 1,
        "shopName": "店铺名称1",
        "customerId": 1,
        "bizId": 1,
      },
      {
        "id": 2,
        "title": "拿样卡申请",
        "content": "消息内容",
        "messageType": 2,
        "bizType": 1,
        "itemCode": "099-299",
        "itemTitle": "春夏款",
        "shopId": 1,
        "shopName": "店铺名称2",
        "customerId": 1,
        "bizId": 1,
      }
    ],
    "totalCount": 98,
    "hasMore": true
  },
  [urls.messageDetail]: {
    "messageTitle": "拿样卡申请",
    "creatTime": "10-01 10：00",
    "avatar": "http://img50.lianshang.cn/data/user/c/20192/5/2188835777607_img.jpg",
    "mobile": "109876723",
    "customerName": "张三",
    "itemTitle": "春夏款",
    "itemCode": "099-299",
    "productName": "水洗布",
    "imageUrl": "http://img50.lianshang.cn/data/user/c/20192/5/2188835777607_img.jpg",
    "buyerName": "收货人-张三",
    "buyerMobile": "收货人-手机号",
    "address": "收货地址",
    "needAgreedOperator": "true" //是否需要【同意或拒绝】操作
  },
  [urls.confirmReceived]: {
    "code": 200,
    "message": "成功"
  },
  [urls.getItemListByPosition]: {
    "list": [
      {
        "id": 1,
        "title": "春夏款1",
        "itemCode": "0116-003",
        "imageUrl": "http://img50.lianshang.cn/data/user/c/20192/5/2188835777607_img.jpg",
        "isNegotiateLargeCargoPrice": false, //是否面议
        "price": "20.2 元/米",
        "largeCargoPrice": 12.4,
        "largeCargoMeasurementUnit": "米",
        "largeCargoPriceUnit": "元"
      },
      {
        "id": 2,
        "title": "春夏款2",
        "itemCode": "0116-003",
        "imageUrl": "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg",
        "isNegotiateLargeCargoPrice": false, //是否面议
        "price": "20.2 元/米",
        "largeCargoPrice": 12.4,
        "largeCargoMeasurementUnit": "米",
        "largeCargoPriceUnit": "元"
      },
      {
        "id": 3,
        "title": "春夏款3",
        "itemCode": "0116-003",
        "imageUrl": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
        "isNegotiateLargeCargoPrice": false, //是否面议
        "price": "20.2 元/米",
        "largeCargoPrice": 12.4,
        "largeCargoMeasurementUnit": "米",
        "largeCargoPriceUnit": "元"
      },
      {
        "id": 4,
        "title": "春夏款4",
        "itemCode": "0116-003",
        "imageUrl": "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg",
        "isNegotiateLargeCargoPrice": false, //是否面议
        "price": "20.2 元/米",
        "largeCargoPrice": 12.4,
        "largeCargoMeasurementUnit": "米",
        "largeCargoPriceUnit": "元"
      },
      {
        "id": 5,
        "title": "春夏款3",
        "itemCode": "0116-003",
        "imageUrl": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
        "isNegotiateLargeCargoPrice": false, //是否面议
        "price": "20.2 元/米",
        "largeCargoPrice": 12.4,
        "largeCargoMeasurementUnit": "米",
        "largeCargoPriceUnit": "元"
      },
      {
        "id": 6,
        "title": "春夏款4",
        "itemCode": "0116-003",
        "imageUrl": "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg",
        "isNegotiateLargeCargoPrice": false, //是否面议
        "price": "20.2 元/米",
        "largeCargoPrice": 12.4,
        "largeCargoMeasurementUnit": "米",
        "largeCargoPriceUnit": "元"
      },
    ],
    "totalCount": 100,
    "hasMore": true
  },
  [urls.shareItemList]: {
    "list": [
      {
        "id": 1,
        "title": "春夏款1",
        "itemCode": "0116-003",
        "imageUrl": "http://img50.lianshang.cn/data/user/c/20192/5/2188835777607_img.jpg",
        "isNegotiateLargeCargoPrice": false, //是否面议
        "price": "20.2 元/米",
        "largeCargoPrice": 12.4,
        "largeCargoMeasurementUnit": "米",
        "largeCargoPriceUnit": "元"
      },
      {
        "id": 2,
        "title": "春夏款2",
        "itemCode": "0116-003",
        "imageUrl": "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg",
        "isNegotiateLargeCargoPrice": false, //是否面议
        "price": "20.2 元/米",
        "largeCargoPrice": 12.4,
        "largeCargoMeasurementUnit": "米",
        "largeCargoPriceUnit": "元"
      },
      {
        "id": 3,
        "title": "春夏款3",
        "itemCode": "0116-003",
        "imageUrl": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
        "isNegotiateLargeCargoPrice": false, //是否面议
        "price": "20.2 元/米",
        "largeCargoPrice": 12.4,
        "largeCargoMeasurementUnit": "米",
        "largeCargoPriceUnit": "元"
      },
      {
        "id": 4,
        "title": "春夏款4",
        "itemCode": "0116-003",
        "imageUrl": "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg",
        "isNegotiateLargeCargoPrice": false, //是否面议
        "price": "20.2 元/米",
        "largeCargoPrice": 12.4,
        "largeCargoMeasurementUnit": "米",
        "largeCargoPriceUnit": "元"
      },
      {
        "id": 5,
        "title": "春夏款3",
        "itemCode": "0116-003",
        "imageUrl": "http://img.lianshang.cn/data/ad/20174/5/2722_1493261514810.png",
        "isNegotiateLargeCargoPrice": false, //是否面议
        "price": "20.2 元/米",
        "largeCargoPrice": 12.4,
        "largeCargoMeasurementUnit": "米",
        "largeCargoPriceUnit": "元"
      },
      {
        "id": 6,
        "title": "春夏款4",
        "itemCode": "0116-003",
        "imageUrl": "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg",
        "isNegotiateLargeCargoPrice": false, //是否面议
        "price": "20.2 元/米",
        "largeCargoPrice": 12.4,
        "largeCargoMeasurementUnit": "米",
        "largeCargoPriceUnit": "元"
      },
    ],
    "totalCount": 100,
    "hasMore": true
  },
  [urls.homeItemList]: {
    "10": [
      {
        "id": 2,
        "title": "春夏款",
        "itemCode": "0116-003",
        "imageUrl": "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg",
        "isNegotiateLargeCargoPrice": false, //是否面议
        "largeCargoPrice": 12.4,
        "largeCargoMeasurementUnit": "米",
        "largeCargoPriceUnit": "元",
        "width": "150cm",
        "weight": "500 克/m"
      }
    ],
    "20": [
      {
        "id": 2,
        "title": "春夏款",
        "itemCode": "0116-003",
        "imageUrl": "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg",
        "isNegotiateLargeCargoPrice": false, //是否面议
        "largeCargoPrice": 12.4,
        "largeCargoMeasurementUnit": "米",
        "largeCargoPriceUnit": "元",
        "width": "150cm",
        "weight": "500 克/m"
      }
    ],
    "30": [
      {
        "id": 2,
        "title": "春夏款",
        "itemCode": "0116-003",
        "imageUrl": "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg",
        "isNegotiateLargeCargoPrice": false, //是否面议
        "largeCargoPrice": 12.4,
        "largeCargoMeasurementUnit": "米",
        "largeCargoPriceUnit": "元",
        "width": "150cm",
        "weight": "500 克/m"
      }
    ]
  },
  [urls.setRead]: {
    "code": 200,
    "message": "成功"
  },
  [urls.getLatestLogistics]: {
    "consigneeInfo": {
      "consigneeName": "John Miller",
      "consigneeMobile": "15692838273",
      "provinceId": 0,
      "provinceName": "辽宁省",
      "cityId": 0,
      "cityName": "景德镇市",
      "areaId": 0,
      "areaName": "华东",
      "address": "memhkdbnow"
    }
  },
  [urls.addItemBrowseRecord]: {
    "code": 200,
    "message": "成功"
  },
}

export default {
  ...colorLibraryDetail,
  ...colorLabel,
  ...shop,
  ...item,
}