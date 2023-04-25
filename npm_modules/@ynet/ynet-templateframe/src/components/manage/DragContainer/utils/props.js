export default {

    /**
     * 容器类型
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

    list: {
        type: Array,
        default () {
            return []
        }
    },

    mode: {
        type: [String, Boolean],
        default () {
            return ''
        }
    },

    condition: {
        type: String,
        default () {
            return ''
        }
    }
}