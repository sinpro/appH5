<template>
  <div class="activities_shake">
    <section>
      <div class="bg">
        <div class="rules">
          <img src="../../assets/shake/share.png" alt=""  @click="popShare">
        </div>
        <div class="prizes">
          <div v-for="(item,index) in activityList">
            <p><img :src="item.prizePicture"></p>
            <p>{{item.prizeDesc}}</p>
          </div>
        </div>
        <div class="chances">
          今天还有&nbsp;<span>{{lotteryTimes}}</span>&nbsp;次机会
        </div>
        <div class="chest">
          <img src="../../assets/shake/chest.png" :class="chestClass">
        </div>
        <div class="light">
          <img src="../../assets/shake/light.png" alt="">
        </div>
        <div class="open" @click="startShake">
          <img src="../../assets/shake/open.png" alt="">
        </div>
        <div class="btns">
          <div class="btn" @click="openActivityResultHistory">我的奖品</div>
          <div class="btn" @click="activityResultDetailFlag = true">活动规则</div>
        </div>
        <div class="notice">
          <div class="notice-wrap">
            <img src="../../assets/shake/horn.png" alt="">
            <ul ref="notice">
              <li v-for="(item, index) in activityResultPage" :key="index">恭喜{{item.userId}} 抽中 {{item.prizeName}}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <share v-model="shareFlag"></share>
    <activity-desc v-model="activityResultDetailFlag" :activityDetail="activityDetail" @closeThis="activityResultDetailFlag = false"></activity-desc>
    <activity-win-history v-model="activityResultHistoryFlag" :activityResultHistory="activityResultHistory" @closeThis="activityResultHistoryFlag = false"></activity-win-history>
    <base-layout v-model="lastResult" :full="true" class="result">
      <img src="../../assets/close.png" class="close" @click="lastResult = false">
      <div class="ok" v-if="activityResult.prizeType != '00'">
        <img src="../../assets/shake/win_prize.png" class="hint">
        <div class="summary">恭喜您获得</div>
        <div class="award">{{activityResult.prizeDesc}}</div>
        <img src="../../assets/shake/view.png" class="btn" @click="lastResult = false">
      </div>
      <div class="no" v-else>
        <img src="../../assets/shake/no_prize.png" class="hint">
        <div class="summary">擦擦屏幕，再试一次</div>
        <img src="../../assets/shake/once_again.png" class="btn" @click="lastResult = false">
      </div>
    </base-layout>
  </div>
</template>

