<template>
  <div class="register_success_openAccount">
    <m-header
      :prevent-back="true"
      :left-menu="[{ icontype: 'close_black' }]"
      bar-bottom-line-color="#333333"
      @leftHandler="link2Login"
    />
    <div class="open_proc">
      <div class="open_procLine">
        <div class="open_procLineInner" />
      </div>
      <div class="open_procWrapper">
        <div class="open_procItem">
          <div class="open_procItemIcon active" />
          <div class="open_procDesc">
            <div class="open_procText">
              手机号注册
            </div>
            <div class="open_procLabel">
              已完成
            </div>
          </div>
        </div>
        <div class="open_procItem">
          <div class="open_procItemIcon" />
          <div class="open_procDesc">
            <div class="open_procText">
              身份验证
            </div>
            <div class="open_procLabel">
              待完成
            </div>
          </div>
        </div>
        <div class="open_procItem">
          <div class="open_procItemIcon" />
          <div class="open_procDesc">
            <div class="open_procText">
              绑定银行卡
            </div>
            <div class="open_procLabel">
              待完成
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="open_title">
      开启后可享受更多银行服务
    </div>
    <div class="open_ad">
      <div class="open_adItem" @click="banner('ad1', 1)">
        <img :src="require('@/common/cssBundle/assets/registered/ad.png')">
      </div>
      <div class="open_adItem" @click="banner('ad2', 2)">
        <img :src="require('@/common/cssBundle/assets/registered/ad.png')">
      </div>
      <div class="open_adItem" @click="banner('ad3', 3)">
        <img :src="require('@/common/cssBundle/assets/registered/ad.png')">
      </div>
    </div>
    <div class="open_btn">
      <button
        class="btn-lg"
        @click="link2AddBankCardHome"
      >
        我要开户
      </button>
      <p
        class="open_notNow"
        @click="link2Login"
      >
        暂不开户
      </p>
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
      hasCheckedID: false,
    }
  },

  created() {
    this.getHasCheckedID()
    app.api.trackEvent('MB_zhucedl_zhuce_06')
  },

  methods: {
    link2AddBankCardHome() {
      if (this.hasCheckedID) {
        app.api.pushWindow('/ynet_account/register/add_bank_card_home.html')
      } else {
        app.api.setSessionStorage(
          'validUserIdentify',
          JSON.stringify({
            backPage: '/ynet_account/register/add_bank_card.html',
          })
        )
        app.api.pushWindow('/ynet_account/register/check_identity.html')
      }
      app.api.trackEvent('MB_zhucedl_zhuce_08')
    },
    banner(name, id) {
      app.api.trackEvent('MB_zhucedl_zhuce_07', {
        advertiseName: name,
        advertiseID: id
      })
    },
    link2Login() {
      app.api.trackEvent('点击注册结果页跳过按钮')
      app.api.trackEvent('MB_zhucedl_zhuce_09')
      app.api.closeAll()
    },

    getHasCheckedID() {
      app.api.getSessionStorage('hasCheckedID').then(response => {
        if (!!response) {
          const { hasCheckedID } = JSON.parse(response)
          this.hasCheckedID = hasCheckedID
        }
      })
    },
  },
}
</script>

<style lang="scss" rel="stylesheet/scss">
.register_success_openAccount {
  background-color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .open_proc {
    height: 3.76rem;
    margin-top: 0.48rem;
    position: relative;

    .open_procLine {
      height: 3.04rem;
      width: 0.04rem;
      margin-left: 0.7rem;
      background: #eeeeee;
      position: relative;

      .open_procLineInner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 38%;
        background: #68c800;
      }
    }

    .open_procWrapper {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .open_procItem {
      display: flex;
    }

    .open_procText {
      font-size: 0.32rem;
      line-height: 0.44rem;
      color: #333;
      padding-bottom: 0.04rem;
    }

    .open_procLabel {
      font-size: 0.24rem;
      line-height: 0.34rem;
      color: #999;
    }

    .open_procItemIcon {
      width: 0.48rem;
      height: 0.48rem;
      margin-left: 0.48rem;
      margin-right: 0.52rem;
      background: url('~@/common/cssBundle/assets/registered/iconTdefault.png')
        no-repeat;
      background-size: 100%;

      &.active {
        transform: scale(1.67);
        background: url('~@/common/cssBundle/assets/registered/iconTactive.png')
          no-repeat center;
        background-size: 100%;
        transform-origin: 50% 0;
      }
    }
  }

  .open_ad {
    padding: 0 0.32rem;
    padding-top: 0.2rem;
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-between;

    .open_adItem {
      width: 2.14rem;
      height: 2.32rem;

      img {
        width: 100%;
      }
    }
  }

  .open_title {
    height: 0.96rem;
    line-height: 0.96rem;
    padding: 0 0.32rem;
    border-bottom: 0.01rem solid #dfdfdf;
    margin-top: 0.64rem;
    font-size: 0.32rem;
    font-weight: 600;
    color: #333;
  }

  .open_btn {
    padding: 0 0.32rem;
    padding-top: 0.8rem;

    .open_notNow {
      padding-top: 0.4rem;
      font-size: 0.28rem;
      line-height: 0.4rem;
      color: #6161f2;
      text-align: center;
    }
  }
}
</style>
