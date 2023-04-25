<template>
    <div class="template_image_simpletwo" ref="templateimagesimpletwo">
        <div class="template_image_simpletwo_container" :style="containerStyle">
            <imageview class="template_image_simpletwo_img" :style="imgStyle" 
                :src="(options.styleInfoList[0] || {}).picUrl"
                @click="$emit('mClick', options.styleInfoList[0])"></imageview>
            <div v-if="bPlaceholder" class="template_image_simpletwo_placeholder" :style="placeholderStyle"></div>
            <imageview class="template_image_simpletwo_img" :style="imgStyle" 
                :src="(options.styleInfoList[1] || {}).picUrl"
                @click="$emit('mClick', options.styleInfoList[1])"></imageview>
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
                width: '100%',
                marginTop: '0',
                marginBottom: '0'
            },
            placeholderStyle: {
                width: '0'
            },
            imgStyle: {
                width: 'auto',
                height: 'auto'
            },
            bPlaceholder: false
        }
    },

    mounted () {
        this.calcRect()
    },

    methods: {
        calcRect () {
            let ratiox, ratioy, width = '50%', height = 'auto'
            let tempWidth, tempWidth2

            if(this.options.isCustomized == '1'){
                //自定义
                ratiox = 375
                ratioy = this.options.picHeight
            }else{
                let ratio = this.calcRatio(this.options.aspectRatio)
                ratiox = ratio.ratiox
                ratioy = ratio.ratioy
            }
            
            if(this.options.isGap == '1'){
                //有间距
                this.bPlaceholder = true
                tempWidth = this.calcpxbyelem(this.$refs.templateimagesimpletwo, 375, 164) 
                width = tempWidth  + 'px'
                height = this.calcpx(tempWidth, ratiox, ratioy) + 'px'
                tempWidth2 = this.calcpxbyelem(this.$refs.templateimagesimpletwo, 375, 16)
                this.placeholderStyle.width = tempWidth2 + 'px'
                this.containerStyle.width = (tempWidth2 + tempWidth*2) + 'px'
            }else{
                //无间距
                tempWidth = this.calcpxbyelem(this.$refs.templateimagesimpletwo, 2, 1)
                height = this.calcpx(tempWidth, ratiox, ratioy) + 'px'
            }

            this.imgStyle.width = width
            this.imgStyle.height = height

            //上下边距控制
            this.containerStyle.marginTop = this.calcpxbyelem(this.$refs.templateimagesimpletwo, 375, this.options.topMargin || 0)  + 'px'
            this.containerStyle.marginBottom = this.calcpxbyelem(this.$refs.templateimagesimpletwo, 375, this.options.bottomMargin || 0) + 'px'
        }
    }
}
</script>
<style scoped>

.template_image_simpletwo{
    width: 100%;
    margin: 0 auto;
    display: flex;
}

.template_image_simpletwo_placeholder{
    height: 100%;
}

.template_image_simpletwo_container{
    display: flex;
    margin: 0 auto;
}

</style>
