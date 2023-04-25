export default {

  name: '上下一组',

  className: 'FImageTextTopBottom',

  icon: require('../../../../assets/images/meta/imagetext/icon_udone.png'),

  properties: [
    {
      itemId: '001',
      itemName: '添加图文',
      itemType: 'ImageTextForm',
      itemKey: 'imageTextList',
      itemOption: {},
      itemDefaultValue: [
        {
          title: '标题文本', 
          titleDes: '描述文本', 
          imageUrl: '@floorstatic/gray.jpg'
        }
      ],
      itemShare: true,
    },
    {
      itemId: '002',
      itemName: '文本对齐',
      itemType: 'TextAlign',
      itemKey: 'textOption',
      itemOption: {},
      itemDefaultValue: '0',
    },
    {
      itemId: '003',
      itemName: '标题大小',
      itemType: 'FontSize',
      itemKey: 'titleTextSize',
      itemOption: {},
      itemDefaultValue: '16',
    },
    {
      itemId: '004',
      itemName: '标题粗细',
      itemType: 'FontBold',
      itemKey: 'titleIsBold',
      itemOption: {},
      itemDefaultValue: '0',
    },
    {
      itemId: '005',
      itemName: '标题颜色',
      itemType: 'Color',
      itemKey: 'titleColor',
      itemOption: {},
      itemDefaultValue: '#FF000000',
    },

    {
      itemId: '006',
      itemName: '说明大小',
      itemType: 'FontSize',
      itemKey: 'desTextSize',
      itemOption: {},
      itemDefaultValue: '12',
    },
    {
      itemId: '007',
      itemName: '说明粗细',
      itemType: 'FontBold',
      itemKey: 'desIsBlod',
      itemOption: {},
      itemDefaultValue: '0',
    },
    {
      itemId: '008',
      itemName: '说明颜色',
      itemType: 'Color',
      itemKey: 'desColor',
      itemOption: {},
      itemDefaultValue: '#FF000000',
    },
    {
      itemId: '009',
      itemName: '底部分割线',
      itemType: 'Switcher',
      itemKey: 'isBottomLine',
      itemOption: {},
      itemDefaultValue: '0',
    },
  ]
}