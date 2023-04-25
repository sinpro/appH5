<template>
    <div class="tfloor_image_scrollone tfloor_image_common">
        <div class="swiper-container" ref="swipercontainer" :style="containerStyle">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(imageInfo, index) in images" :key="index" :style="itemStyle" @click="fireClick(imageInfo)">
                    <img class="tfloor_image_scrollone_img" :src="imageInfo.imageUrl" :style="imgStyle"/>
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination" ref="swiperpagination" :class="paginationClass"></div>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'
import Swiper from 'swiper/dist/js/swiper.js'

export default {
    
    name: 'FImageScrollOne',

    mixins,

    props,

    created () {
        this.itemLeft = this.doRemoveUnit(this.doCalcSize(12))
    },

    mounted () {
        this.initSwiper()
    },

    methods: {

        /**
         * 初始化轮播
         */
        initSwiper () {

            this.$nextTick( () => {
                
                // 销毁轮播
                this.mySwiper && this.mySwiper.destroy(true, true)

                // 创建轮播
                this.mySwiper = new Swiper(this.$refs.swipercontainer, {
                    slidesPerView: 'auto',
                    loopedSlides: this.images.length,
                    spaceBetween: parseInt(this.itemLeft, 10),
                    loop: true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: this.$refs.swiperpagination,
                    }
                })

                //轮播器控制
                let bullets = this.mySwiper.pagination.bullets
                if(this.pointerColor){
                    for(let i = 0; i < bullets.length; i++){
                        //背景颜色控制
                        bullets[i].style.backgroundColor = this.doParseColor(this.pointerColor)
                    }
                }
            })
        },

        fireClick (imageInfo = {}) {
            this.doEmit('mclick', {action: imageInfo.action, actionContext: imageInfo.actionContext})
        }
    },

    computed: {

        /**
         * 轮播容器样式
         */
        containerStyle () {
            return {
                marginTop: this.doCalcSize(this.topMargin),
                marginBottom: this.doCalcSize(this.bottomMargin),
            }
        },

        itemStyle () {
            return {
                width: this.doCalcSize(300),
                height: this.doCalcSize(this.imageSizes.height),
            }
        },

        imgStyle () {
            return {
                borderRadius: this.roundCorner == '1' ? this.doCalcSize(4) : '0'
            }
        },

        paginationClass () {
            return {
                'tfloor_image_common_pagination_dot': (this.pointerStyle == '0'),
                'tfloor_image_common_pagination_rect': (this.pointerStyle == '1'),
                'tfloor_image_common_pagination_line': (this.pointerStyle == '2')
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
@import '~swiper/dist/css/swiper.css';
@import '../common.css';

.tfloor_image_scrollone{
    width: 100%;
    display: flex;
    overflow: hidden;

    .tfloor_image_scrollone_img{
        width: 100%;
        height: 100%;
    }
}
</style>