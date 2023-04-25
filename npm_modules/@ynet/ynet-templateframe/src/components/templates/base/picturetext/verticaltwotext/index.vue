<template>
    <div class="template_picturetext_verticaltwotext" ref="templatepicturetextverticaltwotext">
        <div class="template_picturetext_verticaltwotext_container" :style="containerStyle">
            <div class="template_picturetext_verticaltwotext_left" :style="blockStyle"
                @click="$emit('mClick', options.styleInfoList[0])">
                <imageview :style="imgStyle" :src="(options.styleInfoList[0] || {}).picUrl"/>
                <div>
                    <div class="template_picturetext_verticaltwotext_title" :style="titleStyle">{{(options.styleInfoList[0] || {}).title}}</div>
                    <div class="template_picturetext_verticaltwotext_subtitle" :style="subtitleStyle">{{(options.styleInfoList[0] || {}).subTitle}}</div>
                </div>
            </div>
            <div class="template_picturetext_verticaltwotext_placeholder" :style="placeholderStyle"/>
            <div class="template_picturetext_verticaltwotext_right" :style="blockStyle"
                @click="$emit('mClick', options.styleInfoList[1])">
                <imageview :style="imgStyle" :src="(options.styleInfoList[1] || {}).picUrl"/>
                <div>
                    <div class="template_picturetext_verticaltwotext_title" :style="titleStyle">{{(options.styleInfoList[1] || {}).title}}</div>
                    <div class="template_picturetext_verticaltwotext_subtitle" :style="subtitleStyle">{{(options.styleInfoList[1] || {}).subTitle}}</div>
                </div>
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
            containerStyle: {
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
    },

    methods: {
        calcRect () {
            let ratiox, ratioy
            let imgWidth = this.calcpxbyelem(this.$refs.templatepicturetextverticaltwotext, 375, 164)
            this.imgStyle.width = imgWidth + 'px'
            this.imgStyle.marginBottom = this.calcpxbyelem(this.$refs.templatepicturetextverticaltwotext, 375, 8) + 'px'
            this.placeholderStyle.width = this.calcpxbyelem(this.$refs.templatepicturetextverticaltwotext, 375, 16) + 'px'
            
            if(this.options.isCustomized == '1'){
                //自定义
                ratiox = 164
                ratioy = this.options.picHeight
            }else{
                let ratio = this.calcRatio(this.options.aspectRatio)
                ratiox = ratio.ratiox
                ratioy = ratio.ratioy
            }

            this.imgStyle.height = this.calcpx(imgWidth, ratiox, ratioy) + 'px'

            this.containerStyle.marginTop = this.calcpxbyelem(this.$refs.templatepicturetextverticaltwotext, 375, this.options.topMargin || 0)  + 'px'
            this.containerStyle.marginBottom = this.calcpxbyelem(this.$refs.templatepicturetextverticaltwotext, 375, this.options.bottomMargin || 0)  + 'px'

            this.blockStyle.width = this.imgStyle.width

            this.titleStyle.fontSize = this.calcpxbyelem(this.$refs.templatepicturetextverticaltwotext, 375, 16) + 'px'
            this.subtitleStyle.fontSize = this.calcpxbyelem(this.$refs.templatepicturetextverticaltwotext, 375, 14) + 'px'
        }
    }
}
</script>
<style scoped>

.template_picturetext_verticaltwotext{
    width: 100%;
    display: flex;
    text-align: left;
}

.template_picturetext_verticaltwotext_container{
    margin: 0 auto;
    display: flex;
}

.template_picturetext_verticaltwotext_title{
    color: #323C41;
    letter-spacing: 0;
    font-weight: bold;
}

.template_picturetext_verticaltwotext_subtitle{
    color: #666666;
    letter-spacing: 0;
}

.template_picturetext_verticaltwotext_title,
.template_picturetext_verticaltwotext_subtitle{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.template_picturetext_verticaltwotext_placeholder {
    height: 100%;
}

.template_picturetext_verticaltwotext_left,
.template_picturetext_verticaltwotext_right{
    font-size: 0;
}

</style>
