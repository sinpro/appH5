export default {

    /**
     * 标题
     */
    
    title: {
        type: String,
        default () {
            return ''
        }
    },
    type: {
        type: String,
        default () {
            return ''
        }
    },
    options: {
        type: Object,
        default () {
            return {}
        }
    }
}