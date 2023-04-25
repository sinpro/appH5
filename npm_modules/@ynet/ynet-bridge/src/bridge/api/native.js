import {
	__commonWrap
} from '../helper'
import {getAppConfigHook} from '../helper/config'
import {showLoading, hideLoading} from './interactive'

/**
  * 添加事件监听
  * @param {Object} options 监听属性
  * @param {Function} keepCallback 事件回调函数
  */
 export function addNotifyListener (options, keepCallback) {
    return __commonWrap('addNotifyListener', options, {keepCallback})
 }

/**
  * 远程过程调用
  * @param {String} operationType 远程请求名称
  * @param {Object} requestData 远程请求参数 key:value
  * @param {Object} options 远程调用选项
  */
 export function rpc (operationType, requestData = {}, options = {}) {
    
    let rpcInfo = {operationType, requestData, options},
    rpcHook = getAppConfigHook('rpc')

    //预处理钩子
    rpcHook.pre && rpcHook.pre(rpcInfo)

    let timeout = parseInt(options.timeout || 20, 10), 
    
    timeHandler, loadingClosed = false,
    
    //RPC参数信息组装
    rpcParams = {
        operationType: rpcInfo.operationType,
        requestData: [{'_requestBody': rpcInfo.requestData}],
        timeout: timeout,
        headers: options.headers,
        getResponse: true
    },

    rpcCallback = (bResolve) => {

        //创建回调函数
        return (result) => {
            
            //关闭等待框
            timeHandler && clearTimeout(timeHandler)
            if(options.loading !== false && !loadingClosed) hideLoading() 

            return new Promise((resolve, reject) => {

                //通过钩子能力对外暴露项目
                if(rpcHook.post){
                    //返回处理钩子
                    rpcHook.post({resolve, reject, rpcInfo, result})
                }else{
                    bResolve ? resolve(result) : reject(result)
                }
            })
        }
    }

    //启动等待框
    if(options.loading !== false) {
        showLoading()
        //前端超时关闭弹窗, 解决客户端rpc偶发消息不回调场景引起的loading卡死问题
        timeHandler = setTimeout(() => { hideLoading(); loadingClosed = true; }, timeout*1000)
    }

    //发起RPC消息通知
    return __commonWrap('rpc', rpcParams).then(rpcCallback(true), rpcCallback(false))
 }

/**
 * 设置webview的usagent模式
 * @param {String} usagent usagent串
*/
export function debugMode (usagent) {
    return __commonWrap('debugMode', {usagent})
}

/**
 * 打开通讯录列表
 * @param {Object} options 通讯录配置项
*/
export function showContactList ({maxSeletedNum = 1, contactList}) {
    return __commonWrap('showContactList', {maxSeletedNum, contactList})
}

/**
 * 截屏
 * @param {String} type 截屏类型 0 - 默认全屏截屏1 - WebView截屏2 - WebView长图截屏
*/
export function screenShots (type, saveToAlbum) {
    return __commonWrap('screenShots', {type, saveToAlbum})
}

/**
 * 设置剪贴板
 * @param {String} copyString 复制到手机系统剪切板的字符串
*/
export function copyToClipboard (copyString = '') {
    return __commonWrap('copyToClipboard', {copyString})
}

/**
 * 发送短信
 * @param {Object} options 发送短信配置项
*/
export function sendSMS ({mobileNo, content}) {
    return __commonWrap('sendSMSEx', {mobileNo, content})
}

/**
 * 发送邮件
 * @param {Object} options 发送邮件配置项
*/
export function sendMail (options) {
    return __commonWrap('sendMail', options)
}

/**
 * IM自定义消息发送
 * @param {Object} options 发送消息配置项
*/
export function imCustomMessage (options) {
    return __commonWrap('imCustomMessage', options)
}

/**
 * 打开相册/拍照界面
*/
export function showCameraImagePicker () {
    return __commonWrap('showCameraImagePicker')
}

/**
 * 获取定位信息
*/
export function getLocationInfo () {
    return __commonWrap('getLocationInfo')
}

/**
 * 设置屏幕亮度
 * @param {Number} brightParams 亮度值  0 - 1
*/
export function setBrightness (brightParams) {
    return __commonWrap('setBrightness', {brightParams})
}

/**
 * 恢复屏幕亮度
*/
export function recoverBrightness () {
    return __commonWrap('recoverBrightness')
}

/**
 * 下载PDF
 * @param {String} url pdf下载地址
*/
export function downloadPdf (url) {
    return __commonWrap('downloadPdf', {url})
}

/**
 * 中文转大写拼音
 * @param {String} chineseString 待转中文字符串
*/
export function chinese2MandarinLatin (chineseString) {
    return __commonWrap('chinese2MandarinLatin', {chineseString})
}

