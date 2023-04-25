import bridge from '@ynet/ynet-bridge'
import rpchook from './hooks/rpchook'
import pushwindowhook from './hooks/pushwindowhook'

//应用配置 与 bridge交互结合
window.appconfig = {
    
    // 标识是否开发调试环境，目前true控制pushWindow处理跨包跳转时使用pushWindow还是startH5App
    dev: process.env.NODE_ENV === 'development',

    // 各页面特殊头部配置信息
    pageInfo: bundleStat, 

    // 包名与包ID的映射关系
    appList: bundleId, 

    // 页面默认启动参数
    startParams: {
        titleBarColor: 16777215,
        showOptionMenu: false,
        showTitleBar: true,
        titleColor: 0,
        defaultBack: 'back_black'
    },

    // jsapi拦截器钩子
    hooks: {
        rpc: rpchook,
        pushWindow: pushwindowhook,
        startH5App: pushwindowhook
    }
}

export default bridge