<template>
  <m-page>
    <m-header title=""/>
    <section class="page-main">
      <div class="bg">
        <div class="hint">
          战胜 <span>74%</span> 的人
        </div>
        <div class="interactive">
          <div class="congratuations">恭喜您获得</div>
          <div class="award">100积分</div>
          <div class="btns">
            <div class="records" @click="popHistory">中奖纪录</div>
            <div class="share" @click="popShare">分享战绩</div>
          </div>
        </div>
        <div class="close"><img src="../../assets/close.png" @click="back"></div>

      </div>
    </section>
    <share v-model="shareVisiable"></share>
    <history v-model="historyVisiable" :isBigTitle="true"></history>
  </m-page>
</template>

<script>
import share from '../../components/shareLayer'
import history from '../../components/winHistory'

export default {
  components: {
    share,
    history
  },
  data() {
    return {
      shareVisiable: false,
      historyVisiable: false,
    }
  },
  methods: {
    popHistory() {
      this.historyVisiable = true;
    },
    popShare() {
      this.shareVisiable = true;
    },
    back() {
      const url = location.href;
      location.href = url.slice(0, url.lastIndexOf('/')) + '/start.html';
    }
  }
}
</script>

<style lang="scss">
.guess_result {
  .bg {
    background: url("../../assets/guess/bg_pop.png") no-repeat;
    background-size: 100%;
    padding-bottom: 2rem;
  }
  .hint {
    padding-top: 1.6rem;
    margin: 0 auto;
    color: #ffffff;
    font-size: .4rem;
    text-align: center;
    height: .84rem;
    line-height: .84rem;

    span {
      color: #F8E71C;
      font-size: .6rem;
    }
  }
  .interactive {
    margin: .44rem auto .6rem auto;
    width: 6.16rem;
    height: 7.92rem;
    background: url("../../assets/guess/pop.png") no-repeat;
    background-size: 100%;
    text-align: center;
    letter-spacing: .02rem;
    font-weight: 600;

    .congratuations {
      padding-top: 2.8rem;
      height: .56rem;
      line-height: .56rem;
      font-size: .4rem;
    }
    .award {
      padding-top: .48rem;
      height: .92rem;
      line-height: .92rem;
      font-size: .66rem;
      letter-spacing: .04rem;
    }
    .btns {
      padding: 0 .12rem;
      margin-top: 1.8rem;
      display: flex;
      color: #ffffff;
      font-size: .32rem;
      

      > div {
        flex: 1;
        height: .88rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 .14rem;
        border-radius: .44rem;
      }
      .records {
        background: #0EB3FF;
      }
      .share {
        background: #FF7C0F;
      }
    }
  }
  .close {
    img {
      width: .66rem;
      height: .66rem;
      margin: 0 auto;
    }
  }
}
</style>
