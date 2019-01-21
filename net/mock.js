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

export default {
  ...colorLibraryDetail,
  ...colorLabel,
  ...shop,
}