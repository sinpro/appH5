import _ from 'lodash'
import {
	__commonWrap
} from '../helper'

/**
 * 打开人脸识别
 * @param {Object} options 人脸识别参数
 */
export function openFaceRecognition(options){
    return __commonWrap('openFaceRecognition', options)
}

/**
 * 打开二维码扫描
 */
export function openQRCodeScanner(){
    return __commonWrap('openQRCodeScanner')
}

/**
 * 打开分享面板
 * @param {Object} options 人脸识别参数
 */
export function showSharePad(options){
    return __commonWrap('showSharePad', options)
}

/**
 * 直接分享
 * @param {Object} options 人脸识别参数
 */
export function shareTo(options){
    return __commonWrap('shareTo', options)
}

/**
 * 显示安全键盘
 * @param {Object} options 密码键盘参数
 * @param {Function} keepCallback 事件回调函数
 */
export function showKeyboard(options, keepCallback){
    return __commonWrap('showKeyboard', options, {keepCallback})
}

/**
 * 关闭安全键盘
 */
export function hideKeyboard(){
    return __commonWrap('hideKeyboard')
}

/**
 * 显示支付密码键盘
 * @param {Object} options 支付面板选项
 */
export function showPaymentPad(options){
    return __commonWrap('showPaymentPad', options)
}

/**
 * 打开ocr识别身份证
 * @param {String} scanType 扫描正反面 0 正面 1 反面
 */
export function showOCRIDCard(scanType){
    return __commonWrap('showOCRIDCard', {scanType})
}

/**
 * 打开ocr识别银行卡
 */
export function showOCRBankCard(){
    return __commonWrap('showOCRBankCard')
}

/**
 * 检查APP版本更新
 * @param {String} silent 反馈类型  0 弹窗提示 1 静默查询
 */
export function checkAppUpdate(silent){
    return __commonWrap('checkAppUpdate', {silent})
}

/**
 * 打开mpaas小程序
 * @param {Object} options url / 小程序id
 */
export function openMiniApp(options){
    return __commonWrap('openMiniApp', options)
}