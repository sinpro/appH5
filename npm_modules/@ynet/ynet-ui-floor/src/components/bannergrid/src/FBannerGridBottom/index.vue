<template>
  <div class="tfloor_bannergrid_fbannergridbottom">
    <div class="swiper-container" ref="swipercontainer">
      <div class="tfloor_bannergrid_fbannergridbottom_list swiper-wrapper">
        <div
          class="tfloor_bannergrid_fbannergridbottom_item swiper-slide"
          v-for="(imageInfo, index) in gridData.images"
          :key="index"
        >
          <img
            class="tfloor_bannergrid_fbannergridbottom__img"
            :src="imageInfo.imageUrl"
          />
        </div>
      </div>
    </div>

    <div class="tfloor_bannergrid_fbannergridbottom_bottom_menus">
      <div class="tfloor_bannergrid_fbannergridbottom_bottom_menus_list">
        <div
          class="tfloor_bannergrid_fbannergridbottom_bottom_menus_item"
          v-for="(item, index) in gridData.menus"
          :key="index"
        >
          <img
            class="tfloor_bannergrid_fbannergridbottom_bottom_menus_item_img"
            :src="item.imageUrl"
          />
          <div
            class="tfloor_bannergrid_fbannergridbottom_bottom_menus_item_text"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'
import Swiper from 'swiper/dist/js/swiper.js'

export default {
  name: 'FBannerGridBottom',

  mixins,

  props,

  computed: {
    gridData() {
      return {
        menus: this.menus.slice(0, 4),
        images: this.images,
      }
    },
  },
  mounted() {
    this.initSwiper()
  },
  methods: {
    initSwiper() {
      this.$nextTick(() => {
        // 销毁轮播
        this.mySwiper && this.mySwiper.destroy(true, true)

        // 创建轮播
        this.mySwiper = new Swiper(this.$refs.swipercontainer, {
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
        })
      })
    },
  },
}
</script>
<style lang="scss">
.tfloor_bannergrid_fbannergridbottom {
  position: relative;
  height: 192px;
  width: 100%;
  margin-bottom: 52px;
  .swiper-container {
    height: 100%;
    .tfloor_bannergrid_fbannergridbottom_list {
      .tfloor_bannergrid_fbannergridbottom__img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .tfloor_bannergrid_fbannergridbottom_bottom_menus {
    border-radius: 8px;
    position: absolute;
    top: 152px;
    margin: auto 16px;
    width: 343px;
    height: 86px;
    background: #fff;
    z-index: 100;
    .tfloor_bannergrid_fbannergridbottom_bottom_menus_list {
      padding: 16px 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .tfloor_bannergrid_fbannergridbottom_bottom_menus_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .tfloor_bannergrid_fbannergridbottom_bottom_menus_item_img {
          width: 36px;
          height: 36px;
        }
        .tfloor_bannergrid_fbannergridbottom_bottom_menus_item_text {
          margin-top: 2px;
          font-size: 12px;
          line-height: 16px;
          text-align: center;
        }
      }
    }
  }
}
</style>
