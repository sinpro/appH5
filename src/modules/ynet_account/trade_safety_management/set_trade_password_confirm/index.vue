<template>
  <div class="set_tran_pwd">
    <m-header
      :left-menu="[{ icontype: 'back_black' }]"
    />
    <ynet-register-title
      title="确认交易密码"
      desc="请再次输入交易密码确认"
    />
    <div class="pswd-wrap">
      <trade-pswd-view
        :randomKey="randomStr"
        @done="handleChangePwd"
         @focus="showAlert = false"
      />
    </div>
    <div
      v-if="showAlert"
      class="set_alert"
    >
      两次密码输入不一致，请重新输入
    </div>
  </div>
</template>

<script>
import mHeader from '@/common/components/header';
import ynetRegisterTitle from '@/common/components/ynet_register_title';
import tradePswdView from '@/common/components/trade-password-view';

const apiMap = {
  set: 'MM0006',
  reset: 'MM0019',
  change: 'MM0020',
}

export default {
  components: {
    mHeader,
    tradePswdView,
    ynetRegisterTitle,
  },

  data() {
    return {
      showAlert: false,
      randomStr: '',
      serialNo: '',
      setType: '',
    }
  },

  created() {
    this.randomStr = app.params.randomStr;
    this.setType = app.params.setType || 'change';
    console.log(this.setType);
    this.setTitle();

    app.api.getSessionStorage('changeTradePasswordBussinessNumber').then(res => {
      const { businessNumber } = JSON.parse(res);
      this.serialNo = businessNumber;
    });
  },

  methods: {
    setTitle() {
      if (app.params.setType === 'reset') {
        app.api.setMiddleTitle({ title:'重置交易密码' });
      }
    },

    handleChangePwd({ value, info }) {
      if (info.md5 === app.params.firstPasswordMD5) {
        this.showAlert = false;
        app.api.rpc(apiMap[this.setType], {
          mathRandom: this.randomStr,
          comfirmPassword: value,
          password: app.params.firTranPwd,
          uploadBusinessSerialNo: this.serialNo,
        }).then(res => {
          app.api.pushWindow('ynet_account/trade_safety_management/set_trade_password_success.html', { setType: app.params.setType });
        }).catch(() => {
          app.api.closeToPage('/ynet_account/trade_safety_management/set_trade_password.html');
        });
      } else {
        this.showAlert = true;
      }
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


  .set_alert {
    font-size: 0.24rem;
    text-align: center;
    color: #ff001f;
    line-height: 0.34rem;
    margin-top: 0.64rem;
  }

  .pswd-wrap {
    padding: 0.32rem;
  }
}
</style>
