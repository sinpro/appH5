<!--
    魔方组件：
        属性列表
            {String}  height        空白区域高度
            {String}  color         空白区域背景颜色
-->
<template>
    <div class="tfloor_blank_fblank" :style="fblankStyle"></div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'

export default {

    name: 'FBlank',

    mixins,

    props,

    computed: {
        fblankStyle() {
            return {
                backgroundColor: this.doParseColor(this.color),
                height: this.doCalcSize(this.height)
            }
        }
    }
}
</script>
<style lang="scss">
.tfloor_blank_fblank {
    width: 100%;
}
</style>