<template>
    <div>
        <template-list :data="pageData"></template-list>
    </div>
</template>
<script>
export default {
    
    label: '账户',

    data () {

        return {
            pageData: {
                cards: [
                    {
                        type: 'FTitleHorizontal', 
                        properties: {
                            options: {
                                titleContent: '我的账户列表',
                                hasLeftImage: '0',
                                hasRightImage: '0'
                            }
                        }
                    },
                    {
                        type: 'FAccount', 
                        properties: {
                            loginStatus: {
                                loginFlag: '1'
                            },
                            noLogin: {
                                imageUrl: require('../../../../static/account/icon_nologin.png'),
                                action: {},
                            },
                            noOpenAccount: {
                                imageUrl: require('../../../../static/account/icon_noaccount.png'),
                                action: {},
                            },
                            accountDesc: {
                                openEye: require('../../../../static/account/icon_eye_open.png'),
                                closeEye: require('../../../../static/account/icon_eye_close.png'),
                                openEyeWhite: require('../../../../static/account/icon_eye_open_white.png'),
                                closeEyeWhite: require('../../../../static/account/icon_eye_close_white.png'),
                                arrow: require('../../../../static/account/icon_arrow.png'),
                                add: require('../../../../static/account/icon_add.png'),
                                btnTitle: '添加银行按钮'
                            },
                            accountList: [
                                {
                                    accountStyle: '03',
                                    "accountName":"账户总览",
                                    "amount":"￥99.99",
                                    "amountDesc":"总资产",
                                    "debtDesc": "总负债 ¥19999.99",
                                    "profitDesc": "昨日收益 ¥99.99",
                                    "btnArray":[
                                        {
                                            "btnTitle":"去理财",
                                            "action":{}
                                        }
                                    ],
                                    "action":{}
                                },
                                {
                                    accountStyle: '01',
                                    "accountName":"借记卡",
                                    "accountNo":"1234",
                                    "amount":"￥99.99",
                                    "amountDesc":"账户余额",
                                    "amountMark": {
                                        "title": '无需还款',
                                        "titleColor": '#FFBABABF',
                                        "bgColor": '#FFF4F4F7'
                                    },
                                    "dateDesc": "12月12日(10天后)到期",
                                    "btnArray":[
                                        {
                                            "btnTitle":"去理财",
                                            "action":{}
                                        }
                                    ],
                                    "action":{}
                                },
                                {
                                    accountStyle: '02',
                                    "btnArray":[
                                        {
                                            "btnTitle":"添加银行卡",
                                            "action":{}
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                ]
            }
        }
    }
}
</script>