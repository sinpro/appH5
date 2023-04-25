<template>
    <div class="template_picturetext_sliderverticaltext" ref="templatepicturetextsliderverticaltext" :class="sliderClassName">
        <ul class="template_picturetext_sliderverticaltext_slider_container" :style="slidercontainerStyle">
            <li class="template_picturetext_sliderverticaltext_slider_item" v-for="(itemInfo, index) in (options.styleInfoList || [])" :key="index">
                <div class="template_picturetext_sliderverticaltext_container">
                    <div class="template_picturetext_sliderverticaltext_placeholder" :style="placeholderStyle"/>
                    <div class="template_picturetext_sliderverticaltext_item" :style="blockStyle"
                        @click="$emit('mClick', itemInfo)">
                        <imageview :style="imgStyle" :src="itemInfo.picUrl"/>
                        <div>
                            <div class="template_picturetext_sliderverticaltext_title" :style="titleStyle">{{itemInfo.title}}</div>
                            <div class="template_picturetext_sliderverticaltext_subtitle" :style="subtitleStyle">{{itemInfo.subTitle}}</div>
                        </div>
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
            sliderClassName: {

            },
            slidercontainerStyle: {
                width: 'auto',
                marginTop : '0',
                marginBottom : '0'
            },
            blockStyle: {
                width: 'auto'
            },
            placeholderStyle: {
                width: 'auto'
            },
            imgStyle: {
                width: 'auto',
                height: 'auto',
                marginBottom: '0'
            },
            titleStyle: {
                fontSize: '16px'
            },
            subtitleStyle: {
                fontSize: '16px',
                width: 'auto'
            }
        }
    },

    created () {
         
    },

    mounted () {
        this.calcRect()
        this.$nextTick(() => {
            if(!this.picScroll){
                this.picScroll = new Bscroll(this.$refs.templatepicturetextsliderverticaltext,{
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
            this.imgStyle.marginBottom = this.calcpxbyelem(this.$refs.templatepicturetextsliderverticaltext, 375, 8) + 'px'
            let placeholderWidth = this.calcpxbyelem(this.$refs.templatepicturetextsliderverticaltext, 375, 16)
            this.placeholderStyle.width = placeholderWidth + 'px'
            
            let imgWidth 

            if(this.options.isCustomized == '1'){
                //自定义
                switch(this.properties.style){
                    case 'style1':
                        ratiox = 300
                        break
                    case 'style2':
                        ratiox = 142
                        break
                    case 'style3':
                        ratiox = 88
                        break
                }
                ratioy = this.options.picHeight
            }else{
                let ratio = this.calcRatio(this.options.aspectRatio)
                ratiox = ratio.ratiox
                ratioy = ratio.ratioy
            }

            switch(this.properties.style){
                case 'style1':
                    imgWidth = this.calcpxbyelem(this.$refs.templatepicturetextsliderverticaltext, 375, 300)
                    this.imgStyle.width = imgWidth + 'px'
                    break
                case 'style2':
                    imgWidth = this.calcpxbyelem(this.$refs.templatepicturetextsliderverticaltext, 375, 142)
                    this.imgStyle.width = imgWidth + 'px'
                    break
                case 'style3':
                    imgWidth = this.calcpxbyelem(this.$refs.templatepicturetextsliderverticaltext, 375, 88)
                    this.imgStyle.width = imgWidth + 'px'
                    break
                default:
                    imgWidth = this.calcpxbyelem(this.$refs.templatepicturetextsliderverticaltext, 375, 300)
                    this.imgStyle.width = imgWidth + 'px'
                    break
            }

            console.dir(ratiox)
            console.dir(ratioy)
            this.imgStyle.height = this.calcpx(imgWidth, ratiox, ratioy) + 'px'

            this.slidercontainerStyle.marginTop = this.calcpxbyelem(this.$refs.templatepicturetextsliderverticaltext, 375, this.options.topMargin || 0)  + 'px'
            this.slidercontainerStyle.marginBottom = this.calcpxbyelem(this.$refs.templatepicturetextsliderverticaltext, 375, this.options.bottomMargin || 0)  + 'px'

            this.blockStyle.width = this.imgStyle.width
            this.titleStyle.fontSize = this.calcpxbyelem(this.$refs.templatepicturetextsliderverticaltext, 375, 16) + 'px'
            this.subtitleStyle.fontSize = this.calcpxbyelem(this.$refs.templatepicturetextsliderverticaltext, 375, 14) + 'px'

            if((this.options.styleInfoList || []).length > 1){
                this.slidercontainerStyle.width = ((this.options.styleInfoList || []).length*(placeholderWidth + imgWidth) + placeholderWidth) + 'px'
            }

            this.sliderClassName['template_picturetext_sliderverticaltext_style_' + this.properties.style] = true
        }
    }
}
</script>
<style scoped>

.template_picturetext_sliderverticaltext{
    width: 100%;
    overflow: hidden;
    text-align: left;
}

.template_picturetext_sliderverticaltext_slider_container{
    font-size: 0;
    white-space: nowrap;
}

.template_picturetext_sliderverticaltext_slider_container:after {
    content: '';
    clear: both;
    overflow: hidden;
    height: 0;
    line-height: 0;
    display: block
}

.template_picturetext_sliderverticaltext_slider_item{
    float: left;
}




.template_picturetext_sliderverticaltext_container{
    margin: 0 auto;
    display: flex;
}

.template_picturetext_sliderverticaltext_title{
    color: #323C41;
    letter-spacing: 0;
    font-weight: bold;
}

.template_picturetext_sliderverticaltext_subtitle{
    color: #666666;
    letter-spacing: 0;
}

.template_picturetext_sliderverticaltext_style_style2 .template_picturetext_sliderverticaltext_subtitle{
    color: #A2A4A6;
}

.template_picturetext_sliderverticaltext_style_style3 .template_picturetext_sliderverticaltext_title{
    text-align: center
}

.template_picturetext_sliderverticaltext_style_style3 .template_picturetext_sliderverticaltext_subtitle{
    display: none;
}

.template_picturetext_sliderverticaltext_title,
.template_picturetext_sliderverticaltext_subtitle{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.template_picturetext_sliderverticaltext_placeholder {
    height: 100%;
}

</style>
