<template>
    <div class="template_carouselpalace_default" ref="templatecarouselpalacedefault">
        <carousel-advertise :mode="mode" :properties="swiperProperties" :options="swiperOptions"
            @mClick="$emit('mClick', $event)"/>
        <div class="template_carouselpalace_default_palacewrap" :style="palacewrapStyle">
            <div class="template_carouselpalace_default_palace" :style="palaceconStyle">
                <palace-default :mode="mode" :properties="palaceProperties" :options="palaceOptions"
                    @mClick="$emit('mClick', $event)"/>
            </div>
        </div>
    </div>
</template>
<script>
import props from '../../../props'
import mixins from '../../../mixins'

import carouselAdvertise from '../../../base/carousel/advertise'
import palaceDefault from '../../../base/palace/default'

export default {
    mixins,
    props,

    components: {
        palaceDefault,
        carouselAdvertise
    },

    data () {
        return {
            swiperProperties:{
                ratiox: 375,
                ratioy: 192,
                style: 'style6'
            },
            swiperOptions: {
                isCustomized: '0',
                aspectRatio: '375:192',
                isGap: '1'
            },
            palaceProperties: {
                palacenum: 4,
                linenum: 4,
                itemmargin: '0'
            },
            palaceOptions: {

            },
            palaceconStyle: {
                width: 'auto',
                padding: '0'
            },
            palacewrapStyle: {
                height: 'auto'
            }
        }
    },

    created () {
        let styleInfoList = this.options.styleInfoList || []
        let listMap = this.divideList(styleInfoList)
        //切分宫格+轮播数据
        this.swiperOptions = Object.assign({}, this.options, this.swiperOptions, 
            {styleInfoList: listMap.swiperList})
        this.palaceOptions = Object.assign({}, this.options, this.palaceOptions, 
            {styleInfoList: listMap.palaceList})
    },

    mounted () {
        this.calcRect()
    },

    methods: {

        divideList (styleInfoList) {
            let len = styleInfoList.length
            let palaceList = [], swiperList = []
            let i

            for(i = 0; i < len; i++){
                if(styleInfoList[i].contentType == '2'){
                    palaceList.push(styleInfoList[i])
                }else if(styleInfoList[i].contentType == '1'){
                    swiperList.push(styleInfoList[i])
                }
            }

            return {
                palaceList,
                swiperList
            }
        },

        calcRect () {
            this.palaceconStyle.width = this.calcpxbyelem(this.$refs.templatecarouselpalacedefault, 375, 343) + 'px'
            this.palaceconStyle.padding = this.calcpxbyelem(this.$refs.templatecarouselpalacedefault, 375, 16) + 'px 0 '
            this.palacewrapStyle.height = this.calcpxbyelem(this.$refs.templatecarouselpalacedefault, 375, 54) + 'px'
        }
    }

}
</script>
<style scoped>
    @import '../../../reset.css';

    .template_carouselpalace_default{
        width: 100%;
    }

    .template_carouselpalace_default_palace{
        margin: 0 auto;
        transform: translateY(-50%);
        position: relative;
        z-index: 2;
        background: #FFFFFF;
        border-radius: 4px;
        box-shadow: 0px 0px 10px rgb(244,245,249);
    }

    .template_carouselpalace_default_palacewrap{
        position: relative;
        width: 100%;
    }
</style>
