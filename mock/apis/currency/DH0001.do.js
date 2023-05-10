const random = Math.random() * 10000000000000000
const success = {
    status: '0',
    random,
    reason: '交易成功'
}
const fail = {
    status: '1',
    random,
    reason: '网络繁忙'
}
console.log(Math.random() > 0.5,'测试1')
module.exports = {
    header: {
        errorCode: '0',
        errorMsg: ''
    },
    body: {
        result: Math.random() > 0.5 ? success : fail
    }
}