export default {

    name: '圆角侧滑',
  
    className: 'FProductRoundSlide',
  
    icon: require('../../../../assets/images/meta/product/icon_sliderone.png'),
  
    properties: [
      {
        itemId: '001',
        itemName: '标题头',
        itemType: 'RoundTitleForm',
        itemKey: 'header',
        itemOption: {},
        itemDefaultValue: {
          title: '为您推荐',
          titleSize: '12',
          titleIsBold: '0',
          titleColor: '#FF8A8A8E',
          headerIcon: '@floorstatic/product/icon_add.png',
        },
      },
      {
        itemId: '002',
        itemName: '',
        itemType: 'BusinessForm',
        itemKey: 'productList',
        itemOption: {
            businessType: '003'
        },
        itemDefaultValue: [
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
          }
        ],
        itemShare: true,
      },
      {
        itemId: '003',
        itemName: '按钮文字颜色',
        itemType: 'Color',
        itemKey: 'btnTitleColor',
        itemOption: {},
        itemDefaultValue: '#FF1765CA',
      },
      {
        itemId: '004',
        itemName: '按钮背景颜色',
        itemType: 'Color',
        itemKey: 'btnBgColor',
        itemOption: {},
        itemDefaultValue: '#FFFFFFFF',
      },
    ]
  }