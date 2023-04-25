<template>
    <div class="template_preview_previewproxy">
        <preview-container 
            ref="preview"
            :views="views"
            :data="pageDataInfo" 
            :refreshFloorData="refreshFloorData"
            :style="containerStyle"/>
    </div>
</template>
<script>
import PreviewContainer from '../manage/PreviewContainer'
import mixins from './iframemixins'

export default {

    mixins,

    components: {
        PreviewContainer
    },

    props: {

        views: {
            type: Object,
            default () {
                return {}
            }
        }
    },
  
    data () {
        return {
            minHeight: 600,
            pageDataInfo: {},
            refreshFloorData: {},

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
            this.doSizeChange()
        },

        onRefreshFloor (data) {
            this.refreshFloorData = data
            this.doSizeChange()
        },
        
        doSizeChange() {
            //重置高度，否则高度计算会越来越大
            this.sendIframeMessage('resize', this.minHeight + 'px')
            setTimeout(() => {
                try{
                    let height = this.getContentHeight(),
                    bodyScrollHeight = height + 80
                    this.sendIframeMessage('resize', bodyScrollHeight + 'px')
                }catch(e){
                    window.console && console.info(e)
                }
            }, 100)
        },

        getContentHeight () {
            // 最小高度
            let heights = [this.minHeight],
            height, maxHeight = 0

            // body的文档高度
            if(document.body.scrollHeight > document.body.offsetHeight){
                height = document.body.scrollHeight || 0
            }else{
                height = document.body.offsetHeight || 0
            }
            heights.push(height)

            // documentElement的文档高度
            if(document.documentElement.scrollHeight > document.documentElement.offsetHeight){
                height = document.documentElement.scrollHeight || 0
            }else{
                height = document.documentElement.offsetHeight || 0
            }
            heights.push(height)

            // 获取数值中最大数值
            heights.forEach(heightV => {
                maxHeight = heightV > maxHeight ? heightV : maxHeight
            })

            return maxHeight
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
    overflow-x: hidden;

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
<style lang="scss" scoped>
.template_preview_previewproxy{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}
</style>