export default {

  name: '辅助线',

  className: 'FLine',

  icon: require('../../../../assets/images/meta/icon_magic.png'),

  properties: [
      {
          itemId: '001',
          itemName: '辅助线样式',
          itemType: 'BorderStyle',
          itemKey: 'lineStyle',
          itemOption: {},
          itemDefaultValue: '0',
      },
      {
          itemId: '002',
          itemName: '左边距',
          itemType: 'Slider',
          itemKey: 'leftMargin',
          itemOption: {},
          itemDefaultValue: '0',
      },
      {
          itemId: '003',
          itemName: '右边距',
          itemType: 'Slider',
          itemKey: 'rightMargin',
          itemOption: {},
          itemDefaultValue: '0',
      },
      {
          itemId: '004',
          itemName: '辅助线颜色',
          itemType: 'Color',
          itemKey: 'lineColor',
          itemOption: {},
          itemDefaultValue: '#FF000000',
      }
  ]
}