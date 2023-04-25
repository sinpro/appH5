<!--
    魔方组件：
        属性列表
            {String}  lineStyle        辅助线样式
            {String}  leftMargin       左边距
            {String}  rightMargin      右边距
            {String}  lineColor        辅助线颜色
-->
<template>
    <div class="tfloor_subline_fline" :style="flineStyle"></div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'

export default {

    name: 'FLine',

    mixins,

    props,

    computed: {
        flineStyle() {
            return {
                borderBottomStyle: (parseInt(this.lineStyle) === 0) ? 'solid' : 'dashed',
                borderBottomColor: this.doParseColor(this.lineColor),
                marginLeft: this.doCalcSize(this.leftMargin),
                marginRight: this.doCalcSize(this.rightMargin)
            }
        }
    }
}
</script>
<style lang="scss">
.tfloor_subline_fline {
    height: 0;
    margin: 0 auto;
    transform: scaleY(0.5);
    border-bottom: 1px solid rgb(0, 10, 224)
}
</style>