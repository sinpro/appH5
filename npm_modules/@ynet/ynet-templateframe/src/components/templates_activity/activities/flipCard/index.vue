<template>
  <div class="activities_flipCard">
    <section>
      <div class="bg">
        <div class="btns">
          <div class="btn" @click="activityResultDetailFlag = true">活动规则</div>
          <div class="btn" @click="popShare">我要分享</div>
        </div>
        <div class="chances">您有<span>{{lotteryTimes}}</span>次翻牌机会</div>

        <div class="cards">
          <cards-item v-for="(item, index) in 6" @over="over" :num="index" :key="index" :PicUrl="activityList[index]" />
        </div>

        <div class="records">
          <a href="javascript: void(0)" @click="openActivityResultHistory">查看我的中奖记录</a>
        </div>
      </div>
    </section>
    <share v-model="shareFlag"></share>
    <activity-desc v-model="activityResultDetailFlag" :activityDetail="activityDetail" @closeThis="activityResultDetailFlag = false"></activity-desc>
    <activity-win-history v-model="activityResultHistoryFlag" :activityResultHistory="activityResultHistory" @closeThis="activityResultHistoryFlag = false"></activity-win-history>

    <base-layout v-model="lastResult" :full="true" class="result">
      <div class="title">{{activityResult.prizeType != '00' ? '我的中奖' : '此次未中奖' }}</div>
      <div class="results">
        <div class="ok" v-if="activityResult.prizeType != '00'">
          <div class="resultName">{{activityResult.prizeDesc}}</div>
          <img :src="activityResult.prizePictureUrl" alt="">
          <div class="btn grad" @click="onceAgain">立即领取</div>
          <div class="btn" @click="onceAgain">继续翻牌</div>
        </div>
        <div class="no" v-else>
          <div class="text"><div>很遗憾，</div> 大奖与您擦身而过！</div>
          <div class="btn" @click="onceAgain">继续翻牌</div>
        </div>
      </div>
    </base-layout>
  </div>
</template>

<script>
import { computedAttr } from '../utils'
import baseLayout from '../../components/baseLayout'
import share from '../../components/share'
import activityDesc from '../../components/activityDesc'
import activityWinHistory from '../../components/activityWinHistory'
import cardsItem from '../components/cards'
import mixins from '../utils/mixins'

export default {
  mixins: [mixins],
  components: {
    baseLayout,
    share,
    activityWinHistory,
    cardsItem,
    activityDesc
  },
  data() {
    return {
      activityResult: {},
      activityResultDetailFlag: false,
      activityResultHistoryFlag: false,
      lastResult: false,
      shareFlag: false
    }
  },
  computed: {
    ...computedAttr()
  },
  methods: {
    openActivityResultHistory(){
      this.activityResultHistoryFlag = true
      this.getActivityResultHistory()
    },
    onceAgain(){
      this.lastResult = false
    },
    over(num, cb){
      this.getActivityResult().then(res => {
        this.$set(this.activityList, num, {prizePictureUrl: res.prizePictureUrl})
        cb()
      })
    }
  },
  created(){
    this.getActivityResultHistory()
  }
}
</script>

<style lang="scss" scoped>
@import '../utils/scss/transform.scss';
.activities_flipCard {
  .bg {
    background: url("../../assets/flip/bg.png") no-repeat;
    background-size: 100%;
  }
  .btns {
    position: relative;
    padding: transformRemToPx(0.32) 0;
    display: flex;
    flex-direction: row-reverse;

    .btn {
      height: transformRemToPx(0.56);
      line-height: transformRemToPx(0.56);
      background: rgb(200, 75, 11);
      border-radius: transformRemToPx(0.28);
      padding: 0 transformRemToPx(0.28);
      color: #ffffff;
      margin-right: transformRemToPx(0.2);
    }
  }
  .chances {
    color: #ffffff;
    text-align: center;
    padding-top: transformRemToPx(5.2);
    font-size: transformRemToPx(0.42);

    span {
      color: rgb(252,248,0);
    }
  }

  .cards{
    height: transformRemToPx(6.08);
    padding: transformRemToPx(0.22) transformRemToPx(0.15);
    display: flex;
    flex-wrap: wrap;
  }

  .records {
    font-size: transformRemToPx(0.36);
    text-align: center;
    padding: 0 0 transformRemToPx(0.32) 0;

    a {
      color: #ffffff;
      text-decoration: underline;
    }
  }
  .result {
    font-size: transformRemToPx(0.4);
    letter-spacing: transformRemToPx(0.02);
    text-align: center;

    .title {
      position: relative;
      top: transformRemToPx(1.7);
      margin: 0 auto;
      width: transformRemToPx(5.52);
      height: transformRemToPx(1.86);
      padding-top: transformRemToPx(0.16);
      background: url("../../assets/flip/bar_ok.png") no-repeat;
      background-size: 100%;
      font-weight: 400;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .results {
      width: transformRemToPx(5.18);
      padding: transformRemToPx(0.6);
      margin: transformRemToPx(1.02) auto 0;
      background: #ffffff;
      border-radius: transformRemToPx(0.2);
    }
    .btn {
      margin-top: transformRemToPx(0.32);
      font-size: transformRemToPx(0.36);
      height: transformRemToPx(0.8);
      line-height: transformRemToPx(0.8);
      color: #FC4D02;
      border: 1px solid #FC4D02;
      border-radius: transformRemToPx(0.4);
    }
    .close {
      width: transformRemToPx(0.66);
      height: transformRemToPx(0.66);
      margin: transformRemToPx(0.6) auto;
    }
    .ok img {
      width: transformRemToPx(3.32);
      margin: transformRemToPx(0.6) auto;
    }
    .ok .resultName{
      font-size: transformRemToPx(0.52);
      padding-top: transformRemToPx(0.4);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .no .text {
      padding: 0 transformRemToPx(0.4);
      margin: transformRemToPx(0.8) 0 transformRemToPx(0.6);
    }
    .grad {
      color: #ffffff;
      border: 0;
      background-image: linear-gradient(90deg, #FC4D02 0%, #FD7902 100%);
    }
  }
}
</style>
