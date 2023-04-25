/**
 * 配置模型
 * window.appconfig = {
 *      pageInfo: {},
 *      appList: {},
 *      hooks: {
 *          rpc: {
 *              pre: () => {},
 *              post: () => {}
 *          }
 *      }
 * }
 */

/**
 * 获取APP配置信息
 */
export function getAppConfig() {
    let appconfig = window.appconfig || {}
    return appconfig
}

/**
 * 获取APP配置钩子信息
 * @param {String} hookName 钩子名称
 * @return {Object} 钩子对象信息
 */
export function getAppConfigHook(hookName) {
    let appconfig = window.appconfig || {},
    hooks = appconfig.hooks || {},
    hookInfo = hooks[hookName] || {}
    return hookInfo
}

/**
 * 获取APP配置之页面配置信息
 * @return {Object} 页面配置信息
 */
export function getAppConfigPageInfo() {
    let appconfig = window.appconfig || {},
    pageInfo = appconfig.pageInfo || {}
    return pageInfo
}

/**
 * 获取APP配置之包配置信息
 * @return {Object} 包配置信息
 */
export function getAppConfigAppList() {
    let appconfig = window.appconfig || {},
    appList = appconfig.appList || {}
    return appList
}

