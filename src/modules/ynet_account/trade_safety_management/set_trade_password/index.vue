<template>
  <div class="set_tran_pwd">
    <m-header
      :left-menu="[{ icontype: 'back_black' }]"
      bar-bottom-line-color="#ffffff"
    />
    <ynet-register-title
      title="请设置您的交易密码"
      desc="为保护您的账户安全，请设置6位数的交易密码"
    />
    <div class="pswd-wrap">
      <trade-pswd-view
        :randomKey="randomStr"
        @done="handleChangePwd"
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
    tradePswdView,
    ynetRegisterTitle,
  },

  data() {
    return {
      randomStr: '',
    }
  },

  created() {
    this.getRandomStr();
    this.setTitle();
  },

  methods: {
    setTitle() {
      if (app.params.setType === 'reset') {
        app.api.setMiddleTitle({ title:'重置交易密码' });
      }
    },

    handleChangePwd({ value, info }) {
      const { md5 } = info;

      app.api.pushWindow('/ynet_account/trade_safety_management/set_trade_password_confirm.html', {
        firstPasswordMD5: md5,
        firTranPwd: value,
        randomStr: this.randomStr,
        setType: app.params.setType,
      });
    },

    getRandomStr() {
      return new Promise((resolve, reject) => {
        app.api.rpc('UR0051').then(response => {
          this.randomStr = response.mathRandom;
          resolve();
        });
      });
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
