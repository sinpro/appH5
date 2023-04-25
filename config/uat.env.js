/**
 * 测试环境的配置项
 * 可用process.env访问各项配置
 */
var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
    virtualHost: 'https://mcube-prod.oss-cn-hangzhou.aliyuncs.com',
    workspace: 'ONEX7E28C7C221854_Uat',

    webpackConf: {

    },

    envConfig: {
        RPC_PATH: '"com.ifp."', //RPC请求路劲
        URL_PATH: {
            // 运营图片资源
            '@staticfile/': '"https://uat.lbapp.cn/fastdfs/"',
            // 广告模板默认图标
            '@floorstatic/': '"https://uat.lbapp.cn/floorstatic/"',
        }
    }
})