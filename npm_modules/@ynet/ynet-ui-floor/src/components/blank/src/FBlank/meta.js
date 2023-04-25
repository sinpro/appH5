export default {

  name: '辅助空白',

  className: 'FBlank',

  icon: require('../../../../assets/images/meta/icon_magic.png'),

  properties: [
      {
          itemId: '001',
          itemType: 'Slider',
          itemName: '空白高度',
          itemKey: 'height',
          itemOption: {},
          itemDefaultValue: '16',
      },
      {
          itemId: '002',
          itemName: '空白颜色',
          itemType: 'Color',
          itemKey: 'color',
          itemOption: {},
          itemDefaultValue: '#00FFFFFF',
      }
  ]
}