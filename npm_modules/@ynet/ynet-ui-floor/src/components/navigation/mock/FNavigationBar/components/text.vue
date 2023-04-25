<template>
    <span class="tfloor_navigation_bar_text" :style="textStyle"
        @click="fireClick()">{{options.title}}</span>
</template>
<script>
import mixins from '../../../../../assets/mixins/mixins'
import props from '../manage/props'

export default {

    mixins,

    props,

    methods: {

        fireClick () {
            this.doEmit('mclick', {action: this.options.action})
        }
    },

    computed: {

        textStyle () {
            return {
                color: this.doParseColor(this.options.titleColor)
            }
        }
    }
}
</script>
<style lang="scss">
.tfloor_navigation_bar_text{
    width: 100%;
    height: 100%;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
}
</style>