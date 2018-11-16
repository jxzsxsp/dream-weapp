const id = {
  appId: 4,
  domainName: 'chameleon.lianshang.com',
  authCodeSource: {
    register: 10,
    bindMobile: 20,
    changeMobile: 30,
    login: 40,
  }
}

const colorSense = {
  ColorSenseService: '26DB67AB-FC40-420A-B080-2CE709BFB7D0',
  ClickUUID: '4229BDB5-8B55-4C6F-9216-D71AB06F246A',
  HeartUUID: '3A796671-B41B-4B54-A929-00F880C8833B',
  ColorUUID:'1A0AD4BF-7BDC-49A3-81D0-CA96AB705ED2',
}
export default {
  ...id,
  ...colorSense
}