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
      "rgb": "255,255,255",
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
      "id": 3,
      "colorId": 11,
      "originType": 1, //颜色来源的类型 0 自取色 1 潘通色
      "name": "PANTONG 3514CP",
      "rgb": "255,255,255",
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
      "id": 5,
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
        "decription": "默认收藏",
        "colorCount": "0",
        "lastColorUpdateTime": "",
        "timeLabel": "",
        "colorIcon": "",
        "type": 0 // 1-自定义库 0-默认库
      },
      {
        "id": 2,
        "name": "春季流行色",
        "decription": "春季流行色",
        "colorCount": "52",
        "lastColorUpdateTime": "",
        "timeLabel": "1小时前",
        "colorIcon": "#8B572A",
        "type": 1 // 1-自定义库 0-默认库
      },
      {
        "id": 3,
        "name": "冬季流行色",
        "decription": "冬季流行色",
        "colorCount": "16",
        "lastColorUpdateTime": "",
        "timeLabel": "12天前",
        "colorIcon": "#0156FE",
        "type": 1 // 1-自定义库 0-默认库
      },
      {
        "id": 4,
        "name": "2017畅销色",
        "decription": "2017畅销色",
        "colorCount": "32",
        "lastColorUpdateTime": "",
        "timeLabel": "1个月前",
        "colorIcon": "#F5A623",
        "type": 1 // 1-自定义库 0-默认库
      },
    ],
    "totalCount": 100,
    "hasMore": false
  },
  [urls.colorLibrarySave]: 1,
}

let colorLabel = {
  [urls.labelList]: {
    "labels": ['注意前后间隙', '标签1', '标签2', '标签3', '标签4', '标签5', '标签6', '标签5', '标签6']
  },
  [urls.setLabel]: {}
}

export default {
  ...colorLibraryDetail,
  ...colorLabel,
}