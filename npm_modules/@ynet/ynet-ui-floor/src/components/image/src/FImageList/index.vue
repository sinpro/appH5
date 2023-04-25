<template>
    <div class="tfloor_image_list tfloor_image_common">
        <div class="tfloor_image_list_itemlist" :style="containerStyle">
            <div class="tfloor_image_list_item" 
                v-for="(imageInfo, index) in images" :key="index" 
                @click="fireClick(imageInfo)"
                :style="index > 0 ? itemStyle : firstItemStyle">
                <img class="tfloor_image_list_img" :src="imageInfo.imageUrl" :style="imgStyle"/>
            </div>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'

export default {
    
    name: 'FImageList',

    mixins,

    props,

    data () {
        return {
            
        }
    },

    methods: {

        fireClick (imageInfo = {}) {
            this.doEmit('mclick', {action: imageInfo.action, actionContext: imageInfo.actionContext})
        }
    },

    computed: {

        /**
         * 列表容器样式
         */
        containerStyle () {
            return {
                marginTop: this.doCalcSize(this.topMargin),
                marginBottom: this.doCalcSize(this.bottomMargin),
            }
        },

        /**
         * 列表项样式
         */
        firstItemStyle () {
            return {
                width: this.roundCorner == '1' ? this.doCalcSize(343) : '100%',
                height: this.doCalcSize(this.imageSizes.height)
            }
        },

        /**
         * 列表项样式
         */
        itemStyle () {
            return {
                width: this.roundCorner == '1' ? this.doCalcSize(343) : '100%',
                height: this.doCalcSize(this.imageSizes.height),
                marginTop: this.doCalcSize(this.imageMargin)
            }
        },

        /**
         * 图片样式
         */
        imgStyle () {
            return {
                borderRadius: this.roundCorner == '1' ? this.doCalcSize(4) : '0'
            }
        },

        /**
         * 图片大小
         */
        imageSizes () {
            let imageSizes = (this.imageSize || '').split('*')
            return {
                width: imageSizes[0],
                height: imageSizes[1]
            }
        }
    }
}
</script>
<style lang="scss">
@import '../common.css';

.tfloor_image_list{
    width: 100%;
    display: flex;
    justify-content: center;

    .tfloor_image_list_itemlist{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tfloor_image_list_item,
    .tfloor_image_list_img{
        width: 100%;
        height: 100%;
    }
}
</style>