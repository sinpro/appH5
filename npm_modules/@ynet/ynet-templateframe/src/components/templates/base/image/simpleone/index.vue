<template>
    <div class="template_image_simpleone" ref="templateimagesimpleone">
        <imageview class="template_image_simpleone_img" :style="imgStyle" @click="$emit('mClick', options.styleInfoList[0])" :src="(options.styleInfoList[0] || {}).picUrl"></imageview>
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
            imgStyle: {
                width: 'auto',
                height: 'auto',
                marginTop: 0,
                marginBottom: 0
            }
        }
    },

    mounted () {
        this.calcRect()
    },

    methods: {

        calcRect () {
            let ratiox, ratioy, width = '100%', height = 'auto'
            let tempWidth

            if(this.options.isCustomized == '1'){
                //自定义
                ratiox = 375
                ratioy = this.options.picHeight
            }else{
                let ratio = this.calcRatio(this.options.aspectRatio)
                ratiox = ratio.ratiox
                ratioy = ratio.ratioy
            }

            if(this.options.isleftRight == '1'){
                //有间距
                tempWidth = this.calcpxbyelem(this.$refs.templateimagesimpleone, 375, 343) 
                width = tempWidth  + 'px'
                height = this.calcpx(tempWidth, ratiox, ratioy) + 'px'
            }else{
                //无间距
                height = this.calcpxbyelem(this.$refs.templateimagesimpleone, ratiox, ratioy)  + 'px'
            }

            this.imgStyle.width = width
            this.imgStyle.height = height

            //上下边距控制
            this.imgStyle.marginTop = this.calcpxbyelem(this.$refs.templateimagesimpleone, 375, this.options.topMargin || 0)  + 'px'
            this.imgStyle.marginBottom = this.calcpxbyelem(this.$refs.templateimagesimpleone, 375, this.options.bottomMargin || 0) + 'px'
        }
    }
}
</script>
<style scoped>

.template_image_simpleone{
    width: 100%;
    margin: 0 auto;
    font-size: 0;
    display: flex;
}

.template_image_simpleone_img{
    width: 100%;
    margin: 0 auto;
}

</style>
