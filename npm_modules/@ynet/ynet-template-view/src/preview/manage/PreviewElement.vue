<script>
import { prototype } from 'events'
export default {

    props: {

        itemInfo: {
            type: Object,
            default () {
                return {}
            }
        }
    },

    /**
     * 渲染组件
     */
    render (createElement) {
        let {properties = {}, events = {}} = this.parseProperties(this.itemInfo.properties)
        let eventListeners = this.parseEventListeners(events)

        return createElement(this.itemInfo.type, {
            staticClass: 'template_preview_previewitem',
            attrs: {
                ...properties
            },
            on: {
                config: (eventInfo) => {
                  this.doConfig(eventInfo)
                },
                request: (eventInfo) => {
                  this.doRequestEvent(eventInfo)
                },
                ...eventListeners
            }
        })
    },

    methods: {

        /**
         * 转义事件监听器
         * @param {Object} events 事件集
         */
        parseEventListeners (events = {}) {
            let eventListeners = {}

            //分离属性与事件
            for(let event in events){
                eventListeners[event] = this.parseEventListener(event, events[event])
            }

            return eventListeners
        },

        /**
         * 转义事件监听器
         * @param {String} event 事件集
         * @param {Object} config 配置项
         */
        parseEventListener (event, config = {}) {
            return (data) => {
                this.doRequestEvent({event, data}, config)
            }
        },

        /**
         * 转义属性，分离属性与事件
         * @param {Object} props 属性集
         */
        parseProperties (props = {}) {
            let properties = {}, events = {}
            let matches

            //分离属性与事件
            for(let key in props){
                if(matches = key.match(/^@(.+)$/)){
                    events[matches[1]] = props[key]
                }else{
                    properties[key] = props[key]
                }
            }

            return {properties, events}
        },

        /**
         * 事件响应
         * @param {Object} eventInfo 事件信息
         * @param {Object} config 事件配置
         */
        doRequestEvent (eventInfo = {}, config) {
            let that = this
            let eventParams = {
              event: eventInfo.event,
              data: eventInfo.data || {},
              config: config,
              context: this.itemInfo,
              callback: function () {
                return eventInfo.callback && eventInfo.callback.apply(that, arguments)
              }
            }

            window.console && console.info('RequestEvent============', eventInfo, eventParams)

            //处理事件，并增加上下文信息
            eventInfo.event && this.$emit('request', eventParams)
        },

        /**
         * 配置事件响应
         * @param {Object} eventInfo 事件信息
         */
        doConfig (eventInfo = {}) {
          this.$emit('config', eventInfo)
        }
    }
}
</script>
