<template>
  <div
    class="tfloor_bannerreminder_fbannerreminder swiper-container"
    ref="swipercontainer"
    :style="reminderContainerStyle"
  >
    <div class="tfloor_bannerreminder_fbannerreminder_list swiper-wrapper">
      <div
        class="tfloor_bannerreminder_fbannerreminder_item swiper-slide"
        v-for="(imageInfo, index) in reminderData.imageList"
        :key="index"
      >
        <img
          class="tfloor_bannerreminder_fbannerreminder__img"
          :src="imageInfo.imageUrl"
        />
      </div>
    </div>
    <div
      class="tfloor_bannerreminder_fbannerreminder_reminder"
      :style="reminderStyle"
    >
      <div class="tfloor_bannerreminder_fbannerreminder_header">
        <div class="tfloor_bannerreminder_fbannerreminder_header_left">
          <img
            :src="reminderData.leftReminderImg"
            class="tfloor_bannerreminder_fbannerreminder_header_img"
          />
          <span class="tfloor_bannerreminder_fbannerreminder_header_title">{{
            reminderData.reminderTitle
          }}</span>
        </div>
        <img
          :src="reminderData.rightReminderImg"
          @click="expand"
          class="tfloor_bannerreminder_fbannerreminder_header_img"
          :class="{ active: expandStatus }"
        />
      </div>
      <div class="tfloor_bannerreminder_fbannerreminder_container">
        <ul class="tfloor_bannerreminder_fbannerreminder_reminder_list">
          <li
            class="tfloor_bannerreminder_fbannerreminder_reminder_item"
            v-for="(reminderItem, index) in reminderData.reminderList"
            :key="index"
          >
            <div class="tfloor_bannerreminder_fbannerreminder_reminder_desc">
              <div class="tfloor_bannerreminder_fbannerreminder_reminder_name">
                {{ reminderItem.eventName }}
              </div>
              <div
                class="tfloor_bannerreminder_fbannerreminder_reminder_amount"
              >
                {{ reminderItem.eventAmt }}
              </div>
            </div>
            <div class="tfloor_bannerreminder_fbannerreminder_reminder_date">
              <div
                class="tfloor_bannerreminder_fbannerreminder_reminder_date_title"
              >
                {{ reminderItem.dateMsg }}
              </div>
              <div
                class="tfloor_bannerreminder_fbannerreminder_reminder_date_detail"
              >
                {{ reminderItem.date }}
              </div>
            </div>
            <div
              class="tfloor_bannerreminder_fbannerreminder_reminder_btn"
              :style="btnStyle"
            >
              {{ reminderItem.buttonMsg }}
            </div>
          </li>
        </ul>
        <div class="tfloor_bannerreminder_fbannerreminder_bottom">
          {{ reminderData.actionName }}
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
  name: 'FBannerReminder',

  mixins,

  props,
  data() {
    return {
      expandStatus: false,
    }
  },
  computed: {
    reminderData() {
      return {
        imageList: this.images,
        leftReminderImg: this.leftImageUrl,
        rightReminderImg: this.rightImageUrl,
        reminderTitle: `${this.reminderTitle +
          this.businessData.reminderList[0].reminderMsg}`,
        reminderList:
          this.businessData.eventList &&
          this.businessData.eventList.slice(0, 3),
        actionName: this.actionName,
      }
    },
    reminderStyle() {
      return {
        color: this.doParseColor(this.reminderTextColor),
        backgroundImage: 'url(' + this.reminderbgImageUrl + ')',
        top: this.doCalcSize(182),
        // bottom: 0,
      }
    },
    reminderContainerStyle() {
      const length = this.reminderData.reminderList.length
      let height
      console.log(length, 'length')
      if (length === 1) {
        height = 160
      } else if (length === 2) {
        height = 232
      } else if (length === 3) {
        height = 304
      }
      return {
        height: this.expandStatus
          ? this.doCalcSize(height + 182)
          : this.doCalcSize(224),
      }
    },
    btnStyle() {
      return {
        border: `1px solid ${this.doParseColor(this.reminderTextColor)}`,
        color: this.doParseColor(this.reminderTextColor),
        backgroundColor: this.doParseColor(this.buttonColor),
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
    expand() {
      this.expandStatus = !this.expandStatus
    },
  },
}
</script>
<style lang="scss">
.tfloor_bannerreminder_fbannerreminder {
  position: relative;
  width: 100%;
  transition-duration: 0.5s;
  .tfloor_bannerreminder_fbannerreminder_list {
    .tfloor_bannerreminder_fbannerreminder__img {
      width: 100%;
    }
  }
  .tfloor_bannerreminder_fbannerreminder_reminder {
    position: absolute;
    width: 343px;
    margin: auto 16px;
    border-radius: 4px 4px 0 0;
    z-index: 100;
    padding: 0 15px;
    box-sizing: border-box;
    .tfloor_bannerreminder_fbannerreminder_header {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 44px;
      .tfloor_bannerreminder_fbannerreminder_header_left {
        display: flex;
        align-items: center;
      }
      .tfloor_bannerreminder_fbannerreminder_header_img {
        width: 24px;
        height: 24px;
        &.active {
          transform: rotateZ(90deg);
        }
      }
      .tfloor_bannerreminder_fbannerreminder_header_title {
        margin-left: 8px;
        font-size: 14px;
      }
    }
    .tfloor_bannerreminder_fbannerreminder_header::after {
      content: '';
      left: 0;
      position: absolute;
      transform: scaleY(0.5);
      height: 1px;
      width: 100%;
      background-color: #e1c1a7;
      bottom: 0;
    }
  }
  .tfloor_bannerreminder_fbannerreminder_reminder_list {
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    .tfloor_bannerreminder_fbannerreminder_reminder_item {
      position: relative;
      height: 72px;
      display: flex;
      justify-content: space-between;
      padding: 15px 16px;
      align-items: center;
      box-sizing: border-box;

      .tfloor_bannerreminder_fbannerreminder_reminder_name {
        font-size: 14px;
      }
      .tfloor_bannerreminder_fbannerreminder_reminder_amount {
        font-size: 16px;
        color: #fe3945;
        font-weight: bolder;
        line-height: 22px;
      }
      .tfloor_bannerreminder_fbannerreminder_reminder_date_title {
        font-size: 12px;
      }
      .tfloor_bannerreminder_fbannerreminder_reminder_date_detail {
        font-size: 16px;
        font-weight: bolder;
        line-height: 22px;
      }
      .tfloor_bannerreminder_fbannerreminder_reminder_btn {
        width: 78px;
        line-height: 30px;
        text-align: center;
        border-radius: 4px;
      }
    }
    .tfloor_bannerreminder_fbannerreminder_reminder_item::after {
      content: '';
      left: 0;
      position: absolute;
      transform: scaleY(0.5);
      height: 1px;
      width: 100%;
      background-color: #e1c1a7;
      bottom: 0;
    }
  }
  .tfloor_bannerreminder_fbannerreminder_bottom {
    text-align: center;
    line-height: 44px;
  }
}
</style>
