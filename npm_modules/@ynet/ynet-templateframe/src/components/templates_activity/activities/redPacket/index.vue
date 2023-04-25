<template>
<div class="activities_redPacket">
  <section>
    <div class="bg">
      <div class="rules"><img src="../../assets/packet/rules.png" @click="activityResultDetailFlag = true"></div>
      <div class="chances">
        今天还有 <span>{{lotteryTimes}}</span> 次抽奖机会
      </div>
      <div class="resultInfo">
        <div class="award" v-show="activityResult.prizeType && activityResult.prizeType != '00'">
          <div class="congratuations">恭喜获得</div>
          <div class="name">迪士尼门票</div>
          <div class="level">三等奖</div>
        </div>
        <div class="sorry" v-show="activityResult.prizeType && activityResult.prizeType == '00'">
          <img src="../../assets/packet/thx.png" alt="">
          <p>很遗憾</p>
          <p>您与大奖擦肩而过</p>
        </div>
      </div>
      <div class="receive">
        <a href="javascript:void(0)" @click="align">再试一次</a>
      </div>
      <div class="share">
        <img src="../../assets/packet/share.png" @click="popShare">
      </div>
      <div class="link">
        <div @click="openActivityResultHistory">查看中奖结果</div>
      </div>
    </div>
  </section>
  <share v-model="shareFlag"></share>
  <activity-desc v-model="activityResultDetailFlag" :activityDetail="activityDetail" @closeThis="activityResultDetailFlag = false"></activity-desc>
  <activity-win-history v-model="activityResultHistoryFlag" :activityResultHistory="activityResultHistory" @closeThis="activityResultHistoryFlag = false"></activity-win-history>
</div>
</template>

<script>
import { computedAttr } from '../utils'
import share from '../../components/share'
import activityDesc from '../../components/activityDesc'
import activityWinHistory from '../../components/activityWinHistory'
import mixins from '../utils/mixins'
export default {
  mixins: [mixins],
  inheritAttrs: false,
  components: {
    activityWinHistory,
    activityDesc,
    share
  },
  computed: {
    ...computedAttr()
  },
  data() {
    return {
      compStatus: true,
      shareFlag: false,
      activityResultDetailFlag: false,
      activityResultHistoryFlag: false
    }
  },
  methods: {
    openActivityResultHistory(){
      this.activityResultHistoryFlag = true
      this.getActivityResultHistory()
    },
    align(){
      if(this.compStatus){
        this.compStatus = false
        this.getActivityResult()
        setTimeout(() => {
          this.compStatus = true
        }, 500)
      }
    }
  },
  created(){
    this.getActivityResultHistory()
    this.getActivityResult()
  }
}
</script>

<style lang="scss" scoped>
@import '../utils/scss/transform.scss';
.activities_redPacket {
  .bg {
    background: url(../../assets/packet/bg.png) no-repeat;
    background-size: 100%;
  }
  .rules {
    height: transformRemToPx(1.12);
    position: relative;

    img {
      width: transformRemToPx(0.94);
      height: transformRemToPx(1.12);
      position: absolute;
      right: transformRemToPx(0.4);
    }
  }
  .chances {
    color: #BC9550;
    text-align: center;
    font-size: transformRemToPx(0.36);
    padding-top: transformRemToPx(2.98);
    height: transformRemToPx(0.5);
    line-height: transformRemToPx(0.5);
    span {
      color: #F3311E;
    }
  }
  .resultInfo{
    height: transformRemToPx(5);
    overflow:hidden;
  }
  .award {
    padding-top: transformRemToPx(1.14);
    color: #F3311E;
    text-align: center;
    font-size: transformRemToPx(0.32);
    // height: .44rem;
    line-height: transformRemToPx(0.44);
    font-weight: 500;
    letter-spacing: transformRemToPx(0.01);

    .name {
      padding-top: transformRemToPx(0.26);
      height: transformRemToPx(0.9);
      line-height: transformRemToPx(0.9);
      font-size: transformRemToPx(0.64);
      letter-spacing: transformRemToPx(0.03);
    }
    .level {
      color: #C8A66A;
    }
  }
  .sorry{
    color: #9B9B9B;
    text-align:center;
    font-size: transformRemToPx(0.4);
    img{
      width: transformRemToPx(2);
      margin: transformRemToPx(0.6) auto transformRemToPx(0.1) auto;
    }
  }
  .receive {
    a{
      background: linear-gradient(to right, rgba(236, 173, 100, 1), rgba(253, 225, 179, 1)); 
      color: #ED333E;
      font-size:transformRemToPx(0.38);
      text-align:center;
      display: block;
      width: transformRemToPx(2.94);
      margin: 0 auto;
      border-radius: transformRemToPx(0.4);
      letter-spacing: 2px;
      padding: transformRemToPx(0.1) 0;
    }
    img {
      width: transformRemToPx(2.94);
      margin: 0 auto;
    }
  }
  .share {
    padding-top: transformRemToPx(1.3);

    img {
      width: transformRemToPx(5.4);
      margin: 0 auto;
    }
  }
  .link {
    padding: transformRemToPx(0.54) 0 transformRemToPx(0.64) 0;
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      height: transformRemToPx(0.52);
      line-height: transformRemToPx(0.52);
      color: #B76806;
      font-size: transformRemToPx(0.38);
      border-bottom: 2px solid #B76806;
    }
  }
}
</style>
