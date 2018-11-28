const constants = {
  DEFAULT_PAGE_ID: 1,
  DEFAULT_PAGE_SIZE: 10,
  EMPTY_STRING: '', 
  ORDER_STATUS: { // 验布单状态 10-待入库,20-已入库,30-验布中,40-验布完成,60-待付款,70-待出库,80-已出库,110-关闭验布,120-取消验布
    WAIT_INBOUND: 10, // 待入库
    INBOUNDED: 20, // 已入库
    CHECKING_CLOTH: 30, // 验布中
    CHECKED: 40, // 验布完成
    WAIT_PAY: 60, // 待付款
    WAIT_OUTBOUND: 70, // 待出库
    OUTBOUNDED: 80, // 已出库
    CLOSED: 110, // 关闭验布
    CANCELED: 120, // 取消验布
    ALL_INBOUND: 20 // 全部入库
  }
}

export { constants }