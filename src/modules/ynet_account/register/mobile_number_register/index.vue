<template>
  <div class="register">
    <m-header
      :left-menu="[{ icontype: 'back_black' }]"
      :preventBack="true"
      bar-bottom-line-color="#ffffff"
      @leftHandler="back"
    />
    <ynet-register-title title="手机号注册" />
    <div class="register_input">
      <div
        class="input_area"
        :class="{ focus: mobileNoFocus }"
      >
        <input
          ref="mobileNo"
          v-model="mobileNo"
          type="tel"
          placeholder="请输入注册手机号"
          maxlength="11"
          @focus="mobileNoFocus = true"
          @blur="mobileNoFocus = false"
        >
        <i
          v-if="mobileNo.length > 0"
          class="weui-icon-clear"
          @click="handleClearMobileNo"
        />
      </div>
      <div class="register_msgN">
        <msg-code
          ref="msgRef"
          v-model="smsCode"
          s-timer="120"
          maxlength="6"
          placeholder="请输入验证码"
          :start="false"
          :text="smsBtnText"
          :left-input="true"
          :truly-mobile="isTrulyMobile"
          @clickCode="getSMS"
        />
      </div>
    </div>
    <div style="margin-top: .16rem;">
      <ynet-agreement
        v-model="hasChecked"
      >
        我已阅读并同意
        <a
          href="javascript:void(0)"
          class="constitution"
          @click.stop="link2Agreement"
        >《金融电子银行注册协议》</a>
      </ynet-agreement>
    </div>
    <div class="btn-box">
      <button
        class="btn-lg"
        @click="handleNextBtnClick"
      >
        下一步
      </button>
    </div>
  </div>
</template>

<script>
import mHeader from '@/common/components/header'
import ynetAgreement from '@/common/components/ynet_agreement'
import msgCode from '@/common/components/ynet_msg_code_new'
import ynetRegisterTitle from '@/common/components/ynet_register_title'

export default {
  components: {
    mHeader,
    ynetAgreement,
    msgCode,
    ynetRegisterTitle,
  },

  data() {
    return {
      mobileNo: '',
      smsCode: '',
      smsBtnText: '获取验证码',
      smsID: '',
      smsBtnStatus: '',
      hasChecked: true,
      isTrulyMobile: false,
      isTrulySMS: false,
      mobileNoFocus: false,
    }
  },

  mounted() {
    this.getCheckedStatus()
    app.api.closeOther()

    this.$refs.mobileNo.focus()
    app.api.trackEvent('MB_zhucedl_zhuce_01')
  },

  methods: {
    back() {
      app.api.closePage(['/ynet_account/register/mobile_number_register.html'])
      app.api.trackEvent('MB_zhucedl_zhuce_03')
    },
    // 手机号不足 11 位，一直 toast 提示
    // 满足 11 位，正则校验手机号是否符合规则
    // 正确手机号，可进入下一步
    checkMobileNo() {
      return new Promise((resolve, reject) => {
        if (this.mobileNo.length !== 11) {
          app.api.showToast('请输入正确的手机号')
        } else {
          const mobileReg = /^1[3|4|5|7|8|9][0-9]\d{4,8}$/
          const isTrulyMobile = mobileReg.test(this.mobileNo)

          this.isTrulyMobile = isTrulyMobile

          if (!isTrulyMobile) {
            app.api.showToast('请输入正确的手机号')
          } else {
            resolve()
          }
        }
      })
    },

    getSMS(callback) {
      this.checkMobileNo().then(() => {
        callback()
        this.smsBtnText = '重新发送'
        this.$refs.msgRef.startSendCode()

        app.api.rpc('UR0007', { mobileNo: this.mobileNo }).then(response => {
          if (response.errorCode === 'AU0002') {
            app.api.alert('您今日的短信验证码次数已达上限。', '提示', {
              okButton: '我知道了',
            })
          }
          if (response.errorCode === '0') {
            this.smsID = response.businessSerialNo
            // this.$refs.msgRef.msgFocus()
            app.api.showToast('验证码已发送')
          }
        })
      })
    },

    handleNextBtnClick() {
      this.checkCanISendRPC()
        .then(this.checkSMS)
        .then(this.checkRegisted)
        .then(this.checkBlackAccount)
        .catch(() => {
          app.api.trackEvent('MB_zhucedl_zhuce_02', {
            mobileNo: this.mobileNo,
            state: '0',
            errorMsg: '1'
          })
        })
    },

    checkCanISendRPC() {
      return new Promise((resolve, reject) => {
        this.checkMobileNo()
          .then(this.checkSMSLength)
          .then(this.checkAgreement)
          .then(() => resolve())
      })
    },

    checkSMSLength() {
      return new Promise((resolve, reject) => {
        if (this.smsCode.length !== 6) {
          app.api.showToast('请输入正确的验证码')
        } else {
          this.isTrulySMS = true
          resolve()
        }
      })
    },

    checkAgreement() {
      return new Promise((resolve, reject) => {
        if (this.hasChecked) {
          resolve()
        } else {
          app.api.showToast('请同意注册协议')
        }
      })
    },

    checkSMS() {
      return new Promise((resolve, reject) => {
        const data = {
          smsCode: this.smsCode,
          businessSerialNo: this.smsID,
        }
        const processError = this.handleSMSError

        app.api.rpc('UR0008', data, { processError }).then(() => resolve())
      })
    },

    handleSMSError(response) {
      const { errorCode, errorMsg } = response.resData.body

      switch (errorCode) {
      case 'SE00101009':
        app.api.alert('短信验证码错误，请重新输入', '提示', {
          okButton: '我知道了',
        })
        break
      case 'SE00402001':
        app.api.alert('短信验证码已过期，请重新获取', '提示', {
          okButton: '我知道了',
        })
        break
      default:
        app.api.alert(errorMsg, '提示', { okButton: '我知道了' })
        break
      }
      app.api.trackEvent('MB_zhucedl_zhuce_02', {
        mobileNo: this.mobileNo,
        state: '0',
        errorMsg: '2'
      })
    },

    checkRegisted() {
      return new Promise((resolve, reject) => {
        const data = {
          mobileNo: this.mobileNo,
          loginType: 'mobile',
        }
        const processError = this.handleRegistedError

        app.api.rpc('UR0001', data, { processError }).then(() => resolve())
      })
    },

    handleRegistedError(response) {
      const { errorCode, errorMsg } = response.resData.header
      if (errorCode === 'ME00000002') {
        app.api.pushWindow('/ynet_account/register/registered_mobile.html', {
          mobileNo: this.mobileNo,
        })
      } else {
        app.api.alert(errorMsg)
        reject(errorMsg)
      }
      app.api.trackEvent('MB_zhucedl_zhuce_02', {
        mobileNo: this.mobileNo,
        state: '0',
        errorMsg: errorMsg
      })
    },

    checkBlackAccount() {
      return new Promise((resolve, reject) => {
        const mobileNo = this.mobileNo

        app.api.rpc('UR0030', { mobileNo }).then(response => {
          if (response.checkResult === '00') {
            app.api
              .setSessionStorage(
                'registerMoblileNo',
                JSON.stringify({ mobileNo })
              )
              .then(() => {
                app.api.trackEvent('MB_zhucedl_zhuce_02', {
                  mobileNo,
                  state: '1'
                })

                app.api.pushWindow(
                  '/ynet_account/register/setting_login_pw.html',
                  { mobileNo }
                )
              })
          } else {
            app.api.alert('暂不能进行本交易，请前往柜面办理。', '提示', {
              okButton: '我知道了',
            })
          }
        })
      })
    },

    link2Agreement() {
      app.api.pushWindow('/ynet_account/register/registration_agreement.html')

      // 由于点击使用了阻止冒泡，跳转时需要将input框onblur
      document.documentElement.click()
    },

    getCheckedStatus() {
      const _this = this

      function myFun(response) {
        const { data } = response

        if (data.hasChecked) {
          _this.hasChecked = true
        }
      }

      document.addEventListener('resume', myFun)
    },

    handleClearMobileNo() {
      this.mobileNo = ''
      this.$refs.mobileNo.focus()
    },
  },
}
</script>