<script>
import { computedAttr } from '../utils'
import share from '../../components/share'
import activityDesc from '../../components/activityDesc'
import activityWinHistory from '../../components/activityWinHistory'
import baseLayout from '../../components/baseLayout'
import mixins from '../utils/mixins'
let unWatch
export default {
  mixins: [mixins],
  inheritAttrs: false,
  components: {
    share,
    activityDesc,
    activityWinHistory,
    baseLayout
  },
  computed: {
    ...computedAttr(),
    chestClass(){
      return this.shakeStatus ? 'jumping' : 'shaking'
    }
  },
  data() {
    return {
      lastResult: false,
      activityResultDetailFlag: false,
      activityResultHistoryFlag: false,
      shareFlag: false,
      shakeStatus: true
    }
  },
  methods: {
    spliceNotice(){
      let _d = this.activityResultPage.slice()
      let _p = _d.shift()
      _d.push(_p)
      this.activityResultPage =   Object.freeze(_d)
    },
    shake(){
      this.getActivityResult().then(() => {
        this.shakeAfterDone()
      })
    },
    openActivityResultHistory(){
      this.activityResultHistoryFlag = true
      this.getActivityResultHistory()
    },
    shakeAfterDone(){
      setTimeout(() => {
        this.shakeStatus = true
        this.lastResult = true
      }, 2000)
    },
    startShake() {
      if(!this.shakeStatus){ return }
      this.shakeStatus = false
      this.shake()
    },
    initNotice(){
      unWatch()
      this.$refs.notice.addEventListener('webkitTransitionEnd', () => {
        this.spliceNotice()
        this.$nextTick(() => {
          this.resetNotice
        })
      })
      setInterval(() => {
        this.$refs.notice.style="transition: transform 500ms;transform: translate3d(0, -0.68rem, 0)"
      }, 5000)

    },
    resetNotice(){
      this.$refs.notice.style="transition: transform 0ms;transform: translate3d(0, 0, 0)"
    }
  },
  created(){
    this.getActivityResultHistory()
    this.getActivityList()
    this.getActivityResultPage()
    unWatch = this.$watch('activityResultPage', (val, oldVal) => {
      this.initNotice()
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../utils/scss/transform.scss';
.activities_shake {
  width: 100%;
  overflow-x:hidden;
  .bg {
    background: url(../../assets/shake/bg.png) no-repeat;
    background-size: 100%;
    padding-bottom: transformRemToPx(0.84);
    position: relative;
  }
  .rules {
    position: relative;

    img {
      width: transformRemToPx(1.42);
      position: absolute;
      top: transformRemToPx(0.16);
      right: 0;
    }
  }
  .prizes {
    width: transformRemToPx(6.3);
    height: transformRemToPx(1.28);
    margin: 0 auto;
    padding-top: transformRemToPx(3.56);
    color: #DD907D;
    display: flex;
    overflow-x:auto;
    -webkit-overflow-scrolling: touch;

    & > div{
      flex-shrink:0;
      width: transformRemToPx(1.5);
      text-align:center;
      font-size: transformRemToPx(0.08);
      p:first-child{
        height: transformRemToPx(1);
        img{
          display: inline-block;
          max-height: transformRemToPx(0.98);
        }
      }
      p:last-child{
        font-size: 8px;
        height: 8px;
        line-height: 8px;
      }
    }
  }
  .chances {
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    width: transformRemToPx(5.18);
    height: transformRemToPx(0.66);
    margin: transformRemToPx(0.54) auto;

    display: flex;
    align-items: center;
    justify-content: center;
    background:linear-gradient(270deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0) 100%);

    span {
      color: #F0472B;
    }
  }
  .chest {
    width: transformRemToPx(3.1);
    height: transformRemToPx(2.3);
    padding-top: transformRemToPx(0.6);
    margin: 0 auto;
    
    img {
      width: 100%;
    }
  }
  .jumping {
    animation: jumping 2s infinite both;
  }
  .shaking {
    animation: shaking 0.3s infinite both;
  }

  @keyframes jumping {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-30%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes shaking {
    0% {
      transform: rotate(0);
    }
    25% {
      transform: rotate(-15deg);
    }
    75% {
      transform: rotate(15deg);
    }
    100% {
      transform: rotate(0);
    }
  }

  .light {
    position: relative;

    img {
      width: transformRemToPx(3.7);
      height: transformRemToPx(2.7);
      position: absolute;
      top: transformRemToPx(-2);
      left: transformRemToPx(1.72);
    }
  }
  .open {
    width: transformRemToPx(3.84);
    height: transformRemToPx(1.12);
    padding-top: transformRemToPx(1.48);
    margin: 0 auto;
    
    img {
      width: 100%;
    }
  }
  .btns {
    display: flex;
    padding: transformRemToPx(0.66) transformRemToPx(0.27) 0 transformRemToPx(0.27);

    .btn {
      flex: 1;
      width: transformRemToPx(2.98);
      height: transformRemToPx(0.9);
      margin: 0 transformRemToPx(0.25);
      background: rgba(255,255,255,0.13);
      border-radius: transformRemToPx(0.45);
      border: transformRemToPx(0.02) solid rgba(255,255,255,1);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .notice {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: transformRemToPx(0.68);
    background: #D74545;
    padding-left: transformRemToPx(0.28);
    color: #570f22;
    overflow: hidden;
    .notice-wrap{
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
    img {
      width: transformRemToPx(0.4);
    }
    ul{
      position: absolute;
      top: 0;
      left: transformRemToPx(0.54);
      transition: transform 500ms;
      li{
        height: transformRemToPx(0.68);
        line-height: transformRemToPx(0.68);
      }
    }
  }
  .arrow {
    position: absolute;
    top: transformRemToPx(0.64);
    right: transformRemToPx(0.82);
    width: transformRemToPx(1.7);
    height: transformRemToPx(1.64);
  }
  .plane {
    position: absolute;
    top: transformRemToPx(2.82);
    left: transformRemToPx(1.41);
    width: transformRemToPx(4.68);
    height: transformRemToPx(1.82);
  }

  .result .close {
    position: absolute;
    top: transformRemToPx(0.48);
    right: transformRemToPx(0.4);
    width: transformRemToPx(0.66);
    height: transformRemToPx(0.66);
  }
  .summary {
    color: #ffffff;
    font-size: transformRemToPx(0.48);
    height: transformRemToPx(0.66);
    line-height: transformRemToPx(0.66);
    text-align: center;
    letter-spacing: transformRemToPx(0.01);
  }
  .result .full > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .ok {
    padding-top: transformRemToPx(0.4);
    
    .hint {
      width: transformRemToPx(7.48);
      height: transformRemToPx(6.68);
    }
    .award {
      padding-top: transformRemToPx(0.24);
      color: #EEC34A;
      font-size: transformRemToPx(0.6);
      height: transformRemToPx(0.84);
      line-height: transformRemToPx(0.84);
      letter-spacing: transformRemToPx(0.02);
    }


    .btn {
      margin: transformRemToPx(0.48) auto 0 auto;
      width: transformRemToPx(3.84);
    }
  }
  .no {
    padding-top: transformRemToPx(2.4);

    .hint {
      width: transformRemToPx(5.98);
      height: transformRemToPx(4.92);
      margin: 0 auto;
    }
    .btn {
      margin: transformRemToPx(1.6) auto 0 auto;
      width: transformRemToPx(3.84);
    }
  }
}
</style>
