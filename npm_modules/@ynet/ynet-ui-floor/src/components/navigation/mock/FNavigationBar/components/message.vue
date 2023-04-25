<template>
    <div class="tfloor_navigation_bar_message" @click="fireClick">
        <img :src="options.imageurl || require('../../../../../assets/images/gray.jpg')" class="tfloor_navigation_bar_message_img"/>
        <span v-if="options.badge" class="tfloor_navigation_bar_message_badge">{{options.badge}}</span>
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
.tfloor_navigation_bar_message{
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;

    .tfloor_navigation_bar_message_img{
        height: 100%;
    }

    .tfloor_navigation_bar_message_badge{
        position: absolute;
        left: 50%;
        top: 8px;
        border-radius: 8px;
        height: 16px;
        background: #FE4631;
        color: #FFFFFF;
        font-size: 10px;
        padding: 0px 4.5px;
    }
}
</style>