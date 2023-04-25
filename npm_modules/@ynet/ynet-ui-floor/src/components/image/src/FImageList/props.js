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

    // 图片间距
    imageMargin: {
        type: String,
        default: '0'
    },

    // 是否圆角
    roundCorner: {
        type: String,
        default: '0'
    }
}