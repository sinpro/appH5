export default {

  name: '双宫格',

  className: 'FDoubleGrid',

  icon: require('../../../../assets/images/meta/icon_magic.png'),

  properties: [

    {
      itemId: '001',
      itemName: '添加背景图片',
      itemType: 'BgImageForm',
      itemKey: 'bgImage',
      itemOption: {
        desc: '为适配刘海屏同一张图片需要上传2种尺寸，图二比图一高24像素',
        normalImage: "375*362@3x",
        LgImage: "375*386@3x"
      },
      itemDefaultValue: {
        bgImageUrl: "",
        bgImageUrl_X: ""
      },
    },
    {
      itemId: '002',
      itemName: '菜单数组',
      itemType: 'BusinessForm',
      itemKey: 'menus1',
      itemOption: {
        businessType: '007',
        businessOption: {
          title: "上宫格内容"
        }
      },
      itemDefaultValue: [
        {
          menuId: '0001',
          bsnCode: '02',
          title: '菜单一',
          imageUrl: '@floorstatic/gray.jpg',
          canSearch: '',
          platType: '',
          action: {}
        },
        {
          menuId: '0002',
          bsnCode: '02',
          title: '菜单一',
          imageUrl: '@floorstatic/gray.jpg',
          canSearch: '',
          platType: '',
          action: {}
        },
        {
          menuId: '0003',
          bsnCode: '02',
          title: '菜单一',
          imageUrl: '@floorstatic/gray.jpg',
          canSearch: '',
          platType: '',
          action: {}
        },
        {
          menuId: '0004',
          bsnCode: '02',
          title: '菜单一',
          imageUrl: '@floorstatic/gray.jpg',
          canSearch: '',
          platType: '',
          action: {}
        }
      ],
    },
    {
      itemId: '003',
      itemName: '上宫格字色',
      itemType: 'Color',
      itemKey: 'menus1titleColor',
      itemOption: {},
      itemDefaultValue: '#000000',
    },
    {
      itemId: '004',
      itemName: '菜单数组',
      itemType: 'BusinessForm',
      itemKey: 'menus2',
      itemOption: {
        businessType: '007',
        businessOption: {
          title: "下宫格内容"
        }
      },
      itemDefaultValue: [
        {
          menuId: '0001',
          bsnCode: '02',
          title: '菜单一',
          imageUrl: '@floorstatic/gray.jpg',
          canSearch: '',
          platType: '',
          action: {}
        },
        {
          menuId: '0002',
          bsnCode: '02',
          title: '菜单一',
          imageUrl: '@floorstatic/gray.jpg',
          canSearch: '',
          platType: '',
          action: {}
        },
        {
          menuId: '0003',
          bsnCode: '02',
          title: '菜单一',
          imageUrl: '@floorstatic/gray.jpg',
          canSearch: '',
          platType: '',
          action: {}
        },
        {
          menuId: '0004',
          bsnCode: '02',
          title: '菜单一',
          imageUrl: '@floorstatic/gray.jpg',
          canSearch: '',
          platType: '',
          action: {}
        }
      ],
    },
    {
      itemId: '005',
      itemName: '下宫格字色',
      itemType: 'Color',
      itemKey: 'menus2titleColor',
      itemOption: {},
      itemDefaultValue: '#000000',
    },
    {
      itemId: '010',
      itemName: '下宫格背景图',
      itemType: 'Text',
      itemKey: '',
      itemOption: {

      },
      itemDefaultValue: '',
    },
    {
      itemId: '006',
      itemName: '',
      itemType: 'ImageMatrix',
      itemKey: 'noticeBgImgeUrl',
      itemOption: {
        style: { width: '80px', height: '80px' },
        desc: "343*140@3x",
      },
      itemDefaultValue: '',
    },
    {
      itemId: '010',
      itemName: '公告左侧图标',
      itemType: 'Text',
      itemKey: '',
      itemOption: {
      },
      itemDefaultValue: '',
    },
    {
      itemId: '007',
      itemName: '',
      itemType: 'ImageMatrix',
      itemKey: 'noticeImageUrl',
      itemOption: {
        style: { width: '80px', height: '80px' },
        desc: "32*32@3x",
      },
      itemDefaultValue: '',
    },

    {
      itemId: '008',
      itemName: '公告列表',
      itemType: 'AnnounceForm',
      itemKey: 'noticeList',
      itemOption: {},
      itemDefaultValue: [
        { title: "公告内容", action: {} },
        { title: "公告内容", action: {} },
        { title: "公告内容", action: {} },
      ],
    },
    {
      itemId: '009',
      itemName: '公告字体颜色',
      itemType: 'Color',
      itemKey: 'noticeTextColor',
      itemOption: {},
      itemDefaultValue: '#000000',
    },
  ]
}