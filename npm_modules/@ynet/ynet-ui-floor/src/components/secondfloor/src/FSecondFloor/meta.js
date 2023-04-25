export default {

  name: '二楼',

  className: 'FSecondFloor',

  icon: require('../../../../assets/images/meta/icon_magic.png'),

  properties: [
    {
      itemId: '001',
      itemName: '提示图片',
      itemType: 'Image',
      itemKey: 'cueImageUrl',
      itemOption: {},
      itemDefaultValue: '@floorstatic/blue.jpg',
    },
    {
      itemId: '004',
      itemName: '',
      itemKey: '',
      itemType: 'TitleText',
      itemOption: {
        text: '建议宽高:375*812@x3'
      },
      itemDefaultValue: '',
    },
    {
      itemId: '002',
      itemName: '展示图片',
      itemType: 'Image',
      itemKey: 'displayImageUrl',
      itemOption: {},
      itemDefaultValue: '@floorstatic/blue.jpg',
    },
    {
      itemId: '005',
      itemName: '',
      itemKey: '',
      itemType: 'Text',
      itemOption: {
        text: '建议宽高:375*836@x3'
      },
      itemDefaultValue: '',
    },
    {
      itemId: '003',
      itemName: '跳转链接',
      itemType: 'ActionForm',
      itemKey: 'action',
      itemOption: {},
      itemDefaultValue: {},
    },

  ]
}