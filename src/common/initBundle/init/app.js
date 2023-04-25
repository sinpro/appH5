import bridge from '../bridge'
import service from '../service'
import initEvent from './event'

const app = {

    /**
     * vue顶级实例
     */
    vm: null,

    /**
     * 状态存储对象
     */
    store: null,

    /**
     * 传递参数（url参数以及前一个页面传递的参数）
     */
    params: {},

    /**
     * JSAPI集对象
     */
    api: bridge,

    /**
     * 服务API集对象
     */
    tools: service,

    /**
     * 设备识别对象
     */
    device: {
        
        specialSign: navigator.userAgent.indexOf('ynetBank') != -1,

		os: navigator.userAgent.indexOf('iPhone') > -1 ? 'ios' : 'android'
    },

    /**
     * 对象序列化
     * @param {Object} data 序列化数据对象
     * @param {String} split 拼接分隔符
     */
    serializeObject (data, split = '&') {
        let paramsArr = []
        data = data || {}
        for(let key in data){
            paramsArr.push(encodeURIComponent(key || '') 
                + '=' + encodeURIComponent(data[key] || ''))
        }
        return paramsArr.join(split)
    },

    /**
     * 对象反序列化
     * @param {String} str 目标字符串
     * @param {String} split 分割字符
     */
    deserializeObject (str, split = '&') {
        let searchArr = (str || '').split(split) || []
        let params = {}
        
        searchArr.forEach(keyvalue => {
            let keyPair = keyvalue.split('=') || []
            if(keyPair[0]){
                params[decodeURIComponent(keyPair[0])] = decodeURIComponent(keyPair[1] || '')
            }
        })

        return params
    },
    
    /**
     * 添加监听DOM事件
     * @param {String} event 事件名称 
     * @param {Function} fn 事件回调函数
     * @param {Boolean} useCapture 是否捕获
     */
    on (event, fn, useCapture = false) {
		window.document.addEventListener(event, fn, useCapture)
	},

    /**
     * 删除DOM事件监听
     * @param {String} event 事件名称 
     * @param {Function} fn 事件回调函数
     * @param {Boolean} useCapture 是否捕获 
     */
	off (event, fn, useCapture = false) {
		window.document.removeEventListener(event, fn, useCapture)
	},

    /**
     * 触发DOM事件
     * @param {String} eventName 事件名称
     * @param {Object} data 事件数据对象
     */
	trigger(eventName, data = {}){
		let event = document.createEvent('Events')
		event.initEvent(eventName, false, true)
		event.data = data
		document.dispatchEvent(event)
		return event;
	},

    /**
     * 监听Native系统事件
     * @param {String} eventName 事件名称
     * @param {Function} fn 事件回调函数
     */
	listen (eventName, fn) {
        return app.api.addNotifyListener({name: eventName}, fn);
    }
}

/**
 * 初始化启动参数
 */
function initParamsInfo () {
    //反序列化字符串参数为对象
    let searchParams = app.deserializeObject((window.location.search || '').substring(1))
    let paramskey = searchParams._PARAMSKEY || ''
    let urlparams = searchParams._PARAMS || ''
    delete searchParams._PARAMSKEY
    delete searchParams._PARAMS

    return new Promise(resolve => {
        if(paramskey){
            app.api.getSessionStorage(paramskey, false).then((jsonData) => {
                let params
                try{
                    params = JSON.parse(jsonData)
                }catch(e){}
                
                app.params = Object.assign({}, searchParams, params)
                resolve()
            }, () => {
                resolve()
            })
        }else{
            if(urlparams){
                try{
                    urlparams = JSON.parse(urlparams)
                }catch(e){
                    urlparams = {}
                }
            }

            app.params = Object.assign({}, searchParams, urlparams)
            resolve()
        }
    })
}

/**
 * 应用初始化
 * @param {Object} options 初始化参数
 */
export default function (options) {

    let {store, vm} = options

    //对外暴露使用
    Object.assign(app, options)

    //添加系统样式
    window.document.body.classList.add('system_' + app.device.os)

    //初始化应用状态
    const initState = () => {

        //监听登录成功事件
        app.api.addNotifyListener({name: 'NEBULANOTIFY_loginSuccess'}, () => {
            store.dispatch('initSessionInfo', {app})
        })

        //初始化数据状态
        Promise.all([initParamsInfo(), store.dispatch('initStore', {app})]).then(() => {
            vm.$mount('#app')
            initEvent(app)
            app.off('AlipayJSBridgeReady', initState)
        })
    }

    app.device.specialSign ? app.api.ready(initState) : setTimeout(() =>  vm.$mount('#app'), 0)

    return app
}
