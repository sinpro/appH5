<template>
  <div class="activities_turntable">
    <section>
      <div class="bg">
        <div class="wheel">
          <div class="wheel-item-wrap">
            <div class="wheel-item-main">
              <img src="../../assets/turntable/item.png" v-for="count in 8" :key="count" :style="itemStyle(count)">
            </div>
          </div>
          <img src="../../assets/turntable/pointer.png" class="pointer" ref="pointer" :class="pointerClass">
          <div class="remind" @click="startRotate">立即抽奖</div>
          <img src="../../assets/turntable/share.png" class="share" @click="popShare">
        </div>
        <div class="chances">
          今天还有&nbsp;<span>{{lotteryTimes}}</span>&nbsp;次机会
        </div>
        <div class="btn">
          <img src="../../assets/turntable/view_intro.png" @click="activityResultDetailFlag = true">
        </div>
      </div>
    </section>
    <share v-model="shareFlag"></share>
    <activity-desc v-model="activityResultDetailFlag" :activityDetail="activityDetail" @closeThis="activityResultDetailFlag = false"></activity-desc>
    <base-layout v-model="lastResult" :full="true" class="result">
      <div class="plate">
        <div class="ok" v-if="activityResult.prizeType != '00'">
          <div class="summary">恭喜你获得了</div>
          <div class="award">{{activityResult.prizeDesc}}</div>
          <div class="btn" @click="lastResult=false">朕收下了</div>
        </div>
        <div class="no" v-else>
          <div class="summary">非常遗憾</div>
          <div class="award">没有中奖</div>
          <div class="btn" @click="lastResult=false">确定</div>
        </div>
      </div>
    </base-layout>
  </div>
</template>

