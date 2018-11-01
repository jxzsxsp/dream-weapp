import { config } from '../config.js'

const urls = {
  login_url: config.sso_url + '/wechat/oauth2/wechatCallback',
  home_url: config.base_url + '/index.php?s=/api/cart/lists',
  pay_request: config.pay_url + '/pay'
}

export { urls };