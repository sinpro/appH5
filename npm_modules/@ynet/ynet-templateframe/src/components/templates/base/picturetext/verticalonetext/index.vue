<template>
    <div class="template_picturetext_verticalonetext" ref="templatepicturetextverticalonetext" :style="wrapStyle">
        <div class="template_picturetext_verticalonetext_container" :style="containerStyle"
            @click="$emit('mClick', options.styleInfoList[0])">
            <imageview :style="imgStyle" :src="(options.styleInfoList[0] || {}).picUrl"/>
            <div>
                <div class="template_picturetext_verticalonetext_title" :style="titleStyle">{{(options.styleInfoList[0] || {}).title}}</div>
                <div class="template_picturetext_verticalonetext_subtitle" :style="subtitleStyle">{{(options.styleInfoList[0] || {}).subTitle}}</div>
                <div class="template_picturetext_verticalonetext_intro" :style="introStyle">{{(options.styleInfoList[0] || {}).instructions}}</div>
            </div>
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
                width: 'auto',
                marginTop: '0',
                marginBottom: '0'
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
            },
            introStyle: {
                fontSize: '12px',
                width: 'auto'
            }
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
            let imgWidth = this.calcpxbyelem(this.$refs.templatepicturetextverticalonetext, 375, 343)
            
            if(this.options.isCustomized == '1'){
                //自定义
                ratiox = 375
                ratioy = this.options.picHeight
            }else{
                let ratio = this.calcRatio(this.options.aspectRatio)
                ratiox = ratio.ratiox
                ratioy = ratio.ratioy
            }

            this.imgStyle.width = imgWidth + 'px'
            this.imgStyle.height = this.calcpx(imgWidth, ratiox, ratioy) + 'px'
            this.imgStyle.marginBottom = this.calcpxbyelem(this.$refs.templatepicturetextverticalonetext, 375, 8) + 'px'

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

            this.containerStyle.width = this.imgStyle.width

            //上下边距控制
            this.containerStyle.marginTop = this.calcpxbyelem(this.$refs.templatepicturetextverticalonetext, 375, this.options.topMargin || 0)  + 'px'
            this.containerStyle.marginBottom = this.calcpxbyelem(this.$refs.templatepicturetextverticalonetext, 375, this.options.bottomMargin || 0) + 'px'

            this.titleStyle.fontSize = this.calcpxbyelem(this.$refs.templatepicturetextverticalonetext, 375, 16) + 'px'
            this.subtitleStyle.width = this.calcpxbyelem(this.$refs.templatepicturetextverticalonetext, 375, 160) + 'px'
            this.subtitleStyle.fontSize = this.calcpxbyelem(this.$refs.templatepicturetextverticalonetext, 375, 14) + 'px'
            this.introStyle.width = this.calcpxbyelem(this.$refs.templatepicturetextverticalonetext, 375, 160) + 'px'
            this.introStyle.fontSize = this.calcpxbyelem(this.$refs.templatepicturetextverticalonetext, 375, 12) + 'px'

        }
    }
}
</script>
<style scoped>

.template_picturetext_verticalonetext{
    width: 100%;
    display: flex;
    text-align: left;
}

.template_picturetext_verticalonetext_container{
    margin: 0 auto;
    position: relative;
    font-size: 0;
}

.template_picturetext_verticalonetext_title{
    color: #323C41;
    letter-spacing: 0;
    font-weight: bold;
}

.template_picturetext_verticalonetext_subtitle{
    color: #666666;
    letter-spacing: 0;
}

.template_picturetext_verticalonetext_intro{
    color: #A2A4A6;
    letter-spacing: 0;
    position: absolute;
    bottom: 0;
    right: 0;
    text-align: right;
}

.template_picturetext_verticalonetext_title,
.template_picturetext_verticalonetext_subtitle,
.template_picturetext_verticalonetext_intro{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

</style>
