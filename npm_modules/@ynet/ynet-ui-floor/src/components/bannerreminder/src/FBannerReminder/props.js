export default {

  // 图片Url数组
  images: {
    type: Array,
    default () {
      return []
    }
  },

  // 提醒标题右侧图标
  rightImageUrl: {
    type: String,
    default: ''
  },

  // 提醒标题左侧图标
  leftImageUrl: {
    type: String,
    default: ''
  },

  // 提醒标题
  reminderTitle: {
    type: String,
    default: '小豹提醒你：'
  },

  // 提醒组件描述字段
  reminderDes: {
    type: Object,
    default () {
      return {}
    }
  },

  // 文字颜色
  reminderTextColor: {
    type: String,
    default: '#FFA16535'
  },

  // 提醒背景图片链接
  reminderbgImageUrl: {
    type: String,
    default: ''
  },

  // 右侧按钮颜色
  buttonColor: {
    type: String,
    default: '#FFF4DAC5'
  },

  // 业务数据数组
  businessData: {
    type: Object,
    default () {
      return {}
    }
  },
  // 底部按钮事件描述
  actionName: {
    type: String,
    default: '进入金融日历查看更多计划'
  },
  //广告尺寸
  imageSize: {
    type: String,
    default: ''
  },
  // 点击事件json
  action: {
    type: Object,
    default () {
      return {}
    }
  }
}