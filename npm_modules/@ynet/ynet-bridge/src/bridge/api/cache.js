import {
	__commonWrap
} from '../helper'

/**
 * 获取数据内存存储缓存
 * @param {String} key 存储key值
 * @param {Boolean} keep 存储数据是否销毁，默认 true 不销毁
 */
export function getSessionStorage (key, keep = true) {
    return __commonWrap('getMemoryCache', {key}).then((result) => {
        (keep === false) && setSessionStorage(key, '')
        return new Promise(resolve => resolve(result.data))
    })
}

 /**
  * 设置数据缓存
  * @param {String} key 缓存键值
  * @param {Object} data 数据对象
  */
export function setSessionStorage (key, data) {
    return __commonWrap('setMemoryCache', {key, data})
}

/**
 * 获取磁盘数据存储缓存
 * @param {String} key 存储数据键值
 * @param {Boolean} keep 存储数据是否销毁，默认 true 不销毁
 */
export function getLocalStorage (key, keep = true) {
    return __commonWrap('getStorageCache', {key}).then((result) => {
        (keep === false) && setLocalStorage(key, '')
        return new Promise(resolve => resolve(result.data))
    })
}

 /**
  * 设置磁盘数据缓存
  * @param {String} key 缓存键值
  * @param {Object} data 数据对象
  */
export function setLocalStorage (key, data) {
    return __commonWrap('setStorageCache', {key, data})
}
