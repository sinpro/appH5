<template>
  <layer class="intro" v-model="visiable" :maskHide="maskHide">
    <div class="title" :class="isBigTitle ? 'big' : ''">活动说明</div>
    <div class="details">
      <div class="time">
        <span>活动时间：</span>{{activityTime}}
      </div>
      <div class="rule">
        <span>活动规则：</span>
      </div>
      <div v-html="activityRules"></div>
    </div>
    <img src="../assets/close.png" class="close" v-if="!maskHide" @click="close"/>>
  </layer>
</template>

<script>
import layer from './popLayer'
import formatter from '../activities/utils/formatter'

export default {
  components: {
    layer
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    maskHide: {
      type: Boolean,
      default: false
    },
    isBigTitle: {
      type: Boolean,
      default: false
    },
    activity: {
      type: Object,
      default() {
        return {
          gameStartTime: '20181101000000',
          gameEndTime: '20181130000000',
          gameDetail: '<p>1. 阿基洛夫就啊浪费阿金啊老家阿娇大幅减少；理念圳龙克拉 </p>\
                  <p>2. 阿基洛夫就啊浪费阿金啊老家阿娇大幅减少；理念圳龙克拉 </p>\
                  <p>3. 阿基洛夫就啊浪费阿金啊老家阿娇大幅减少；理念圳龙克拉 </p>'
        }
      }
    }
  },
  data() {
    return {
      visiable: this.value
    }
  },
  computed: {
    activityTime() {
      const startDate = formatter.toDate(this.activity.gameStartTime, 'yyyyMMddHHmmss')
      const endDate = formatter.toDate(this.activity.gameEndTime, 'yyyyMMddHHmmss')
      
      return formatter.formatDate(startDate, 'yyyy.MM.dd') + '-' + formatter.formatDate(endDate, 'yyyy.MM.dd')
    },
    activityRules() {
      return this.activity.gameDetail.replace(/&lt;/g, '<').replace(/&gt;/g, '>') || ""
    }
  },
  watch: {
    value(val) {
      this.visiable = val;
    },
    visiable(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    close() {
      this.$emit('input', false);
    }
  },
  created() {
    window.introM = this;
  }
}
</script>

<style lang="scss">
@import '../activities/utils/scss/transform.scss';

.intro {
  .title {
    position: relative;
    top: transformRemToPx(2.36);
    margin: 0 auto;
    width: transformRemToPx(2.9);
    height: transformRemToPx(0.72);
    background: url("../assets/bar.png") no-repeat;
    background-size: 100%;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

    &.big {
      top: transformRemToPx(2.48);
      width: transformRemToPx(5.52);
      height: transformRemToPx(0.9);
      padding-bottom: transformRemToPx(0.32);
      background: url("../assets/flip/bar_no.png") no-repeat;
      background-size: 100%;
      font-size: transformRemToPx(0.4);
      letter-spacing: transformRemToPx(0.02);
      font-weight: 400;
    }
  }
  .details {
    width: transformRemToPx(5.2);
    margin: transformRemToPx(2) auto 0 auto;
    background: #ffffff;
    padding: transformRemToPx(0.6) transformRemToPx(0.4);
    border-radius: transformRemToPx(0.2);

    p {
      margin-top: transformRemToPx(0.2);
    }
  }
  .time, .rule {
    margin-top: transformRemToPx(0.4);

    span {
      font-weight: bold;
    }
  }
  .close {
    width: transformRemToPx(0.66);
    height: transformRemToPx(0.66);
    margin: transformRemToPx(0.6) auto;
  }
}
</style>
