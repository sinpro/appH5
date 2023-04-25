export default {

  name: '列表',

  className: 'FAccount',

  icon: require('../../../../assets/images/meta/icon_magic.png'),

  properties: [
    
    {
      itemId: '101',
      itemName: '账户状态',
      itemType: 'Text',
      itemOption: {
        text: '未登录',
        bold: true
      },
    },
    {
      itemId: '001',
      itemName: '添加图片',
      itemKey: 'noLogin',
      itemType: 'ImageActionForm',
      itemOption: {
        desc: '可根据你的需求添加未登录的图片，图片大小686*224'
      },
      itemDefaultValue: {
        imageUrl: '@floorstatic/account/icon_nologin.png',
      },
    },
    {
      itemId: '102',
      itemName: '账户状态',
      itemType: 'Text',
      itemOption: {
        text: '未开户',
        bold: true
      },
    },
    {
      itemId: '002',
      itemName: '添加图片',
      itemKey: 'noOpenAccount',
      itemType: 'ImageActionForm',
      itemOption: {
        desc: '可根据你的需求添加未开户的图片，图片大小686*224'
      },
      itemDefaultValue: {
        imageUrl: '@floorstatic/account/icon_noaccount.png',
      },
    },
    {
      itemId: '102',
      itemName: '账户状态',
      itemType: 'Text',
      itemOption: {
        text: '已开户',
        bold: true
      },
    },
    {
      itemId: '004',
      itemName: '按钮文字颜色',
      itemKey: 'btnTitleColor',
      itemType: 'Color',
      itemOption: {},
      itemDefaultValue: '#FF1765CA',
    },
    {
      itemId: '005',
      itemName: '按钮背景颜色',
      itemKey: 'btnBgColor',
      itemType: 'Color',
      itemOption: {},
      itemDefaultValue: '#FFF2F2F7',
    },
    {
      itemId: '003',
      itemName: '账户列表',
      itemKey: 'accountList',
      itemType: 'BusinessForm',
      itemOption: {
        businessType: '202'
      },
      itemDefaultValue: [
        {
          "accountStyle": '01',
          "accountName":"借记卡",
          "accountNo":"1234",
          "date":"还款日 11/2",
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
                "btnTitle":"去理财"
            }
          ]
        },
        {
          "accountStyle": '02',
          "btnArray":[
            {
                "btnTitle":"添加银行卡"
            }
          ]
        }
      ],
    },
    {
      itemId: '006',
      itemKey: 'accountDesc',
      itemDefaultValue: {
        openEye: '@floorstatic/account/icon_eye_open.png',
        closeEye: '@floorstatic/account/icon_eye_close.png',
        openEyeWhite: '@floorstatic/account/icon_eye_open_white.png',
        closeEyeWhite: '@floorstatic/account/icon_eye_close_white.png',
        arrow: '@floorstatic/account/icon_arrow.png',
        add: '@floorstatic/account/icon_add.png',
      },
    },
  ]
}