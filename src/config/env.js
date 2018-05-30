/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * msitesBaseUrl: m站连接地址
 * 
 */

let baseUrl = process.env.API_HOST; 
let msitesBaseUrl = process.env.MSITES_HOST; 


export default {
  baseUrl,
  msitesBaseUrl
}