<template>
    <div class="template_image_simplethree" ref="templateimagesimplethree">
        <div class="template_image_simplethree_container" :style="containerStyle">
            <imageview class="template_image_simplethree_img" :style="imgStyle"
                :src="(options.styleInfoList[0] || {}).picUrl"
                @click="$emit('mClick', options.styleInfoList[0])"></imageview>
            <div v-if="bPlaceholder" class="template_image_simplethree_placeholder" :style="placeholderStyle"></div>
            <imageview class="template_image_simplethree_img" :style="imgStyle"
                :src="(options.styleInfoList[1] || {}).picUrl"
                @click="$emit('mClick', options.styleInfoList[1])"></imageview>
            <div v-if="bPlaceholder" class="template_image_simplethree_placeholder" :style="placeholderStyle"></div>
            <imageview class="template_image_simplethree_img" :style="imgStyle"
                :src="(options.styleInfoList[2] || {}).picUrl"
                @click="$emit('mClick', options.styleInfoList[2])"></imageview>
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
        let ratiox, ratioy, width = '33.33333%', height = 'auto'
        let tempWidth, tempWidth2

        if(this.options.isCustomized == '1'){
            //自定义高度
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

            tempWidth = this.calcpxbyelem(this.$refs.templateimagesimplethree, 375, 104) 
            width = tempWidth  + 'px'
            //比例计算
            height = this.calcpx(tempWidth, ratiox, ratioy) + 'px'
            tempWidth2 = this.calcpxbyelem(this.$refs.templateimagesimplethree, 375, 16)
            this.placeholderStyle.width = tempWidth2 + 'px'
            this.containerStyle.width = (tempWidth2*2 + tempWidth*3) + 'px'
        }else{
            //无间距
            tempWidth = this.calcpxbyelem(this.$refs.templateimagesimplethree, 3, 1)
            //比例计算
            height = this.calcpx(tempWidth, ratiox, ratioy) + 'px'
        }

        this.imgStyle.width = width
        this.imgStyle.height = height

        //上下边距控制
        this.containerStyle.marginTop = this.calcpxbyelem(this.$refs.templateimagesimplethree, 375, this.options.topMargin || 0)  + 'px'
        this.containerStyle.marginBottom = this.calcpxbyelem(this.$refs.templateimagesimplethree, 375, this.options.bottomMargin || 0) + 'px'
    }
}
</script>
<style scoped>

.template_image_simplethree{
    width: 100%;
    margin: 0 auto;
    display: flex;
}

.template_image_simplethree_placeholder{
    height: 100%;
}

.template_image_simplethree_container{
    display: flex;
    margin: 0 auto;
}

</style>
