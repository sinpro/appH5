<template>
  <div class="activities_turntable">
    <div class="tips">
      {{todayText}}还有 <span>{{lotteryTimes}}</span> 次机会
    </div>
    <div class="eggs">
      <div class="first">
        <egg :ready="eggReady" @clickHandler="tbSmach"></egg>
        <egg :ready="eggReady" @clickHandler="tbSmach"></egg>
        <egg :ready="eggReady" @clickHandler="tbSmach"></egg>
      </div>
      <div class="second">
        <egg :ready="eggReady" @clickHandler="tbSmach"></egg>
        <egg :ready="eggReady" @clickHandler="tbSmach"></egg>
      </div>
    </div>
    <div class="btns">
      <div class="btn" style="background: transparent;">
        <img src="../../assets/eggs/intro.png" @click="activityResultDetailFlag = true">
      </div>
      <div class="btn" style="background: transparent;">
        <img src="../../assets/eggs/share.png" @click="popShare">
      </div>
    </div>
    <activity-desc v-model="activityResultDetailFlag" :activityDetail="activityDetail" @closeThis="activityResultDetailFlag = false"></activity-desc>
    <share v-model="shareFlag"></share>
    <base-layout v-model="lastResult" :full="true" class="result">
      <div class="result">
        <img src="../../assets/eggs/two_eggs.png" class="two">
        <img src="../../assets/eggs/mushroom.png" class="mushroom">
        <div class="ok" v-if="activityResult.prizeType != '00'">
          <div class="summary">恭喜您获得了</div>
          <div class="award">{{activityResult.prizeName}}</div>
          <!-- <div class="ipt"><input type="tel" placeholder="输入手机号领取"></div> -->
          <div class="btn" @click="lastResult = false">朕收下了</div>
        </div>
        <div class="ok" v-else>
          <div class="summary">非常遗憾</div>
          <div class="award">没有中奖</div>
          <div class="btn" @click="lastResult = false">确定</div>
        </div>
      </div>
    </base-layout>
  </div>
</template>

<script>
import { computedAttr } from '../utils'
import baseLayout from '../../components/baseLayout'
import Egg from '../components/egg.vue'
import activityDesc from '../../components/activityDesc'
import share from '../../components/share'
import mixins from '../utils/mixins'
export default {
  mixins: [mixins],
  name: 'goldenEggs',
  components: {
    Egg,
    share,
    activityDesc,
    baseLayout
  },
  data() {
    return {
      activityResultDetailFlag: false,
      shareFlag: false,
      lastResult: false,
      eggReady: true
    };
  },
  computed: {
    ...computedAttr()
  },
  methods: {
    tbSmach(afterDone){
     this.eggReady = false
     this.getActivityResult().then(res => {
          this.lastResult = true
      }).finally(res => {
          afterDone()
          this.eggReady = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../utils/scss/transform.scss';

.activities_turntable {
    background: url(../../assets/eggs/golden_egg_bg.png) no-repeat;
    background-size: 100%;
    padding-bottom: transformRemToPx(0.66);
  
  .tips {
    padding-top: transformRemToPx(5.6);
    height: transformRemToPx(1);
    line-height: transformRemToPx(1);
    text-align: center;
    color: #ffffff;
  }

  .first, .second, .btns {
    display: flex;

    .egg, .btn {
      flex: 1;
    }
  }
  .btn{
    width: transformRemToPx(2.56);
    height: transformRemToPx(0.7);
    line-height: transformRemToPx(0.7);
    margin: 0 auto;
    background: #eb7e26;
    color: #fff;
    border-radius: 18px;
    font-size: transformRemToPx(0.36);
  }
  .btn img {
    width: transformRemToPx(2.72);
    margin: 0 auto;
    cursor: pointer;
  }
  .second {
    padding: transformRemToPx(0.4) transformRemToPx(1.25) transformRemToPx(0.6) transformRemToPx(1.25);
  }

  .result .full{
    padding-top: transformRemToPx(4.24);

    > div {
      width: transformRemToPx(5.6);
      padding: transformRemToPx(0.54) 0;
      margin: 0 auto 0 auto;
      background: #ffffff;
      border-radius: transformRemToPx(0.5);
      box-shadow: 0 0 transformRemToPx(0.17) transformRemToPx(0.13) #e1d6c1 inset;
    }
    .btn {
      width: transformRemToPx(3.4);
      height: transformRemToPx(1);
      text-align: center;
      line-height: transformRemToPx(1);
      color: #ffffff;
      background: rgb(235, 126, 38);
      border-radius: transformRemToPx(0.35);
      margin: transformRemToPx(0.12) auto 0 auto;
    }
    .ipt {
      padding: transformRemToPx(0.22) 0;
      display: flex;
      justify-content: center;
    }
    input {
      border: 1px solid #e9e9e9;
      height: transformRemToPx(0.72);
      width: transformRemToPx(2.8);
      border-radius: transformRemToPx(0.76);
      padding: 0 transformRemToPx(0.76);
      text-align: center;
    }
  }
  .summary {
    padding-top: transformRemToPx(0.44);
    text-align: center;
    letter-spacing: transformRemToPx(0.03);
  }
  .award {
    font-size: transformRemToPx(0.48);
    color: rgb(253, 124, 19);
    text-align: center;
    letter-spacing: transformRemToPx(0.03);
    font-weight: bold;
    height: transformRemToPx(1);
    line-height: transformRemToPx(1);
    margin: transformRemToPx(0.2) 0;
  }
  .two {
    position: absolute;
    width: transformRemToPx(2.27);
    top: transformRemToPx(2.78);
    left: transformRemToPx(0.7);
    z-index:2;
  }
  .mushroom {
    position: absolute;
    width: transformRemToPx(1.39);
    top: transformRemToPx(3.5);
    right: transformRemToPx(0.75);
    z-index:2;
  }
  .ok{
    background: #fff;
    padding: transformRemToPx(0.6) 0;
    text-align: center;
    position: absolute;
    width: transformRemToPx(5.54);
    border-radius: transformRemToPx(0.4);
    top: transformRemToPx(4);
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
