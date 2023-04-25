<template>
    <div class="template_preview_pagepreviewproxy" :style="proxycontainerStyle">
        <page-preview-container
            ref="preview"
            :views="views"
            :data="pageDataInfo"
            :activeFloorId="activeFloorId"
            :scrollIntoViewId="scrollIntoViewId"
            :refreshFloorData="refreshFloorData"
            :mode="mode"
            @add="doAddEvent($event)"
            @delete="doDelEvent($event)"
            @select="doSelectEvent($event)"
            @adjust="doAdjustEvent($event)"
            :style="containerStyle"/>
    </div>
</template>
<script>
import PagePreviewContainer from './PagePreviewContainer'
import mixins from './iframemixins'

export default {

    mixins,

    components: {
        PagePreviewContainer
    },

    props: {

        views: {
            type: Object,
            default () {
                return {}
            }
        },

        mode: {
            type: Object,
            default () {
                return {}
            }
        }
    },

    data () {
        return {
            pageDataInfo: {},
            activeFloorId: '',
            scrollIntoViewId: '',
            refreshFloorData: {},

            proxycontainerStyle: {
                padding: '70px 0 57px 0'
            },

            containerStyle: {
                width: '375px'
            },

            /**
             * 系统信息
             */
            systemInfo: {
                availableWidth: 375,
                viewMode: 'configure'
            },
        }
    },

    provide () {
        return {
            systemInfo: this.systemInfo
        }
    },

    mounted () {
        this.initMessageChannel(window.parent, 'iframe', 'preview')
    },

    methods: {

        onData (data) {
            this.pageDataInfo = data
        },

        onActiveFloorId (data) {
            this.activeFloorId = data
        },

        onScrollIntoViewId (data) {
            this.scrollIntoViewId = data
        },

        onRefreshFloor (data) {
            this.refreshFloorData = data
        },

        onStartdrag () {
          this.$refs.preview && this.$refs.preview.startdrag && this.$refs.preview.startdrag()
        },

        onEnddrag () {
          this.$refs.preview && this.$refs.preview.enddrag && this.$refs.preview.enddrag()
        },

        doAddEvent (event) {
            this.sendIframeMessage('add', event)
        },

        doDelEvent (event) {
            this.sendIframeMessage('del', event)
        },

        doSelectEvent (event) {
            this.sendIframeMessage('select', event)
        },

        doAdjustEvent (event) {
            this.sendIframeMessage('adjust', event)
        },

        sendIframeMessage (event, eventData) {
            this.sendMessage(event, eventData, null)
        }
    }
}
</script>
<style lang="scss">
body{
    margin: 0;
}
</style>
<style lang="scss" scoped>
.template_preview_pagepreviewproxy{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}
</style>
