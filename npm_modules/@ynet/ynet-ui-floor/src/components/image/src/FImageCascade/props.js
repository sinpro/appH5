export default {

    // 图片列表
    images: {
        type: Array,
        default () {
            return []
        }
    },

    // 图片大小
    imageSize: {
        type: String,
        default: ''
    },

    // 上边距
    topMargin: {
        type: String,
        default: '0'
    },

    // 下边距
    bottomMargin: {
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
        default: '#0000FF'
    },

    // 是否圆角
    roundCorner: {
        type: String,
        default: '0'
    }
}