export default {

  name: '单行',

  className: 'FNoticeOne',

  icon: require('../../../../assets/images/meta/announce/icon_announce_line.png'),

  properties: [
    {
      itemId: '001',
      itemName: '添加左侧图标',
      itemKey: 'hasLeftImage',
      itemType: 'Switcher',
      itemOption: {},
      itemDefaultValue: '1',
      itemGroup: 'hasLeftImage'
    },
    {
      itemId: '002',
      itemKey: 'leftImageUrl',
      itemType: 'Image',
      itemOption: {
        style: { width: '80px', height: '80px' }
      },
      itemDefaultValue: '@floorstatic/gray.jpg',
      itemGroup: 'hasLeftImage.1'
    },
    {
      itemId: '003',
      itemName: '添加右侧图标',
      itemKey: 'hasRightImage',
      itemType: 'Switcher',
      itemOption: {},
      itemDefaultValue: '0',
      itemGroup: 'hasRightImage'
    },
    {
      itemId: '004',
      itemKey: 'rightImageUrl',
      itemType: 'Image',
      itemOption: {
        style: { width: '80px', height: '80px' }
      },
      itemDefaultValue: '@floorstatic/gray.jpg',
      itemGroup: 'hasRightImage.1'
    },
    {
      itemId: '005',
      itemName: '添加头条公告',
      itemKey: 'newsList',
      itemType: 'AnnounceForm',
      itemOption: {},
      itemDefaultValue: [
        { title: '公告内容1' },
        { title: '公告内容2' }
      ],
      itemShare: true,
    },
    {
      itemId: '006',
      itemName: '公告跳转链接',
      itemKey: 'action',
      itemType: 'ActionForm',
      itemOption: {},
      itemDefaultValue: {},
    },
    {
      itemId: '007',
      itemName: '文字颜色',
      itemKey: 'titleColor',
      itemType: 'Color',
      itemOption: {},
      itemDefaultValue: '#FF666666',
    },
    {
      itemId: '008',
      itemName: '背景颜色',
      itemKey: 'bgColor',
      itemType: 'Color',
      itemOption: {},
      itemDefaultValue: '#00FFFFFF',
    },
  ]
}