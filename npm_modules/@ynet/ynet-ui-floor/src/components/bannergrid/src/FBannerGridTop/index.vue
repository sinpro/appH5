<template>
  <div class="tfloor_bannergrid_fbannergridtop" :style="gridStyle">
    <div
      class="tfloor_bannergrid_fbannergridtop_menu_container"
      v-if="bannderGridData.showArea !== 2"
    >
      <div class="tfloor_bannergrid_fbannergridtop_menus_list">
        <div
          class="tfloor_bannergrid_fbannergridtop_menus_item"
          v-for="(item, index) in bannderGridData.menuList"
          :key="index"
        >
          <img
            class="tfloor_bannergrid_fbannergridtop_menus_item_img"
            :src="item.imageUrl"
          />
          <div class="tfloor_bannergrid_fbannergridtop_menus_item_text">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="tfloor_bannergrid_fbannergridtop_slider swiper-container tfloor_bannergrid_common"
      ref="swipercontainer"
      :style="containerStyle"
      v-if="bannderGridData.showArea !== 1"
    >
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(imageInfo, index) in bannderGridData.images"
          :key="index"
          :style="itemStyle"
          @click="fireClick(imageInfo)"
        >
          <img
            class="tfloor_bannergrid_cascade_img"
            :src="imageInfo.imageUrl"
            :style="imgStyle"
          />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div
        class="swiper-pagination"
        ref="swiperpagination"
        :class="paginationClass"
      ></div>
    </div>
  </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'
import Swiper from 'swiper/dist/js/swiper.js'

export default {
  name: 'FBannerGridTop',

  mixins,

  props,

  created() {
    this.itemWidth = this.doRemoveUnit(this.doCalcSize(327))
    this.itemLeft = this.doRemoveUnit(this.doCalcSize(12))
  },

  mounted() {
    if (this.bannderGridData.showArea !== 1) {
      this.initSwiper()
    }
  },
  computed: {
    bannderGridData() {
      return {
        menuList: this.menus.slice(0, 4),
        images: this.images,
        showArea: parseInt(this.content),
      }
    },
    gridStyle() {
      return {
        backgroundImage: 'url(' + this.bgImage.bgImageUrl + ')',
      }
    },
    /**
     * 轮播容器样式
     */
    containerStyle() {
      return {
        width: '100%',
      }
    },
    itemStyle() {
      return {
        width: this.doCalcSize(335),
        height: this.doCalcSize(100),
      }
    },

    imgStyle() {
      return {
        borderRadius: this.roundCorner == '1' ? this.doCalcSize(4) : '0',
      }
    },

    paginationClass() {
      return {
        tfloor_bannergrid_common_pagination_dot: this.pointerStyle == '0',
        tfloor_bannergrid_common_pagination_rect: this.pointerStyle == '1',
        tfloor_bannergrid_common_pagination_line: this.pointerStyle == '2',
      }
    },
  },
  methods: {
    /**
     * 初始化轮播
     */
    initSwiper() {
      let _this = this

      this.$nextTick(() => {
        // 销毁轮播
        this.mySwiper && this.mySwiper.destroy(true, true)

        // 创建轮播
        this.mySwiper = new Swiper(this.$refs.swipercontainer, {
          watchSlidesProgress: parseInt(this.bananerStyle) === 0 ? false : true,
          slidesPerView: 'auto',
          loopedSlides: this.bannderGridData.images.length,
          centeredSlides: true,
          spaceBetween:
            parseInt(this.bananerStyle) === 0 ? parseInt(this.itemLeft, 10) : 0,
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          // 如果需要分页器
          pagination: {
            el: this.$refs.swiperpagination,
          },
          on: {
            progress: function() {
              for (let i = 0; i < this.slides.length; i++) {
                let slide = this.slides.eq(i)
                let slideProgress = this.slides[i].progress
                let modify = (Math.abs(slideProgress) - 1) * 0.14 + 1
                let scale = 1 - Math.abs(slideProgress) / 5
                let translate =
                  slideProgress * modify * (_this.itemWidth * 1.14) + 'px'
                let zIndex = 999 - Math.abs(Math.round(10 * slideProgress))
                slide.transform(
                  'translateX(' + translate + ') scale(' + scale + ')'
                )
                slide.css('zIndex', zIndex)
                slide.css('opacity', 1)
                if (Math.abs(Math.round(slideProgress)) > 1) {
                  slide.css('opacity', 0)
                }
              }
            },
            setTransition: function(transition) {
              for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i)
                slide.transition(transition)
              }
            },
          },
        })

        //轮播器控制
        let bullets = this.mySwiper.pagination.bullets
        if (this.pointerColor) {
          for (let i = 0; i < bullets.length; i++) {
            //背景颜色控制
            bullets[i].style.backgroundColor = this.doParseColor(
              this.pointerColor
            )
          }
        }
      })
    },
  },
}
</script>
<style lang="scss">
@import '~swiper/dist/css/swiper.css';
@import '../common.css';
.tfloor_bannergrid_fbannergridtop {
  padding-top: 72px;
  background-size: 100% auto;
  .tfloor_bannergrid_fbannergridtop_menu_container {
    padding: 8px 0;
    .tfloor_bannergrid_fbannergridtop_menus_list {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .tfloor_bannergrid_fbannergridtop_menus_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .tfloor_bannergrid_fbannergridtop_menus_item_img {
          width: 36px;
          height: 36px;
        }
        .tfloor_bannergrid_fbannergridtop_menus_item_text {
          margin-top: 6px;
          color: #fff;
          font-size: 12px;
          text-align: center;
        }
      }
    }
  }
  .tfloor_bannergrid_fbannergridtop_slider {
    margin: 16px auto 0 auto;
    .tfloor_bannergrid_cascade_img {
      width: 100%;
      height: 100%;
    }
    .swiper-pagination {
      position: relative;
      height: 20px;
      width: 100%;
      bottom: 0;
    }
  }
}
</style>
