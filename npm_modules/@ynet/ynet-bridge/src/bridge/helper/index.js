
import {getAppConfig, getAppConfigHook} from './config'

/**
 * 通用JSAPI包装
 * @param {String} api jsapi名称
 * @param {Object || Function} options 配置选项或者回调函数
 */
export function __commonWrap(api, options = {}, config = {}){
    //支持连续调用
    let keepCallback = config.keepCallback,
    apiHook = getAppConfigHook(api)

    return new Promise((resolve, reject) => {

        //bridge兼容处理
        let bridge = window.AlipayJSBridge || window.FlameJSBridge

        //api调用
        let apiCall = () => {
            bridge.call(api, options, res => {
                
                //提供预制后置回调钩子，允许外部拦截冒泡阶段处理消息
                apiHook.postCall && apiHook.postCall({result: res, api, options, config})

                if(res && res.error && res.error != 0 && res.error != '0'){
                    window.console && console.info && console.info(`[${api}]方法调用异常：`, options, res);
                    reject(res)
                } else {
                    //对于多次回调支持
                    keepCallback && keepCallback(res);
                    resolve(res)
                }
            })
        }

        //提供预制前置回调钩子，允许外部拦截捕获阶段处理消息
        let ret = apiHook.preCall && apiHook.preCall({api, options, config})

        //支持preCall异步回调
        Promise.all([ret]).then(() => { ready(apiCall); })
    })
}

/**
 * 监听jsbridge ready事件
 * @param {Function} callback 回调函数
 */
export function ready (callback) {
    if (window.AlipayJSBridge || window.FlameJSBridge) {
        callback && callback()
    } else {
        window.document.addEventListener('AlipayJSBridgeReady', callback, false)
        window.document.addEventListener('FlameJSBridgeReady', callback, false)
    }
}

/**
 * 卸载jsbridge ready事件
 * @param {Function} callback 回调函数
 */
export function unready (callback) {
    window.document.removeEventListener('AlipayJSBridgeReady', callback, false)
    window.document.removeEventListener('FlameJSBridgeReady', callback, false)
}


/**
 * 生成pushWindow所需要的参数
 * @param {number} appId 目标页的appId
 * @param {Object} param 对客户端的设置
 * @param {Object} passData 需传递的页面参数
 */
export function pushWindowParam(appId, param, pagePushParam){

    let appconfig = getAppConfig()
    const dev = !!appconfig.dev

    const defaultParam = Object.assign({
        titleBarColor: 16777215,
        showOptionMenu: false,
        showTitleBar: true,
        titleColor: 0,
        defaultBack: 'back_black'
    }, appconfig.startParams || {})

    //识别使用方法
    const method = dev ? 'pushWindow' : (appId ? 'startH5App' : 'pushWindow')

    let startparams = Object.assign(defaultParam, pagePushParam, param)
    
    return {
        method,
        obj: Object.assign(
            (dev || !appId) ? {} : { appId: String(appId) },
            //合并 默认配置 conf配置 传参配置
            method == 'startH5App' ? startparams : {param: startparams}
        )
    }
}

/**
 * 构建参数字符串
 * @param {Object} data 数据对象
 * @returns {String} 对象字符串
 */
export function buildParams (data) {
    let paramsArr = []
    data = data || {}
    for(let key in data){
        paramsArr.push(encodeURIComponent(key || '') 
            + '=' + encodeURIComponent(data[key] || ''))
    }
    return paramsArr.join('&')
}

/**
 * 解构查询字符串参数
 * @param {String} querystring 查询字符串
 * @returns {Object} 数据对象
 */
export function parseParams (querystring) {
    let searchArr = (querystring || '').split('&') || []
    let params = {}
    
    searchArr.forEach(keyvalue => {
        let keyPair = keyvalue.split('=') || []
        if(keyPair[0]){
            params[decodeURIComponent(keyPair[0])] = decodeURIComponent(keyPair[1] || '')
        }
    });

    return params
}

/**
 * 全局唯一标示生成
 */
export function uuid() {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    var len = 8, radix = 16;
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    return uuid.join('');
}