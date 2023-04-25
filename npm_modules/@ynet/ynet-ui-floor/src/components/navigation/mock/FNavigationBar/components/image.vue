<template>
    <div class="tfloor_navigation_bar_image" @click="fireClick">
        <img :src="options.imageurl || require('../../../../../assets/images/gray.jpg')" class="tfloor_navigation_bar_image_img"/>
        <span v-if="options.titleFlag == '1' && options.title" :style="titleStyle" class="tfloor_navigation_bar_image_title">{{options.title}}</span>
    </div>
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

        titleStyle () {
            return {
                color: this.doParseColor(this.options.titleColor)
            }
        }
    }
}
</script>
<style lang="scss">
.tfloor_navigation_bar_image{
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .tfloor_navigation_bar_image_img{
        height: 100%;
    }

    .tfloor_navigation_bar_image_title{
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 5px;
        white-space: nowrap;
    }
}
</style>