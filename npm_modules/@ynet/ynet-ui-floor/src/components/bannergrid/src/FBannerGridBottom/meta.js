export default {

  name: '宫格在下',

  className: 'FBannerGridBottom',

  icon: require('../../../../assets/images/meta/icon_ShufflingGongGeBottom.png'),

  properties: [
    {
      itemId: '001',
      itemName: '菜单数组',
      itemType: 'BusinessForm',
      itemKey: 'menus',
      itemOption: {
        businessType: '007'
      },
      itemDefaultValue: [
        {
          menuId: '0001',
          bsnCode: '02',
          title: '菜单一',
          imageUrl: '@floorstatic/gray.jpg',
          canSearch: '0',
          platType: '1',
          action: {}
        },
        {
          menuId: '0002',
          bsnCode: '02',
          title: '菜单一',
          imageUrl: '@floorstatic/gray.jpg',
          canSearch: '0',
          platType: '1',
          action: {}
        },
        {
          menuId: '0003',
          bsnCode: '02',
          title: '菜单一',
          imageUrl: '@floorstatic/gray.jpg',
          canSearch: '0',
          platType: '1',
          action: {}
        },
        {
          menuId: '0004',
          bsnCode: '02',
          title: '菜单一',
          imageUrl: '@floorstatic/gray.jpg',
          canSearch: '0',
          platType: '1',
          action: {}
        }
      ],
    },
    {
      itemId: '002',
      itemName: '图片Url数组',
      itemType: 'BusinessForm',
      itemKey: 'images',
      itemOption: {
        businessType: '009',
        businessOption: {
          desc: "最多可添加10个广告，顺序可以拖拽调整，推荐尺寸375*192@3x",
          picType: "pictures"
        }
      },
      itemWatch: { imageSize: 'imageSize' },
      itemDefaultValue: [
        {
          title: '标题一',
          imageUrl: '@floorstatic/blue.jpg',
          atcion: {}
        },
        {
          title: '标题一',
          imageUrl: '@floorstatic/blue.jpg',
          atcion: {}
        },
        {
          title: '标题一',
          imageUrl: '@floorstatic/blue.jpg',
          atcion: {}
        },
        {
          title: '标题一',
          imageUrl: '@floorstatic/blue.jpg',
          atcion: {}
        },
      ],
    },
    {
      itemId: '003',
      itemName: '图片大小',
      itemType: '',
      itemKey: 'imageSize',
      itemOption: {
        iParamList: [
          { key: '375*192', value: '375*192@x3' },
        ]
      },
      itemDefaultValue: '375*192',
    }
  ]
}