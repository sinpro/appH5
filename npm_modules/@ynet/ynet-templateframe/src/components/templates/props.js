export default {

    /**
     * 对接组件必须数据以及可选数据
     */
    options: {
        type: Object,
        default () {
            return {}
        }
    },

    /**
     * 组件属性，参数不固定，各组件可以不一致
     */
    properties: {
        type: Object,
        default () {
            return {}
        }
    },

    /**
     * 组件的当前模式
     */
    mode: {
        type: [String, Boolean],
        default () {
            return ''
        }
    }
}