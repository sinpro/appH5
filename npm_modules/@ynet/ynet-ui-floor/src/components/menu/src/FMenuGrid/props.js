export default {

    // 宫格样式
    menuStyle: {
        type: String,
        defualt: '01'
    },

    // 宫格菜单列表
    menus: {
        type: Array,
        default () {
            return []
        }
    },

    // 宫格列数
    columns: {
        type: String,
        default: '5'
    },

    // 宫格背景颜色
    bgColor: {
        type: String,
        default: '#FFFFFF'
    },

    // 宫格标题颜色
    titleColor: {
        type: String,
        default: '#323C41'
    },

    // 宫格上边距
    topMargin: {
        type: String,
        default: '0'
    },

    // 宫格下边距
    bottomMargin: {
        type: String,
        default: '0'
    },
    
    // 是否有阴影
    shadow: {
        type: String,
        default: '0'
    }
}