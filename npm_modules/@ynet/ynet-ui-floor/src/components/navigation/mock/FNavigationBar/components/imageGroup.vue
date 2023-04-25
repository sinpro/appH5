<template>
    <div class="tfloor_navigation_bar_imagegroup">
        <img :src="options.imageurl || require('../../../../../assets/images/gray.jpg')" class="tfloor_navigation_bar_imagegroup_img"
            @click="bShowPopover=!bShowPopover"/>
        <div class="tfloor_navigation_bar_imagegroup_ul" v-show="bShowPopover">
            <div class="tfloor_navigation_bar_imagegroup_ul_arrow"></div>
            <div v-for="(info, index) in options.imageGroup" :key="index" 
                class="tfloor_navigation_bar_imagegroup_li" 
                @click="bShowPopover=false;fireClick(info)">
                <img :src="info.imageurl" class="tfloor_navigation_bar_imagegroup_li_img"/>
                <span>{{info.title}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../../assets/mixins/mixins'
import props from '../manage/props'

export default {

    mixins,

    props,

    data () {
        return {
            bShowPopover: false
        }
    },

    methods: {

        fireClick (info = {}) {
            this.doEmit('mclick', {action: info.action})
        }
    }
}
</script>
<style lang="scss">
.tfloor_navigation_bar_imagegroup{
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;

    .tfloor_navigation_bar_imagegroup_img{
        height: 100%;
    }

    .tfloor_navigation_bar_imagegroup_ul{
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        width: 170px;
        top: 50px;
        right: -8px;
        background-color: #FFFFFF;
        z-index: 200;
        border-radius: 2px;
        padding: 4px 10px;
        box-shadow: 0 0 5px 0 rgba(195,200,226,0.50);

        .tfloor_navigation_bar_imagegroup_li{
            display: flex;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
            font-size: 14px;
            padding: 12px 0;

            .tfloor_navigation_bar_imagegroup_li_img{
                margin-right: 8px;
                height: 24px;
            }
        }

        .tfloor_navigation_bar_imagegroup_ul_arrow{
            position: absolute;
            display: block;
            width: 0;
            height: 0;
            border-color: transparent;
            border-style: solid;
            border-width: 3px;
            top: -3px;
            right: 6px;
            margin-left: -3px;
            border-top-width: 0;
            border-bottom-color: #fff;
        }
    }
}
</style>