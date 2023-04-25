module.exports = {

    // virtualHost: 'https://mcube2-prod.oss-cn-hangzhou.aliyuncs.com',
    virtualHost: 'https://mcube-prod.oss-cn-hangzhou.aliyuncs.com',
    workspace: 'ONEX7E28C7C221854_Dev',

    webpackConf: {

    },

    envConfig: {
        RPC_PATH: '"com.ifp."', //RPC请求路劲
        URL_PATH: {
            // 运营图片资源
            '@staticfile/': '"https://dev.lbapp.cn/fastdfs/"',
            // 广告模板默认图标
            '@floorstatic/': '"https://dev.lbapp.cn/floorstatic/"',
        }
    }
}