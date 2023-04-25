import _ from 'lodash'

let rpchook = {

    preCall ({options}) {
        //打印RPC日志
        console.info(options)
    },
    
    postCall ({result}) {
        //打印RPC日志
        console.info(result)
    },

    /**
     * 预处理rpc上送参数
     * @param {Object} rpcParams rpc上送参数
     */
    pre (rpcInfo) {
        //页面更新会话数据时，维护window.sessionID
        let sessionID = window.sessionID || ''

        //具体项目报文组装
        let data = rpcInfo.requestData
        rpcInfo.requestData = {
            'header': {
                "mp_sId": sessionID || '',
                "versionNo": "",
                "model": "",
                "type": "J",
                "UUID": "",
                "channel": "01",
                "channelIP": "",
                "transCode": rpcInfo.operationType,
                "transTime": "",
                "transId": ""
            },
            'body': {
                "tranCode": rpcInfo.operationType,
                "srcChannel": "CS",
                ...data
            }
        }

        !rpcInfo.options && (rpcInfo.options = {})
        !rpcInfo.options.headers && (rpcInfo.options.headers = {})
        
        rpcInfo.operationType = RPC_PATH + rpcInfo.operationType
    },

    /**
     * 后处理rpc结果信息
     * @param {Object} res 结果信息对象 
     */
    post ({resolve, reject, rpcInfo, result}) {
        let {options = {}} = rpcInfo
        let processError = options.processError
        let processSuccess = options.processSuccess

        if(result.resData){
            let resData = result.resData
            let header = resData.header
            let body = resData.body

            if (header && header.errorCode !== '0') {
                if (header.errorCode === 'MP100007') {
                    //会话超时
                    app.api.confirm('登录会话超时，请重新登录').then((res) => {
                        if (res.ok) {
                            app.api.closeAll()
                        }
                    })
                }else if(header.errorCode === 'MP100008') {
                    //异地登陆
                    app.api.confirm(header.errorMsg || '您的账号已在其他地方登陆，请重新登录').then((res) => {
                        if (res.ok) {
                            app.api.closeAll()
                        }
                    })
                }else if(processError && _.isFunction(processError)){
                    processError(result)
                }else if(processError !== false){
                    let error = new RpcError(result)
                    app.api.alert(error.showMsg)
                    reject(error)
                }else{
                    reject(new RpcError(result))
                }
            }else{
                processSuccess && processSuccess(result)
                return resolve(body)
            }
        }else{
            let error = new RpcError(result)
            app.api.showToast(error.showMsg)
            return reject(error)
        }
    }
}

function RpcError(res){
    let resData = res.resData
    let showMsg = ''

    if (res && res.resData) {
        this.header = resData.header || {}
        this.body = resData.body || {}

        this.errorCode = this.header.errorCode
        this.errorMsg = decodeURI(this.header.errorMsg + '')

        if (this.errorMsg.length === 0) {
            this.errorMsg = '错误码：' + this.errorCode +
                ' \n 交易失败';
        }

        // ifp报错
        if (process.env.NODE_ENV !== 'production') {
            showMsg =  this.errorMsg
        } else {
            showMsg = this.errorMsg.replace(/^\d+[:：]/, '')
        }

    } else if ((res.errorCode || res.error) && res.errorMessage) {
        // mpaas报错
        this.errorCode = res.errorCode || res.error
        this.errorMsg = decodeURI(res.errorMessage)

        if (this.errorCode == '10') {
            this.errorMsg = '对不起，网络连接失败，请检查网络后再试'
        }

        if (process.env.NODE_ENV !== 'production') {
            showMsg = '系统错误' +
                ' \n 错误码：' + this.errorCode +
                ' \n 错误信息：' + this.errorMsg
        } else {
            showMsg = this.errorMsg
        }

    } else {
        showMsg = '网络请求失败，请重试！'
    }

    this.response = res
    this.showMsg = showMsg
}

export default rpchook