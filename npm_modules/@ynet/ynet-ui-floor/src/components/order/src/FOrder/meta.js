export default {

  name: '列表',

  className: 'FOrder',

  icon: require('../../../../assets/images/meta/icon_magic.png'),

  properties: [
    {
      itemId: '001',
      itemName: '标题头',
      itemKey: 'header',
      itemType: 'RoundTitleForm',
      itemOption: {},
      itemDefaultValue: {
        title: '我的订单',
        titleSize: '12',
        titleIsBold: '0',
        titleColor: '#FF8A8A8E',
        headerIcon: '@floorstatic/account/icon_arrow.png',
      }
    },
    {
      itemId: '004',
      itemName: '按钮文字颜色',
      itemType: 'Color',
      itemKey: 'btnTitleColor',
      itemOption: {},
      itemDefaultValue: '#FF1765CA',
    },
    {
      itemId: '005',
      itemName: '按钮背景颜色',
      itemType: 'Color',
      itemKey: 'btnBgColor',
      itemOption: {},
      itemDefaultValue: '#FFFFFFFF',
    },
    {
      itemId: '006',
      itemName: '订单信息',
      itemKey: 'orderInfo',
      itemType: 'BusinessForm',
      itemOption: {
        businessType: '201'
      },
      itemDefaultValue: {
        orderNum: '6',
        orderList: [
          {
              "orderStyle": "01",
              "productName":"理财产品名称",
              "amount":"10,000.00",
              "amountDesc":"持仓金额(元)",
              "inComeAmount":"+200.00",
              "inComeAmountDesc":"产品收益(元)",
              "cardNoDesc": "尾号 7721",
              "dueInfo": "2020年10月30到期",
              "btnArray":[
                {
                  "btnTitle":"去理财",
                }
              ]
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
                  }
              ]
          }
        ]
      },
    },
    {
      itemId: '007',
      itemKey: 'orderDesc',
      itemDefaultValue: {
        desc: '您目前暂无订单',
        unLoginDesc: '您还未登录，无法获取您的订单',
      },
    },
  ]
}