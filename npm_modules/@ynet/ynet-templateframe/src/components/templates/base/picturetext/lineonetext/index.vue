<template>
    <div class="template_picturetext_lineonetext" ref="templatepicturetextlineonetext" :style="wrapStyle">
        <div class="template_picturetext_lineonetext_container" :style="containerStyle"
            @click="$emit('mClick', options.styleInfoList[0])">
            <div v-if="bleft" class="template_picturetext_lineonetext_placeholder" :style="placeholderStyle"></div>
            <div v-if="bleft" class="template_picturetext_lineonetext_picture">
                <imageview class="template_picturetext_lineonetext_pictureimg" :style="imgStyle" :src="(options.styleInfoList[0] || {}).picUrl"/>
            </div>
            <div class="template_picturetext_lineonetext_placeholder" :style="placeholderStyle"></div>
            <div class="template_picturetext_lineonetext_text" :style="textStyle">
                <div class="template_picturetext_lineonetext_title" :style="titleStyle">{{(options.styleInfoList[0] || {}).title}}</div>
                <div class="template_picturetext_lineonetext_subtitle" :style="subtitleStyle">{{(options.styleInfoList[0] || {}).subTitle}}</div>
                <div class="template_picturetext_lineonetext_intro" :style="introStyle">{{(options.styleInfoList[0] || {}).instructions}}</div>   
            </div>
            <div v-if="!bleft" class="template_picturetext_lineonetext_placeholder" :style="placeholderStyle"></div>
            <div v-if="!bleft" class="template_picturetext_lineonetext_picture">
                <imageview class="template_picturetext_lineonetext_pictureimg" :style="imgStyle" :src="(options.styleInfoList[0] || {}).picUrl"/>
            </div>
            <div class="template_picturetext_lineonetext_placeholder" :style="placeholderStyle"></div>
        </div>      
    </div>
</template>
<script>
import props from '../../../props'
import mixins from '../../../mixins'

export default {
    mixins,
    props,

    data () {
        return {
            wrapStyle: {
                borderBottom: 'none'
            },
            containerStyle: {
                marginTop: '8px',
                marginBottom: '8px',
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
            },
            bleft: true
        }
    },

    created () {
         
    },

    mounted () {
        this.calcRect()
    },

    methods: {
        calcRect () {
            let ratiox, ratioy

            this.placeholderStyle.width = this.calcpxbyelem(this.$refs.templatepicturetextlineonetext, 375, 16) + 'px'
            this.titleStyle.fontSize = this.calcpxbyelem(this.$refs.templatepicturetextlineonetext, 375, 16) + 'px'
            this.subtitleStyle.fontSize = this.calcpxbyelem(this.$refs.templatepicturetextlineonetext, 375, 14) + 'px'
            this.introStyle.fontSize = this.calcpxbyelem(this.$refs.templatepicturetextlineonetext, 375, 12) + 'px'

            if(this.options.isCustomized == '1'){
                //自定义
                ratiox = 104
                ratioy = this.options.picHeight
            }else{
                let ratio = this.calcRatio(this.options.aspectRatio)
                ratiox = ratio.ratiox
                ratioy = ratio.ratioy
            }

            let tempWidth, tempWidth2 
            if(ratiox == '1' && ratioy == '1'){
                tempWidth = this.calcpxbyelem(this.$refs.templatepicturetextlineonetext, 375, 80)
                tempWidth2 = this.calcpxbyelem(this.$refs.templatepicturetextlineonetext, 375, 247)
            }else{
                tempWidth = this.calcpxbyelem(this.$refs.templatepicturetextlineonetext, 375, 104)
                tempWidth2 = this.calcpxbyelem(this.$refs.templatepicturetextlineonetext, 375, 223)
            }
            console.info(tempWidth)
            console.info(ratiox,ratioy)
            this.imgStyle.width = tempWidth + 'px'
            this.imgStyle.height = this.calcpx(tempWidth, ratiox, ratioy) + 'px'
            console.info(this.imgStyle.height)
            this.textStyle.width = tempWidth2 + 'px'

            this.bleft = true
            //图片位置 0-左  1-右
            if(this.options.picPositionType == '1'){
                this.bleft = false
            }

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
            this.containerStyle.marginTop = this.calcpxbyelem(this.$refs.templatepicturetextlineonetext, 375, this.options.topMargin || 0)  + 'px'
            this.containerStyle.marginBottom = this.calcpxbyelem(this.$refs.templatepicturetextlineonetext, 375, this.options.bottomMargin || 0) + 'px'
        }
    }
}
</script>
<style scoped>

.template_picturetext_lineonetext{
    width: 100%;
    display: flex;
}

.template_picturetext_lineonetext_container{
    width: 100%;
    display: flex;
}

.template_picturetext_lineonetext_text{
    position: relative;
    text-align: left;
}

.template_picturetext_lineonetext_picture .template_picturetext_lineonetext_pictureimg{
    width: 100%;
    height: 100%;
}

.template_picturetext_lineonetext_placeholder {
    height: 100%;
}

.template_picturetext_lineonetext_title{
    color: #323C41;
    letter-spacing: 0;
    font-weight: bold;
}

.template_picturetext_lineonetext_subtitle{
    color: #666666;
    letter-spacing: 0;
}

.template_picturetext_lineonetext_intro{
    color: #A2A4A6;
    letter-spacing: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
}

.template_picturetext_lineonetext_title,
.template_picturetext_lineonetext_subtitle,
.template_picturetext_lineonetext_intro{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

</style>
