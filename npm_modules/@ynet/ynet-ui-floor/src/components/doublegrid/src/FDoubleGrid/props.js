export default {

  // 背景图片链接
  bgImage: {
    type: Object,
    default () {
      return {}
    }
  },

  // 菜单数组1
  menus1: {
    type: Array,
    default () {
      return []
    }
  },
  // 菜单1文字颜色
  menus1titleColor: {
    type: String,
    default: ''
  },
  // 菜单数组2
  menus2: {
    type: Array,
    default () {
      return []
    }
  },
  // 菜单2文字颜色
  menus2titleColor: {
    type: String,
    default: ''
  },
  // 公告背景图片链接
  noticeBgImgeUrl: {
    type: String,
    default: ''
  },
  // 公告左侧图标链接
  noticeImageUrl: {
    type: String,
    default: ''
  },
  // 公告字体颜色
  noticeTextColor: {
    type: String,
    default: ''
  },
  // 公告列表
  noticeList: {
    type: Array,
    default () {
      return []
    }
  }

}