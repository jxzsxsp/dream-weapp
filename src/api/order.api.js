import http from '@/utils/http'

const api = {
  getOrderList: (data) => http.post('/trade/list/v4',data,true),
  // getRelatedNews: (id) => http.get(`https://api.ithome.com/json/tags/0${id.slice(0, 3)}/${id}.json`, null, {
  //   parseJson: false
  // }),
}
export default api



