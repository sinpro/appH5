import {
	__commonWrap
} from '../helper'

/**
 * 获取设备APP信息
 */
export function getDeviceAndAppInfo(){
    return __commonWrap('getDeviceAndAppInfo')
}

/**
 * 获取设备唯一号
 */
export function getDeviceFingerprint(){
    return __commonWrap('getDeviceFingerprint')
}

/**
 * 获取电池信息
 */
export function getBatteryInfo(){
    return __commonWrap('getBatteryInfo')
}

/**
 * 获取用户设备是否开启权限信息
 */
export function getPrivacyServiceStatus(service){
    return __commonWrap('getPrivacyServiceStatus', {service})
}

/**
 * 请求设备的基础权限
 */
export function requestPrivacyServicePermissions(service){
    return __commonWrap('requestPrivacyServicePermissions', {service})
}
