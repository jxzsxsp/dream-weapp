import http from '@/utils/http'
import RequestListWithTrait from '@/utils/requestListWithTrait'

let couponListInstance = new RequestListWithTrait({
  url: '/buyer/coupon/list/v1',
  traitName: 'status',
})

const api = {
  getCouponList: (data, forceUpdate) => couponListInstance.postWithTrait(data, forceUpdate)
}

export default api

