<template>
    <div>
        <template-list :data="pageData"></template-list>
    </div>
</template>
<script>
export default {
    
    label: '产品',

    data () {

        return {
            pageData: {
                cards: [
                  {
                        type: 'FProductList', 
                        properties: {
                            "productList":[
                                {
                                    "productName":"猎豹001号理财产品",
                                    "productRate":"4.25%",
                                    "productType":"0000",
                                    "labelList":[
                                        "中风险",
                                        "120天",
                                        "1000元起投"
                                    ]
                                }
                            ],
                            divider: '0',
                            "productDesc":[
                                {
                                    "type":"0000",
                                    "desc":{"rateDesc":"年化收益率"}
                                },
                                {
                                    "type":"0001",
                                    "desc":{"rateDesc":"年化收益率"}
                                },
                                {
                                    "type":"0002",
                                    "desc":{"rateDesc":"年化收益率"}
                                }
                            ]
                        }
                  },
                  {
                      type: 'FProductOne',
                      properties: {
                          "productList":[
                                {
                                    "productName":"猎豹001号理财产品",
                                    "productRate":"4.25%",
                                    "productType":"0000",
                                    "labelList":[
                                        "中风险",
                                        "120天",
                                        "1000元起投"
                                    ]
                                }
                            ],
                            "productDesc":[
                                {
                                    "type":"0000",
                                    "desc":{"rateDesc":"年化收益率"}
                                },
                                {
                                    "type":"0001",
                                    "desc":{"rateDesc":"年化收益率"}
                                },
                                {
                                    "type":"0002",
                                    "desc":{"rateDesc":"年化收益率"}
                                }
                            ]
                      }
                  },
                  {
                        type: 'FProductTwo', 
                        properties: {
                            "productList":[
                                {
                                    "productName":"猎豹001号理财产品",
                                    "productRate":"4.25%",
                                    "productType":"0000"
                                },
                                {
                                    "productName":"猎豹001号理财产品",
                                    "productRate":"4.25%",
                                    "productType":"0000"
                                }
                            ],
                            divider: '0',
                            "productDesc":[
                                {
                                    "type":"0000",
                                    "desc":{"rateDesc":"年化收益率"}
                                },
                                {
                                    "type":"0001",
                                    "desc":{"rateDesc":"年化收益率"}
                                },
                                {
                                    "type":"0002",
                                    "desc":{"rateDesc":"年化收益率"}
                                }
                            ]
                        }
                  },
                  {
                        type: 'FProductThree', 
                        properties: {
                            "productList":[
                                {
                                    "productName":"产品简称",
                                    "productRate":"4.25%",
                                    "productType":"0000"
                                },
                                {
                                    "productName":"产品简称",
                                    "productRate":"4.25%",
                                    "productType":"0000"
                                },
                                {
                                    "productName":"产品简称",
                                    "productRate":"4.25%",
                                    "productType":"0000"
                                }
                            ],
                            divider: '0',
                            "productDesc":[
                                {
                                    "type":"0000",
                                    "desc":{"rateDesc":"年化收益率"}
                                },
                                {
                                    "type":"0001",
                                    "desc":{"rateDesc":"年化收益率"}
                                },
                                {
                                    "type":"0002",
                                    "desc":{"rateDesc":"年化收益率"}
                                }
                            ]
                        }
                  },
                  {
                        type: 'FProductSlideTwo', 
                        properties: {
                            "productList":[
                                {
                                    "productName":"产品简称",
                                    "productRate":"4.25%",
                                    "productType":"0000"
                                },
                                {
                                    "productName":"产品简称",
                                    "productRate":"4.25%",
                                    "productType":"0000"
                                },
                                {
                                    "productName":"产品简称",
                                    "productRate":"4.25%",
                                    "productType":"0000"
                                }
                            ],
                            shadeColor: '#FFE3E0E0',
                            "productDesc":[
                                {
                                    "type":"0000",
                                    "desc":{"rateDesc":"年化收益率"}
                                },
                                {
                                    "type":"0001",
                                    "desc":{"rateDesc":"年化收益率"}
                                },
                                {
                                    "type":"0002",
                                    "desc":{"rateDesc":"年化收益率"}
                                }
                            ]
                        }
                  },
                  {
                        type: 'FProductSlideOne', 
                        properties: {
                            "productList":[
                                {
                                    "productName":"产品简称",
                                    "productRate":"4.25%",
                                    "productType":"0000",
                                    "labelList":[
                                        "中风险",
                                        "1000元起投"
                                    ]
                                },
                                {
                                    "productName":"产品简称",
                                    "productRate":"4.25%",
                                    "productType":"0000",
                                    "labelList":[
                                        "中风险",
                                        "1000元起投"
                                    ]
                                },
                                {
                                    "productName":"产品简称",
                                    "productRate":"4.25%",
                                    "productType":"0000",
                                    "labelList":[
                                        "中风险",
                                        "1000元起投"
                                    ]
                                }
                            ],
                            shadeColor: '#FFE3E0E0',
                            "productDesc":[
                                {
                                    "type":"0000",
                                    "desc":{"rateDesc":"年化收益率"}
                                },
                                {
                                    "type":"0001",
                                    "desc":{"rateDesc":"年化收益率"}
                                },
                                {
                                    "type":"0002",
                                    "desc":{"rateDesc":"年化收益率"}
                                }
                            ]
                        }
                  },
                  {
                        type: 'FProductRoundSlide', 
                        properties: {
                            "header": {
                                title: '为您推荐',
                                titleSize: '12',
                                titleIsBold: '0',
                                titleColor: '#FF8A8A8E',
                                headerIcon: require('../../../../static/account/icon_arrow.png'),
                            },
                            "productList":[
                                {
                                    "productStyle": "01",
                                    "productName":"理财产品名称",
                                    "productRate":"4.25%",
                                    "productRateDesc":"业绩比较基准",
                                    "productLabel": '人气最旺'
                                },
                                {
                                    "productStyle": "02",
                                    "productName":"人民币纸黄金",
                                    "trend":"1",
                                    "price":"396.13",
                                    "trendAmount": '-0.79',
                                    "trendRate": '-0.20%',
                                    "priceDesc": '现在价格',
                                    "productLabel": '人气最热'
                                },
                                {
                                    "productStyle": "03",
                                    "productImage": require('../../../../static/blue.jpg'),
                                    "productName":"泰康幸福世嘉保险产品",
                                    "price":"396.13",
                                    "priceMark": '元起'
                                }
                            ]
                        }
                  },
                  {
                        type: 'FProductRoundSlideBlock', 
                        properties: {
                            "header": {
                                title: '为您推荐',
                                titleSize: '12',
                                titleIsBold: '0',
                                titleColor: '#FF8A8A8E',
                                headerIcon: require('../../../../static/account/icon_arrow.png'),
                            },
                            "productList":[
                                {
                                    "productStyle": "01",
                                    "productName":"理财产品名称",
                                    "productRate":"4.25%",
                                    "productRateDesc":"业绩比较基准",
                                    "productLabel": "1万起购 | 366天 | 低风险",
                                    "labelDesc": "2020年11月30日到期",
                                    "btnArray": [
                                        {
                                            btnTitle: '申购'
                                        }
                                    ]
                                },
                                {
                                    "productStyle": "01",
                                    "productName":"理财产品名称",
                                    "productRate":"4.25%",
                                    "productRateDesc":"业绩比较基准",
                                    "productLabel": "1万起购 | 366天 | 低风险",
                                    "labelDesc": "2020年11月30日到期",
                                    "btnArray": [
                                        {
                                            btnTitle: '申购'
                                        }
                                    ]
                                },
                                {
                                    "productStyle": "02",
                                    "productName":"人民币纸黄金",
                                    "trend":"0",
                                    "price":"392.1",
                                    "trendAmount": "+0.79",
                                    "trendRate": "+0.20%",
                                    "priceDesc": "现在价格",
                                    "trendRegion": "当日最高：397.23 | 当日最低：395.22",
                                    "btnArray": [
                                        {
                                            btnTitle: '我要开仓'
                                        }
                                    ]
                                },
                                {
                                    "productStyle": "03",
                                    "productImage": require('../../../../static/blue.jpg'),
                                    "productName":"2020版熊猫普制金币	",
                                    "productLabel":"AU999 | 57.00克",
                                    "productMark": {
                                        title: '自提',
                                        titleColor: '#0DB510',
                                        bgColor: '#DDF8DE',
                                    },
                                    "price": "23234.33",
                                    "priceMark": "元起",
                                    "priceDesc": "现在价格",
                                    "trendRegion": "当日最高：397.23 | 当日最低：395.22",
                                    "btnArray": [
                                        {
                                            btnTitle: '立即购买'
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