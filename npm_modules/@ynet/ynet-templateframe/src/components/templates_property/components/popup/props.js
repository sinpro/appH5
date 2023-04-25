export default {
    /**
     * 面板类型
     * 1 纯链接地址
     */
    type: {
        type: String,
        default: '1'
    },

    /**
     * 面板类型
     * 1 纯链接地址
     */
    title: {
        type: String,
        default: '图片设置'
    },

    /**
     * 返显数据
     */
    options: {
        type: Object,
        default () {
            return {}
        }
    }
}