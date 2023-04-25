<template>
  <m-page>
    <m-header title=""/>
    <section class="page-main">
      <div class="bg">
        <div class="ordinal"><div>第1题</div></div>
        <div class="question"><div>股市里被称为2017年最贵的酒的是哪家公司？</div></div>
        <div class="answers" @click="chooseOption">
          <div class="item">贵州茅台</div>
          <div class="item">五粮液</div>
          <div class="item">口子窖</div>
          <div class="item">竹叶青</div>
        </div>
        <div class="btn"><img src="../../assets/guess/next.png" @click="nextOrComplete"></div>
        <div class="link">
          <div @click="popIntro">规则说明</div>
        </div>
      </div>
    </section>
    <intro v-model="introVisiable" :activity="activity"></intro>
  </m-page>
</template>

<script>
import intro from '../../components/intro'
import {rpc, getQueryParams} from '@core/bridge'

export default {
  components: {
    intro,
  },
  data() {
    return {
      introVisiable: false,
      activity: {}
    }
  },
  methods: {
    popIntro() {
      this.introVisiable = true;
    },
    nextOrComplete() {
      const url = location.href;
      location.href = url.slice(0, url.lastIndexOf('/')) + '/result.html';
    },
    chooseOption() {

    }
  },
  created() {
    console.log('urlParams', getQueryParams())
    this.activity = getQueryParams();
  }
}
</script>

<style lang="scss">
.guess_answer {
  .bg {
    background: url("../../assets/guess/bg_answer.png") no-repeat;
    background-size: 100%;
    position: relative;
  }
  .ordinal {
    padding-top: .5rem;
    height: .58rem;
    color: #ffffff;
    display: flex;
    align-items: center;
    div {
      padding: 0 .4rem;
      letter-spacing: .02rem;
    }
  }
  .question {
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);

    > div {
      width: 5.02rem;
      margin: 0 auto;
      font-size: .32rem;
      text-align: center;
      color: #F8E71C;
    }
  }
  .answers {
    margin-top: 2rem;
    height: 6.6rem;
    padding: 1.4rem 0 .4rem 0;

    .item {
      width: 5.02rem;
      margin: 0 auto;
      margin-bottom: .4rem;
      color: #3C52FF;
      height: 1.1rem;
      line-height: 1.1rem;
      text-align: center;
      font-size: .4rem;
      background: #ffffff;
      border-radius: .16rem;
    }
  }
  .btn {
    
    img {
      width: 4.32rem;
      margin: 0 auto;
    }
  }
  .link {
    margin-top: .8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: .5rem;

    > div {
      color: #0D9DF5;
      height: .64rem;
      line-height: .64rem;
      font-size: .38rem;
      border-bottom: 1px solid #0D9DF5;
    }
  }
}
</style>
