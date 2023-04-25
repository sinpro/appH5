export default {

    name: '侧滑两个',
  
    className: 'FProductSlideTwo',
  
    icon: require('../../../../assets/images/meta/product/icon_slidertwo.png'),
  
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
          },
          {
            "productName":"猎豹003号理财产品",
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
        itemType: 'Color',
        itemName: '阴影颜色',
        itemKey: 'shadeColor',
        itemOption: {},
        itemDefaultValue: '#FFE3E0E0',
      },
      {
        itemId: '003',
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