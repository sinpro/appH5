<template>
  <div class="reset_password_mobile">
    <div
      v-if="sendAlready"
      class="tip_area"
    >
      验证码已发送至您的手机 <span>{{ encPhone }}</span>
    </div>
    <div
      v-else
      class="tip_area"
    >
      点击获取手机({{ encPhone }})验证码
    </div>
    <div class="sms_area">
      <md-cell-item title="验证码">
        <msg-code
          ref="msgRef"
          slot="right"
          v-model="smsCode"
          s-timer="120"
          maxlength="6"
          placeholder="请输入6位验证码"
          :start="true"
          :text="smsBtnText"
          :left-input="true"
          :truly-mobile="true"
          @clickCode="getSMS"
        />
      </md-cell-item>
    </div>
    <div class="btn_area">
      <button
        class="btn-lg"
        @click="handleNextClick"
      >
        下一步
      </button>
    </div>
  </div>
</template>

<script>
import { CellItem } from 'mand-mobile';
import msgCode from '@/common/components/ynet_msg_code_new';

export default {
  components: {
    [CellItem.name]: CellItem,
    msgCode,
  },

  data() {
    return {
      mobileNo: '',
      bussinessNumber: '',
      smsBtnText: '获取验证码',
      smsCode: '',
      sendAlready: false,
    }
  },

  computed: {
    encPhone() {
      if (this.mobileNo) {
        return `${this.mobileNo.slice(0, 3)}****${this.mobileNo.slice(-4)}`;
      } else {
        return '';
      }
    }
  },

  created() {
    this.getMobileNo();
  },

  methods: {
    handleNextClick() {
      if (this.smsCode.length === 6) {
        this.checkSMS().then(this.link2Next);
      }
    },

    getMobileNo() {
      app.api.getUserInfo().then(res => {
        const { mobileNo } = res.userInfo.body;
        this.mobileNo = mobileNo;
        console.log(res);
      });
    },

    getSMS(callback) {
      const { msgRef } = this.$refs;
      if (msgRef.btnStatus === 'loading') {
        return;
      }

      const data = {
        mobileNo: this.mobileNo,
      }

      app.api.rpc('LG1010', data).then(response => {
        this.bussinessNumber = response.businessSerialNo;
      })

      callback();
      msgRef.startSendCode();
      this.sendAlready = true;
    },

    checkSMS() {
      const data = {
        smsCode: this.smsCode,
        businessSerialNo: this.bussinessNumber,
      }

      return app.api.rpc('UR0018', data);
    },

    link2Next({ businessSerialNo }) {
      const data = {
        mobileNo: this.mobileNo,
        bussinessNumber: businessSerialNo,
      }

      app.api.pushWindow('/ynet_account/login_management/reset_password_confirm.html', data);
    },
  },
}
</script>

<style lang="scss">
.reset_password_mobile {
  .tip_area {
    height: .8rem;
    line-height: .8rem;
    padding: 0 .32rem;
    color: #999;
    font-size: .28rem;

    span {
      color: #333;
    }
  }

  .my_sms {
    justify-content: space-between;

    .my_sms_input {
      width: 2.8rem;
    }
  }

  .input_area {
    background: #fff;
    padding: 0 0.32rem;
  }

  .btn_area {
    margin-top: 0.8rem;
    text-align: center;
  }

  .sms_area {
    background: #fff;
    padding: 0 0.3rem;
  }
}
</style>
