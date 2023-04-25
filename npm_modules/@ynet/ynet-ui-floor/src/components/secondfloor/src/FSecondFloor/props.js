export default {

    cueImageUrl: {
        type: String,
        default: ''
    },
    displayImageUrl: {
        type: String,
        default: ''
    },
    action: {
        type: Object,
        default () {
            return {}
        }
    }
}