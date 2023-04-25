<template>
    <div class="tfloor_common_roundheader">
        <div :style="titleStyle">
            <span>{{options.title}}</span>
            <slot name="postTitle"/>
        </div>
        <div class="tfloor_common_roundheader_right" @click="fireClick(options.action)">
            <slot name="preIcon"/>
            <img v-if="options.headerIcon" :src="options.headerIcon" class="tfloor_common_roundheader_img"/>
        </div>
    </div>
</template>
<script>
import mixins from '../../mixins/mixins'

export default {
    mixins,

    props: {
        options: {
            type: Object,
            default () {
                return {}
            }
        }
    },

    methods: {

        fireClick (action, actionContext) {
            this.doEmit('mclick', {action, actionContext})
        }
    },

    computed: {

        titleStyle () {
            return {
                fontSize: this.doCalcSize(this.options.titleSize),
                color: this.doParseColor(this.options.titleColor),
                fontWeight: this.options.titleIsBold == '1' ? 'bold' : 'normal'
            }
        }
    }
}
</script>
<style lang="scss">
.tfloor_common_roundheader{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tfloor_common_roundheader_right{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 12px;
        color: #000000;
    }

    .tfloor_common_roundheader_img{
        width: 16px;
        height: 16px;
    }
}
</style>