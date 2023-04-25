<template>
  <div class="reset_password_mobile_and_card_info">
    <title-tip :text="tipText" />
    <div class="input_area">
      <md-input-item
        v-model="mobileNo"
        title="手机号"
        placeholder="请输入银行注册手机号"
        align="right"
        :type="text"
        :readonly="!cardInfo.isOtherBank"
      />
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
    <div class="card_info_area">
      <template v-if="cardInfo.cardType === '00'">
        <md-cell-item title="取款密码">
          <safe-input
            slot="right"
            placeholder="请输入取款密码"
            :in-style="{textAlign: 'right', fontSize: '0.32rem'}"
            :is-encry="true"
            type="number"
            :max="6"
            :random-key="randomKey"
            @input="password = $event"
            @encrypt="passwordInfo = $event"
          />
        </md-cell-item>
      </template>
      <template v-if="cardInfo.cardType === '10'">
        <md-input-item
          v-model="valiDate"
          title="有效期"
          placeholder="请输入有效期(年/月)"
          align="right"
        />
        <md-input-item
          v-model="cvv2"
          title="CVV2"
          type="digit"
          placeholder="请输入卡背面3位数安全码"
          align="right"
        />
        <md-cell-item title="查询密码">
          <safe-input
            slot="right"
            placeholder="请输入查询密码"
            :is-encry="true"
            :in-style="{textAlign: 'right', fontSize: '0.32rem'}"
            type="number"
            :max="6"
            :random-key="randomKey"
            @input="password = $event"
            @encrypt="passwordInfo = $event"
          />
        </md-cell-item>
      </template>
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
import { InputItem, CellItem } from 'mand-mobile';
import titleTip from '@/common/components/title_tip';
import safeInput from '@/common/components/y-encrypt-input';
import msgCode from '@/common/components/ynet_msg_code_new';

export default {
  components: {
    [InputItem.name]: InputItem,
    titleTip,
    [CellItem.name]: CellItem,
    safeInput,
    msgCode,
  },

  data() {
    return {
      cardType: '2',
      cardInfo: {
        cardType: '00',
        accountNo_mask: '',
        bankName: '',
        isOtherBank: false,
      },
      mobileChange: false,
      mobileNo: '',
      smsBtnText: '获取验证码',
      smsCode: '',
      sendAlready: false,
      randomKey: '',
      password: '',
      passwordInfo: {},
      bussinessNumber: '',
      valiDate: '',
      cvv2: '',
    }
  },

  computed: {
    tipText() {
      return `请验证${this.cardInfo.bankName}${this.cardInfo.accountNo_mask}的信息`;
    }
  },

  created() {
    this.cardInfo = app.params;
    console.log(this.cardInfo);

    if ('reservedMobile' in this.cardInfo) {
      this.mobileNo = this.cardInfo['reservedMobile'];
    }

    this.getRandomKey();
  },

  methods: {
    handleNextClick() {
      if (!this.isDefaultPhone()) {
        if (this.validPhone()) {
          this.submitValid();
        } else {
          app.api.showToast('请输入正确的手机号');
        }
      } else {
        this.submitValid();
      }
    },

    link2Next({ businessSerialNo }) {
      const data = {
        mobileNo: this.mobileNo,
        bussinessNumber: businessSerialNo,
      }

      app.api.pushWindow('/ynet_account/login_management/reset_password_confirm.html', data);
    },

    submitForm() {
      app.api.rpc('MM0009', {
        cardNo_sequence: this.cardInfo.accountNo_sequence,
        accountType: this.cardInfo.accountType,
        owner: this.cardInfo.isOtherBank ? '0' : '1',
        smsCode: this.smsCode,
        businessSerialNo: this.bussinessNumber,
        mathRandom: this.randomKey,
        apinPassword: this.password,
        valiDate: this.valiDate,
        cvv2: this.cvv2,
      }).then(this.link2Next);
    },

    submitValid() {
      if (!this.smsCode) {
        app.api.showToast('请输入短信验证码');
        return;
      }
      
      if (this.cardInfo.cardType === '10') {
        if (!this.valiDate) {
          app.api.showToast('请输入有效期');
        } else if (!this.cvv2) {
          app.api.showToast('请输入安全码');
        } else if (!this.password) {
          app.api.showToast('请输入查询密码');
        } else {
          this.submitForm();
        }
      } else {
        if (!this.password) {
          app.api.showToast('请输入卡密码');
        } else {
          this.submitForm();
        }
      }

      
    },

    getRandomKey() {
      app.api.rpc('UR0051').then(res => {
        this.randomKey = res.mathRandom;
      })
    },

    isDefaultPhone() {
      return this.cardInfo.reservedMobile === this.mobileNo;
    },

    validPhone() {
      return /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobileNo);
    },

    getSMS(callback) {
      const { msgRef } = this.$refs;
      if (this.cardInfo.isOtherBank && !this.mobileNo) {
        app.api.showToast('请输入银行注册手机号');
        return;
      }

      if (msgRef.btnStatus === 'loading') {
        return;
      }

      const data = {
        mobileNo: this.isDefaultPhone() ? '' : this.mobileNo,
      }

      app.api.rpc('TC0024', data).then(res => {
        this.bussinessNumber = res.businessSerialNo;
      })

      callback();
      msgRef.startSendCode();
      this.sendAlready = true;
    },
  },
}
</script>

<style lang="scss">
.reset_password_mobile_and_card_info {
  .input_area,
  .card_info_area {
    background: #fff;
    padding: 0 .32rem;
  }

  .my_sms {
    justify-content: space-between;

    .my_sms_btn, .my_sms_input {
      width: auto;
      display: block;

      input {
        width: 2.8rem;
      }
    }
  }

  .card_info_area {
    margin-top: .16rem;

    .md-input-item:last-of-type .md-field-item-content:before {
      display: none;
    }
  }

  .btn_area {
    margin-top: .8rem;
    text-align: center;
  }
}
</style>
