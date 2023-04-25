import {
	__commonWrap
} from '../helper'

/**
 * 打开银行列表
 */
export function openBankList(){
    return __commonWrap('openBankList')
}

/**
 * 打开银行网点城市列表
 * @param {Object} options 配置参数
 */
export function pushCityListView(options){
    return __commonWrap('pushCityListView')
}

/**
 * 获取APP内所有版本信息
 */
export function getVersionInfo(versionKey){
    return __commonWrap('getVersionInfo', {versionKey})
}

/**
 * 获取服务端时间
 */
export function getServerDate(){
    return __commonWrap('getServerDate')
}

/**
 * 获取当前APP风格
 */
export function getCurrentStyle(){
    return __commonWrap('getCurrentStyle')
}

/**
 * 获取服务器地址
 */
export function getServerUrl(){
    return __commonWrap('getServerUrl')
}

/**
 * 数据采集埋点(mpaas平台无须额外对接)
 */
export function trackEvent(eventId, data){
    return __commonWrap('trackEvent', {eventId, data})
}

/**
 * 打开原生网点导航路径功能
 * @param {Number} destinationType 1 网点 2 ATM
 * @param {Object} branchParam 目的地对象数据
 */
export function openNavigationApp(options = {}){
    return __commonWrap('openNavigationApp', options)
}

/**
 * 打开银行网点
 */
export function pushBankbranchView(){
    return __commonWrap('pushBankbranchView')
}
