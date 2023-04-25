export default {

  name: '宫格在上',

  className: 'FBannerGridTop',

  icon: require('../../../../assets/images/meta/icon_ShufflingGongGeTop.png'),

  properties: [
    {
      itemId: '001',
      itemName: '添加背景图片',
      itemType: 'BgImageForm',
      itemKey: 'bgImage',
      itemOption: {
        desc: '为适配刘海屏同一张图片需要上传2种尺寸，图二比图一高24像素',
        normalImage: "375*286@3x",
        LgImage: "375*310@3x"
      },
      itemDefaultValue: {
        bgImageUrl: "",
        bgImageUrl_X: ""
      },
    },
    {
      itemId: '002',
      itemName: '显示内容',
      itemType: 'RadioGroup',
      itemKey: 'content',
      itemOption: {
        iParamList: [
          { key: '0', value: '全部' },
          { key: '1', value: '仅宫格' },
          { key: '2', value: '仅轮播' },
        ]
      },
      itemDefaultValue: '0',
    },
    {
      itemId: '003',
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
          canSearch: '',
          platType: '',
          atcion: {}
        },
        {
          menuId: '0002',
          bsnCode: '02',
          title: '菜单一',
          imageUrl: '@floorstatic/gray.jpg',
          canSearch: '',
          platType: '',
          atcion: {}
        },
        {
          menuId: '0003',
          bsnCode: '02',
          title: '菜单一',
          imageUrl: '@floorstatic/gray.jpg',
          canSearch: '',
          platType: '',
          atcion: {}
        },
        {
          menuId: '0004',
          bsnCode: '02',
          title: '菜单一',
          imageUrl: '@floorstatic/gray.jpg',
          canSearch: '',
          platType: '',
          atcion: {}
        }
      ],
    },
    {
      itemId: '004',
      itemName: '轮播样式',
      itemType: 'CarouselStyle',
      itemKey: 'bananerStyle',
      itemOption: {},
      itemDefaultValue: '0',
    },
    {
      itemId: '005',
      itemName: '指示器样式',
      itemType: 'CycleStyle',
      itemKey: 'pointerStyle',
      itemOption: {},
      itemDefaultValue: '0',
    },
    {
      itemId: '006',
      itemName: '指示器颜色',
      itemType: 'Color',
      itemKey: 'pointerColor',
      itemOption: {},
      itemDefaultValue: '#FF0000FF',
    },
    {
      itemId: '009',
      itemName: '图片Url数组',
      itemType: 'BusinessForm',
      itemKey: 'images',
      itemOption: {
        businessType: '009',
        businessOption: {
          desc: "最多可添加10个广告，顺序可以拖拽调整，推荐尺寸335*100@3x"
        }
      },
      itemWatch: { imageSize: 'imageSize' },
      itemDefaultValue: [
        {
          title: '标题一',
          imageUrl: '@floorstatic/gray.jpg',
          atcion: {}
        },
        {
          title: '标题一',
          imageUrl: '@floorstatic/gray.jpg',
          atcion: {}
        },
        {
          title: '标题一',
          imageUrl: '@floorstatic/gray.jpg',
          atcion: {}
        },
      ],
    },
    {
      itemId: '010',
      itemName: '图片大小',
      itemType: '',
      itemKey: 'imageSize',
      itemOption: {
        iParamList: [
          { key: '335*100', value: '335*100@x3' },
        ]
      },
      itemDefaultValue: '335*100',
    }
  ]
}