<template>
    <div class="tfloor_image_scrolltwo">
        <div class="tfloor_image_scrolltwo_wrap" ref="wrapper" :style="wrapStyle">
            <div class="tfloor_image_scrolltwo_content">
                <div class="tfloor_image_scrolltwo_item" v-for="(imageInfo, index) in images" :key="index" 
                    :style="itemStyle" @click="fireClick(imageInfo)">
                    <img class="tfloor_image_scrolltwo_img" :src="imageInfo.imageUrl"
                        :style="imgStyle"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'
import BScroll from 'better-scroll'

export default {
    
    name: 'FImageScrollTwo',

    mixins,

    props,

    data () {
        return {
            
        }
    },

    mounted () {
        this.initScroller()
    },

    methods: {

        /**
         * 初始化滚动条
         */
        initScroller () {
            this.$nextTick( () => {
                if(!this.scroller){
                    this.scroller = new BScroll(this.$refs.wrapper, {
                        scrollX: true,
                        scrollY: false
                    })
                }else{
                    this.scroller.refresh()
                }
            })
        },

        fireClick (imageInfo = {}) {
            this.doEmit('mclick', {action: imageInfo.action, actionContext: imageInfo.actionContext})
        }
    },

    computed: {

        wrapStyle () {
            return {
                marginTop: this.doCalcSize(this.topMargin),
                marginBottom: this.doCalcSize(this.bottomMargin),
            }
        },

        itemStyle () {
            return {
                width: this.doCalcSize(134),
                height: this.doCalcSize(this.imageSizes.height),
            }
        },

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
.tfloor_image_scrolltwo{
    width: 100%;
    overflow: hidden;

    .tfloor_image_scrolltwo_wrap{
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: nowrap;
    }

    .tfloor_image_scrolltwo_content{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: nowrap;
        font-size: 0;
        padding: 0 16px;
    }

    .tfloor_image_scrolltwo_item{
        flex: 0 0 auto;
        margin-left: 0;
        display: inline-block;

        &+.tfloor_image_scrolltwo_item{
            margin-left: 12px;
        }
    }

    .tfloor_image_scrolltwo_img{
        width: 100%;
        height: 100%;
    }
}
</style>