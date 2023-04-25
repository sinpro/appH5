<template>
    <div class="template_caption_imagetext" ref="templatecaptionimagetext" :style="containerstyle"
        @click="$emit('mClick', options.styleInfoList[0])">
        <imageview class="template_caption_imagetext_image" :src="imgsrc"></imageview>
        <div class="template_caption_imagetext_text">
            <div class="template_caption_imagetext_title" :style="titleStyle">{{options.title}}</div>
            <div class="template_caption_imagetext_subtitle" :style="subtitleStyle">{{options.instructions}}</div>
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
            containerstyle: {
                height: 'auto',
            },
            titleStyle: {
                fontSize: '17.28px',
                color: '#FFFFFF'
            },
            subtitleStyle: {
                fontSize: '11.25px',
                color: '#FFFFFF'
            },
            imgsrc: ''
        }
    },

    created () {
        this.imgsrc = (this.options.styleInfoList[0] || {}).picUrl
    },

    mounted () {
        this.calcRect()
    },

    methods: {
        calcRect () {
            let ratiox, ratioy
            let template_height

            if(this.options.isCustomized == '1'){
                //自定义
                ratiox = 375
                ratioy = this.options.picHeight
            }else{
                let ratio = this.calcRatio(this.options.aspectRatio)
                ratiox = ratio.ratiox
                ratioy = ratio.ratioy
            }

            template_height = this.calcpxbyelem(this.$refs.templatecaptionimagetext, ratiox, ratioy)

            this.containerstyle.height = template_height + 'px'

            this.titleStyle.fontSize = this.calcpxbyelem(this.$refs.templatecaptionimagetext, 375, 17.28)
            this.options.titleColor && (this.titleStyle.color = this.options.titleColor)
            this.subtitleStyle.fontSize = this.calcpxbyelem(this.$refs.templatecaptionimagetext, 375, 11.25)
            this.options.subtitleColor && (this.subtitleStyle.color = this.options.subtitleColor)
        }
    }

}
</script>
<style scoped>

    .template_caption_imagetext{
        width: 100%;
        position: relative;
    }
    
    .template_caption_imagetext .template_caption_imagetext_image{
        width: 100%;
        height: 100%;
    }

    .template_caption_imagetext .template_caption_imagetext_text{
        position: absolute;
        width: 100%;
        top: 50%;
        text-align: center;
        transform: translate(0, -50%);
    }

    .template_caption_imagetext .template_caption_imagetext_text .template_caption_imagetext_title,
    .template_caption_imagetext .template_caption_imagetext_text .template_caption_imagetext_subtitle{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_caption_imagetext .template_caption_imagetext_text .template_caption_imagetext_subtitle{
        opacity: 0.5;
    }

</style>
