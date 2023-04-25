import _ from 'lodash'
import {
	__commonWrap,
    pushWindowParam,
    buildParams,
    uuid
} from '../helper'
import {getAppConfigPageInfo, getAppConfigAppList} from '../helper/config'
import {getUserInfo, login} from './user'
import {setSessionStorage} from './cache'

/**
 * 打开新窗口跳转
 * @param {String} url 路由url信息, 必须以/开头
 * @param {Object} data 页面参数传递
 * @param {Object} param 具体可参考 https://www.cloud.alipay.com/docs/2/85055
 * @returns underfined
 * @example pushWindow('demo/jsapi/test.html', data, param)
 * 
 */
export const pushWindow = _.debounce((url, data = {}, options = {}) => {
  
  let pageInfoUrl, pageInfo, pageConfig, appList, bLogin

  if(url && /^http(s)?:\/\//.test(url)){
    pushWindowOnline(url, data, options)
    return
  }

  // 确保url以绝对路径访问 且 在分析跳包时分析准确
  url = url.charAt(0) == '/' ? url : ('/' + url)

  // 获取页面启动配置信息
  pageInfo = getAppConfigPageInfo()
  appList = getAppConfigAppList()
  pageInfoUrl = url.replace(/(\/)([^\.]+)(\..*)?/, '$2')
  pageConfig = pageInfo[pageInfoUrl] || {}

  // 获取是否登录标识
  let {needLogin} = pageConfig
  needLogin = (needLogin === false) ? (options.needLogin || false) : needLogin

  // 获取登录标识
  return getUserInfo().then(res => {

    bLogin = !_.isEmpty(res.userInfo)

    //目标url 和 当前url比较，不同包的时候返回目标页的appId
    const findPackageNameByUrl = ((targetUrl, originUrl = window.location.pathname) => {
      const tu = targetUrl.split('/')[1]
      const ou = originUrl.split('/')[1]
      return tu === ou ? false : appList[tu]
    })(url)

    //生成pushWindow所需要的所有参数
    const {method, obj} = pushWindowParam(findPackageNameByUrl, options.pushParam || {}, pageConfig)
    
    //利用sessionstorage传递数据
    let uuidstr = uuid()
    setSessionStorage(uuidstr, JSON.stringify(data))
    let paramstr = buildParams({_PARAMSKEY: uuidstr})
    let lastUrl = /\?/.test(url) ? (url + '&' + paramstr) : (url + '?' + paramstr)
    
    const next = () => {
      console.info(`--${method}--${JSON.stringify(Object.assign(obj, {url: lastUrl}))}`)
      return __commonWrap(method, Object.assign(obj, {url: lastUrl})) 
    }
    
    return (bLogin === true || needLogin === false) ? next() : login({pageUrl: lastUrl})
  })
  
}, 800, {
  leading: true,
  trailing: false
})

/**
  * 打开第三方在线地址
  * @param {String} url 路由url信息
  * @param {Object} data 参数对象：支持简单key-value
  * @param {Object} options 路由选项
  * @returns {Promise} Promise对象
  * @example
  *     pushWindowOnline('https://www.baidu.com/', {test1:'1',test2:'2'})
  */
export const pushWindowOnline = _.debounce(function(url, data = {}, options = {}) {

    let params, lastUrl, needLogin, bLogin

    params = buildParams(data)
    lastUrl = url.indexOf('?') > -1 ? (url + '&' + params) : (url + '?' + params)

    // 获取是否登录标识
    needLogin = (options.needLogin || false)

    // 获取登录标识
    return getUserInfo().then(res => {
      bLogin = !_.isEmpty(res.userInfo)

      // 生成pushWindow所需要的所有参数
      const {method, obj} = pushWindowParam(false, options.pushParam || {}, {})

      const next = () => {
          console.info(`--${method}--${JSON.stringify(Object.assign(obj, {url: lastUrl}))}`)
          return __commonWrap(method, Object.assign(obj, {url: lastUrl}))
      }

      return (bLogin === true || needLogin === false) ? next() : login({pageUrl: lastUrl})

    })

}, 800, {
    leading: true,
    trailing: false
})

/**
 * 关闭所有页面
 */
export function closeAll(){
    return __commonWrap('closePage', {closeType: 1})
}

/**
 * 关闭其他页面，除自身
 */
export function closeOther(){
    return __commonWrap('closePage', {closeType: 2})
}

/**
 * 关闭某些页面，匹配url
 * @param {Number|String} pageIndex 页面索引
 */
export function closePage(urls){
    return __commonWrap('closePage', {closeType: 4, urls})
}

/**
 * 返回至指定页面
 * @param {Number|String} pageIndex 页面索引
 */
export function closeToPage(pageIndex, data){
    let options = {data: data}
    typeof pageIndex === 'string' ? (options.url = pageIndex) : (options.index = pageIndex)
    return __commonWrap('closeToPage', options)
}

/**
 * 关闭所有窗口，并回到首页
 */
export function closeToHomePage(tabTag){
    return __commonWrap('closeToHomePage', {tabTag})
}

/**
 * 清除webview历史对象
 */
export function clearHistory(){
    return __commonWrap('clearHistory')
}