<script>
import { computedAttr } from '../utils'
import baseLayout from '../../components/baseLayout'
import activityDesc from '../../components/activityDesc'
import share from '../../components/share'
import mixins from '../utils/mixins'
export default {
  mixins: [mixins],
  inheritAttrs: false,
  components: {
    activityDesc,
    share,
    baseLayout
  },
  data() {
    return {
      lastResult: false,
      thatStatus: true,
      shareFlag: false,
      activityResultDetailFlag: false,
      lastStatus: 0,
      nowStatus: 0,
      pointerClass: ''
    }
  },
  computed: {
    ...computedAttr()
  },
  methods: {
    itemStyle(count){
      //圆心，x和y都是2.4
      const center = 2.4
      //半径,半径需要比直实的半径小，否则奖品就会超出圆盘
      const r = 1.8
      //每个奖品角度的刻度值,
      const a = 45 * count - 22.2
      //把角度转成弧度
      const deg = (2 * Math.PI / 360) * a
      //奖品x1坐标
      const x = center + Math.sin(deg) * r
      //奖品y1坐标
      const y = center - Math.cos(deg) * r

      return {
        left: `${x}rem`,
        top: `${y}rem`
      }
    },
    startRotateDone(){
      const _nowStatus = parseInt(7*Math.random())
      const _lastStatus = this.nowStatus
      const Classn = this.pointerClass ? 'pointerAnimation' : 'firstPointerAnimation'
      this.lastStatus = _lastStatus
      this.nowStatus = _nowStatus
      this.pointerClass = `${Classn}-${_lastStatus}-${_nowStatus}`
    },
    startRotate() {
      if(!this.thatStatus) return
      this.thatStatus = false
      this.getActivityResult().then(() => {
        this.startRotateDone()
      })
    }
  },
  created(){
    this.$nextTick(() => {
      this.$refs.pointer.addEventListener("webkitAnimationEnd", e => {
        //抽奖动画结束
        this.thatStatus = true
        this.lastResult = true
      })
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../utils/scss/transform.scss';
.activities_turntable {
  @for $u from 0 through 0{
    @for $t from 0 through 7{
      @keyframes firstPointerAnimation-#{$u}-#{$t}{
        0%{ transform: rotate(0deg)};
        100%{ transform: rotate(1440+$t*45+22.5deg)}
      }
    }
  };
  @for $i from 0 through 7{
    @for $k from 0 through 7{
      @keyframes pointerAnimation-#{$i}-#{$k}{
        0%{ transform: rotate($i*45+22.5deg)};
        100%{ transform: rotate(1440+$k*45+22.5deg)}
      }
    }
  };

  .bg {
    background: url(../../assets/turntable/bg.png) no-repeat;
    background-size: 100%;
    padding-top: transformRemToPx(4.02);
    padding-bottom: transformRemToPx(0.84);
    position: relative;
  }
  .wheel {
    width: transformRemToPx(6.27);
    height: transformRemToPx(6.17);
    margin: 0 auto;
    background: url(../../assets/turntable/wheel.png) no-repeat;
    background-size: 100%;
    position: relative;
    .wheel-item-wrap{
      position: absolute;
      left: transformRemToPx(0.78);
      top: transformRemToPx(0.68);
      width: transformRemToPx(4.8);
      height: transformRemToPx(4.8);
      border-radius: 50%;
      overflow: hidden;
    }
    .wheel-item-main{
      width: 100%;
      height: 100%;
      position: relative;
      img{
        width: transformRemToPx(0.58);
        position: absolute;
        transform: translate(-50%, -50%);
      }
    }
    .share {
      position: absolute;
      width: transformRemToPx(1.14);
      height: transformRemToPx(1.14);
      bottom: transformRemToPx(-0.65);
      right: transformRemToPx(-0.4);
    }
    .pointer {
      position: absolute;
      width: transformRemToPx(1.32);
      height: transformRemToPx(1.66);
      top: transformRemToPx(2.1);
      left: transformRemToPx(2.52);
      transform-origin: transformRemToPx(0.66) transformRemToPx(1);
      
    }
    @for $a from 0 through 0{
      @for $b from 0 through 7{
        .firstPointerAnimation-#{$a}-#{$b}{
          animation: firstPointerAnimation-#{$a}-#{$b} 3s ease-in-out;
          animation-fill-mode: forwards
        }
      }
    }
    @for $o from 0 through 7{
      @for $p from 0 through 7{
        .pointerAnimation-#{$o}-#{$p}{
          animation: pointerAnimation-#{$o}-#{$p} 3s ease-in-out;
          animation-fill-mode: forwards
        }
      }
    }
    

    .remind {
      position: absolute;
      top: transformRemToPx(2.44);
      left: transformRemToPx(2.52);
      width: transformRemToPx(0.92);
      height: transformRemToPx(0.92);
      display: flex;
      align-items: center;
      /* justify-content: center; */
      /* font-size: .36rem; */
      line-height: 1.2;
      letter-spacing: transformRemToPx(0.04);
      font-weight: bold;
      color: #fff;
      padding: transformRemToPx(0.2);
      padding-left: transformRemToPx(0.24);
      text-align: center;
    }

  }
  .chances {
    text-align: center;
    color: #ffffff;
    margin: transformRemToPx(0.6) auto;

    span {
      color: #F0472B;
    }
  }
  .btn img {
    width: transformRemToPx(4.68);
    height: transformRemToPx(0.78);
    margin: 0 auto;
    padding-top: transformRemToPx(0.4);
  }
  .result .plate {
    margin: transformRemToPx(2.8) auto;
    padding: transformRemToPx(0.02);
    width: transformRemToPx(6.7);
    height: transformRemToPx(6.9);
    background: url(../../assets/turntable/plate.png) no-repeat;
    background-size: 100%;

    .summary {
      text-align: center;
      margin: transformRemToPx(2.2) auto 0;
      letter-spacing: transformRemToPx(0.02);
    }
    .award {
      color: rgb(253, 124, 19);
      font-size: transformRemToPx(0.46);
      margin: transformRemToPx(0.16) auto transformRemToPx(0.09);
      text-align: center;
      letter-spacing: transformRemToPx(0.03);
    }
    .ipt {
      padding: transformRemToPx(0.02) 0;
      display: flex;
      justify-content: center;
    }
    input {
      border: 1px solid #e9e9e9;
      height: transformRemToPx(0.72);
      width: transformRemToPx(2.8);
      border-radius: transformRemToPx(0.36);
      padding: 0 transformRemToPx(0.36);
      text-align: center;
    }
    .btn {
      width: transformRemToPx(2.6);
      height: transformRemToPx(0.72);
      line-height: transformRemToPx(0.72);
      text-align: center;
      margin: transformRemToPx(0.74) auto;
      color: #ffffff;
      font-weight: bold;
      border-radius: transformRemToPx(0.36);
      letter-spacing: transformRemToPx(0.03);
      background: rgb(34, 84, 212);

      &.not-app {
        margin-top: transformRemToPx(0.2);
      }
    }
  }
}

</style>
