<template>
    <div class="tfloor_page_edit">
        <page-preview-proxy :views="views" :mode="mode"/>
    </div>
</template>
<script>
import { PagePreviewProxy } from '@ynet/ynet-template-view/src/proxy.js'
import components from "../../../src/mock.js"

export default {

    components: {
        PagePreviewProxy
    },
    
    data () {
        return {
            views: components,
            mode: {}
        }
    },

    created () {
        //编辑场景固定375适配,固定root的font-size（针对rem）
        window.floorScreenWidth = 375
        this.refreshMode()
        this.resize()
        window.addEventListener('resize', this.refreshMode.bind(this), false);
    },

    destroyed () {
        window.floorScreenWidth = null
        this.resize()
    },

    methods: {

        resize () {
            let evt = document.createEvent('Events')
            evt.initEvent('resize', false, true)
            window.dispatchEvent(evt)
        },

        refreshMode () {
            //在小视宽的场景下（1280屏）减去友好性的提示内容
            this.mode = {showName: document.documentElement.clientWidth > 750}
        }
    }
}
</script>



