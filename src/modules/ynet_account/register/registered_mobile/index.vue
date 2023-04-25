<template>
  <div class="registered_mobile">
    <img
      :src="require('@/common/cssBundle/assets/registered/avatar.png')"
    >
    <p class="mobileNo">
      {{ displayMobileNo }}
    </p>
    <p class="label">
      该手机号已注册，请确认是否为本人账户？
    </p>
    <div style="margin-top: 1.6rem;">
      <button
        class="btn-lg"
        @click="handleConfirmClick"
      >
        是我的，立即登录
      </button>
      <p
        class="change"
        @click="handleChangeClick"
      >
        换个手机号注册
      </p>
    </div>
    <!--        <div class="problem">-->
    <!--            遇到问题？-->
    <!--        </div>-->
  </div>
</template>

<script>
import mHeader from '@/common/components/header'

export default {
  components: {
    mHeader,
  },

  data() {
    return {
      mobileNo: '',
    }
  },

  computed: {
    displayMobileNo() {
      if (this.mobileNo.length !== 0) {
        return `${this.mobileNo.slice(0, 3)}****${this.mobileNo.slice(7)}`
      } else {
        return ''
      }
    },
  },

  created() {
    if (!this.isEmptyObj(app.params)) {
      this.mobileNo = app.params.mobileNo
    }
  },

  methods: {
    handleConfirmClick() {
      let bridge = window.AlipayJSBridge || window.FlameJSBridge
      bridge.call('sendBroadcast', {
        eventName: 'loginMobile',
        data: {
          mobile: this.mobileNo,
        },
      }, function(data) {

      })
      app.api.closeAll()
    },

    handleChangeClick() {
      app.api.pushWindow('/ynet_account/register/mobile_number_register.html')
    },

    isEmptyObj(obj) {
      for (let i in obj) {
        return false
      }

      return true
    },
  },
}
</script>

<style lang="scss" scoped>
.registered_mobile {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    text-align: center;

    img {
        width: 1.6rem;
        height: 1.6rem;
        vertical-align: middle;
        margin: auto;
        margin-top: 0.48rem;
    }

    .mobileNo {
        margin-top: 0.24rem;
        color: #333;
        font-size: 0.32rem;
        line-height: 0.44rem;
    }

    .label {
        color: #333;
        font-size: 0.32rem;
        line-height: 0.44rem;
        margin-top: 0.8rem;
    }

    .change {
        color: #6161f2;
        font-size: 0.32rem;
        line-height: 0.44rem;
        margin-top: 0.48rem;
    }

    .problem {
        color: #6161f2;
        font-size: 0.32rem;
        line-height: 0.44rem;
        position: fixed;
        bottom: 0.56rem;
        left: 0;
        right: 0;
    }
}
</style>
