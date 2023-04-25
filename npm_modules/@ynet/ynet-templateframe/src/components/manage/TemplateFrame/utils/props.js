export default {

    /**
     * 组件唯一标示
     */
    id: {
        type: String,
        default () {
            return ''
        }
    },

    /**
     * 选项数据
     * {
     *      label: '',  组件描述
     *      name: ''
     * }
     */
    type: {
        type: String,
        default () {
            return ''
        }
    },

    /**
     * 组件数据集合
     */
    options: {
        type: Object,
        default () {
            return {}
        }
    },

    mode: {
        type: [String, Boolean],
        default () {
            return ''
        }
    }
}