<template>
    <div class="template_picturetext_slideronetext" ref="templatepicturetextslideronetext" :style="wrapStyle">
        <ul class="template_picturetext_slideronetext_slider_container" :style="slidercontainerStyle">
            <li class="template_picturetext_slideronetext_slider_item" v-for="(itemInfo, index) in (options.styleInfoList || [])" :key="index"
                @click="$emit('mClick', itemInfo)">
                <div class="template_picturetext_slideronetext_container" :style="containerStyle">
                    <div class="template_picturetext_slideronetext_placeholder" :style="placeholderStyle"></div>
                    <div class="template_picturetext_slideronetext_picture">
                        <imageview class="template_picturetext_slideronetext_pictureimg" :style="imgStyle" :src="itemInfo.picUrl"/>
                    </div>
                    <div class="template_picturetext_slideronetext_placeholder" :style="placeholderStyle"></div>
                    <div class="template_picturetext_slideronetext_text" :style="textStyle">
                        <div class="template_picturetext_slideronetext_title" :style="titleStyle">{{itemInfo.title}}</div>
                        <div class="template_picturetext_slideronetext_subtitle" :style="subtitleStyle">{{itemInfo.subTitle}}</div>
                        <div class="template_picturetext_slideronetext_intro" :style="introStyle">{{itemInfo.instructions}}</div>   
                    </div>
                </div>
            </li>
        </ul>
              
    </div>
</template>
<script>
import props from '../../../props'
import mixins from '../../../mixins'
import Bscroll from 'better-scroll'

export default {
    mixins,
    props,

    data () {
        return {
            wrapStyle: {
                borderBottom: 'none'
            },
            slidercontainerStyle: {
                width: 'auto',
                marginTop: '0',
                marginBottom: '0',
            },
            containerStyle: {
                height: 'auto'
            },
            placeholderStyle: {
                width: 'auto'
            },
            imgStyle: {
                width: 'auto',
                height: 'auto'
            },
            textStyle: {
                width: 'auto'
            },
            titleStyle: {
                fontSize: '16px'
            },
            subtitleStyle: {
                fontSize: '16px'
            },
            introStyle: {
                fontSize: '12px'
            }
        }
    },

    created () {
         
    },

    mounted () {
        this.calcRect()
        this.$nextTick(() => {
            if(!this.picScroll){
                this.picScroll = new Bscroll(this.$refs.templatepicturetextslideronetext,{
                    scrollX: true,
                    mouseWheel: {    // pc端同样能滑动
                        speed: 1,
                        invert: false
                    }
                })
            }else{
                this.picScroll.refresh();
            }
        })
    },

    methods: {
        calcRect () {
            let ratiox, ratioy
            let placeholderWidth = this.calcpxbyelem(this.$refs.templatepicturetextslideronetext, 375, 16)
            this.placeholderStyle.width = placeholderWidth + 'px'
            this.titleStyle.fontSize = this.calcpxbyelem(this.$refs.templatepicturetextslideronetext, 375, 16) + 'px'
            this.subtitleStyle.fontSize = this.calcpxbyelem(this.$refs.templatepicturetextslideronetext, 375, 14) + 'px'
            this.introStyle.fontSize = this.calcpxbyelem(this.$refs.templatepicturetextslideronetext, 375, 12) + 'px'

            if(this.options.isCustomized == '1'){
                //自定义
                ratiox = 80
                ratioy = this.options.picHeight
            }else{
                let ratio = this.calcRatio(this.options.aspectRatio)
                ratiox = ratio.ratiox
                ratioy = ratio.ratioy
            }

            let pxImgWidth = this.calcpxbyelem(this.$refs.templatepicturetextslideronetext, 375, 80)
            this.imgStyle.width = pxImgWidth  + 'px'
            this.imgStyle.height = this.calcpx(pxImgWidth, ratiox, ratioy) + 'px'
            let pxTextWidth = this.calcpxbyelem(this.$refs.templatepicturetextslideronetext, 375, 204)
            this.textStyle.width = pxTextWidth + 'px'
            
            //分割线控制
            if(this.options.isShowLine == '1'){
                let divstyle = 'solid'
                let divcolor = this.options.divlineColor || '#ddd'
                //分割线类别 0-实线，1-虚线
                if(this.options.divlineType == '1'){
                    divstyle = 'dashed'
                }
                //分割线控制
                this.wrapStyle.borderBottom = `1px ${divstyle} ${divcolor}`
            }

            this.containerStyle.height = this.imgStyle.height

            //上下边距控制
            this.slidercontainerStyle.marginTop = this.calcpxbyelem(this.$refs.templatepicturetextslideronetext, 375, this.options.topMargin || 0)  + 'px'
            this.slidercontainerStyle.marginBottom = this.calcpxbyelem(this.$refs.templatepicturetextslideronetext, 375, this.options.bottomMargin || 0)  + 'px'

            if((this.options.styleInfoList || []).length > 1){
                this.slidercontainerStyle.width = ((this.options.styleInfoList || []).length*(2*placeholderWidth + pxImgWidth + pxTextWidth) + placeholderWidth) + 'px'
            }
        }
    }
}
</script>
<style scoped>

.template_picturetext_slideronetext{
    width: 100%;
    overflow: hidden;
    text-align: left;
}

.template_picturetext_slideronetext_slider_container{
    font-size: 0;
    white-space: nowrap;
}

.template_picturetext_slideronetext_slider_container:after {
    content: '';
    clear: both;
    overflow: hidden;
    height: 0;
    line-height: 0;
    display: block
}

.template_picturetext_slideronetext_slider_item{
    float: left;
}

.template_picturetext_slideronetext_container{
    width: 100%;
    display: flex;
}

.template_picturetext_slideronetext_text{
    position: relative;
}

.template_picturetext_slideronetext_picture .template_picturetext_slideronetext_pictureimg{
    width: 100%;
    height: 100%;
}

.template_picturetext_slideronetext_placeholder {
    height: 100%;
}

.template_picturetext_slideronetext_title{
    color: #323C41;
    letter-spacing: 0;
    font-weight: bold;
}

.template_picturetext_slideronetext_subtitle{
    color: #666666;
    letter-spacing: 0;
}

.template_picturetext_slideronetext_intro{
    color: #A2A4A6;
    letter-spacing: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
}

.template_picturetext_slideronetext_title,
.template_picturetext_slideronetext_subtitle,
.template_picturetext_slideronetext_intro{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

</style>
