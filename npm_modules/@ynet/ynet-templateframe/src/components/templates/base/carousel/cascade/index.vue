<template>
    <div class="template_carousel_cascade" ref="templatecarouselcascade" :style="templateStyle">
        <div class="swiper-container" ref="swipercontainer" :style="containerstyle">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(itemInfo, index) in itemList" :key="index" :style="itemStyle" @click="$emit('mClick', itemInfo)">
                    <imageview class="template_carousel_cascadeimg" :src="itemInfo.picUrl" :style="imgStyle"></imageview>
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination" ref="swiperpagination" :class="paginationClass"></div>
            
        </div>
    </div>
</template>
<script>
import props from '../../../props'
import mixins from '../../../mixins'
import Swiper from '../../../../../lib/swiper'

export default {
    mixins,
    props,

    data () {
        return {
            itemList: [],
            templateStyle: {
                backgroundColor: 'none'
            },
            containerstyle: {
                width: '100%',
                marginTop: '0',
                marginBottom: '0'
            },
            itemStyle: {
                width: 'auto',
                height: 'auto'
            },
            imgStyle: {
                width: '100%',
                height: '100%'
            },
            paginationClass: {
                'template_carousel_pagination_dot': false,
                'template_carousel_pagination_rect': false,
                'template_carousel_pagination_line': false
            }
        }
    },

    created () {
        this.itemList = this.options.styleInfoList || []
    },

    mounted () {
        this.calcRect()

        let _this = this
        this.$nextTick( () => {
            this.mySwiper = new Swiper (this.$refs.swipercontainer, {
                watchSlidesProgress: true,
	            slidesPerView: 'auto',
                loopedSlides: this.itemList.length,
                centeredSlides: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                loop: true, // 循环模式选项
                // 如果需要分页器
                pagination: {
                    el: this.$refs.swiperpagination,
                },
                on: {
                    progress: function(progress) {
                        for (let i = 0; i < this.slides.length; i++) {
                            let slide = this.slides.eq(i);
                            let slideProgress = this.slides[i].progress;
                            let modify = (Math.abs(slideProgress) - 1) * (0.14) + 1;
                            let scale = 1 - Math.abs(slideProgress) / 5;
                            let translate = (slideProgress * modify * (_this.itemWidth* 1.14)) + 'px';
                            let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                            // console.log(`${i}==${slideProgress}==${translate}==${modify}==${scale}==${_this.itemWidth}=`)
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

            let bullets = this.mySwiper.pagination.bullets
            if(this.options.color){
                for(let i = 0; i < bullets.length; i++){
                    //背景颜色控制
                    bullets[i].style.backgroundColor = this.options.color
                }
            }
        })  
    },

    methods: {

        calcRect () {
            let ratiox, ratioy

            this.itemWidth = this.calcpxbyelem(this.$refs.templatecarouselcascade, 375, 327)
            this.itemLeft = this.calcpxbyelem(this.$refs.templatecarouselcascade, 375, 12)

            this.itemStyle.width = this.itemWidth + 'px'

            if(this.options.isCustomized == '1'){
                //自定义
                ratiox = 375
                ratioy = this.options.picHeight
            }else{
                let ratio = this.calcRatio(this.options.aspectRatio)
                ratiox = ratio.ratiox
                ratioy = ratio.ratioy
            }

            let itemHeight = this.calcpx(this.itemWidth, ratiox, ratioy)

            this.itemStyle.height = itemHeight + 'px'
            this.containerstyle.width = this.calcpxbyelem(this.$refs.templatecarouselcascade, 375, 351) + 'px'

            //背景颜色控制
            // this.options.color && (this.templateStyle.backgroundColor = this.options.color)

            //轮播分页器类型
            this.paginationClass.template_carousel_pagination_dot = (this.options.cycleType == '0')
            this.paginationClass.template_carousel_pagination_rect = (this.options.cycleType == '1')
            this.paginationClass.template_carousel_pagination_line = (this.options.cycleType == '2')

            //上下边距控制
            this.containerstyle.marginTop = this.calcpxbyelem(this.$refs.templatecarouselcascade, 375, this.options.topMargin || 0)  + 'px'
            this.containerstyle.marginBottom = this.calcpxbyelem(this.$refs.templatecarouselcascade, 375, this.options.bottomMargin || 0) + 'px'
        }
    }

}
</script>
<style scoped>
    @import '../../../reset.css';
    @import '../../../../../lib/swiper.css';
    @import '../common.css';

    .template_carousel_cascade{
        width: 100%;
        display: flex;
    }

    .template_carousel_cascade .swiper-container .template_carousel_cascadeimg{
        width: 100%;
        height: 100%;
    }
</style>
