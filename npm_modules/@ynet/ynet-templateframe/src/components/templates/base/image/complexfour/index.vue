<template>
    <div class="template_image_complexfour" ref="templateimagecomplexfour">
        <div class="template_image_complexfour_container" :style="containerStyle">
            <div class="template_image_complexfour_block">
                <imageview class="template_image_complexfour_img" :style="imgStyle1" 
                    :src="(options.styleInfoList[0] || {}).picUrl"
                    @click="$emit('mClick', options.styleInfoList[0])"></imageview>
            </div>
            <div class="template_image_complexfour_block template_image_complexfour_block2" :style="block2Style">
                <div class="template_image_complexfour_rect">
                    <imageview class="template_image_complexfour_img" :style="imgStyle2" 
                        :src="(options.styleInfoList[1] || {}).picUrl"
                        @click="$emit('mClick', options.styleInfoList[1])"></imageview>
                </div>
                <div class="template_image_complexfour_rect template_image_complexfour_rect2">
                    <imageview class="template_image_complexfour_img" :style="imgStyle3" 
                        :src="(options.styleInfoList[2] || {}).picUrl"
                        @click="$emit('mClick', options.styleInfoList[2])"></imageview>
                    <imageview class="template_image_complexfour_img" :style="imgStyle4"
                        :src="(options.styleInfoList[3] || {}).picUrl"
                        @click="$emit('mClick', options.styleInfoList[3])"></imageview>
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
                marginTop: '0',
                marginBottom: '0'
            },
            block2Style: {
                marginLeft: '0'
            },
            imgStyle1: {
                width: '100%',
                height: 'auto'
            },
            imgStyle2: {
                width: '100%',
                height: 'auto',
                marginBottom: '0'
            },
            imgStyle3: {
                width: '50%',
                height: 'auto'
            },
            imgStyle4: {
                width: '50%',
                height: 'auto',
                marginLeft: '0'
            }
        }
    },

    mounted () {
        let width = 'auto', height = 'auto'
        let tempHeight, tempHeight2

        if(this.options.isGap == '1'){
            tempHeight = this.calcpxbyelem(this.$refs.templateimagecomplexfour, 375, 164)
            tempHeight2 = this.calcpx(tempHeight, 164, 74)
            this.imgStyle1.width = tempHeight + 'px'
            this.imgStyle2.width = tempHeight + 'px'
            this.imgStyle3.width = tempHeight2 + 'px'
            this.imgStyle4.width = tempHeight2 + 'px'
            let px16 = this.calcpxbyelem(this.$refs.templateimagecomplexfour, 375, 16)
            this.imgStyle2.marginBottom = px16 + 'px'
            this.block2Style.marginLeft = px16 + 'px'
            this.imgStyle4.marginLeft = px16 + 'px'
        }else{
            tempHeight = this.calcpxbyelem(this.$refs.templateimagecomplexfour, 2, 1)
            tempHeight2 = this.calcpx(tempHeight, 2, 1)
        }
        
        this.imgStyle1.height = tempHeight + 'px'
        this.imgStyle2.height = tempHeight2 + 'px'
        this.imgStyle3.height = tempHeight2 + 'px'
        this.imgStyle4.height = tempHeight2 + 'px'

        //上下边距控制
        this.containerStyle.marginTop = this.calcpxbyelem(this.$refs.templateimagecomplexfour, 375, this.options.topMargin || 0)  + 'px'
        this.containerStyle.marginBottom = this.calcpxbyelem(this.$refs.templateimagecomplexfour, 375, this.options.bottomMargin || 0) + 'px'
    }
}
</script>
<style scoped>

.template_image_complexfour{
    width: 100%;
    margin: 0 auto;
    font-size: 0;
    display: flex;
}

.template_image_complexfour_container{
    width: 100%;
    display: flex;
}

.template_image_complexfour_block{
    width: 50%;
    text-align: right;
}

.template_image_complexfour_block2{
    text-align: left;
}

.template_image_complexfour_rect{
    display: flex;
}

.template_image_complexfour_img{
    width: 100%;
    display: inline-block;
}

</style>
