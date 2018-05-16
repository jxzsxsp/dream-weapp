import Vue from 'vue'
import App from './index'
import { S_IRWXG } from 'constants';
import httpClass from '../../utils/http'
var http = new httpClass();

const app = new Vue(App)
app.$mount()

// http.post('/user',{}).then(function(){
//   console.log(123123);
// },function(){
//   console.log(2934123123)
// })



