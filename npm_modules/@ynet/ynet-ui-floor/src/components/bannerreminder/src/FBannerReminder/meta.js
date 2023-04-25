export default {

  name: '轮播+待办提醒',

  className: 'FBannerReminder',

  icon: require('../../../../assets/images/meta/icon_magic.png'),

  properties: [
    {
      itemId: '001',
      itemName: '',
      itemType: 'BusinessForm',
      itemKey: 'images',
      itemOption: {
        businessType: '009',
        businessOption: {
          desc: "最多可添加10个广告，顺序可以拖拽调整，推荐尺寸375*486@3x",
          picType: "pictures"
        }
      },
      itemWatch: { imageSize: 'imageSize' },
      itemDefaultValue: [
        {
          imageUrl: '@floorstatic/blue.jpg',
          action: {}
        },
        {
          imageUrl: '@floorstatic/gray.jpg',
          action: {}
        },
        {
          imageUrl: '@floorstatic/blue.jpg',
          action: {}
        },
      ],
    },
    {
      itemId: '013',
      itemName: '提醒背景',
      itemType: 'Text',
      itemKey: '',
      itemOption: {

      },
      itemDefaultValue: '',
    },
    {
      itemId: '002',
      itemName: '',
      itemType: 'ImageMatrix',
      itemKey: 'reminderbgImageUrl',
      itemOption: {
        style: { width: '80px', height: '80px' },
        desc: "343*304@3x",
      },
      itemDefaultValue: '',
    },
    {
      itemId: '014',
      itemName: '提醒左侧图标',
      itemType: 'Text',
      itemKey: '',
      itemOption: {
      },
      itemDefaultValue: '',
    },
    {
      itemId: '003',
      itemName: '',
      itemType: 'ImageMatrix',
      itemKey: 'leftImageUrl',
      itemOption: {
        style: { width: '80px', height: '80px' },
        desc: "24*24@3x",
      },
      itemDefaultValue: '',
    },
    {
      itemId: '015',
      itemName: '提醒右侧图标',
      itemType: 'Text',
      itemKey: '',
      itemOption: {
      },
      itemDefaultValue: '',
    },
    {
      itemId: '004',
      itemName: '',
      itemType: 'ImageMatrix',
      itemKey: 'rightImageUrl',
      itemOption: {
        style: { width: '80px', height: '80px' },
        desc: "24*24@3x",
      },
      itemDefaultValue: '',
    },
    {
      itemId: '005',
      itemName: '提醒标题',
      itemType: 'Input',
      itemKey: 'reminderTitle',
      itemOption: {},
      itemDefaultValue: '小豹提醒你：',
    },
    {
      itemId: '006',
      itemName: '文字颜色',
      itemType: 'Color',
      itemKey: 'reminderTextColor',
      itemOption: {},
      itemDefaultValue: '#FFA16535',
    },
    {
      itemId: '007',
      itemName: '按钮颜色',
      itemType: 'Color',
      itemKey: 'buttonColor',
      itemOption: {},
      itemDefaultValue: '#FFF4DAC5',
    },
    {
      itemId: '008',
      itemName: '底部文字',
      itemType: 'Input',
      itemKey: 'actionName',
      itemOption: {},
      itemDefaultValue: '进入金融日历查看更多计划',
    },

    {
      itemId: '009',
      itemName: '业务数据数组',
      // itemType: 'BusinessForm',
      itemKey: 'businessData',
      itemOption: {
        // businessType: '011',
      },
      itemDefaultValue: {
        reminderList: [{ reminderMsg: '今天有2张信用卡待还款' }],
        eventList: [
          {
            eventName: '信用卡还款',
            eventAmt: '-￥5632.47',
            dateMsg: '还款日',
            date: '12-03',
            buttonMsg: '去还款',
            action: {}
          },
          {
            eventName: '信用卡还款',
            eventAmt: '-￥5632.47',
            dateMsg: '还款日',
            date: '12-03',
            buttonMsg: '去还款',
            action: {}
          },
          {
            eventName: '信用卡还款',
            eventAmt: '-￥5632.47',
            dateMsg: '还款日',
            date: '12-03',
            buttonMsg: '去还款',
            action: {}
          },
        ]
      },
    },
    {
      itemId: '010',
      itemName: '图片大小',
      itemType: '',
      itemKey: 'imageSize',
      itemOption: {
        iParamList: [
          { key: '375*486', value: '375*486@x3' },
        ]
      },
      itemDefaultValue: '375*486',
    },
    {
      itemId: '011',
      itemName: '提醒组件描述字段',
      itemType: '',
      itemKey: 'reminderDes',
      itemOption: {},
      itemDefaultValue: {},
    },
    {
      itemId: '012',
      itemName: '底部跳转链接',
      itemType: 'ActionForm',
      itemKey: 'action',
      itemOption: {},
      itemDefaultValue: {
        text: '请选择要跳转的链接'
      },
    },
  ]
}