<template>
  <m-page>
    <m-header title=""/>
    <section class="page-main">
      <div class="bg">
        <div class="share"><img src="../../assets/guess/share.png" @click="popShare"></div>
        <div class="btn"><img src="../../assets/guess/start.png" @click="startAnswer"></div>
        <div class="link">
          <div @click="popIntro">规则说明</div>
        </div>
      </div>
    </section>
    <intro v-model="introVisiable" :activity="activity"></intro>
    <share v-model="shareVisiable"></share>
  </m-page>
</template>

<script>
import intro from '../../components/intro'
import share from '../../components/shareLayer'
import { rpc } from '@core/bridge'

export default {
  components: {
    intro,
    share,
  },
  data() {
    return {
      introVisiable: false,
      shareVisiable: false,
      activity: {}
    }
  },
  methods: {
    startAnswer() {
      const url = location.href;
      location.href = url.slice(0, url.lastIndexOf('/')) + '/answer.html';
    },
    popShare() {
      this.shareVisiable = true;
    },
    popIntro() {
      this.introVisiable = true;
    }
  },
  created() {
    rpc('JA00010', {marketId: '10000149'}).then(res => { // 活动详情
      this.activity = res;
      console.log('JA00010', res)
    })
  }
}
</script>

<style lang="scss">
.guess_start {
  .bg {
    background: url("../../assets/guess/bg.png") no-repeat;
    background-size: 100%;
  }
  .share {
    padding-top: .26rem;
    img {
      width: 1.48rem;
    }
  }
  .btn {
    margin-top: 8.32rem;

    img {
      width: 5.4rem;
      margin: 0 auto;
    }
  }
  .link {
    margin-top: 2.86rem;
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
