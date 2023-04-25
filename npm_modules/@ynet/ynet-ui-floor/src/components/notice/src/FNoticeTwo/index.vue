<!--
    标题组件：
        属性列表
            {String}  leftImageUrl        图标链接
            {String}  hasLeftImage        是否有图标
            {String}  rightImageUrl	      图标链接
            {String}  hasRightImage       是否有图标
            {Array}   newsList            公告列表
            {String}  titleColor          公告文字颜色
            {String}  bgColor             公告背景颜色
        事件列表
            {event}   action
-->
<template>
    <div class="tfloor_notice_fnoticetwo" :style="noticeStyle" @click="linkTo">
        <img :src="noticeInfo.leftImg" class="tfloor_notice_fnoticetwo_img" v-if="noticeInfo.showLeftImg" />
        <div class="swiper-container" ref="swipertwocontainer">
            <ul class="tfloor_notice_fnoticetwo_text_container swiper-wrapper">
                <li v-for="(item, index) in noticeInfo.list" :key="index" class="tfloor_notice_fnoticetwo_text swiper-slide" :style="textStyle">{{item.title}}</li>
            </ul>
        </div>
        <img :src="noticeInfo.rightImageUrl" class="tfloor_notice_fnoticetwo_img right" v-if="noticeInfo.showRightImg" />
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'
import Swiper from 'swiper/dist/js/swiper.js'

export default {

    name: 'FNoticeTwo',

    mixins,

    props,
    
    computed: {
        noticeInfo() {
            return {
                leftImg: this.leftImageUrl,
                showLeftImg: this.hasLeftImage == '1' ? true : false,
                list: this.newsList || [],
                rightImageUrl: this.rightImageUrl,
                showRightImg: this.hasRightImage == '1' ? true : false
            }
        },
        noticeStyle() {
            return {
                backgroundColor: this.doParseColor(this.bgColor)
            }
        },
        textStyle() {
            return {
                color: this.doParseColor(this.titleColor)
            }
        }
    },
    mounted () {
        this.initSwiper()
    },
    methods: {
      linkTo() {
        this.doEmit('mclick', {action: this.action})
      },
      initSwiper() {
        this.$nextTick( () => {
            
            // 销毁轮播
            this.mySwiper && this.mySwiper.destroy(true, true)

            // 创建轮播
            this.mySwiper = new Swiper(this.$refs.swipertwocontainer, {
                direction: 'vertical',
                slidesPerView: 2,
                loop: true,
                spaceBetween: 4,
                speed: 1000, // 速度
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                }
            })
        })
      }
    }
}
</script>
<style lang="scss">
.tfloor_notice_fnoticetwo {
    width: 100%;
    height: 60px;
    padding: 0 16px;
    box-sizing: border-box;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tfloor_notice_fnoticetwo_img {
        width: 20px;
        height: 20px;
    }
    .tfloor_notice_fnoticetwo_img.right {
        padding-left: 8px;
    }
    .swiper-container {
        width: 100%;
        height: 36px;
        .tfloor_notice_fnoticetwo_text_container {
            width: 100%;
            margin: 0;
            padding-left: 0;
            .tfloor_notice_fnoticetwo_text {
                line-height: 16px;
                width: 100%;
                padding-left: 8px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 12px;
            }
        }
    }
    
}
</style>