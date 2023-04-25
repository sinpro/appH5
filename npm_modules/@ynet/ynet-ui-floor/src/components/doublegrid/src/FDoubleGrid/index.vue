<template>
  <div class="tfloor_doublegrid_fdoublegrid">
    <div class="tfloor_doublegrid_fdoublegrid_top_menus" :style="gridStyle">
      <div class="tfloor_doublegrid_fdoublegrid_top_menus_list">
        <div
          class="tfloor_doublegrid_fdoublegrid_top_menus_item"
          :style="topMenuStyle"
          v-for="(item, index) in gridData.topMenus"
          :key="index"
        >
          <img
            class="tfloor_doublegrid_fdoublegrid_top_menus_item_img"
            :src="item.imageUrl"
          />
          <div class="tfloor_doublegrid_fdoublegrid_top_menus_item_text">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="tfloor_doublegrid_fdoublegrid_bottom_menus"
      :style="noticeStyleOne"
    >
      <div class="tfloor_doublegrid_fdoublegrid_bottom_menus_list">
        <div
          class="tfloor_doublegrid_fdoublegrid_bottom_menus_item"
          :style="bottomMenuStyle"
          v-for="(item, index) in gridData.bottomMenus"
          :key="index"
        >
          <img
            class="tfloor_doublegrid_fdoublegrid_bottom_menus_item_img"
            :src="item.imageUrl"
          />
          <div class="tfloor_doublegrid_fdoublegrid_bottom_menus_item_text">
            {{ item.title }}
          </div>
        </div>
      </div>
      <div
        class="tfloor_doublegrid_fdoublegrid_bottom_menus_notice"
        :style="noticeStyle"
      >
        <img
          class="tfloor_doublegrid_fdoublegrid_bottom_menus_notice_img"
          :src="noticeImageUrl"
        />
        <div class="swiper-container" ref="swipercontainer">
          <ul
            class="tfloor_doublegrid_fdoublegrid_bottom_menus_notice_container swiper-wrapper"
          >
            <li
              v-for="(item, index) in gridData.noticeList"
              :key="index"
              class="tfloor_doublegrid_fdoublegrid_bottom_menus_notice__text swiper-slide"
            >
              {{ item.title }}
            </li>
          </ul>
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
  name: 'FDoubleGrid',

  mixins,

  props,

  computed: {
    gridData() {
      return {
        topMenus: this.menus1.slice(0, 4),
        bottomMenus: this.menus2.slice(0, 5),
        noticeList: this.noticeList,
      }
    },
    gridStyle() {
      return {
        backgroundImage: 'url(' + this.bgImage.bgImageUrl + ')',
        backgroundSize: '100% 100%',
      }
    },
    topMenuStyle() {
      return {
        color: this.doParseColor(this.menus1titleColor),
      }
    },
    bottomMenuStyle() {
      return {
        color: this.doParseColor(this.menus2titleColor),
      }
    },
    noticeStyle() {
      return {
        color: this.doParseColor(this.noticeTextColor),
      }
    },
    noticeStyleOne() {
      return {
        backgroundImage: 'url(' + this.noticeBgImgeUrl + ')',
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
          direction: 'vertical',
          slidesPerView: 1,
          loop: true,
          spaceBetween: 0,
          speed: 1000, // 速度
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
<style lang="scss" scoped>
.tfloor_doublegrid_fdoublegrid {
  position: relative;
  margin-bottom: 90px;
  .tfloor_doublegrid_fdoublegrid_top_menus {
    width: 100%;
    height: 362px;
    background-size: 100% auto;
    .tfloor_doublegrid_fdoublegrid_top_menus_list {
      padding-top: 68px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .tfloor_doublegrid_fdoublegrid_top_menus_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .tfloor_doublegrid_fdoublegrid_top_menus_item_img {
          width: 36px;
          height: 36px;
        }
        .tfloor_doublegrid_fdoublegrid_top_menus_item_text {
          margin-top: 6px;
          font-size: 12px;
          text-align: center;
        }
      }
    }
  }
  .tfloor_doublegrid_fdoublegrid_bottom_menus {
    border-radius: 8px;
    position: absolute;
    top: 320px;
    margin: auto 16px;
    width: 343px;
    height: 130px;
    background: #fff;
    overflow: hidden;
    .tfloor_doublegrid_fdoublegrid_bottom_menus_list {
      padding: 16px 0 24px 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .tfloor_doublegrid_fdoublegrid_bottom_menus_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .tfloor_doublegrid_fdoublegrid_bottom_menus_item_img {
          width: 36px;
          height: 36px;
        }
        .tfloor_doublegrid_fdoublegrid_bottom_menus_item_text {
          margin-top: 2px;
          font-size: 12px;
          line-height: 16px;
          text-align: center;
        }
      }
    }
    .tfloor_doublegrid_fdoublegrid_bottom_menus_notice {
      display: flex;
      margin: auto 16px;
      .tfloor_doublegrid_fdoublegrid_bottom_menus_notice_img {
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
      .swiper-container {
        width: 100%;
        height: 24px;
        .tfloor_doublegrid_fdoublegrid_bottom_menus_notice_container {
          width: 100%;
          margin: 0;
          padding-left: 0;
          .tfloor_doublegrid_fdoublegrid_bottom_menus_notice__text {
            line-height: 24px;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
