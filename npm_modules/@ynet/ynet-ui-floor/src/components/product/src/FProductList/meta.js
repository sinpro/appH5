export default {

  name: '列表',

  className: 'FProductList',

  icon: require('../../../../assets/images/meta/product/icon_list.png'),

  properties: [
      {
        itemId: '001',
        itemName: '',
        itemType: 'BusinessForm',
        itemKey: 'productList',
        itemOption: {
            businessType: '003'
        },
        itemDefaultValue: [
          {
            "productName":"猎豹001号理财产品",
            "productRate":"4.25%",
            "productType":"0000",
            "labelList":[
              "中风险",
              "120天",
              "1000元起投"
            ]
          },
          {
            "productName":"猎豹002号理财产品",
            "productRate":"4.25%",
            "productType":"0000",
            "labelList":[
              "中风险",
              "120天",
              "1000元起投"
            ]
          }
        ],
        itemShare: true,
      },
      {
        itemId: '002',
        itemType: 'Switcher',
        itemName: '底部分割线',
        itemKey: 'divider',
        itemOption: {},
        itemDefaultValue: '0',
        itemGroup: 'divider'
      },
      {
        itemId: '003',
        itemType: 'Color',
        itemName: '分割线颜色',
        itemKey: 'dividerColor',
        itemOption: {},
        itemDefaultValue: '#FFF5F5FA',
        itemGroup: 'divider.1'
      },
      {
        itemId: '004',
        itemName: '产品描述',
        itemKey: 'productDesc',
        itemOption: {},
        itemDefaultValue: [
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
        ],
      }
  ]
}