<style lang="scss" rel="stylesheet/scss">
.register {
  background: #fff;
  height: 100%;
  .constitution {
    color: $ynet-dark-purple;
  }
  .ynet-input {
    display: block;

    &:before {
      display: none;
    }

    &:after {
      display: none;
    }
  }
  .register_msgN {
    position: relative;
    border-bottom: 0.01rem solid #dfdfdf;
    padding: 0.32rem 0;
    margin: 0.16rem 0.32rem;
    padding-bottom: 0.16rem;

    .ynet-input {
      width: 100%;
      border-bottom: 0;
      margin: 0;
    }

    .ynet-msg-code__page-bt {
      margin-top: 0.62rem;
      flex: 0 !important;
    }

    .pr32 {
      padding-right: 0 !important;
      input {
        max-width: 100% !important;
      }
    }

    .ynet-msg-code {
      .ynet-msg-code__page-bt {
        border-left: 0;
      }
    }

    .weui-icon-clear {
      float: right;
    }
  }
  .title {
    padding-top: 0.64rem;
    padding-left: 0.32rem;
    padding-bottom: 0.4em;
    color: #333;
    font-size: 0.52rem;
    line-height: 0.74rem;
    font-weight: 600;
  }
  .register_input {
    background: #fff;
    margin-top: 0.8rem;

    .ynet-input__box__input {
      text-align: left !important;
    }
    .ynet-input__box {
      color: #333 !important;
    }
  }
  a {
    text-decoration: underline;
    color: #999;
  }
  .ynet-msg-code {
    .ynet-msg-code__page-bt {
      height: 0.7rem !important;
      line-height: 0.7rem !important;
    }
  }

  .mobile_err,
  .sms_err {
    min-height: 0.2rem;
    padding-top: 0.06rem;
    padding-left: 2.1rem;
    font-size: 0.24rem;
    line-height: 0.34rem;
    color: #ff001f;
  }

  .ynet-agreement {
    margin-bottom: 0;
  }

  .my_sms_input input {
    font-size: 0.28rem;
  }

  .input_area {
    height: .96rem;
    padding: 0 .32rem;
    display: flex;
    align-items: center;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: .32rem;
      right: .32rem;
      background: #dfdfdf;
      height: 1px;
      transform: scaleY(0.5);
      transform-origin: 0 0;
    }

    input {
      flex: 1;
      font-size: .32rem;
      line-height: .44rem;
      font-size: 0.28rem;
    }

    .weui-icon-clear {
      vertical-align: top;
      font-size: .36rem;
      color: #bbb;
      position: relative;
      z-index: 20;
      display: none;
    }

    &.focus {
      .weui-icon-clear {
        display: block;
      }
    }
  }

  .btn-box {
    margin-top: 0.64rem;
  }

  .ynet-agreement__content a {
    text-decoration: none;
  }

  .ynet-prompt__content p {
    line-height: 0.36rem !important;
  }
}
</style>
