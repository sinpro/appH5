module.exports = {
    header: {
        errorCode: '0',
        errorMsg: ''
    },
    body: {
        balanceList: [
            { balance: (Math.random() * 100000).toFixed(2) },
            { balance: (Math.random() * 100000).toFixed(2) },
            { balance: (Math.random() * 100000).toFixed(2) },
        ]

    }
}