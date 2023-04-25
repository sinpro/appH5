export default {

  // 标题头
  header: {
    type: Object,
    default () {
      return {}
    }
  },

  // 产品列表
  productList: {
    type: Array,
    default() {
      return []
    }
  },

  // 按钮文字颜色
  btnTitleColor: {
    type: String,
    default: '#FFFFFFFF'
  },

  // 按钮背景颜色
  btnBgColor: {
    type: String,
    default: '#FF1765CA'
  },
  
}