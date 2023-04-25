import _ from 'lodash'

/**
* @desc 金额转换成大写
* @param {Number} n 需要转换成大写的金额
* @return {String} 转换后的大写中文金额
* @example convertIntegerToChineseCash('123') =>'壹百贰拾叁元整'
*/
export function convertIntegerToChineseCash(n){

	let fraction = ['角', '分']
	let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
	let unit =  [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ]

	n = Math.abs(n)

	let s = ''

	for(let i = 0; i < fraction.length; i++){
		s +=  (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
	}

	s = s || '整'

	n = Math.floor(n)

	for(let i = 0; i < unit[0].length && n > 0; i++){
		let p = ''
		for(let j = 0; j < unit[1].length && n > 0; j++){
			p = digit[n % 10] + unit[1][j] + p
			n = Math.floor(n / 10)
		}
		s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s
	}
	return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
}

/**
* @desc - 格式化数字
* @param {String|Number} no 需要格式化的数字
* @param {String} split 需要分割的标志 默认是空格
* @example numberFormat('19990102', '/') => 1999/01/02
*/
export function numberFormat(no = '', split = ' '){
	if(!no) return
	no = String(no)
	if(no.length == 8){
		return no.replace(/(\d{4})(\d{2})(\d{2})/,"$1" + split + "$2" + split + "$3")
	}

	return no.replace(/(\d{4})(?=\d)/g, "$1"+ split)
}

/**
 * @desc  格式化数字，并且四舍五入,长度不够的自动补0
 * @param {String|Number} num 需要转格式的数字
 * @param {Number} len 需要保留多少位小数
 * @return {String} 转换后的结果
 * @example numberRound(123.225) => 123.23
 */
export function numberRound(num = 0, len = 2){
	const pow = Math.pow(10, len + 1)
	const abs = p => Math.abs(p)
	const s = p => String(p)
	const f = p => p / pow
	const tf = p => Number(p).toFixed(len)
	const minus = /^\-/.test(s(num))

	let [integer, point] = s(num).split('.')
	if(!!!(+point) || point.length <= len) return tf(num)

	point = s(point).substr(0, len+1)

	if(point.length <= len){
		let pre = point.length - len < 0 ? point.length - len : 1
		point = point + '0'.repeat(abs(pre))
	}

	point = abs(integer) + (point[point.length - 1] >= 5 ? f(+point + 1) : f(point))

	return tf(minus ? 0 - point : point)
}

/**
 * 数字金额格式化，常用场景在过滤器中
 * @param {String|Number} 金额数字，字符串或者数字类型
 * @param {String}        货币符号，默认¥
 * @param {Number}        小数点后精确的位数，默认2
 * @return {String}       加上了,逗号分隔符和小数点.后的字符串
 */
export function currencyFormat (value, decimals = 2) {
	value = parseFloat(value);
	if (!isFinite(value) || !value && value !== 0) return '';
	const stringified = Math.abs(value).toFixed(decimals);
	const _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
	const i = _int.length % 3;
	const head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	const _float = decimals ? stringified.slice(-1 - decimals) : '';
	const sign = value < 0 ? '-' : '';
	const digitsRE = /(\d{3})(?=\d)/g;
	return sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
}


/**
 * 金额大写转换
 * @param {String} value 数据
 * @return {String} 大写金额串
 * @example
 * 		toChineseCurrency('12123')
 * 		壹万贰仟壹佰贰拾叁
 */
export function toChineseCurrency (value) {
    let REGEXP_NUM = /^(\+|-)?(\d+)(\.\d+)?$/
    let chineseData = ''
    
    //oracel数据库.1的问题
    if(/^\./.test(value)){
        value = '0' + value
    }
    
    //判断浮点数
    if(!REGEXP_NUM.test(value)){
        return ''
    }

    value = Number(value)
    if(value === 0){
        return '零圆整'
    }
    
    let chineseCurrency = ''
    let chineseUnit = '仟佰拾亿仟佰拾万仟佰拾圆角分'
    let chineseNum = '零壹贰叁肆伍陆柒捌玖'
    value = parseFloat(value).toFixed(2) + '00'
    let intPos = value.indexOf('.')

    //拉平数字
    if(intPos >= 0){
        value = value.substring(0, intPos) + value.substr(intPos + 1, 2);
    }
    
    //进行转换
    let valueLength = value.length;
    chineseUnit = chineseUnit.substr(chineseUnit.length - valueLength);
    for(let i=0; i<valueLength; i++){
        chineseCurrency += chineseNum.substr(value.substr(i, 1), 1) + chineseUnit.substr(i, 1);
    }

    //TODO 上亿后bug
    chineseData = chineseCurrency.replace(/零角零分$/, '整')
                    .replace(/零[仟佰拾]/g, '零')
                    .replace(/零{2,}/g, '零')
                    .replace(/零([亿|万])/g, '$1')
                    .replace(/亿[万]/g, '亿')
                    .replace(/零+圆/g, '圆')
                    .replace(/亿零{0,3}/g, '亿')
                    .replace(/^圆/g, '零圆')
                    .replace(/零圆/g, '')
                    .replace(/零角/g, '零')
                    .replace(/零分/g, '')
    let chineseVal = chineseData.split('零') || []

    if('亿' == chineseData.substr(0,1) || '万' == chineseData.substr(0,1) 
        || '仟' == chineseData.substr(0,1)|| '佰' == chineseData.substr(0,1)){
        chineseData = chineseData.substr(1)
    }

    //处理零元一角这种情况
    if(chineseVal.length > 1){
        if(chineseVal[0]){
            return chineseData;
        }else{
            return chineseData.replace(/零/g, '')
        }
    }else{
        return chineseData
    }
}

export function htmlDecode(text) {
	const p = document.createElement('p');
	p.innerHTML = text;
	return p.textContent;
}
