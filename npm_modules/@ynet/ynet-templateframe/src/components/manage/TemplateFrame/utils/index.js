
/**
 * 解构查询字符串参数
 * @param {String} querystring 查询字符串
 * @returns {Object} 数据对象
 */
export function parseParams (querystring) {
    let searchArr = (querystring || '').split('&') || []
    let params = {}
    
    searchArr.forEach(keyvalue => {
        let keyPair = keyvalue.split('=') || []
        if(keyPair[0]){
            params[decodeURIComponent(keyPair[0])] = decodeURIComponent(keyPair[1] || '')
        }
    });

    return params
}
