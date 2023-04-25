export default {

    name: '单个',
  
    className: 'FProductOne',
  
    icon: require('../../../../assets/images/meta/product/icon_one.png'),
  
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
            }
          ],
          itemShare: true,
        },
        {
          itemId: '002',
          itemType: 'Input',
          itemName: '按钮名称',
          itemKey: 'btnName',
          itemOption: {},
          itemDefaultValue: '立即购买',
        },
        {
          itemId: '003',
          itemType: 'Color',
          itemName: '按钮背景颜色',
          itemKey: 'btnBgColor',
          itemOption: {},
          itemDefaultValue: '#FF3671FF',
        }
    ]
  }