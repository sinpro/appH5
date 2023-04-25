<template>
    <div class="template_picturetext_lineonecombine" ref="templatepicturetextlineonecombine">
        <div class="template_picturetext_lineonecombine_wrap">
            <div class="template_picturetext_lineonecombine_container" :style="containerStyle"
                @click="$emit('mClick', options.styleInfoList[0])">
                <div class="template_picturetext_lineonecombine_picture">
                    <imageview class="template_picturetext_lineonecombine_pictureimg" :style="imgStyle" :src="(options.styleInfoList[0] || {}).picUrl"/>
                </div>
                <div class="template_picturetext_lineonecombine_placeholder" :style="placeholderStyle"></div>
                <div class="template_picturetext_lineonecombine_text" :style="textStyle">
                    <div class="template_picturetext_lineonecombine_title_con">
                        <div class="template_picturetext_lineonecombine_title" :style="titleStyle">{{(options.styleInfoList[0] || {}).title}}</div>
                        <div class="template_picturetext_lineonecombine_subtitle" :style="subtitleStyle">{{(options.styleInfoList[0] || {}).subTitle}}</div>
                    </div>
                    <div class="template_picturetext_lineonecombine_placeholder" :style="placeholderStyle"></div>
                    <div class="template_picturetext_lineonecombine_btnicon_con" v-if="(options.styleInfoList[0] || {}).picUrl2">
                        <imageview class="template_picturetext_lineonecombine_btnicon" :src="(options.styleInfoList[0] || {}).picUrl2" :style="buttonImgStyle"/>
                    </div>
                </div>
            </div>
            <div class="template_picturetext_lineonecombine_line" :style="lineStyle"></div>  
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
            lineStyle: {
                borderBottom: 'none'
            },
            containerStyle: {
                marginTop: '8px',
                marginBottom: '8px',
                width: '100%',
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
            buttonImgStyle: {
                width: '0',
                height: '0'
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
            this.placeholderStyle.width = this.calcpxbyelem(this.$refs.templatepicturetextlineonecombine, 375, 16) + 'px'
            this.titleStyle.fontSize = this.calcpxbyelem(this.$refs.templatepicturetextlineonecombine, 375, 16) + 'px'
            this.subtitleStyle.fontSize = this.calcpxbyelem(this.$refs.templatepicturetextlineonecombine, 375, 14) + 'px'
            
            this.buttonImgStyle.width = this.calcpxbyelem(this.$refs.templatepicturetextlineonecombine, 375, 68) + 'px'
            this.buttonImgStyle.height = this.calcpxbyelem(this.$refs.templatepicturetextlineonecombine, 375, 28) + 'px'

            let tempWidth, tempWidth2 
            tempWidth = this.calcpxbyelem(this.$refs.templatepicturetextlineonecombine, 375, 80)
            tempWidth2 = this.calcpxbyelem(this.$refs.templatepicturetextlineonecombine, 375, 247)

            this.imgStyle.width = tempWidth + 'px'
            this.imgStyle.height = tempWidth + 'px'

            this.textStyle.width = tempWidth2 + 'px'

            //分割线控制
            if(this.options.isShowLine == '1'){
                let divstyle = 'solid'
                let divcolor = this.options.divlineColor || '#ddd'
                //分割线类别 0-实线，1-虚线
                if(this.options.divlineType == '1'){
                    divstyle = 'dashed'
                }
                //分割线控制
                this.lineStyle.borderBottom = `1px ${divstyle} ${divcolor}`
            }


            this.containerStyle.width = this.calcpxbyelem(this.$refs.templatepicturetextlineonecombine, 375, 343) + 'px'
            this.containerStyle.height = this.imgStyle.height
            //上下边距控制
            this.containerStyle.marginTop = this.calcpxbyelem(this.$refs.templatepicturetextlineonecombine, 375, this.options.topMargin || 0)  + 'px'
            this.containerStyle.marginBottom = this.calcpxbyelem(this.$refs.templatepicturetextlineonecombine, 375, this.options.bottomMargin || 0) + 'px'
        }
    }
}
</script>
<style scoped>

.template_picturetext_lineonecombine{
    width: 100%;
    display: flex;
}

.template_picturetext_lineonecombine_wrap{
    margin: 0 auto;
}

.template_picturetext_lineonecombine_container{
    width: 100%;
    display: flex;
    margin: 0 auto;
}

.template_picturetext_lineonecombine_line{
    transform: scaleY(0.25);
}

.template_picturetext_lineonecombine_text{
    position: relative;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: flex-start;
}

.template_picturetext_lineonecombine_title_con{
    width: 100%;
    flex: 1;
}

.template_picturetext_lineonecombine_picture .template_picturetext_lineonecombine_pictureimg{
    width: 100%;
    height: 100%;
}

.template_picturetext_lineonecombine_placeholder {
    height: 100%;
}

.template_picturetext_lineonecombine_title{
    color: #323C41;
    letter-spacing: 0;
    font-weight: bold;
}

.template_picturetext_lineonecombine_subtitle{
    color: #666666;
    letter-spacing: 0;
}

.template_picturetext_lineonecombine_intro{
    color: #A2A4A6;
    letter-spacing: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
}

.template_picturetext_lineonecombine_title,
.template_picturetext_lineonecombine_subtitle,
.template_picturetext_lineonecombine_intro{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

</style>
