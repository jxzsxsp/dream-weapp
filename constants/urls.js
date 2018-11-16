import { config } from '../config.js'

const urls = {
  login_url: config.sso_url + '/wechat/oauth2/mini-auth-login',
  order_list_url: config.base_url + '/order/list', // 订单列表接口
  input_init_url: config.base_url + '/order/input-init', // 入库初始化接口
  reject_url: config.base_url + '/order/reject', // 入库驳回接口
  input_url: config.base_url + '/order/input', // 入库接口
  detail_url: config.base_url + '/order/detail', // 详情接口
  log_list_url: config.base_url + '/order/log-list', // 验布订单跟踪接口
  roll_log_list_url: config.base_url + '/order/roll-log-list', // 验布卷跟踪接口
  output_init_url: config.base_url + '/order/output-init', // 出库初始化接口
  output_url: config.base_url + '/order/output', // 确认出库接口
  pay_request: config.pay_url + '/pay'
}

export { urls };