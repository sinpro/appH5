<template>
    <div class="template_caption_default" ref="templatecaptiondefault" :class="containerclassname" :style="containerstyle">
        <div class="template_caption_left" :style="containerleftstyle">
            <div class="template_caption_line" v-if="bCaptureLine" :style="captionlinestyle"></div>
        </div>
        <div class="template_caption_middle">
            <div class="template_caption_logo" v-if="bLogo" :style="captionlogostyle">
                <imageview class="template_caption_logoimg" :src="captionlogo"></imageview>
            </div>
            <div class="template_caption_title" v-if="bTitle" :style="titlestyle">{{leftCaptionInfo.title}}</div>
            <div class="template_caption_subtitle" v-if="bSubTitle" :style="subtitlestyle">{{leftCaptionInfo.instructions}}</div>
        </div>
        <div class="template_caption_right" @click="$emit('mClick', rightCaptionInfo)">
            <div class="template_caption_more" v-if="bMore" :style="captionmorestyle">{{captionmore}}</div>
            <div class="template_caption_arrow" v-if="bArrow" :style="captionarrowstyle"></div>
            <div :style="containerleftstyle"></div>
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
            containerclassname: {},
            containerstyle: {
                height: 'auto',
                lineHeight: 'auto',
                fontSize: '14px',
                borderBottom: 'none'
            },
            containerleftstyle: {
                width: '16px'
            },
            titlestyle: {
                fontSize: '18px'
            },
            captionlinestyle: {
                height: '10px',
                marginTop: '-5px',
                borderColor: '#3671FF'
            },
            subtitlestyle: {
                fontSize: '12px',
                lineHeight: 'auto',
                marginLeft: '6px'
            },
            captionlogostyle: {
                width: '24px',
                height: '24px',
                marginRight: '12px'
            },
            captionmorestyle: {
                width: '28px',
                color: 'none'
            },
            captionarrowstyle: {
                width: '24px'
            },
            captionlogo: '',
            captionmore: '更多',
            bCaptureLine: false,
            bTitle: false,
            bSubTitle: false,
            bLogo: false,
            bArrow: false,
            bMore: false,
            leftCaptionInfo: {},
            rightCaptionInfo: {}
        }
    },

    created () {
        this.calcData()
    },

    mounted () {
        this.calcRect()
    },

    methods: {

        calcData () {
            let textList = this.options.styleInfoList || []

            this.leftCaptionInfo = {}
            this.rightCaptionInfo = {}
            
            textList.forEach((obj) => {
                if(obj.ordernNum == '3'){
                    this.leftCaptionInfo = obj
                }else if(obj.ordernNum == '4'){
                    this.rightCaptionInfo = obj
                }
            })
        },

        calcRect () {
            let template_height
            let px28 = this.calcpxbyelem(this.$refs.templatecaptiondefault, 375, 28)
            let px24 = this.calcpxbyelem(this.$refs.templatecaptiondefault, 375, 24)
            let px16 = this.calcpxbyelem(this.$refs.templatecaptiondefault, 375, 16)

            this.captionlogostyle.width =  px24 + 'px'
            this.captionlogostyle.height = this.captionlogostyle.width
            // this.captionlogostyle.marginTop = '-' + px24/2 + 'px'
            this.captionlogostyle.marginRight = px24/2 + 'px'

            this.titlestyle.fontSize = this.calcpxbyelem(this.$refs.templatecaptiondefault, 375, 18)  + 'px'

            //分割线控制
            if(this.options.isShowLine == '1'){
                let divstyle = 'solid'
                let divcolor = this.options.divlineColor || '#ddd'
                //分割线类别 0-实线，1-虚线
                if(this.options.divlineType == '1'){
                    divstyle = 'dashed'
                }
                //分割线控制
                this.containerstyle.borderBottom = `1px ${divstyle} ${divcolor}`
            }

            //说明文字
            if(this.options.instructions){
                this.bSubTitle = true
            }

            //左边控制
            switch(this.leftCaptionInfo.contentType){
                case '0':
                    //无
                    break
                case '1':
                    this.bCaptureLine = true
                    //色块
                    this.captionlinestyle.borderColor = this.leftCaptionInfo.color
                    break
                case '3':
                    //logo图标
                    this.bLogo = true
                    this.captionlogo = this.leftCaptionInfo.picUrl
                    break
            }

            //右边控制
            switch(this.rightCaptionInfo.contentType){
                case '0':
                    //无
                    break
                case '2':
                    //箭头
                    this.bArrow = true
                    break
                case '4':
                    //文本
                    this.bMore = true

                    //文本内容
                    if(this.rightCaptionInfo.content){
                        this.captionmore = this.rightCaptionInfo.content
                    }

                    //文本颜色
                    if(this.rightCaptionInfo.color){
                        this.captionmorestyle.color = this.rightCaptionInfo.color
                    }
                    break
            }

            this.bTitle = true
            switch(this.properties.style){
                case 'style1':
                    this.captionlogostyle.width =  px16 + 'px'
                    this.captionlogostyle.height = this.captionlogostyle.width
                    this.captionlogostyle.marginRight = px16/2 + 'px'

                    this.titlestyle.fontSize = this.calcpxbyelem(this.$refs.templatecaptiondefault, 375, 12)  + 'px'
                    template_height = this.calcpxbyelem(this.$refs.templatecaptiondefault, 375, 32)
                    break
                case 'style2':
                    template_height = this.calcpxbyelem(this.$refs.templatecaptiondefault, 375, 48)
                    break
                default:
                    template_height = this.calcpxbyelem(this.$refs.templatecaptiondefault, 375, 48)
                    break
            }

            
            this.containerclassname['template_caption_default_style_' + this.properties.style] = true
            this.containerstyle.height = template_height + 'px'
            this.containerstyle.lineHeight = this.containerstyle.height
            this.containerstyle.fontSize = this.calcpxbyelem(this.$refs.templatecaptiondefault, 375, 14)  + 'px'
            
            this.containerleftstyle.width = px16 + 'px'
            
            this.captionlinestyle.height = this.calcpx(template_height, 48, 20) + 'px'
            this.captionlinestyle.marginTop = '-' + this.calcpx(template_height, 48, 20)/2 + 'px'

            this.subtitlestyle.fontSize = this.calcpxbyelem(this.$refs.templatecaptiondefault, 375, 12)  + 'px'
            this.subtitlestyle.lineHeight = (template_height + 2) + 'px'
            this.subtitlestyle.marginLeft = this.calcpxbyelem(this.$refs.templatecaptiondefault, 375, 6)/2 + 'px'
            
            this.captionmorestyle.width = (px28 + 1) + 'px'
            this.captionarrowstyle.width = px24 + 'px'
        }
    }

}
</script>
<style scoped>

    .template_caption_default{
        width: 100%;
        text-overflow: ellipsis;
        display: flex;
        background-color: #FFFFFF;
    }

    .template_caption_default .template_caption_left{
        position: relative;
        width: 5%;
    }

    .template_caption_default .template_caption_middle{
        width: 100%;
        display: flex;
        align-items: center;
    }

    .template_caption_default .template_caption_right{
        display: flex;
        align-items: center;
    }

    .template_caption_default .template_caption_line{
        position: absolute;
        left: 0;
        top: 50%;
        width: 0;
        border: 1px solid #3671FF;
    }

    .template_caption_default .template_caption_title{
        color: #323C41;
        letter-spacing: 0;
        font-weight: bold;
    }

    .template_caption_default_style_style1 .template_caption_title{
        color: #323C41;
        letter-spacing: 0;
        font-weight: normal;
    }

    .template_caption_default .template_caption_subtitle{
        color: #A2A4A6;
        letter-spacing: 0;
    }

    .template_caption_default .template_caption_more{
        height: 100%;
    }

    .template_caption_arrow{
        flex-shrink: 0;
        text-align: right;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .template_caption_arrow:after,.template_caption_arrow:before {
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-left-color: #999999;
        content: "";
        margin-right: 0;
        content: "";
        position: relative;
    }

   .template_caption_arrow:before{
        right: -10px;
        border-left-color: white;
        z-index: 2;
    }

    .template_caption_default .template_caption_logo{
        line-height: 0;
    }

    .template_caption_default .template_caption_logo .template_caption_logoimg{
        width: 100%;
        height: 100%;
    }

</style>
