var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_HOST: '"http://172.16.2.226:8080"',
  API_HOST: '"https://dev-trade-mapi.lian-shang.cn"',
  MSITES_HOST:'"http://m.lian-shang.cn/"'
})
