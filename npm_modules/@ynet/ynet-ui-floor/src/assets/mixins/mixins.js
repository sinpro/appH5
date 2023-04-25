let defaultConfig = {

    // 设计稿标准，用于等比计算
    styleWidth: 375,

    styleApplyUnit: 'px'
}

export default [
    {

        inject: {

            /**
             * 系统信息（通过父级容器provide提供不同场景下的数据）
             */
            systemInfo: {

                type: Object,

                default () {
                    return {
                        availableWidth: 375,
                        //视图模式: configure 配置视图
                        viewMode: 'configure'
                    }
                }
            }
        },

        methods: {

            /**
             * 触发事件
             * @param {String} event 事件名称
             * @param {Object} data 事件数据
             * @param {Function} callback 回调函数
             */
            doEmit (event, data = {}, callback) {
                let that = this
                //监听器
                let listeners = this.$listeners || {}
                //事件信息
                let eventInfo = {
                    event,
                    data,
                    callback: function() {
                        return callback && callback.apply(that, arguments)
                    }
                }

                if(listeners.request){
                    //包装场景
                    this.$emit('request', eventInfo)
                }else{
                    this.$emit(event, eventInfo)
                }
            },

            /**
             * 属性像素数值（基于375）等比换算
             * @param {Number|String} numstr 带单位或者不带单位的数值
             * @return {String} 数值对应的像素值
             * @example 
             *      this.doCalcSize('375')
             *      375    375
             */
            doCalcSize (numstr) {
                if(!numstr && numstr !== 0) return ''

                let num = String(numstr).replace(/[^0-9.]/g, '')

                let pxForRP = parseFloat(this.systemInfo.availableWidth)/parseFloat(defaultConfig.styleWidth)
                let retPx = (parseFloat(num)*pxForRP) + defaultConfig.styleApplyUnit

                return retPx
            },

            /**
             * 移除样式单位
             * @param {Number|String} numstr 带单位或者不带单位的数值
             */
            doRemoveUnit (numstr = '') {
                return String(numstr).replace(/[^0-9.]/g, '')
            },

            /**
             * 应用包装单位
             * @param {Number|String} numstr 不带单位的数值
             * @return {String} 数值对应的像素值
             * @example 
             *      this.doApplyUnit('750')
             *      750px
             */
            doApplyUnit (numstr) {
                return numstr + defaultConfig.styleApplyUnit
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
            } 
        }
    }
]