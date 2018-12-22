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
  SvaeColor: 7
}

const ColorSense = {
  ColorSenseService: '26DB67AB-FC40-420A-B080-2CE709BFB7D0',
  ClickUUID: '4229BDB5-8B55-4C6F-9216-D71AB06F246A',
  HeartUUID: '3A796671-B41B-4B54-A929-00F880C8833B',
  ColorUUID:'1A0AD4BF-7BDC-49A3-81D0-CA96AB705ED2',
}

export default {
  APP_GLOBAL,
  ColorSource,
  ColorSense,
  ColorLibraryActionType,
}