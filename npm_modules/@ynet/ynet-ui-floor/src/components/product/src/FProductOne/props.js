export default {

  // 产品列表
  productList: {
    type: Array,
    default() {
      return []
    }
  },

  // 按钮名称
  btnName: {
    type: String,
    default: '立即购买'
  },

  // 按钮背景颜色
  btnBgColor: {
    type: String,
    default: '#FF3671FF'
  },

  // 分割线
  productDesc: {
    type: Array,
    default() {
      return []
    }
  },
  // 点击事件对象
  action: {
    type: Object,
    default() {
      return {}
    }
  }
}