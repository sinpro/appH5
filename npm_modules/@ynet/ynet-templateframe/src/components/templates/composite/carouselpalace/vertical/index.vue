<template>
    <div class="template_carouselpalace_vertical" ref="templatecarouselpalacevertical" :style="containerStyle">
        <div class="template_carouselpalace_vertical_container">
            <div v-if="!options.noteType || options.noteType == '0'" class="template_carouselpalace_vertical_palacewrap" :style="palacewrapStyle">
                <palace-default class="template_carouselpalace_vertical_palace" :mode="mode" :properties="palaceProperties" :options="palaceOptions"
                    @mClick="$emit('mClick', $event)"/>
            </div>
            <div v-if="!options.noteType || options.noteType == '1'" :style="swiperWrapStyle">
                <component v-if="carouselComponentType" :is="carouselComponentType" :mode="mode" :properties="swiperProperties" :options="swiperOptions" @mClick="$emit('mClick', $event)"/>
            </div>
        </div>
    </div>
</template>
<script>
import props from '../../../props'
import mixins from '../../../mixins'

import carouselTranslation from '../../../base/carousel/translation'
import carouselAdvertise from '../../../base/carousel/advertise'
import carouselCascade from '../../../base/carousel/cascade'
import palaceDefault from '../../../base/palace/default'

export default {
    mixins,
    props,

    components: {
        palaceDefault,
        carouselTranslation,
        carouselCascade,
        carouselAdvertise
    },

    data () {
        return {
            swiperProperties:{
                style: 'style4'
            },
            swiperOptions: {
                topMargin: '0',
                bottomMargin: '0'
            },
            swiperWrapStyle: {
                marginTop: '0'
            },
            palaceProperties: {
                palacenum: 4,
                linenum: 4,
                itemmargin: '0'
            },
            palaceOptions: {

            },
            palacewrapStyle:{
                padding: '0',
                margin: '0'
            },
            containerStyle: {
                backgroundImage: 'none',
                paddingTop: '0'
            },
            carouselComponentType: 'carouselTranslation'
        }
    },

    created () {
        let styleInfoList = this.options.styleInfoList || []
        let listMap = this.divideList(styleInfoList)

        if(this.options.picUrl){
            this.containerStyle.backgroundImage = 'url(' + this.concatImageUrl(this.options.picUrl) + ')'
        }

        let fieldset2 = ((listMap.swiperList || [])[0] || {}).fieldset2
        let swiperOptionsObj = {}
        
        switch(fieldset2){
            case '1':
                this.carouselComponentType = 'carouselCascade'
                this.swiperProperties = {}
                swiperOptionsObj = {aspectRatio:'2.5:1'}
                break
            case '2':
                this.carouselComponentType = 'carouselTranslation'
                break
        }

        //切分宫格+轮播数据
        this.swiperOptions = Object.assign({}, this.options, this.swiperOptions, swiperOptionsObj, 
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
            let px4 = this.calcpxbyelem(this.$refs.templatecarouselpalacevertical, 375, 4)
            let px20 = this.calcpxbyelem(this.$refs.templatecarouselpalacevertical, 375, 20)
            let px80 = this.calcpxbyelem(this.$refs.templatecarouselpalacevertical, 375, 80)
            this.palacewrapStyle.padding = px4 + 'px 0'

            if(!this.options.noteType || this.options.noteType == '0'){
                this.palacewrapStyle.margin =  `0 0 ${px20}px 0`
            }else{
                this.swiperWrapStyle.marginTop =  `${px20}px`
            }
            
            this.containerStyle.paddingTop = `${px80}px`
        }
    }

}
</script>
<style scoped>
    @import '../../../reset.css';

    .template_carouselpalace_vertical{
        width: 100%;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        color: #FFFFFF;
    }

    .template_carouselpalace_vertical_container{
        display: flex;
        flex-direction: column;
    }

    .template_carouselpalace_vertical_palacewrap{
        width: 100%;
    }
    
    .template_carouselpalace_vertical .template_carouselpalace_vertical_palace{
        background-color: transparent;
    }

</style>
