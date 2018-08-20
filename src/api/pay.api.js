import http from '@/utils/http'

const api = {
  getRefundList: (data) => http.post('/buyer/refund/list/v1', data, true),
  getSaledList: (data) => http.post('/buyer/workticket/list/v1', data, true)
}
export default api
