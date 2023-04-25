<template>
  <section class="activities_scratch">
    <div class="bg">
      <div class="rules">
        <img src="../../assets/scratch/rules.png" @click="activityResultDetailFlag = true">
      </div>
      <div class="rolling">
        <marquee>
          <span v-for="(item, index) in activityResultPage" :key="index">恭喜{{item.mobile | mobileMask}}获奖</span>
        </marquee>
      </div>
      <div class="chances">
        今天还有 <span>{{lotteryTimes || 0}}</span> 次机会
      </div>
      <div class="area" id="area">
        <canvas id="cas" width="288" height="150" v-show="canvas"></canvas>
        <div class="loading" v-show="status == 0">{{desc}}</div>
        <div class="won" v-show="status != 0 && activityResult.prizeType != '00'">
          <div class="congratulations">恭喜您刮出</div>
          <div class="award">{{activityResult.prizeDesc}}</div>
          <div class="control">
            <div class="btn" @click="receive">继续抽奖</div>
          </div>
        </div>
        <div class="pity" v-show="status != 0 && activityResult.prizeType == '00'">
          <div class="control">
            <div class="btn" @click="receive">再试一次</div>
          </div>
        </div>
      </div>
      <div class="btns">
        <div class="btn">
          <img src="../../assets/scratch/records.png" @click="openActivityResultHistory">
        </div>
        <div class="btn">
          <img src="../../assets/scratch/share.png" @click="popShare">
        </div>
      </div>
      <div class="count-down">
        距活动结束还有：
        <span>{{h | formatDate}}</span>&nbsp;:&nbsp;<span>{{m | formatDate}}</span>&nbsp;:&nbsp;<span>{{s | formatDate}}</span>
      </div>
    </div>
    <activity-desc v-model="activityResultDetailFlag" :activityDetail="activityDetail" @closeThis="activityResultDetailFlag = false"></activity-desc>
    <activity-win-history v-model="activityResultHistoryFlag" :activityResultHistory="activityResultHistory" @closeThis="activityResultHistoryFlag = false"></activity-win-history>
    <share v-model="shareFlag"></share>
  </section>
</template>

<script>
import { computedAttr } from '../utils'
import activityDesc from '../../components/activityDesc'
import share from '../../components/share'
import activityWinHistory from '../../components/activityWinHistory'
import mixins from '../utils/mixins'
export default {
  mixins: [mixins],
  inheritAttrs: false,
  filters: {
    formatDate(val){
      return val < 10 ? '0'+val : val
    },
    mobileMask(val){
      if(!val) return
      return String(val).replace(/^(\d{3})\d+(\d{4})$/, ($1,$2,$3) => $2 + '****' + $3 )
    }
  },
  components: {
    activityDesc,
    share,
    activityWinHistory
  },
  computed: {
    ...computedAttr(),
    desc(){
      if(this.lotteryTimes <= 0){
        this.$emit('reset')
        return '抽奖机会已用完'
      }else{
        return 'loading'
      }
    }
  },
  data() {
    return {
      status: 0,
      init: false,
      shareFlag: false,
      activityResultDetailFlag: false,
      activityResultHistoryFlag: false,
      canvas: true,
      h: 0,
      m: 0,
      s: 0
    }
  },
  methods: {
    openActivityResultHistory(){
      this.activityResultHistoryFlag = true
      this.getActivityResultHistory()
    },
    initCanvas() {
      let that = this
      let canvas = document.getElementById("cas")
      let ctx = canvas.getContext("2d")
      let x1
      let y1
      let a = 20
      let timeout
      let totimes = 10
      let jiange = 20
      let img = new Image()
      let hastouch = "ontouchstart" in window ? true : false
      let tapstart = hastouch ? "touchstart" : "mousedown"
      let tapmove = hastouch ? "touchmove" : "mousemove"
      let tapend = hastouch ? "touchend" : "mouseup"
      let tapmoveHandler = e => {
        clearTimeout(timeout)
        e.preventDefault()
        let _getPosition = (cv, e) => {
          let rect = cv.getBoundingClientRect()
          return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          }
        }

        if (e.changedTouches) {
          e = e.changedTouches[e.changedTouches.length - 1];
        }

        let rect = _getPosition(canvas, e)
        ctx.beginPath();
        ctx.arc(rect.x, rect.y, 28 * 0.8, 0, Math.PI * 2, true)
        ctx.fill()
      }
      let tapstartHandler = e => {
        
        clearTimeout(timeout)
        e.preventDefault()
        x1 = hastouch ? e.targetTouches[0].pageX : e.clientX - canvas.offsetLeft
        y1 = hastouch ? e.targetTouches[0].pageY : e.clientY - canvas.offsetTop

        canvas.addEventListener(tapmove, tapmoveHandler)
      }
      let tapendHandler = e => {
        canvas.removeEventListener(tapmove, tapmoveHandler)
        timeout = setTimeout(() => {
          let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          let dd = 0
          for (let x = 0; x < imgData.width; x += jiange) {
            for (let y = 0; y < imgData.height; y += jiange) {
              let i = (y * imgData.width + x) * 4;
              if (imgData.data[i + 3] > 0) {
                dd++;
              }
            }
          }
          if (dd / (imgData.width * imgData.height / (jiange * jiange)) < 0.9) {
            that.canvas = false
            if(that.lotteryTimes > 0){
              // this.$emit('run')
              this.getActivityResult().then(res => {
                this.status = 1
              })
            }
          }
        }, totimes);
      }

      canvas.width = document.getElementById("area").clientWidth
      canvas.height = document.getElementById("area").clientHeight
      canvas.removeEventListener(tapstart, tapstartHandler)
      canvas.removeEventListener(tapmove, tapmoveHandler)
      canvas.removeEventListener(tapend, tapendHandler)
      const tapClip = () => {
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.lineWidth = a * 2
        ctx.globalCompositeOperation = "destination-out"
        if(!that.init){
          canvas.addEventListener(tapstart, tapstartHandler)
          canvas.addEventListener(tapend, tapendHandler)
          that.init = true
        }
      } 

      img.src = require('../../assets/scratch/cover.png')
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        tapClip()
      }
    },
    receive() {
      this.canvas = true
      this.initCanvas()
      this.status = 0
      this.desc = 'loading'
    },
    countDown(){
      const targetTime = (() => {
        const { gameEndTime } = this.activityDetail
        return new Date(String(gameEndTime).replace(/^(\d{8})(\d{6})$/, ($1,$2,$3) => {
          const d = $2.replace(/^(\d{4})(\d{2})(\d{2})$/, ($1,$2,$3,$4) =>  `${$2}/${$3}/${$4}`)
          const t = $3.replace(/^(\d{2})(\1)(\1)$/, ($1,$2,$3,$4) => `${$2}:${$3}:${$4}`)
          return `${d} ${t}`
        })).getTime()
      })()

      const times = () => {
        const nowTime = new Date().getTime()
        const leftTime = targetTime - nowTime
        
        if(leftTime <= 0){ return }
        let d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
        this.h = Math.floor(leftTime / 1000 / 60 / 60 % 24) + d *24
        this.m = Math.floor(leftTime / 1000 / 60 % 60)
        this.s = Math.floor(leftTime / 1000 % 60)

        setTimeout(times, 1000)
      }

      times()
    }
  },
  created() {
    this.getActivityResultHistory()
    this.getActivityResultPage()
    this.$nextTick(() => {
      this.initCanvas()
    })
  },
  watch: {
    activityDetail(val){
      this.countDown()
    }
  }

}
</script>

