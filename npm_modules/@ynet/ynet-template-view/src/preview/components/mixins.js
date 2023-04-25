let defaultConfig = {

    styleWidth: 750,

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

        created () {

        },

        methods: {

            /**
             * 事件在多级父子组件间传递
             * @param {String} eventName 事件名称
             * @param {Object} eventData 事件数据
             */
            doDispatch (eventName, eventData = {}) {
                let parent = this.$parent || this.$root
                let eventListeners = parent.$options.eventListeners

                while (parent && (!eventListeners || !eventListeners[eventName])) {
                    parent = parent.$parent

                    if (parent) {
                        eventListeners = parent.$options.eventListeners
                    }
                }

                if (parent && eventListeners) {
                    let listener = eventListeners[eventName]
                    listener && listener.call(parent, eventData)
                }
            },

            /**
             * 移除样式单位
             * @param {Number|String} numstr 带单位或者不带单位的数值
             */
            doRemoveUnit (numstr = '') {
                return String(numstr).replace(/[^0-9\.]/g, '')
            },

            /**
             * 计算数值
             * @param {Number|String} numstr 带单位或者不带单位的数值
             * @return {String} 数值对应的像素值
             * @example
             *      this.doCalcSize('750rp')
             *      375px
             */
            doCalcSize (numstr) {
                if(!numstr && numstr !== 0) return ''

                let pxForRP = parseFloat(this.systemInfo.availableWidth)/parseFloat(defaultConfig.styleWidth)
                retPx = (parseFloat(num)*pxForRP) + defaultConfig.styleApplyUnit

                return retPx
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
             * 转义fixed问题
             */
            doPositionFixed () {
                return this.systemInfo.viewMode == 'configure' ? 'absolute' : 'fixed'
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

            /**
             * 转义边距数值
             * @param {String} layoutMargin 边距数值
             */
            doParseMargin (layoutMargin = '') {
                if(!layoutMargin && layoutMargin !== 0) return ''

                let marginValues = typeof layoutMargin == 'string' ? layoutMargin.replace(/['"\[\]\s]/g, '').split(',') : layoutMargin
                let retValues = []
                let valueLen = marginValues.length

                for(let i = 0; i < valueLen; i++){
                    retValues.push(this.doCalcSize(marginValues[i]))
                }

                return retValues.join(' ')
            }
        },
    }
]
