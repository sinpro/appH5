<template>
    <div class="tfloor_navigation_bar_location">
        <div class="tfloor_navigation_bar_location_bg" :style="cityStyle"></div>
        <div class="tfloor_navigation_bar_location_content">
            <img v-if="options.positionType == '0'" :src="options.imageurl" 
                class="tfloor_navigation_bar_location_img" :style="imgStyle"/>
            <span :style="titleStyle">北京市</span>
            <img v-if="options.positionType == '1'" :src="options.imageurl"  
                class="tfloor_navigation_bar_location_img" :style="imgStyle"/>
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
        
        cityStyle () {
            return {
                backgroundColor: this.doParseColor(this.options.backgroundColor)
            }
        },

        titleStyle () {
            return {
                color: this.doParseColor(this.options.titleColor),
                whiteSpace: 'nowrap'
            }
        },

        imgStyle () {
                return {
                marginLeft: this.options.positionType == '1' ? this.doCalcSize('4') : '0',
                marginRight: this.options.positionType != '1' ? '0' : this.doCalcSize('4'),
            }
        }
    }
}
</script>
<style lang="scss">
.tfloor_navigation_bar_location{
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 12px;
    position: relative;
    padding: 0 10px;

    .tfloor_navigation_bar_location_bg{
        position: absolute;
        width: 100%;
        left: 0;
        z-index: 2;
        opacity: 0.2;
        border-radius: 30px;
        height: 28px;
    }

    .tfloor_navigation_bar_location_content{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        z-index: 3;
    }

    .tfloor_navigation_bar_location_img{
        height: 15px,
    }
}
</style>