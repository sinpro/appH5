export default {

  // 图标链接
  leftImageUrl: {
      type: String,
      default: ''
  },

  // 是否有图标
  hasLeftImage: {
      type: String,
      default: '1'
  },

  // 图标链接
  rightImageUrl: {
    type: String,
    default: ''
  },

  // 是否有图标
  hasRightImage: {
      type: String,
      default: '1'
  },

  // 公告列表
  newsList: {
    type: Array,
    default () {
        return []
    }
  },

  // 公告文字颜色
  titleColor: {
    type: String,
    default: '#FF666666'
  },

  // 公告背景颜色
  bgColor: {
    type: String,
    default: '#FFFFFFFF'
  },
  // 点击事件对象
  action: {
    type: Object,
    default () {
      return {}
    }
  },
}