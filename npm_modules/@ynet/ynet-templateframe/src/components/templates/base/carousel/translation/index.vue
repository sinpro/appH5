<template>
    <div class="template_carousel_translation" ref="templatecarouseltranslation" :style="templateStyle">
        <div class="swiper-container" ref="swipercontainer" :style="containerstyle">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(itemInfo, index) in itemList" :key="index" :style="itemStyle" @click="$emit('mClick', itemInfo)">
                    <imageview class="template_carousel_translationimg" :src="itemInfo.picUrl" :style="imgStyle"></imageview>
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
                'template_carousel_pagination_line': false,
                'template_carousel_pagination_custom': false
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

            let options = {
                watchSlidesProgress: true,
	            slidesPerView: 'auto',
                loopedSlides: this.itemList.length,
                centeredSlides: true,
                spaceBetween: this.itemLeft,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                loop: true, // 循环模式选项
                // 如果需要分页器
                pagination: {
                    el: this.$refs.swiperpagination,
                }
            }

            if(this.properties.style == 'style4'){
                Object.assign(options, {
                    on: {
                        progress: function(progress) {
                            for (let i = 0; i < this.slides.length; i++) {
                                let slide = this.slides.eq(i)
                                let slideProgress = this.slides[i].progress
                                let scale
                                if(Math.abs(Math.round(slideProgress)) == 0){
                                    scale = 1
                                }else{
                                    scale = 0.8
                                }
                                slide.transform('scaleY(' + scale + ')');
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
            }

            this.mySwiper = new Swiper (this.$refs.swipercontainer, options)
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
            let itemHeight

            if(this.properties.style == 'style4'){
                //宫格轮播式
                this.itemWidth = this.calcpxbyelem(this.$refs.templatecarouseltranslation, 375, 335)
                this.itemLeft = this.calcpxbyelem(this.$refs.templatecarouseltranslation, 375, 10)

                itemHeight = this.calcpx(this.itemWidth, 375, 100)
            }else{
                this.itemWidth = this.calcpxbyelem(this.$refs.templatecarouseltranslation, 375, 327)
                this.itemLeft = this.calcpxbyelem(this.$refs.templatecarouseltranslation, 375, 12)
            
                if(this.options.isCustomized == '1'){
                    //自定义
                    ratiox = 375
                    ratioy = this.options.picHeight
                }else{
                    let ratio = this.calcRatio(this.options.aspectRatio)
                    ratiox = ratio.ratiox
                    ratioy = ratio.ratioy
                }

                itemHeight = this.calcpx(this.itemWidth, ratiox, ratioy)
            }
            
            this.itemStyle.width = this.itemWidth + 'px'
            this.itemStyle.height = itemHeight + 'px'

            //轮播分页器类型
            this.paginationClass.template_carousel_pagination_dot = (this.options.cycleType == '0')
            this.paginationClass.template_carousel_pagination_rect = (this.options.cycleType == '1')
            this.paginationClass.template_carousel_pagination_line = (this.options.cycleType == '2')
            this.paginationClass.template_carousel_pagination_custom = (this.properties.style == 'style4')

            //上下边距控制
            this.containerstyle.marginTop = this.calcpxbyelem(this.$refs.templatecarouseltranslation, 375, this.options.topMargin || 0)  + 'px'
            this.containerstyle.marginBottom = this.calcpxbyelem(this.$refs.templatecarouseltranslation, 375, this.options.bottomMargin || 0) + 'px'
        }
    }

}
</script>
<style scoped>
    @import '../../../reset.css';
    @import '../../../../../lib/swiper.css';
    @import '../common.css';

    .template_carousel_translation{
        width: 100%;
        display: flex;
    }

    .template_carousel_translation .swiper-container .template_carousel_translationimg{
        width: 100%;
        height: 100%;
    }
</style>
