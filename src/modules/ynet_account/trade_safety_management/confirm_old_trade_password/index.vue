<template>
  <div class="set_tran_pwd">
    <m-header
      :left-menu="[{ icontype: 'back_black' }]"
      bar-bottom-line-color="#ffffff"
    />
    <ynet-register-title
      title="验证原交易密码"
      desc="为保护您的账户安全，请验证原6位数的交易密码"
    />
    <div class="pswd-wrap">
      <trade-pswd-view
        :randomKey="randomStr"
        @done="checkTradePassword"
      />
    </div>
  </div>
</template>

<script>
import mHeader from '@/common/components/header';
import ynetRegisterTitle from '@/common/components/ynet_register_title';
import tradePswdView from '@/common/components/trade-password-view';

export default {
  components: {
    mHeader,
    ynetRegisterTitle,
    tradePswdView,
  },

  data() {
    return {
      randomStr: '',
    }
  },

  mounted() {
    this.getRandomStr();
  },

  methods: {
    verify(value) {
      return new Promise((resolve, reject) => {
        app.api.rpc('UR0033', {
          securityType: 'pp',
          passwordKey: value,
          mathRandom: this.randomStr,
        }).then(res => {
          const { businessSerialNo, verifyStatus, errorMsg } = res;
          if (verifyStatus === '02') {
            app.api.alert('密码校验失败', '提示');
          } else if (verifyStatus === '00') {
            app.api.alert('未完成密码验证', '提示');
          } else if (verifyStatus === '01') {
            resolve(res);
          }
        });
      });
    },

    checkTradePassword({ value, info }) {
      this.verify(value).then(res => {
        const { businessSerialNo } = res;

        app.api.setSessionStorage('changeTradePasswordBussinessNumber', JSON.stringify({
          businessNumber: businessSerialNo,
        })).then(() => {
          app.api.pushWindow('/ynet_account/trade_safety_management/set_trade_password.html', { setType: 'change', });
        });
      })
    },

    getRandomStr() {
      return new Promise((resolve, reject) => {
        app.api.rpc('UR0051').then(response => {
          this.randomStr = response.mathRandom;
          resolve();
        })
      })
    },
  },
}
</script>

<style lang="scss">
.set_tran_pwd {
  background-color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .title {
    font-size: 0.6rem;
    line-height: 0.84rem;
    color: #333;
    text-align: center;
    margin-top: 0.4rem;
  }

  .desc {
    height: 0.84rem;
    margin-top: 0.2rem;
    font-size: 0.24rem;
    line-height: 0.34rem;
    color: #999;
    text-align: center;
  }

  .pswd-wrap {
    padding: 0.32rem;
  }
}
</style>
