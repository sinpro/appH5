<template>
    <div class="template_carousel_advertise" ref="templatecarouseladvertise" :style="templateStyle">
        <div class="swiper-container" ref="swipercontainer" :style="containerstyle">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(itemInfo, index) in itemList" :key="index" @click="$emit('mClick', itemInfo)">
                    <imageview class="template_carousel_advertiseimg" :src="itemInfo.picUrl"></imageview>
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
                height: 'auto',
                marginTop: '0',
                marginBottom: '0'
            },
            paginationClass: {
                'template_carousel_pagination_dot': false,
                'template_carousel_pagination_rect': false,
                'template_carousel_pagination_line': false
            }
        }
    },

    mounted () {
        this.itemList = this.options.styleInfoList || []
        this.initComponent()  
    },

    methods: {

        initComponent () {
            this.calcRect()
            this.$nextTick( () => {
                this.mySwiper && this.mySwiper.destroy(true, true)
                this.mySwiper = new Swiper (this.$refs.swipercontainer, {
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    loop: true, // 循环模式选项
                    // 如果需要分页器
                    pagination: {
                        el: this.$refs.swiperpagination,
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

        calcRect () {
            let ratiox, ratioy
            let template_height

            if(this.options.isCustomized == '1'){
                //自定义
                ratiox = 375
                ratioy = this.options.picHeight
            }else{
                let ratio = this.calcRatio(this.options.aspectRatio)
                ratiox = ratio.ratiox
                ratioy = ratio.ratioy
            }

            let containerWidth = '100%'

            //属性控制间距
            if(this.properties.isGap == '1'){
                containerWidth = this.calcpxbyelem(this.$refs.templatecarouseladvertise, 375, 343)
                this.containerstyle.width = containerWidth + 'px'
                template_height = this.calcpx(containerWidth, ratiox, ratioy)
            }else{
                this.containerstyle.width = containerWidth
                template_height = this.calcpxbyelem(this.$refs.templatecarouseladvertise, ratiox, ratioy)
            }
            
            this.containerstyle.height = template_height + 'px'

            //背景颜色控制
            // this.options.color && (this.templateStyle.backgroundColor = this.options.color)

            //轮播分页器类型
            this.paginationClass.template_carousel_pagination_dot = (this.options.cycleType == '0')
            this.paginationClass.template_carousel_pagination_rect = (this.options.cycleType == '1')
            this.paginationClass.template_carousel_pagination_line = (this.options.cycleType == '2')

            //上下边距控制
            this.containerstyle.marginTop = this.calcpxbyelem(this.$refs.templatecarouseladvertise, 375, this.options.topMargin || 0)  + 'px'
            this.containerstyle.marginBottom = this.calcpxbyelem(this.$refs.templatecarouseladvertise, 375, this.options.bottomMargin || 0) + 'px'
        }
    }

}
</script>
<style scoped>
    @import '../../../reset.css';
    @import '../../../../../lib/swiper.css';
    @import '../common.css';

    .template_carousel_advertise{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .template_carousel_advertise .swiper-container .template_carousel_advertiseimg{
        width: 100%;
        height: 100%;
    }
</style>
