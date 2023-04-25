import {
	__commonWrap
} from '../helper'

/**
 * 获取用户会话ID
 */
export function getSessionID (){
    return __commonWrap('getSessionID').then(res => res.sessionID)
}

/**
 * 打开登录对话框
 * @param {Object} options  登录选项  pageUrl 登录后跳转地址
 * @return {Promise} 异步对象
 */
export function login (options) {
    return __commonWrap('login', options)
}

/**
 * 获取用户信息
 * @returns {Promise} promise对象
 */
export function getUserInfo () {
  return __commonWrap('getUserInfoEx')
}

/**
 * 更新用户信息（从后端接口服务中更新会话信息）
 * @returns {Promise} promise对象
 */
export function updateUserInfo () {
    return __commonWrap('updateUserInfo')
}

/**
 * 清除用户信息,退出登录
 * @returns {Promise} promise对象
 */
export function cleanUserInfo () {
    return __commonWrap('cleanUserInfo')
}
