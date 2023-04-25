export default {

  // 背景图片链接
  bgImage: {
    type: Object,
    default () {
      return {}
    }
  },

  // 显示内容
  content: {
    type: String,
    default: '0'
  },
  // 菜单数组
  menus: {
    type: Array,
    default () {
      return []
    }
  },
  // 轮播样式
  bananerStyle: {
    type: String,
    default: '0'
  },
  // 指示器样式
  pointerStyle: {
    type: String,
    default: '0'
  },
  // 指示器颜色
  pointerColor: {
    type: String,
    default: '0'
  },
  // 图片Url数组
  images: {
    type: Array,
    default () {
      return []
    }
  },
  //广告尺寸
  imageSize: {
    type: String,
    default: ''
  }
}