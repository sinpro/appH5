<template>
    <div class="tfloor_image_card tfloor_image_common">
        <div class="swiper-container" ref="swipercontainer" :style="containerStyle">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(imageInfo, index) in images" :key="index" @click="fireClick(imageInfo)">
                    <img class="tfloor_image_card_img" :src="imageInfo.imageUrl"/>
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
    
    name: 'FImageCard',

    mixins,

    props,

    data () {
        return {
            
        }
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
                    loop: true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    // 如果需要分页器
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
                width: this.roundCorner == '1' ? this.doCalcSize(343) : '100%',
                height: this.doCalcSize(this.imageSizes.height),
                marginTop: this.doCalcSize(this.topMargin),
                marginBottom: this.doCalcSize(this.bottomMargin),
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

.tfloor_image_card{
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;

    .tfloor_image_card_img{
        width: 100%;
        height: 100%;
    }
}
</style>