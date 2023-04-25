<template>
  <div
    class="setting-login-pw"
    style="background: #ffffff"
  >
    <m-header
      :left-menu="[{ icontype: 'back_black' }]"
      bar-bottom-line-color="#ffffff"
    />
    <ynet-register-title title="请设置您的登录密码" />
    <div class="login-pw_input register_msgN">
      <ynet-input
        ref="myInput"
        v-model="password"
        title="设置密码"
        placeholder="请设置8-20位的登录密码"
        type="safety_text"
        :max="20"
        :debounce="0"
        :left-input="true"
        :is-encry="true"
        :random-key="randomStr"
        :mask-value="passwordMask"
        @on-password-change="handlePasswordChange"
        @on-password-blur="handlePasswordBlur"
      />
      <ynet-input
        v-model="confirmPassword"
        class="pw-cell"
        title="确认密码"
        placeholder="请确认登录密码"
        type="safety_text"
        :max="20"
        :debounce="0"
        :left-input="true"
        :is-encry="true"
        :random-key="randomStr"
        :mask-value="confirmPasswordMask"
        @on-password-change="handleConfirmPasswordChange"
        @on-password-blur="handleConfirmPasswordBlur"
      />
    </div>
    <ynet-tip>
      <p>
        密码设置长度为8-20位，必须包含字母，且同时包含数字、字母、符号中任意两种以上字符
      </p>
    </ynet-tip>
    <div class="btn-box">
      <button
        class="btn-lg"
        @click="handleBtnClick"
      >
        注册
      </button>
    </div>
  </div>
</template>

<script>
import mHeader from '@/common/components/header'
import ynetInput from '@/common/components/ynet_input_test'
import ynetTip from '@/common/components/ynet_tip'
import ynetRegisterTitle from '@/common/components/ynet_register_title'

