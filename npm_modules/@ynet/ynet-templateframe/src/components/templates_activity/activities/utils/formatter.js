//这个文件是用来转换处理数据的
const formatter = {
    /**
     * 把字符串往左补齐0至len位
     * @param {string} str 字符串
     * @param {number} len 至少位数
     * @return {string} 左补齐0后字符串
     * demo： formatter.padZero(1, 3) 结果为'001'
     **/
    padZero(str, len) {
        str = str.toString();
        while (str.length < len) {
            str = '0' + str;
        }
        return str;
    },
    /**
     * 把字符串转换成为时间对象
     * @param {string} str 时间字符串
     * @param {string} format 字符串格式
     * @return {date} 时间对象
     * demo1： formatter.toDate('2018-08-12 16:40:44.123', 'yyyy-MM-dd HH:mm:ss.SSS')
     * demo2： formatter.toDate('20180812', 'yyyyMMdd')
     **/
    toDate(str, format) {
        let fields = [];
        let date_obj = {};
        let res_date = new Date();
        let regexStr = format.replace(/(\.)|(\/)|(\?)|(\s+)/g, (field) => {
            switch (field) {
                case '.':
                    return '\\.';
                case '/':
                    return '\\/';
                case '?':
                    return '\\?';
                default:
                    return `\\s{${field.length}}`;
            }
        }).replace(/(yyyy)|(MM)|(dd)|(HH)|(mm)|(ss)|(SSS)/g, (field) => {
            switch (field) {
                case 'yyyy':
                    fields.push('year');
                    break;
                case 'MM':
                    fields.push('month');
                    break;
                case 'M':
                    fields.push('month');
                    break;
                case 'dd':
                    fields.push('day');
                    break;
                case 'd':
                    fields.push('day');
                    break;
                case 'HH':
                    fields.push('hour');
                    break;
                case 'H':
                    fields.push('hour');
                    break;
                case 'mm':
                    fields.push('minute');
                    break;
                case 'm':
                    fields.push('minute');
                    break;
                case 'ss':
                    fields.push('second');
                    break;
                case 's':
                    fields.push('second');
                    break;
                case 'SSS':
                    fields.push('millisecond');
                    break;
            }
            return `(\\d{${field.length}})`;
        });
        let regex = new RegExp(regexStr);
        if (regex.test(str)) {
            let res = str.match(regex);
            let res_arr = res.slice(1);
            res_arr.forEach((val, index) => {
                date_obj[fields[index]] = Number(val);
            });
            if (date_obj.year && date_obj.month && date_obj.day) {
                res_date.setYear(date_obj.year);
                res_date.setMonth(date_obj.month - 1);
                res_date.setDate(date_obj.day);
                if (~str.indexOf('Z')) {
                    res_date.setUTCHours(date_obj.hour || 0);
                } else {
                    res_date.setHours(date_obj.hour || 0);
                }
                res_date.setMinutes(date_obj.minute || 0);
                res_date.setSeconds(date_obj.second || 0);
                res_date.setMilliseconds(date_obj.millisecond || 0);
                return res_date;
            } else {
                return new Date(NaN);
            }
        } else {
            return new Date(NaN);
        }
    },
    /**
     * 把时间对象转换成为字符串
     * @param {date} date_obj 时间对象
     * @param {string} format 字符串格式
     * @return {string} 时间格式化字符串
     * demo1： formatter.formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSSZ')
     * demo2： formatter.formatDate(new Date(), 'yyyy-M-d')
     **/
    formatDate(date_obj, format) {
        let date_str = format.replace(/(yyyy)|(MM)|(M)|(dd)|(d)|(HH)|(H)|(mm)|(m)|(ss)|(s)|(SSS)/g, (field) => {
            switch (field) {
                case 'yyyy':
                    return 1900 + date_obj.getYear();
                case 'MM':
                    return formatter.padZero(date_obj.getMonth() + 1, 2);
                case 'M':
                    return date_obj.getMonth() + 1;
                case 'dd':
                    return formatter.padZero(date_obj.getDate(), 2);
                case 'd':
                    return date_obj.getDate();
                case 'HH':
                    return formatter.padZero(date_obj.getHours(), 2);
                case 'H':
                    return date_obj.getHours();
                case 'mm':
                    return formatter.padZero(date_obj.getMinutes(), 2);
                case 'm':
                    return date_obj.getMinutes();
                case 'ss':
                    return formatter.padZero(date_obj.getSeconds(), 2);
                case 's':
                    return date_obj.getSeconds();
                case 'SSS':
                    return date_obj.getMilliseconds();
            }
        });
        return date_str;
    },
    unescapeHtml(html) {
        let temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.innerText;
    },
};
export default formatter;
