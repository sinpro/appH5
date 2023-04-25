import axios from 'axios'

/**
 * mock环境配置信息
 */
const MockConfig = {
    // mock请求路径
    mockPath: '/apis',
    // 是否开启真机模拟
    bMock: false,
    // mock api
    mockApis: {

        /**
         * rpc请求模拟
         * @param {Object} options rpc数据对象
         * @param {Function} callback rpc回调函数
         */
        rpc(options, callback) {
            let mockName = options.operationType.split('.').pop()
            let url = `${MockConfig.mockPath}/${mockName}.do`
            axios({
                url: url,
                data: (options.requestData[0] || {})._requestBody || '',
                method: 'post',
                timeout: parseInt((options.timeout || 20), 10)*1000,
                headers: Object.assign({
                    'Content-Type': 'application/json;charset=UTF-8'
                }, options.headers || {})
            }).then(res => {
                callback({header: res.headers, resData: res.data})
            },(res, sss) => {
                callback({error: '-1', errorMessage: res.message})
            })
        },

        /**
         * 获取用户信息
         * @param {Object} options rpc数据对象
         * @param {Function} callback rpc回调函数
         */
        getUserInfoEx(options, callback){
            callback({ error: 0, userInfo: {header: {}, body: {testUser: 'test'}} })
        },

        /**
         * 空处理
         * @param {Object} options rpc数据对象
         * @param {Function} callback rpc回调函数
         */
        noop (options, callback) {}
    }
}

/**
 * 开启JSAPI拦截处理
 */
function start(){
    if(MockConfig.bMock && window.AlipayJSBridge){
        // 真机强制mock部分API
        let _call = window.AlipayJSBridge.call || function(){}
        window.AlipayJSBridge.call = function(fnName, options = {}, callback){
            let handler
            if(handler = MockConfig.mockApis[fnName]) {
                return handler.apply(MockConfig.mockApis, [options, callback])
            }else{
                _call.call(window.AlipayJSBridge, fnName, options, callback)
            }
        }
    }else if(!app.device.specialSign) {
        // 非识别环境（如chrome浏览器）模拟API
        window.AlipayJSBridge = {
            call (fnName, options = {}, callback){
                let handler = MockConfig.mockApis[fnName] || MockConfig.mockApis['noop']
                let args = [options, callback]
                return handler.apply(MockConfig.mockApis, args)
            },
            startupParams: {
                passData: '{}'
            }
        }
    }
}

start()
