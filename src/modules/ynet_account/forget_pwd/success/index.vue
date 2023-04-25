<template>
  <div class="success">
    <m-header
      :left-menu="[{icontype:'back_black'}]"
      bar-bottom-line-color="#333333"
      :prevent-back="true"
      @leftHandler="start"
    />
    <div style="text-align:center">
      <img
        :src="faceImg"
        alt=""
      >
      <div class="supText">
        登录密码设置成功
      </div>
      <div class="explain">
        您可使用手机号{{ phoneNumber }}登录
      </div>
    </div>
    <button @click="start">
      立即登录
    </button>
  </div>
</template>

<script>
import mHeader from '@/common/components/header'
export default {
  components:{
    mHeader
  },
  data() {
    return {
      faceImg: require('./success.png'),
      phoneNumber: ''
    }
  },
  mounted() {
    app.api.trackEvent("MB_zhucedl_dl_10",{})
    this.phoneNumber = app.params.phone.slice(0,3) + '****' +  app.params.phone.slice(-4)
  },
  methods: {
    start() {
      app.api.trackEvent("MB_zhucedl_dl_11",{})
      app.api.closeAll()
    }
  }
}
</script>

<style lang="scss" scoped>
    .success{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        text-align: center;
    }
    img{
        width:1.6rem;
        height:1.6rem;
        display: inline-block;
        margin-top: 1.2rem;
        margin-bottom: 0.32rem;
    }
    .supText{
        font-family: 'PingFangSC-Medium';
        color: #333333;
        font-size: 0.36rem;
    }
    .explain{
        display: inline-block;
        width: 5.2rem;
        margin-top: 0.2rem;
        font-size: 0.28rem;
        color:#999;
    }
    button {
        width: 6.86rem;
        height: 0.88rem;
        background: #6161F2;
        line-height: 0.88rem;
        color: #fff;
        margin: 1.4rem 0 0.32rem 0;
        font-size: 0.36rem;
        border-radius: 0.1rem;
    }
    .attention{
        font-size: 0.24rem;
    }
</style>

