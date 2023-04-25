<template>
    <div class="tfloor_navigation_bar_search">
        <div class="tfloor_navigation_bar_search_bg" :style="searchBgStyle"
            v-if="options.backgroundFlag == '1'"></div>
        <div class="tfloor_navigation_bar_search_content">
            <img v-if="leftInfo.imageurl" :src="leftInfo.imageurl" 
                class="tfloor_navigation_bar_search_img_left"/>
            <div class="tfloor_navigation_bar_search_text" :style="leftTitleStyle">{{leftInfo.title}}</div>
            <img v-if="options.rightFlag == '1' && rightInfo.imageurl" :src="rightInfo.imageurl" 
                class="tfloor_navigation_bar_search_img_right"/>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../../assets/mixins/mixins'
import props from '../manage/props'

export default {

    mixins,

    props,

    computed: {

        searchBgStyle () {
            return {
                backgroundColor: this.doParseColor(this.options.backgroundColor)
            }
        },

        leftTitleStyle () {
            return {
                color: this.doParseColor(this.leftInfo.titleColor)
            }
        },

        leftInfo () {
            return this.options.leftInfo || {}
        },

        rightInfo () {
            return this.options.rightInfo || {}
        }
    }
}
</script>
<style lang="scss">
.tfloor_navigation_bar_search{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 12px;
    position: relative;
    padding: 0 10px;

    .tfloor_navigation_bar_search_bg{
        position: absolute;
        width: 100%;
        left: 0;
        z-index: 2;
        opacity: 0.2;
        border-radius: 30px;
        height: 28px;
    }

    .tfloor_navigation_bar_search_content{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        z-index: 3;
    }

    .tfloor_navigation_bar_search_img_left{
        height: 28px;
        margin-right: 4px;
    }

    .tfloor_navigation_bar_search_img_right{
        height: 28px;
        margin-left: 4px;
    }

    .tfloor_navigation_bar_search_text{
        width: 100%;
        text-align: left;
        font-size: 14px;
    }
}
</style>