var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"prelease"',
  API_HOST: '"https://mapi.lian-shang.cn"',
  msitesHost:'"http://m.lian-shang.cn/"'
})
