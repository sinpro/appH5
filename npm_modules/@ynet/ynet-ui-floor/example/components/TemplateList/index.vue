<template>
    <preview-container :views="views" :data="data" @request="doRequestEvent"/>
</template>
<script>
import { PreviewContainer } from '@ynet/ynet-template-view/src/proxy.js'
import components from "../../../src/mock.js"

export default {

    components: {
        PreviewContainer
    },

    props: {

        /**
         * 楼层数据
         */
        data: {
            type: Object,
            default () {
                return {}
            }
        }
    },

    data () {
        let clientWidth = window.document.documentElement.clientWidth;

        return {

            /**
             * 系统信息（用于组件库组件针对控制属性的数值等比计算等处理）
             */
            systemInfo: {
                availableWidth: clientWidth
            },

            /**
             * 渲染组件集
             */
            views: Object.assign({}, components)
        }
    },

    provide() {
        return {
            systemInfo: this.systemInfo
        };
    },

    methods: {

        /**
         * 处理事件请求兼埋点
         * @param {Object} eventInfo 事件信息对象
         */
        doRequestEvent (eventInfo = {}) {
            let data = eventInfo.data || {}
            window.console && window.console.info(`doRequestEvent-->${eventInfo.event}-->`, data)
        }
    }
}
</script>