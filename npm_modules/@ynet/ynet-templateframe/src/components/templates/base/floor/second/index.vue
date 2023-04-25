<template>
    <div class="template_floor_second">
        <div v-if="bPlaceholder" class="template_floor_second_placeholder"></div>
    </div>
</template>
<script>
import props from '../../../props'
import mixins from '../../../mixins'

export default {

    props,
    mixins,

    data () {
        return {
            bPlaceholder: false
        }
    },

    created () {
        if(this.mode){
            //模板编辑模式
            this.bPlaceholder = true
        }
    },

    methods: {

    }

}
</script>
<style scoped>
    .template_floor_second{
        width: 100%;
    }

    .template_floor_second_placeholder{
        position: absolute;
        top: 0;
        left: 50%;
        width: 48px;
        height: 16px;
        transform: translateX(-50%);
        z-index: 100;
        background: url(./assets/down.png) no-repeat center center;
    }
</style>
