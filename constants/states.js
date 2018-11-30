export default {
  // 订单状态
  ORDER_STATUS: { 
    WAIT_INBOUND: 10, // 待入库
    INBOUNDED: 20, // 已入库
    CHECKING_CLOTH: 30, // 验布中
    CHECKED: 40, // 验布完成
    WAIT_PAY: 60, // 待付款
    WAIT_OUTBOUND: 70, // 待出库
    OUTBOUNDED: 80, // 已出库
    CLOSED: 110, // 关闭验布
    CANCELED: 120, // 取消验布
    ALL_ORDER: 0 // 全部
  },
  // 地址类型
  ADDRESS_TYPE: {
    REPERTORY: 10, // 仓库
    STORE: 20, // 门店
    COMPANY: 30, // 公司
    FACTORY: 40, // 工厂
    OTHERS: 99, // 其他
  }
}