export default {
  components: {
    mHeader,
    ynetInput,
    ynetTip,
    ynetRegisterTitle,
  },

  data() {
    return {
      password: '',
      passwordMask: '',
      passwordValue: '',
      passwordMD5: '',
      passwordLevel: 0,
      confirmPassword: '',
      confirmPasswordMask: '',
      confirmPasswordValue: '',
      confirmPasswordMD5: '',
      link2openAccount: '',
      mobileNo: '',
      randomStr: '',
      maskLength: 0,
    }
  },

  created() {
    this.getRegisterConfig()
    this.getMobileNo()

    this.getRandomStr().then(() => {
      setTimeout(() => {
        this.$refs.myInput.parentShowkeyboard()
      }, 300)
    })

    app.api.trackEvent('MB_zhucedl_zhuce_04')
  },

  methods: {
    handleBtnClick() {
      // document.documentElement.click()

      this.checkPasswordLength()
        .then(this.checkPassword)
        .then(this.register)
        .then(this.setHTTPSessionHeader)
        .then(this.link2Success)
    },

    // 两次密码不一致，弹窗提示
    // 密码不符合 8 - 20 位数字、字母、字符（选两种）组合，弹窗提示
    // 其他进入注册流程
    checkPassword() {
      return new Promise((resolve, reject) => {
        if (this.passwordMD5 !== this.confirmPasswordMD5) {
          app.api.alert('两次输入的密码不一致，请确认后重新输入', '提示', {
            okButton: '我知道了',
          })
        } else {
          if (this.passwordLevel >= 2) {
            resolve()
          } else {
            app.api.alert('您输入的密码格式有误，请确认后重新输入', '提示', {
              okButton: '我知道了',
            })
          }
        }
      })
    },

    register() {
      return new Promise((resolve, reject) => {
        const mobileNo = this.mobileNo

        const data = {
          mobileNo,
          loginPassword: this.passwordValue,
          loginPasswordConfirm: this.passwordValue,
          protocolId: 'protocolId', // todo: 协议号出来以后，传递正确的协议号
          mathRandom: this.randomStr,
        }

        app.api.rpc('UR0002', data).then(response => {
          app.api.setSessionStorage('registerUserInfo', JSON.stringify(response))
            .then(() => {
              const { mp_sId } = response

              app.api.trackEvent('MB_zhucedl_zhuce_05', {
                'state': '1'
              })

              resolve(mp_sId)
            })
        })
      }, reason => {
        app.api.trackEvent('MB_zhucedl_zhuce_05', {
          'state': '0',
          'errorMsg': reason.errorMessage,
        })
      })
    },

    setHTTPSessionHeader(id) {
      let bridge = window.AlipayJSBridge || window.FlameJSBridge
      return new Promise((resolve, reject) => {
        bridge.call(
          'setSessionID',
          { sessionID: id },
          function() {
            resolve()
          }
        )
      })
    },

    link2Success() {
      app.api.updateUserInfo()
      if (this.link2openAccount === '1') {
        app.api.pushWindow('/ynet_account/register/register_success_openAccount.html')
      } else {
        app.api.pushWindow('/ynet_account/register/register_success.html')
      }
    },

    getRegisterConfig() {
      app.api.rpc('CV0001').then(response => {
        const { isOpAcnt } = response

        this.link2openAccount = isOpAcnt

        app.api.setSessionStorage('registerConfig', JSON.stringify(response))
      })
    },

    getMobileNo() {
      this.mobileNo = app.params.mobileNo
    },

    getRandomStr() {
      return new Promise((resolve, reject) => {
        app.api.rpc('UR0051').then(response => {
          this.randomStr = response.mathRandom
          resolve()
        })
      })
    },

    getPasswordString(length) {
      const str = '●'
      let value = ''

      for (let i = 0; i < length; i++) {
        value += str
      }

      return value
    },

    handlePasswordChange(val) {
      const { length, md5, inputLevel, value } = val
      const str = this.getPasswordString(length)

      this.maskLength = length
      this.passwordMask = str
      this.passwordValue = value
      this.passwordMD5 = md5
      this.passwordLevel = inputLevel
    },

    handlePasswordBlur(val) {
      const { length, md5, inputLevel, value } = val
      const str = this.getPasswordString(length)

      this.maskLength = length
      this.password = str
      this.passwordMask = str
      this.passwordValue = value
      this.passwordMD5 = md5
      this.passwordLevel = inputLevel
    },

    handleConfirmPasswordChange(value) {
      const { length, md5 } = value
      const str = this.getPasswordString(length)

      this.confirmPasswordMask = str
      this.confirmPasswordMD5 = md5
    },

    handleConfirmPasswordBlur(value) {
      const { length, md5 } = value
      const str = this.getPasswordString(length)

      this.confirmPassword = str
      this.confirmPasswordMask = str
      this.confirmPasswordMD5 = md5
    },

    // 1. 两者都为空，点击按钮，toast 密码不能为空
    // 2. 一个为空，另一个不为空，toast 密码不能为空
    // 3. 两行都小于 8 位，toast 密码位数不足，请重新输入
    checkPasswordLength() {
      return new Promise((resolve, reject) => {
        if (this.password.length * this.confirmPassword.length === 0) {
          app.api.showToast('密码不能为空')
        } else if (this.maskLength < 8) {
          app.api.showToast('密码位数不足，请重新输入')
        } else {
          resolve()
        }
      })
    },
  },
}
</script>

<style lang="scss" rel="stylesheet/scss">
.setting-login-pw {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #ffffff;
  .title {
    padding-top: 0.4rem;
    line-height: 1;
    padding-bottom: 1.17rem;
    background: #fff;
    font-size: 0.6rem;
    color: #333;
  }
  .login-pw_input {
    padding-top: 0.48rem;

    .ynet-input {
      .ynet-input__box {
        input::-webkit-input-placeholder {
          color: #b3b3b3;
        }
        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #b3b3b3;
        }
        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #b3b3b3;
        }
        input:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #b3b3b3;
        }
      }
    }
    .ynet-input::after {
      right: 0.32rem;
    }
    .pw-cell {
      margin-top: 0.48rem;
    }
    background: #fff;
    .ynet-input__box__input {
      text-align: left !important;
    }
    .ynet-input__box {
      color: #333;
      .ynet-input__box__iocn .ynet-input__box__clear-icon {
        line-height: 0.7rem;
      }
    }
  }
  .tip {
    padding: 0 0.32rem;
    color: #999;
  }
  a {
    text-decoration: underline;
    color: #999;
  }

  .login-error-message {
    color: #d33b30;
    text-align: right;
    font-size: 0.22rem;
    line-height: 0.32rem;
    margin-right: 0.32rem;
    &:first-child {
      margin-top: 0.13rem;
    }
  }
  .mt48 {
    margin-top: 0.46rem;
  }

  .ynet-tip {
    margin: 0;
    margin-top: 0.24rem;

    p {
      color: #999 !important;
      font-size: 0.24rem !important;
      line-height: 0.32rem !important;
      margin-top: 0 !important;
    }
  }

  .btn-box {
    margin-top: 0.64rem;
  }
}
</style>
