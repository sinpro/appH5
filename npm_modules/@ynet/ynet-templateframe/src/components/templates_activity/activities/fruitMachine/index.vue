<template>
  <section class="activities-bg">
    <div class="rules"><img src="../../assets/fruit/rules.png" alt="" @click="activityResultDetailFlag = true"></div>
    <div class="chances">{{todayText}}还有 <span>{{lotteryTimes || 0}}</span> 次机会</div>
    <div class="wrap">
      <div class="plate">
        <div class="border-top">
          <div><div class="light yellow"></div></div>
          <div><div class="light white"></div></div>
          <div><div class="light yellow"></div></div>
          <div><div class="light white"></div></div>
          <div><div class="light yellow"></div></div>
          <div><div class="light white"></div></div>
          <div><div class="light yellow"></div></div>
          <div><div class="light white"></div></div>
        </div>
        <div class="midd">
          <div class="border-left">
            <div><div class="light white"></div></div>
            <div><div class="light yellow"></div></div>
            <div><div class="light white"></div></div>
            <div><div class="light yellow"></div></div>
            <div><div class="light white"></div></div>
          </div>
          <div class="lottery" v-if="activityList.length <= 0">
            <div v-for="(item, index) in rewards" :key="index" >
              <img :src="item.prizePicture" alt="">
              <div :class="{win: index === highlightIndex}"></div>
            </div>
            <div @click="reStart"></div>
          </div>
          <div class="lottery" v-else>
            <div v-for="(item, index) in activityList" :key="index" >
              <img :src="item.prizePicture" alt="">
              <div :class="{win: index === highlightIndex}"></div>
            </div>
            <div @click="reStart"></div>
          </div>
          <div class="border-right">
            <div><div class="light yellow"></div></div>
            <div><div class="light white"></div></div>
            <div><div class="light yellow"></div></div>
            <div><div class="light white"></div></div>
            <div><div class="light yellow"></div></div>
          </div>
        </div>
        <div class="border-bottom">
          <div><div class="light yellow"></div></div>
          <div><div class="light white"></div></div>
          <div><div class="light yellow"></div></div>
          <div><div class="light white"></div></div>
          <div><div class="light yellow"></div></div>
          <div><div class="light white"></div></div>
          <div><div class="light yellow"></div></div>
          <div><div class="light white"></div></div>
        </div>
      </div>
    </div>
    <div class="btns">
      <div class="btn"><img src="../../assets/fruit/records.png" @click="openActivityResultHistory"></div>
      <div class="btn"><img src="../../assets/fruit/share.png" @click="popShare">
      </div>
    </div>
    <activity-desc v-model="activityResultDetailFlag" :activityDetail="activityDetail" @closeThis="activityResultDetailFlag = false"></activity-desc>
    <activity-win-history v-model="activityResultHistoryFlag" :activityResultHistory="activityResultHistory" @closeThis="activityResultHistoryFlag = false"></activity-win-history>
    <share v-model="shareFlag"></share>
    <base-layout v-model="lastResult" :full="true" class="result">
      <div class="bar-img"><img src="../../assets/fruit/fireworks.png" alt=""></div>
      <div class="container" v-if="isWon">
        <div class="summary">恭喜您获得了</div>
        <div class="award">{{tempResult.prizeName}}</div>
        <!-- <div class="ipt"><input type="tel" placeholder="输入手机号领取"></div> -->
        <div class="btn" @click="lastResult = false">朕收下了</div>
      </div>
      <div class="container" v-else>
        <div class="summary"> <div>哎呀～就差一点点 </div> 再试一次吧～</div>
        <div class="btn" @click="lastResult = false">确定</div>
      </div></base-layout>
  </section>
</template>

<script>
import { computedAttr } from '../utils'
import baseLayout from '../../components/baseLayout'
import share from '../../components/share'
import activityDesc from '../../components/activityDesc'
import activityWinHistory from '../../components/activityWinHistory'
import mixins from '../utils/mixins'

