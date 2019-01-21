const APP_GLOBAL = {
  appId: 4,
  domainName: 'chameleon.lianshang.com',
  authCodeSource: {
    register: 10,
    bindMobile: 20,
    changeMobile: 30,
    login: 40,
  }
}

const ColorSource = {
  pantone: 1,
  selfFetch: 0
}

const ColorLibraryActionType = {
  EditLibrary: 0,
  Move_Single: 1,
  Move_Multiple: 2,
  Add_Single: 3,
  Add_Multiple: 4,
  Tag: 5,
  SaveLibrary: 6,
  SaveColor: 7, // 潘通色或自取色列表收藏颜色
  SaveColorInNewLibrary: 8, // 潘通色或自取色列表收藏颜色后，并且添加到新的色库中


}

const ColorSense = {
  ColorSenseService: '26DB67AB-FC40-420A-B080-2CE709BFB7D0',
  ClickUUID: '4229BDB5-8B55-4C6F-9216-D71AB06F246A',
  HeartUUID: '3A796671-B41B-4B54-A929-00F880C8833B',
  ColorUUID:'1A0AD4BF-7BDC-49A3-81D0-CA96AB705ED2',
}

// 1-偏白,2-偏暗,3-偏红,4-偏绿,5-偏黄,6-偏蓝
const ColorCompareLabelType = {
  1: '#FFFFFF',
  2: '#000000',
  3: '#FF1B1B',
  4: '#00C37C',
  5: '#F5A623',
  6: '#0156FE',
}

// 1-店铺码,2-到店码,3-个人码
const QrCodeType = {
  SHOP: 1,
  TO_SHOP: 2,
  PERSONAL_BUSINESS_CARD: 3,
}

// 来源 1 到店码 2 个人名片 3 小程序推荐浏览 4 app 推荐浏览 5 店铺名片
const BindCustomerSource = {
  TO_SHOP: 1,
  PERSONAL_BUSINESS_CARD: 2,
  WEAPP_VIEW: 3,
  APP_VIEW: 4,
  SHOP: 5,
}

export default {
  APP_GLOBAL,
  ColorSource,
  ColorSense,
  ColorLibraryActionType,
  ColorCompareLabelType,
  QrCodeType,
  BindCustomerSource,
}