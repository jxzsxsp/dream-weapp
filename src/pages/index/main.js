import Vue from 'vue'
import App from './index'
import { S_IRWXG } from 'constants';
import httpClass from '../../utils/http'
var http = new httpClass();

const app = new Vue(App)
app.$mount()

// wx.request({
//   "url": process.env.API_HOST + "/www",
//   "method": "GET",
//   "success": function(res){
//     console.log(res)
//   },
//   "fail": function(error){
//     console.log(error)
//   }
// })


// const http = new Http()
// html.get();
// console.log(http);
http.get('/user').then(
  res => {console.log(res)},
  res => {console.log(res)}
)
// .complete(res => {
  // console.log('complete',res);
// });
// http.post('/user', { name: 'music' }).then(function(){
  // console.log(111);
// })