<template>
    <div>
        <template-list :data="pageData"></template-list>
    </div>
</template>
<script>
export default {
    
    label: '订单',

    data () {

        return {
            pageData: {
                cards: [
                    {
                        type: 'FOrder', 
                        properties: {
                            loginStatus: {
                                loginFlag: '1'
                            },
                            header: {
                                title: '我的订单',
                                titleSize: '12',
                                titleIsBold: '0',
                                titleColor: '#FF8A8A8E',
                                headerIcon: require('../../../../static/account/icon_arrow.png'),
                            },
                            orderDesc: {
                                desc: '您目前暂无订单',
                                unLoginDesc: '您还未登录，无法获取您的订单',
                            },
                            orderInfo: {
                                orderNum: '6',
                                orderList: [
                                    {
                                        "orderStyle": "01",
                                        "productName":"公共交通意外保险",
                                        "amount":"李鑫",
                                        "amountDesc":"被保险人(元)",
                                        "cardNoDesc": "保单已生效",
                                        "dueInfo": "已保障180天",
                                        "btnArray":[
                                            {
                                                "btnTitle":"为家人投保",
                                                "action":{
                                                    tiki: ''
                                                }
                                            },
                                            {
                                                "btnTitle":"电子保单",
                                                "action":{
                                                    tiki: ''
                                                }
                                            }
                                        ],
                                        "action":{
                                            nono: ''
                                        }
                                    },
                                    {
                                        "orderStyle": "01",
                                        "productName":"理财产品名称1",
                                        "amount":"10,000.00",
                                        "amountDesc":"持仓金额(元)",
                                        "inComeAmount":"+200.00",
                                        "inComeAmountDesc":"产品收益(元)",
                                        "cardNoDesc": "尾号 7721",
                                        "dueInfo": "2020年10月30到期",
                                        "orderMark": {
                                            title: '已还清',
                                            titleColor: '#0DB510',
                                            bgColor: '#DDF8DE'
                                        },
                                        "btnArray":[
                                            {
                                                "btnTitle":"去理财3",
                                                "action":{
                                                    tiki: ''
                                                }
                                            }
                                        ],
                                        "action":{
                                            nono: ''
                                        }
                                    },
                                    {
                                        "orderStyle": "02",
                                        "productName":"人民币纸黄金",
                                        "loanAmount":"2,000.00",
                                        "loadAmountDesc":"总资产(元)",
                                        "inComeAmount":"+394.00",
                                        "inComeAmountDesc":"持仓亏盈(元)",
                                        "btnArray":[
                                            {
                                                "btnTitle":"委托交易",
                                                "action":{}
                                            },
                                        ],
                                        "action":{}
                                    },
                                    {
                                        "orderStyle": "03",
                                        "productName":"2020版熊猫普制金币",
                                        "productImage": require('../../../../static/blue.jpg'),
                                        "productAmount":"￥24282.00",
                                        "productDesc":"AU999 | 57.00克",
                                        "timeDesc":"购买时间：",
                                        "time": "2020年11月15日",
                                        "buyDesc": "已提取",
                                        "btnArray":[
                                            {
                                                "btnTitle":"委托交易",
                                                "action":{}
                                            },
                                        ],
                                        "action":{}
                                    },
                                    {
                                        "orderStyle": "04",
                                        "cardName":"上海银行白金信用卡",
                                        "cardImage": require('../../../../static/blue.jpg'),
                                        "cardDesc":"您的商旅首选信用卡",
                                        "applyTimeDesc":"申请时间：",
                                        "applyTime": "2020年10月11日",
                                        "approveDesc": {
                                            content: "审批通过",
                                            color: '#FFFF0000'
                                        },
                                        "btnArray":[
                                            {
                                                "btnTitle":"申请进度查询",
                                                "action":{}
                                            },
                                        ],
                                        "action":{}
                                    }
                                ]
                            }
                        }
                    },
                ]
            }
        }
    }
}
</script>