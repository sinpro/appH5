export default {
    
    // 图片宽高度
    imageWH: {
        type: String,
        default: '80*80'
    },
    // 是否显示右侧按钮
    isRightBtn: {
        type: String,
        default: '0'
    },
    // 右侧按钮链接
    btnImageUrl: {
        type: String,
        default: ''
    },
    // 图片位置
    imageOption: {
        type: String,
        default: '0'
    },
    // 标题字号
    titleTextSize: {
        type: String,
        default: '16'
    },
    // 标题文字是否加粗
    titleIsBold: {
        type: String,
        default: '0'
    },
    // 标题颜色
    titleColor: {
        type: String,
        default: '#00000000'
    },
    // 说明字号
    desTextSize: {
        type: String,
        default: '14'
    },
    // 说明文字是否加粗
    desIsBlod: {
        type: String,
        default: '0'
    },
    // 说明颜色
    desColor: {
        type: String,
        default: '#00000000'
    },
    // 是否有底部分割线
    isBottomLine: {
        type: String,
        default: '0'
    },
    // 点击事件对象
    imageTextList: {
        type: Array,
        default () {
        return []
        }
    }
}