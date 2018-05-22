var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"alpha"',
  API_HOST: '"https://dev-trade-mapi.lian-shang.cn"'
})
