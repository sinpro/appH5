<template>
  <layer class="history" v-model="visiable" :maskHide="maskHide">
    <div class="title" :class="isBigTitle ? 'big' : ''">我的中奖</div>
    <div class="record-list">
      <div class="head flexbox">
        <span class="spo">中奖奖品</span>
        <span class="time">中奖时间</span>
      </div>
      <div class="item flexbox" v-for="(item, index) in formatRecords" :key="index">
        <span class="spo">{{item.prizeName}}</span>
        <span class="time">{{item.time}}</span>
      </div>
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
      default: true
    },
    records: {
      type: Array,
      default() {
        return [
          {prizeName: '开始邓俊峰克拉', winningTime: '20181210131600'},
          {prizeName: '开始邓俊峰克拉', winningTime: '20181210131600'},
          {prizeName: '开始邓俊峰克拉', winningTime: '20181210131600'},
        ]
      }
    }
  },
  data() {
    return {
      visiable: this.value
    }
  },
  computed: {
    formatRecords() {
      let newList = [...this.records];
      for (let i=0, len = newList.length; i < len; i++) {
        const aDate = formatter.toDate(newList[i].winningTime, 'yyyyMMddHHmmss')
        newList[i].time = formatter.formatDate(aDate, 'yyyy.MM.dd HH:mm')
      }
      return newList;
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
    window.historyM = this;
  }
}
</script>

<style lang="scss">
@import '../activities/utils/scss/transform.scss';

.history {
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
  .record-list {
    width: transformRemToPx(6.38);
    max-height: 40%;
    margin: transformRemToPx(2) auto 0 auto;
    background: #ffffff;
    padding: transformRemToPx(0.8) 0;
    border-radius: transformRemToPx(0.2);
    overflow-y: auto;
    > div {
      height: transformRemToPx(0.8);
      line-height: transformRemToPx(0.8);
      padding: 0 transformRemToPx(0.4);
    }
  }
  .flexbox {
    display: flex;

    .spo {
      flex: 1;
    }
    .time {
      text-align: right;
      width: transformRemToPx(2.2);
    }
  }
  .head {
    font-size: transformRemToPx(0.34);
    justify-content: center;
    background: rgb(255, 245, 241);
  }
  .item {
    border-bottom: 1px solid #e5e5e5;
  }
  .close {
    width: transformRemToPx(0.66);
    height: transformRemToPx(0.66);
    margin: transformRemToPx(0.6) auto;
  }
}
</style>
