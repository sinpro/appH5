/**
 * 替换字符串中 &quot;
 * @param {String} str 
 */
export function replaceQuot (str) {
    return str ? str.replace(/&quot;/g, '"') : ''
}