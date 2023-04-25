<template>
  <div class="register-result">
    <m-header
      :show-left-menu="false"
      bar-bottom-line-color="#ffffff"
    />
    <div class="main-container">
      <div class="main-container__img">
        <img
          class="img"
          :src="imgUrl"
        >
      </div>
      <div class="main-container__title">
        <span>注册成功</span>
      </div>
      <div class="describe">
        <ynet-tip>
          <p class="describe-tip">
            恭喜您已成功开通手机银行！
          </p>
        </ynet-tip>
        <div class="btn-box">
          <button
            class="btn-lg"
            @click="go_login"
          >
            立即登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mHeader from '@/common/components/header'
import ynetTip from '@/common/components/ynet_tip'

export default {
  components: {
    mHeader,
    ynetTip,
  },

  data() {
    return {
      imgUrl: require('@/common/cssBundle/assets/registered/successfull.png'),
    }
  },

  created() {
    app.api.showLeftMenu(false)
    app.api.trackEvent('MB_zhucedl_zhuce_06')
  },

  methods: {
    go_login() {
      app.api.closeAll()
    },
  },
}
</script>

<style lang="scss" rel="stylesheet/scss">
.register-result {
  background-color: #fff;
  height: 100%;

  .main-container {
    padding: 1.12rem 0.32rem 0.01rem 0.32rem;
    .main-container__img {
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .img {
        height: 1.44rem;
      }
    }
    .main-container__title {
      margin-top: 0.64rem;
      text-align: center;
      font-size: 0.36rem;
      line-height: 1;
      color: #333;
    }
    .main-container__des {
      margin-top: 0.5rem;
      margin-bottom: 0.8rem;
      font-size: 0.22rem;
      line-height: 0.24rem;
      color: #b3b3b3;
    }
    .describe {
      .ynet-tip {
        margin-top: 0.32rem;
        margin-bottom: 0;
      }
      .mt24 {
        margin-top: 0.24rem;
      }
      .describe-tip {
        margin: 0 auto;
        text-align: center;
      }
    }
  }

  .btn-box {
    margin-top: 1.6rem;
  }
}
</style>
