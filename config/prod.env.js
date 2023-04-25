/**
 * 开发环境的配置项
 * 可用process.env访问各项配置
 */
var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  config: {
    virtualHost: 'https://mcube-prod.oss-cn-hangzhou.aliyuncs.com',
    workspace: 'ONEX7E28C7C221854_Dev'
  },
  envConfig: {
    NODE_ENV: '"production"'
  }
})
