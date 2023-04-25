<template>
    <div class="tfloor_image_cascade tfloor_image_common">
        <div class="swiper-container" ref="swipercontainer" :style="containerStyle">
            <div class="swiper-wrapper">
                <div class="swiper-slide" 
                    v-for="(imageInfo, index) in images" :key="index" 
                    :style="itemStyle"
                    @click="fireClick(imageInfo)">
                    <img class="tfloor_image_cascade_img" :src="imageInfo.imageUrl" :style="imgStyle"/>
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
    
    name: 'FImageCascade',

    mixins,

    props,

    data () {
        return {
            
        }
    },

    created () {
        this.itemWidth = this.doRemoveUnit(this.doCalcSize(327))
    },

    mounted () {
        this.initSwiper()
    },

    methods: {

        /**
         * 初始化轮播
         */
        initSwiper () {
            let _this = this

            this.$nextTick( () => {
                
                // 销毁轮播
                this.mySwiper && this.mySwiper.destroy(true, true)

                // 创建轮播
                this.mySwiper = new Swiper(this.$refs.swipercontainer, {
                    watchSlidesProgress: true,
                    slidesPerView: 'auto',
                    loopedSlides: this.images.length,
                    centeredSlides: true,
                    loop: true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    // 如果需要分页器
                    pagination: {
                        el: this.$refs.swiperpagination,
                    },
                    on: {
                        progress: function() {
                            for (let i = 0; i < this.slides.length; i++) {
                                let slide = this.slides.eq(i);
                                let slideProgress = this.slides[i].progress;
                                let modify = (Math.abs(slideProgress) - 1) * (0.14) + 1;
                                let scale = 1 - Math.abs(slideProgress) / 5;
                                let translate = (slideProgress * modify * (_this.itemWidth* 1.14)) + 'px';
                                let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                                slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                                slide.css('zIndex', zIndex);
                                slide.css('opacity', 1);
                                if (Math.abs(Math.round(slideProgress)) > 1) {
                                    slide.css('opacity', 0);
                                }
                            }
                        },
                        setTransition: function(transition) {
                            for (var i = 0; i < this.slides.length; i++) {
                                var slide = this.slides.eq(i)
                                slide.transition(transition);
                            }
                        }
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
                width: '100%',
                marginTop: this.doCalcSize(this.topMargin),
                marginBottom: this.doCalcSize(this.bottomMargin),
            }
        },

        itemStyle () {
            return {
                width: this.doCalcSize(327),
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

.tfloor_image_cascade{
    width: 100%;
    display: flex;

    .tfloor_image_cascade_img{
        width: 100%;
        height: 100%;
    }
}
</style>