/**
 * 打开第三方APP
 * @param {String} schemeURL 第三方APP地址
*/
export function startOtherApp (options) {
    return __commonWrap('startOtherApp', options)
}

/**
 * 检测是否支持ApplePay
*/
export function availableApplePay () {
    return __commonWrap('availableApplePay').then(res => res.result)
}

/**
 * 检测推送通知权限
*/
export function notificationStatus () {
    return __commonWrap('notificationStatus').then(res => res.notificationStatus)
}

/**
 * 检测定位权限
*/
export function availableLocationServices () {
    return __commonWrap('availableLocationServices').then(res => res.isLocationServicesEnabled)
}

/**
 * 通过url打开客户端视图
 * @param {String} appLinkUrl 视图url，如app://scan
 */
export function openAppLink (appLinkUrl) {
    return __commonWrap('openAppLink', {appLinkUrl})
}

/**
 * 打开定位设置
*/
export function openLocationSettings () {
    return __commonWrap('openLocationSettings')
}

/**
 * 打开系统浏览器
 * @param {String} url 访问url
*/
export function openNativeWebBrowser (url) {
    return __commonWrap('openNativeWebBrowser', {url})
}

/**
 * 增加日历提醒 
 * @param {Object} options 日历提醒配置项
*/
export function addCalendarReminder (options) {
    return __commonWrap('addCalendarReminder', options)
}

/**
 * 拨打电话
 * @param {String} phoneNumber 手机号码
*/
export function callPhoneNumber (phoneNumber) {
    return __commonWrap('callPhoneNumber', {phoneNumber})
}

/**
 * 检测是否已安装APP
 * @param {Object} options url配置信息
*/
export function isInstallApp (options) {
    return __commonWrap('isInstallApp', options)
}

/**
 * 检测GPS是否可用
*/
export function availableGPS () {
    return __commonWrap('availableGPS').then(result => result.availableGPS)
}

/**
 * 检测本地指纹/面容识别是否可用
*/
export function availableLocalAuthentication () {
    return __commonWrap('availableLocalAuthentication')
}

/**
 * 开始本地指纹/面容识别
*/
export function startLocalAuthentication (options) {
    return __commonWrap('startLocalAuthentication', options)
}

/**
 * 获取本地指纹/面容识别开启
 * @param {String} type 开关标识 login 登录 pay 支付
*/
export function getLocalAuthenticationOnOff (type) {
    type = type == 'login' ? '0' : (type == 'pay' ? '1' : type)
    return __commonWrap('getLocalAuthenticationOnOff', {type})
}

/**
 * 设置本地指纹/面容识别开启
 * @param {String} type 开关标识 login 登录 pay 支付
*/
export function setLocalAuthenticationOnOff (type) {
    type = type == 'login' ? '0' : (type == 'pay' ? '1' : type)
    return __commonWrap('setLocalAuthenticationOnOff', {type})
}

/**
 * 清除本地指纹/面容识别开启
 * @param {String} type 开关标识 login 登录 pay 支付
*/
export function clearLocalAuthenticationOnOff (type) {
    type = type == 'login' ? '0' : (type == 'pay' ? '1' : type)
    return __commonWrap('clearLocalAuthenticationOnOff', {type})
}

/**
 * 设置指纹/面容识别token
 * @param {String} token 设置指纹会话令牌
*/
export function setFingerPrintToken (token) {
    return __commonWrap('setFingerPrintToken', {token})
}

/**
 * 获取指纹/面容识别token
 * @param none
*/
export function getFingerPrintToken () {
    return __commonWrap('getFingerPrintToken', {})
}


/**
 * 获取手势开启
*/
export function getGestureOnOff () {
    return __commonWrap('getGestureOnOff')
}

/**
 * 获取手势路径是否显示
*/
export function getGesturePathShowState () {
    return __commonWrap('getGesturePathShowState')
}

/**
 * 设置手势路径是否显示
 * @param {Boolean} gesturePathShow 手势路劲是否显示 true显示 false不显示
*/
export function setGesturePathShowState (gesturePathShow) {
    return __commonWrap('setGesturePathShowState', {gesturePathShow})
}

/**
 * 打开手势设置
 * @param {String} type 手势开启方式 1 - 进入设置手势密码 2 - 进入修改手势密码 3 - 清除手势密码
*/
export function pushGestureSetting (type) {
    return __commonWrap('pushGestureSetting', {type})
}

/**
 * 设置手势token
 * @param {String} token 手势会话令牌
*/
export function setGestureToken (token) {
    return __commonWrap('setGestureToken', {token})
}

/**
 * 打开视频/直播页面
 * @param {Object} options 
*/

export function pushVideoPage (options) {
    return __commonWrap('pushVideoPage', options)
}