<style lang="scss">
@import '../utils/scss/transform.scss';
.activities_scratch {
  background: rgb(97, 2, 170);
  .bg {
    background: url(../../assets/scratch/bg.png) no-repeat;
    background-size: 100%;
    // padding-bottom: .4rem;
  }
  .rules {
    position: relative;
    height: transformRemToPx(0.58);
    padding: transformRemToPx(0.16) 0;

    img {
      width: transformRemToPx(1.42);
      right: 0;
      position: absolute;
    }
  }
  .rolling {
    color: #ffffff;
    height: transformRemToPx(0.6);
    margin-top: transformRemToPx(4.8);
    padding: 0 transformRemToPx(0.2);
    overflow:hidden;
    span{
      display: inline-block;
      padding: 0 transformRemToPx(0.2);
    }
  }
  .chances {
    color: #4A4A4A;
    font-size: transformRemToPx(0.36);
    text-align: center;
    padding-top: transformRemToPx(0.66);

    span {
      color: #F0472B;
    }
  }
  .area {
    width: transformRemToPx(5.76);
    margin: transformRemToPx(0.76) auto;
    position: relative;

    img {
      width: 100%;
    }

    #cas {
      position: absolute;
      z-index: 5;
      width: 100%;
      height: 100%;
      opacity: 1;
      -webkit-transition:opacity .5s;
      -ms-transition:opacity .5s;
      -moz-transition:opacity .5s;
    }
    .none {
      display: none;
    }
    > div {
      width: 5.76;
      height: 3rem;
    }
    .won {
      background: url(../../assets/scratch/won.png) no-repeat;
      background-size: 100%;

      .control {
        margin-top: transformRemToPx(0.2);

        .btn {
          color: #ffffff;
          width: transformRemToPx(1.84);
          height: transformRemToPx(0.56);
          margin: 0 auto;
          border-radius: transformRemToPx(0.28);
          background: #F72745;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .congratulations {
      height: transformRemToPx(0.4);
      line-height: transformRemToPx(0.4);
      padding-top: transformRemToPx(0.56);
      color: #F72745;
      text-align: center;
    }
    
    .award {
      height: transformRemToPx(0.74);
      line-height: transformRemToPx(0.74);
      font-size: transformRemToPx(0.52);
      color: #F72745;
      text-align: center;
      font-weight:500;

      .control {
        padding-top: transformRemToPx(1.9);

        .btn {
          color: #ffffff;
          width: transformRemToPx(1.84);
          height: transformRemToPx(0.56);
          margin: 0 auto;
          border-radius: transformRemToPx(0.28);
          background: #F72745;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .pity {
      background: url(../../assets/scratch/nothing.png) no-repeat;
      background-size: 100%;

      .control {
        padding-top: transformRemToPx(1.9);

        .btn {
          color: #ffffff;
          width: transformRemToPx(1.84);
          height: transformRemToPx(0.56);
          margin: 0 auto;
          border-radius: transformRemToPx(0.28);
          background: #F72745;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .btns {
    padding: transformRemToPx(0.4) transformRemToPx(0.25) 0;
    display: flex;

    .btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      width: transformRemToPx(3.12);
    }
  }
  .count-down {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    padding: transformRemToPx(0.4);

    span {
      display: inline-block;
      padding: 0 transformRemToPx(0.1);
      min-width: transformRemToPx(0.42);
      height: transformRemToPx(0.42);
      text-align: center;
      background: rgb(77,17,132);
      &:first-child{
        min-width: auto
      }
    }
  }
  .loading{
    text-align:center;
    line-height: transformRemToPx(3);
    font-size: transformRemToPx(0.48);
    font-weight: bold;
  }
}
</style>
