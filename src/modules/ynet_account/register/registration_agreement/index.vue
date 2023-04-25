<template>
  <div class="registration_agreement">
    <m-header
      :left-menu="[{ icontype: 'back_black' }]"
      bar-bottom-line-color="#333333"
    />
    <div class="article">
      <!--            <div class="article_section">-->
      <!--                <div class="article_title">一、负责说明</div>-->
      <!--                <p>2.1 保宝网的具体内容由本站根据实际情况提供。</p>-->
      <!--                <p>-->
      <!--                    2.2 本站仅提供相关的网络服务，除此之外与相关网络服务有关的设备(如个人电脑、手机、及其他与接入互联网或移动网有关的装置)及所需的费用(如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费)均应由用户自行负担。-->
      <!--                </p>-->
      <!--            </div>-->
      <div class="article_section">
        <p>{{ content }}</p>
      </div>
    </div>
    <div class="btn-box">
      <button
        class=" btn-lg"
        @click="handleAgreeClick"
      >
        同意协议
      </button>
    </div>
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
      content: '',
    }
  },

  created() {
    this.getAgreement()
  },

  methods: {
    handleAgreeClick() {
      app.api.closeToPage(
        '/ynet_account/register/mobile_number_register.html',
        { hasChecked: true }
      )
    },

    getAgreement() {
      const data = {
        agreementCode: 'bank_register',
        agreementChannel: 'USER',
      }

      app.api.rpc('UR0036', data).then(response => {
        this.content = response.agreementContent
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.registration_agreement {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;

    .article {
        padding: 0 0.32rem;
        color: #333;

        .article_section {
            padding-top: 0.4rem;
        }

        .article_title {
            font-size: 0.32rem;
            line-height: 0.44rem;
            font-weight: 600;
            padding-bottom: 0.2rem;
        }

        p {
            font-size: 0.28rem;
            line-height: 0.4rem;
        }
    }

    .btn-box {
        padding-top: 0.8rem;
        padding-bottom: 0.64rem;
    }
}
</style>
