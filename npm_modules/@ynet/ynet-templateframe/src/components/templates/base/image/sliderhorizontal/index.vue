<template>
    <div class="template_image_sliderhorizontal" ref="templateimagesliderhorizontal">
        <ul class="template_image_sliderhorizontal_slider_container" :style="slidercontainerStyle">
            <li class="template_image_sliderhorizontal_slider_item" v-for="(itemInfo, index) in (options.styleInfoList || [])" :key="index">
                <div class="template_image_sliderhorizontal_container" :style="containerStyle">
                    <div class="template_image_sliderhorizontal_placeholder" :style="placeholderStyle"></div>
                    <imageview :style="imgStyle" :src="itemInfo.picUrl"
                        @click="$emit('mClick', itemInfo)"></imageview>
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
            slidercontainerStyle: {
                width: 'auto'
            },
            containerStyle: {
                marginTop: '8px',
                marginBottom: '8px'
            },
            placeholderStyle: {
                width: 'auto'
            },
            imgStyle: {
                width: 'auto',
                height: 'auto'
            }
        }
    },

    created () {
         
    },

    mounted () {
        this.calcRect()
        this.$nextTick(() => {
            if(!this.picScroll){
                this.picScroll = new Bscroll(this.$refs.templateimagesliderhorizontal,{
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
            let placeholderWidth = this.calcpxbyelem(this.$refs.templateimagesliderhorizontal, 375, 16)
            this.placeholderStyle.width = placeholderWidth + 'px'

            let pxImgWidth, pxImgHeight

            if(this.options.isCustomized == '1'){
                //自定义
                ratiox = 375
                ratioy = this.options.picHeight
            }else{
                let ratio = this.calcRatio(this.options.aspectRatio)
                ratiox = ratio.ratiox
                ratioy = ratio.ratioy
            }

            switch (this.properties.style) {
                case 'style1':
                    pxImgWidth = this.calcpxbyelem(this.$refs.templateimagesliderhorizontal, 375, 300)
                    pxImgHeight = this.calcpx(pxImgWidth, ratiox, ratioy)
                    break
                case 'style2':
                    pxImgWidth = this.calcpxbyelem(this.$refs.templateimagesliderhorizontal, 375, 142)
                    pxImgHeight = this.calcpx(pxImgWidth, ratiox, ratioy)
                    break
                default:
                    pxImgWidth = this.calcpxbyelem(this.$refs.templateimagesliderhorizontal, 375, 300)
                    pxImgHeight = this.calcpx(pxImgWidth, ratiox, ratioy)
                    break
            }

            this.imgStyle.width = pxImgWidth + 'px'
            this.imgStyle.height = pxImgHeight + 'px'

            //上下边距控制
            this.containerStyle.marginTop = this.calcpxbyelem(this.$refs.templateimagesliderhorizontal, 375, this.options.topMargin || 0)  + 'px'
            this.containerStyle.marginBottom = this.calcpxbyelem(this.$refs.templateimagesliderhorizontal, 375, this.options.bottomMargin || 0) + 'px'

            if((this.options.styleInfoList || []).length > 1){
                this.slidercontainerStyle.width = ((this.options.styleInfoList || []).length*(placeholderWidth + pxImgWidth) + placeholderWidth) + 'px'
            }
        }
    }
}
</script>
<style scoped>

.template_image_sliderhorizontal{
    width: 100%;
    overflow: hidden;
}

.template_image_sliderhorizontal_slider_container{
    font-size: 0;
    white-space: nowrap;
    display: flex;
}

.template_image_sliderhorizontal_slider_item{
    flex-shrink: 0;
    flex-grow: 0;
}

.template_image_sliderhorizontal_container{
    width: 100%;
    display: flex;
}

.template_image_sliderhorizontal_placeholder {
    height: 100%;
}

</style>
