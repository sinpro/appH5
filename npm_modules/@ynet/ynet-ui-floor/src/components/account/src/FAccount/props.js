export default {
  
  // 登录状态
  loginStatus: {
    type: Object,
    default () {
      return {}
    }
  },

  // 未登录场景配置
  noLogin: {
    type: Object,
    default () {
      return {}
    }
  },

  // 未开户场景配置
  noOpenAccount: {
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
    default: '#FFF2F2F7'
  },

  // 账户描述
  accountDesc: {
    type: Object,
    default () {
      return {}
    }
  },

  // 账号列表
  accountList: {
    type: Array,
    default () {
      return []
    }
  }
}