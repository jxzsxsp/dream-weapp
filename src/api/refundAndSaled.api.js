import http from '@/utils/http'

const api = {
  getRefundList: (data) => http.post('/buyer/refund/list/v1',data),
  getSaledList: (data) => http.post('/buyer/workticket/list/v1',data),
  // getRelatedNews: (id) => http.get(`https://api.ithome.com/json/tags/0${id.slice(0, 3)}/${id}.json`, null, {
  //   parseJson: false
  // }),
}
export default api