export default {
  mixins: [mixins],
  inheritAttrs: false,
  components: {
    activityDesc,
    activityWinHistory,
    baseLayout,
    share
  },
  data() {
    return {
      run: false,
      shareFlag: false,
      lastResult: false,
      tempResult: {},
      gameReady: false,
      activityResultHistoryFlag: false,
      activityResultDetailFlag: false,
      isWon: false,
      rewards: Object.freeze([
        {prizePicture: require('../../assets/fruit/rewards/integral.png')},
        {prizePicture: require('../../assets/fruit/rewards/signIn.png')},
        {prizePicture: require('../../assets/fruit/rewards/signIn.png')},
        {prizePicture: require('../../assets/fruit/rewards/nothing.png'), prizeId:'TEST'},
        {prizePicture: require('../../assets/fruit/rewards/Disney.png')},
        {prizePicture: require('../../assets/fruit/rewards/signIn.png')},
        {prizePicture: require('../../assets/fruit/rewards/Disney.png')},
        {prizePicture: require('../../assets/fruit/rewards/signIn.png')},
      ]),
      highlightIndex: null,
      order: Object.freeze([0, 1, 2, 5, 4, 7, 6, 3]) // 转动顺序
    }
  },
  computed: {
    ...computedAttr()
  },
  methods: {
    openActivityResultHistory(){
      this.getActivityResultHistory()
      this.activityResultHistoryFlag = true
    },
    start(){
      if(!this.ready){ return }
      this.getActivityResult().then(res => {
        this.run = true
      })
    },
    reStart(){
      if(!this.lotteryTimes && this.gameReady) return;
      this.gameReady = true
      this.start()
    },
    luckDraw() {

      let times = 24;
      let index = 0;

      if(this.activityList.length <= 0){
        times += 7
        this.tempResult = this.activityResult
      }else{
        for(let i = 0; i < this.activityList.length; i++){
          if(this.activityList[i].prizeId === this.activityResult.prizeId){
            times += i;
            this.tempResult = Object.freeze(this.activityList[i])
          }
        }
      }
      

      const intervalNum = setInterval(() => {
        if(index > times){
          clearInterval(intervalNum);
          this.gameReady = false;
          this.isWon = this.tempResult.prizeType != '00';
          this.lastResult = true;
          this.run = false
          return
        }
        this.highlightIndex = this.order[index % 8];
        ++index;
      }, 150)

    }
  },
  created(){
    this.getActivityList()
    this.getActivityResultHistory()
  },
  watch: {
    run(val){
      if(val){
        this.luckDraw()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../utils/scss/transform.scss';

  .activities-bg {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x:hidden;
    background: url("../../assets/fruit/bg.png") no-repeat top center/100%;
    background-attachment:local
  }
  .rules {
    width: transformRemToPx(1.42);
    position: absolute;
    top: transformRemToPx(0.16);
    right: 0;
    img { width:100% }
  }
  .chances {
    color: #ffffff;
    text-align: center;
    padding-top: transformRemToPx(2.35);
    span {
      color: #F0472B;
    }
  }
  .wrap {
    margin-top: transformRemToPx(1.48);
    padding: 0 transformRemToPx(0.28);
    .plate {
      width: transformRemToPx(6.94);
      height: transformRemToPx(6.48);
      background: url("../../assets/fruit/plate.png") no-repeat;
      background-size: 100%;
      position: relative;
    }
  }
  .name-list {
    width: transformRemToPx(6.56);
    height: transformRemToPx(0.6);
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.2);
    border-radius: transformRemToPx(0.3);
    padding-left: transformRemToPx(0.52);
    display: flex;
    align-items: center;
    color: #ffffff;    
    span {
      color: #F9FF00;
    }
  }
  .btns {
    display: flex;
    padding: transformRemToPx(0.66) transformRemToPx(0.33);

    .btn {
      flex: 1;
    }
    img {
      width: transformRemToPx(3.12);
      margin: 0 auto;
    }
  }

  .lottery {
    height: transformRemToPx(4.92);
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: transformRemToPx(0.08) transformRemToPx(0.59) transformRemToPx(0.42);

    > div {
      width: transformRemToPx(1.68);
      height: transformRemToPx(1.32);
      margin: transformRemToPx(0.3) transformRemToPx(0.06) 0 transformRemToPx(0.06);
      position: relative;

      &:nth-of-type(5) {
        position: relative;
        top: transformRemToPx(1.64);
        right: transformRemToPx(-1.8);
      }
      &:nth-of-type(9) {
        position: relative;
        top: transformRemToPx(-1.64);
        left: transformRemToPx(-1.8);
      }
      > div {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        border-radius: transformRemToPx(0.2);
      }
      .win {
        background: #F9FF00;
        opacity: 0.6;
      }
      img {
        width: transformRemToPx(0.96);
        height: transformRemToPx(0.96);
        margin: transformRemToPx(0.18) transformRemToPx(0.36);
      }
    }
  }
  
  .light {
    width: transformRemToPx(0.18);
    height: transformRemToPx(0.18);
    border-radius: 50%;

    &.yellow {
      animation: flashingY 1s infinite;
    }
    &.white {
      animation: flashingW 1s infinite;
    }
  }
  @keyframes flashingY {
    from { background: rgb(244, 159, 19); }
    to { background: #ffffff; }
  }
  @keyframes flashingW {
    from { background: #ffffff; }
    to { background: rgb(244, 159, 19); }
  }
  .border-top,
  .border-bottom {
    height: transformRemToPx(0.38);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    left: transformRemToPx(0.3);

    > div {
      flex: 1;
    }
  }
  .border-top {
    top: transformRemToPx(0.08);
  }

  .midd {
    display: flex;
  }
  .border-left,
  .border-right {
    display: flex;
    flex-direction: column;
    position: relative;
    

    > div {
      flex: 1;
      display: flex;
      align-items: center;
    }
  }
  .border-left {
    left: transformRemToPx(0.28);
  }
  .border-right {
    left: transformRemToPx(-0.28);
  }

  .bar-img {
    width: transformRemToPx(4.8);
    height: transformRemToPx(2.96);
    margin: transformRemToPx(1) auto 0;
    background: url("../../assets/fruit/won.png") no-repeat;
    background-size: 100%;

    img {
      width: transformRemToPx(5.12);
      height: transformRemToPx(3.24);
      position: absolute;
      top: transformRemToPx(0.38);
      left: transformRemToPx(1.19);
    }
  }
  .result {
    .container {
      width: transformRemToPx(4.94);
      margin: 0 auto;
      padding: transformRemToPx(0.7) transformRemToPx(0.72) transformRemToPx(0.6);
      background: #ffffff;
      position: relative;
      top: transformRemToPx(-0.06);
      border-radius: transformRemToPx(0.2);
      text-align: center;
    }
    .summary {
      color: #4A4A4A;
      font-size: transformRemToPx(0.36);
    }
    .award {
      color: #4D68F3;
      font-size: transformRemToPx(0.8);
      margin: transformRemToPx(0.16) 0 transformRemToPx(0.2);
    }
    .btn {
      margin-top: transformRemToPx(0.5);
      font-size: transformRemToPx(0.36);
      color: #fff;
      height: transformRemToPx(0.88);
      line-height: transformRemToPx(0.88);
      border-radius: transformRemToPx(0.44);
      background: linear-gradient(90deg, #4A67FE 0%, #5689FB 100%);
      box-shadow: 0 transformRemToPx(0.08) transformRemToPx(0.1) 0 rgba(79, 105, 254, .33);
    }
    .disabled {
      background: #D8D8D8;
      box-shadow: 0 transformRemToPx(0.08) transformRemToPx(0.1) 0 rgba(192, 192, 192, 0.33);
    }
    input {
      width: 76%;
      height: transformRemToPx(0.88);
      border-radius: transformRemToPx(0.44);
      border: transformRemToPx(0.02) solid #4A67FD;
      padding: 0 transformRemToPx(0.5);
      font-size: transformRemToPx(0.36);
    }
  }
</style>
