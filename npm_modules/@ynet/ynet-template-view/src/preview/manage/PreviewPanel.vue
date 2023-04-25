<template>
    <!--卡片-->
    <div class="template_preview_previewpanel" :key="instantceId" :style="styleData">
        <preview-element :itemInfo="itemInfo" v-on="$listeners"/>
        <slot></slot>
    </div>
</template>
<script>
import PreviewElement from './PreviewElement'

let g_instancecounter = 0

export default {

    components: {
        PreviewElement
    },

    props: {

        itemInfo: {
            type: Object,
            default () {
                return {}
            }
        }
    },

    data () {
        return {
            instantceId: this.getInstanceId(),
            styleData: {
                fontSize: '14px'
            }
        }
    },

    methods: {

        getInstanceId () {
            return 'element_key_' + g_instancecounter++
        }
    },

    watch: {

        itemInfo () {
            this.instantceId = this.getInstanceId()
        }
    }
}
</script>
<style lang="scss" scoped>
.template_preview_previewpanel{
    display: flex;
    flex-direction: column;
    width: 100%;
}
</style>
