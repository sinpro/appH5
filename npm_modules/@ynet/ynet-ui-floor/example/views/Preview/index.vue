<template>
    <div class="tfloor_page_preview">
        <preview-proxy :views="views" />
    </div>
</template>
<script>
import { PreviewProxy } from '@ynet/ynet-template-view/src/proxy.js'
import components from "../../../src/mock.js"

export default {

    components: {
        PreviewProxy
    },
    
    data () {
        return {
            views: components
        }
    }
}
</script>
