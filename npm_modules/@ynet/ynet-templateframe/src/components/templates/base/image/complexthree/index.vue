<template>
    <div class="template_image_complexthree" ref="templateimagecomplexthree">
        <div class="template_image_complexthree_container" :style="containerStyle">
            <div class="template_image_complexthree_block">
                <imageview class="template_image_complexthree_img" :style="bigimgStyle" 
                    :src="(options.styleInfoList[0] || {}).picUrl"
                    @click="$emit('mClick', options.styleInfoList[0])"></imageview>
            </div>
            <div class="template_image_complexthree_block template_image_complexthree_block2" :style="block2Style">
                <imageview class="template_image_complexthree_img" :style="imgStyle"
                    :src="(options.styleInfoList[1] || {}).picUrl"
                    @click="$emit('mClick', options.styleInfoList[1])"></imageview>
                <imageview class="template_image_complexthree_img" :style="imgStyle2"
                    :src="(options.styleInfoList[2] || {}).picUrl"
                    @click="$emit('mClick', options.styleInfoList[2])"></imageview>
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
            bigimgStyle: {
                width: '100%',
                height: 'auto'
            },
            imgStyle: {
                width: '100%',
                height: 'auto'
            },
            imgStyle2: {
                width: '100%',
                height: 'auto',
                marginTop: '0'
            }
        }
    },

    mounted () {
        let width = 'auto', height = 'auto'
        let tempHeight, tempHeight2

        if(this.options.isGap == '1'){
            tempHeight = this.calcpxbyelem(this.$refs.templateimagecomplexthree, 375, 164)
            tempHeight2 = this.calcpx(tempHeight, 164, 74)
            this.bigimgStyle.width = tempHeight + 'px'
            this.imgStyle.width = tempHeight + 'px'
            this.imgStyle2.width = tempHeight + 'px'
            let px16 = this.calcpxbyelem(this.$refs.templateimagecomplexthree, 375, 16)
            this.imgStyle2.marginTop = px16 + 'px'
            this.block2Style.marginLeft = px16 + 'px'
        }else{
            tempHeight = this.calcpxbyelem(this.$refs.templateimagecomplexthree, 2, 1)
            tempHeight2 = this.calcpx(tempHeight, 2, 1)
        }
            
        this.bigimgStyle.height = tempHeight + 'px'
        this.imgStyle.height = tempHeight2 + 'px'
        this.imgStyle2.height = tempHeight2 + 'px'

        //上下边距控制
        this.containerStyle.marginTop = this.calcpxbyelem(this.$refs.templateimagecomplexthree, 375, this.options.topMargin || 0)  + 'px'
        this.containerStyle.marginBottom = this.calcpxbyelem(this.$refs.templateimagecomplexthree, 375, this.options.bottomMargin || 0) + 'px'
    }
}
</script>
<style scoped>

.template_image_complexthree{
    width: 100%;
    margin: 0 auto;
    font-size: 0;
    display: flex;
}

.template_image_complexthree_container{
    width: 100%;
    display: flex;
}

.template_image_complexthree_block{
    width: 50%;
    text-align: right;
}

.template_image_complexthree_block2{
    text-align: left;
}

.template_image_complexthree_img{
    width: 100%;
    margin: 0 auto;
    display: inline-block;
}

</style>
