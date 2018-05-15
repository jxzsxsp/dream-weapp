var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"alpha"',
  API_HOST: '"http://172.16.1.112:8080"'
})
