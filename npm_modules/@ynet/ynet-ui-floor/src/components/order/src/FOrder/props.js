export default {
  
  // 登录状态
  loginStatus: {
    type: Object,
    default () {
      return {}
    }
  },

  // 标题头
  header: {
    type: Object,
    default () {
      return {}
    }
  },

  // 按钮文字颜色
  btnTitleColor: {
    type: String,
    default: '#FF1765CA'
  },

  // 按钮背景颜色
  btnBgColor: {
    type: String,
    default: '#FFFFFFFF'
  },

  // 订单描述
  orderDesc: {
    type: Object,
    default () {
      return {}
    }
  },

  // 订单信息列表
  orderInfo: {
    type: Object,
    default () {
      return {}
    }
  }
}