module.exports = {
    header: {
        errorCode: '0',
        errorMsg: ''
    },
    body: {
        exchangeList:[
            {
                exchangeNewRate: (Math.random() * 10).toFixed(8),
                exchangeOldRate:'',
                newDate: '21/04/2023 09:13 香港时间'
            },
            {
                exchangeNewRate: (Math.random() * 10).toFixed(8),
                exchangeOldRate: (Math.random() * 10).toFixed(8),
                newDate: '21/04/2023 09:14 香港时间'
            },
            {
                exchangeNewRate: (Math.random() * 10).toFixed(8),
                exchangeOldRate: (Math.random() * 10).toFixed(8),
                newDate: '21/04/2023 09:15 香港时间'
            },
        ]
    }
}