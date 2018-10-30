import { config } from '../config.js'

const urls = {
  home_url: config.base_url + '/index.php?s=/api/cart/lists',
  pay_request: config.pay_url + '/pay'
}

export { urls };