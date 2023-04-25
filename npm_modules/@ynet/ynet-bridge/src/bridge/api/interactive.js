import {
	__commonWrap
} from '../helper'

/**
 * 提示框
 * @param {String} message 提示文字内容
 * @param {String} title 标题
 * @param {Object} options 可选配置项
 * @returns {Promise} promise对象
 */
export function alert (message, title = '系统提示', {
        okButton = '确定', 
        clickBgToHide = false,
        cancelGrayStyle = false} = {}
) {
    return __commonWrap('alertEx', {title, message, okButton: okButton, clickBgToHide, cancelGrayStyle})
}

/**
 * 确认框
 * @param {String} message 确认文字内容
 * @param {String} title 标题
 * @param {Object} options 可选配置项
 * @returns {Promise} promise对象
 */
export function confirm (message, title = '系统提示', {
    okButton = '确定', 
    cancelButton = '取消', 
    clickBgToHide = false,
    cancelGrayStyle = false} = {}
) {
    return __commonWrap('alertEx', {title, message, okButton, cancelButton, clickBgToHide, cancelGrayStyle})
}

/**
 * 输⼊入提示框
 * @param {Object} options 配置项
*/
export function showInputAlert ({
    title = '系统提示',
    presetInputContent = '',
    placeholder = '',
    okButton = '确定',
    cancelButton = '取消',
    wordsNumLimit = '',
    keyboardType = '0',
    clickBgToHide = false
}) {
    return __commonWrap('showInputAlert', {
        title,
        presetInputContent,
        placeholder,
        okButton,
        cancelButton,
        wordsNumLimit,
        keyboardType,
        clickBgToHide
    })
}

/**
 * 显示加载中
 * @param {String} message loading文字
 * @param {Number} duration 交互持久时间
*/
export function showLoading (message = '加载中', duration = 15) {
    return __commonWrap('showLoadingEx', {
        message, duration
    })
}

/**
 * 隐藏加载中
*/
export function hideLoading () {
    return __commonWrap('hideLoadingEx')
}

/**
 * 显示弱提示
*/
export function showToast (message, showIcon = '2') {
    return __commonWrap('showToast', {message, showIcon})
}

/**
 * 时间日期选择器
 * @param {Object} options 日期选择配置项
*/
export function showDatePicker ({
    type = 0,
    title = '日期选择',
    minimumDate,
    maximumDate,
    currentDate,
    dateFormat
}) {
    return __commonWrap('showDatePicker', {
        title,
        type,
        minimumDate,
        maximumDate,
        currentDate,
        dateFormat
    })
}

/**
 * 显示选项卡
 * @param {Object} options 配置项
*/
export function showActionSheet ({
    title = '',
    items = [],
    // selectedIndex = 0
}) {
    return __commonWrap('showActionSheet', {
        title,
        items,
        // selectedIndex
    })
}

/**
 * 选择框视图
 * @param {Object} options 配置项
*/
export function showPickerView ({
    title = '',
    dataSource = [],
    defaultValue = []
}) {
    return __commonWrap('showPickerView', {
        title,
        dataSource,
        defaultValue
    })
}

/**
 * 导航栏遮罩
*/
export function showMask (options) {
    return __commonWrap('showMask', options)
}

/**
 * 隐藏导航栏遮罩
*/
export function hideMask () {
    return __commonWrap('hideMask')
}

/**
 * 设置导航栏左侧按钮
*/
export function setLeftMenu (options, keepCallback) {
    return __commonWrap('setLeftMenu', options, {keepCallback})
}

/**
 * 显示导航栏左侧按钮
 * @param {Boolean} show 是否显示左侧按钮，默认true
*/
export function showLeftMenu (show = true) {
    return __commonWrap('showLeftMenu', {show})
}

/**
 * 设置导航栏标题/图片
 * @param {Object} options 配置选项
*/
export function setMiddleTitle (options) {
    return __commonWrap('setMiddleTitle', options)
}

/**
 * 设置导航栏右侧按钮
 * @param {Object} options 配置选项
*/
export function setRightMenu (options, keepCallback) {
    return __commonWrap('setRightMenu', options, {keepCallback})
}

/**
 * 设置导航栏底部分隔线颜色
 * @param {Object} options 配置选项
*/
export function setBarBottomLineColor (options) {
    return __commonWrap('setBarBottomLineColorEx', options)
}

/**
 * 显示导航栏
*/
export function showTitleBar () {
    return __commonWrap('showTitleBar')
}

/**
 * 隐藏导航栏
*/
export function hideTitleBar () {
    return __commonWrap('hideTitleBar')
}

/**
 * 设置导航栏背景色
 * @param {Object} options 导航栏配置选项
*/
export function setTitleBarColor (options) {
    return __commonWrap('setTitleBarColor', options)
}

/**
 * 获取状态栏高度
*/
export function getStatusBarHeight () {
    return __commonWrap('getStatusBarHeight')
}

/**
 * 获取导航栏高度
*/
export function getTitleBarHeight () {
    return __commonWrap('getTitleBarHeight')
}

/**
 * 设置状态栏风格
 * @param {String} style 状态栏风格 0-default黑色风格 1-light白色风格
*/
export function setStatusBarStyle (style) {
    return __commonWrap('setStatusBarStyle', {style})
}

/**
 * 开始下拉刷新
*/
export function startPullDownRefresh () {
    return __commonWrap('startPullDownRefresh')
}

/**
 * 结束下拉刷新
*/
export function stopPullDownRefresh () {
    return __commonWrap('stopPullDownRefresh')
}

