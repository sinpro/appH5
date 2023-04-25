<template>
  <div class="add_card_success">
    <m-header
      bar-bottom-line-color="#ffffff"
      :show-left-menu="false"
    />
    <success-result
      title="绑卡成功"
      text="恭喜您绑卡成功，赶快开启手机银行体验之旅"
    />
    <div class="btn_area">
      <button
        class="btn-lg"
        @click="handleBtnClick"
      >
        立即登录
      </button>
    </div>
  </div>
</template>

<script>
import mHeader from '@/common/components/header'
import successResult from '@/common/components/success_result'

export default {
  components: {
    mHeader,
    successResult,
  },

  data() {
    return {
      mobileNo: '',
    }
  },

  created() {
    app.api.updateUserInfo()
    this.getRegisterMobileNo()

    app.api.closeOther()
    app.api.showLeftMenu(false)
  },

  methods: {
    handleBtnClick() {
      let bridge = window.AlipayJSBridge || window.FlameJSBridge
      bridge.call('sendBroadcast', {
        eventName: 'loginMobile',
        data: { mobile: this.mobileNo },
      })

      app.api.closeAll()
    },

    getRegisterMobileNo() {
      app.api.getSessionStorage('registerMoblileNo').then(response => {
        const { mobileNo } = JSON.parse(response)

        this.mobileNo = mobileNo
      })
    },
  },
}
</script>

<style lang="scss">
.add_card_success {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;

  .btn_area {
    text-align: center;
    margin-top: 1.6rem;
  }
}
</style>
