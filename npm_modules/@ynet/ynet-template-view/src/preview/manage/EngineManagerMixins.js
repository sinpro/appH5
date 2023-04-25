import EngineManager from './EngineManager'

export default [{

    created () {
        //引擎初始化
        this.mEngineManager = new EngineManager()
    },

    methods: {

        /**
         * 配置引擎
         * @param {Object} options 配置信息
         */
        configureEngine (options = {}) {
            this.mEngineManager.configureEngine(options)
        },

        /**
         * 注册原子视图组件
         * @param {Object} views 视图结合对象key-value(组件名称-组件对象)
         */
        registerViews (views = {}) {
            this.mEngineManager.registerViews(views)
        },

        /**
         * 渲染组件视图
         * @param {Object} data 视图xml数据以及配置数据
         * @param {Object} data.xmls 注册的视图xml数据集
         * @param {Array} data.cards 渲染的卡片数据
         * @return {Array} 可用于直接渲染的视图数据
         */
        renderViews (data = {}) {
            let iList = []
            this.mEngineManager.getViewListByCards(iList, data.cards || [])
            return iList
        },

        /**
         * 转义颜色值
         * @param {String} colorHex 16进制颜色值 '#FFFFFF' (rgb) '#FFFFFFFF' (argb)
         * @return {String} H5的rgba颜色表示
         */
        doParseColor (colorHex = '') {
            let value = `${colorHex || ''}`
            let matches, alpha, red, green, blue

            if(value.length == 7){
                //'#FFFFFF'
                matches = value.match(/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/) || []
                alpha = 255
                red = parseInt(matches[1] || '', 16)
                green = parseInt(matches[2] || '', 16)
                blue = parseInt(matches[3] || '', 16)
            }else if(value.length == 9){
                //'#FFFFFFFF'
                matches = value.match(/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/) || []
                alpha = parseInt(matches[1] || '', 16)
                red = parseInt(matches[2] || '', 16)
                green = parseInt(matches[3] || '', 16)
                blue = parseInt(matches[4] || '', 16)
            }else{
                return ''
            }

            return `rgba(${red},${green},${blue},${parseFloat(alpha)/255})`
        },
    }
}]
