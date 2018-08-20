import http from '@/utils/http'
import RequestListWithTrait from '@/utils/requestListWithTrait'

let couponListInstance = new RequestListWithTrait({
  url: '/buyer/coupon/list/v1',
  traitName: 'status',
})

const api = {
  getCouponList: (data, forceUpdate) => couponListInstance.postWithTrait(data, forceUpdate),
  getReceivedCoupon: (data) => http.post('/buyer/canReceiveCoupon/list/v1', data, true),
  updateCouponStatus: (data) => http.post('/buyer/updateCouponStatus/list/v1', data, true)
}

export default api

