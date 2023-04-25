import axios from 'axios'
import mapping from './mapping'
import appconfig from '../../appconfig'

/**
 * API的url集合
 */
export const URL = {}
/**
 * API的方法集合
 */
export const API = {}

/**
 * 异步请求对象
 */
const Axios = axios.create({
    baseURL: '/',
    timeout: 30000,
    responseType: 'json',
    withCredentials: true
})

/**
 * 根据接口ID生成接口完整请求地址
 * @param {String} interfaceId 接口ID
 */
function rq (interfaceId) {
    return appconfig.serverPath + '/' + interfaceId + '.do'
}

/**
 * axios请求钩子函数，用于处理项目报文结构
 * @param {Object} config 配置信息
 */
function axiosHook (config) {
    config.data = {
      header: {
        channel: "01",
        transCode: config.interfaceId,
      },
      body: {
        tranCode: config.interfaceId,
        ...(config.data || {})
      }
    }
}

/**
 * 发送请求
 * @param {Object} config 请求配置
 */
function sendRequest (config) {

    //通过钩子构建报文结构
    axiosHook(config)

    //发送请求并提供默认异常处理
    return Axios(config).then(res => {
        //ajax返回处理
        const { status = '', statusText = '', data = {} } = res
        const { body = {}, header = {} } = data
        const { errorCode, errorMsg } = header
        let statusstr = String(status)

        if (statusstr.charAt(0) != '2') {
            window.alert(statusstr)
            return Promise.reject({errorCode: statusstr, errorMsg: statusText, res: res.data})
        } else if (errorCode != '0') {
            return Promise.reject({errorCode, errorMsg, res: res.data})
        } else {
          return res.data
        }
    }, (err) => {
        let res = err.response || {}
        return Promise.reject({errorCode: `${res.status}`, errorMsg: '数据请求发生错误，请检查网络！', res: res.data})
    })
}

/**
 * 初始化拦截链
 */
function initChain () {
    //初始化Axios拦截链
    Axios.interceptors.request.use(config => {
        //设置JSON请求
        let headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8;multipart/form-data'
        }
        config.headers = headers
        return config
    })
}

/**
 * 初始化
 */
function init () {

    //初始化请求链
    initChain()

    //构建接口url, 并根据映射导出API使用
    Object.keys(mapping).forEach((alias) => {

      let interfaceId = mapping[alias] || ''
      //URL组装
      let interfaceUrl = URL[alias] = rq(interfaceId)

      if(!API[alias]){
          //API组装
          API[alias] = (data = {}, options = {}) => sendRequest({
              method: 'post',
              url: interfaceUrl,
              data: data,
              interfaceId,
              ...options
          })
      }
    })
}

//初始化
init()

