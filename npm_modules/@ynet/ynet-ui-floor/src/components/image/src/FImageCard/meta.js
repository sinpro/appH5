export default {

  name: '卡片式',

  className: 'FImageCard',

  icon: require('../../../../assets/images/meta/image/icon_image_card.png'),

  properties: [
    {
      itemId: '001',
      itemType: 'BusinessForm',
      itemKey: 'images',
      itemOption: {
        businessType: '009'
      },
      itemWatch: { imageSize: 'imageSize' },
      itemDefaultValue: [
        {
          title: '标题一',
          imageUrl: '@floorstatic/gray.jpg'
        },
        {
          title: '标题二',
          imageUrl: '@floorstatic/blue.jpg'
        },
        {
          title: '标题三',
          imageUrl: '@floorstatic/gray.jpg'
        },
        {
          title: '标题四',
          imageUrl: '@floorstatic/blue.jpg'
        }
      ],
      itemShare: true,
    },
    {
      itemId: '002',
      itemName: '图片圆角',
      itemType: 'RadiusStyle',
      itemKey: 'roundCorner',
      itemOption: {},
      itemDefaultValue: '0',
    },
    {
      itemId: '006',
      itemName: '轮播器样式',
      itemType: 'CycleStyle',
      itemKey: 'pointerStyle',
      itemOption: {},
      itemDefaultValue: '0',
    },
    {
      itemId: '007',
      itemName: '轮播器颜色',
      itemType: 'Color',
      itemKey: 'pointerColor',
      itemOption: {},
      itemDefaultValue: '#FF0000FF',
    },
    {
      itemId: '003',
      itemName: '上间距',
      itemType: 'Slider',
      itemKey: 'topMargin',
      itemOption: {},
      itemDefaultValue: '0',
    },
    {
      itemId: '004',
      itemName: '下间距',
      itemType: 'Slider',
      itemKey: 'bottomMargin',
      itemOption: {},
      itemDefaultValue: '0',
    },
    {
      itemId: '008',
      itemName: '图片大小',
      itemType: 'Select',
      itemKey: 'imageSize',
      itemOption: {
        iParamList: [
          { key: '375*188', value: '375*188@x3' },
          { key: '375*150', value: '375*150@x3' },
          { key: '375*124', value: '375*124@x3' },
        ]
      },
      itemDefaultValue: '375*188',
    }
  ]
}