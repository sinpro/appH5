export default {

  // 菜单数组
  menus: {
    type: Array,
    default () {
      return []
    }
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