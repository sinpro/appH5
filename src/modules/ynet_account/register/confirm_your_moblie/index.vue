<template>
  <div class="register">
    <m-header
      :left-menu="[{icontype:'back_black'}]"
      bar-bottom-line-color="#333333"
    />
    <ynet-register-title
      title="请输入银行预留手机号"
      desc="由于您的开户手机号与绑定卡的银行预留手机号不同，为保护您的账户安全，请先进行短信验证"
    />
    <div class="register_input">
      <ynet-input
        v-model="mobileNo"
        title="手机号"
        placeholder="请输入银行预留手机号"
        :max="11"
        type="number"
        :left-input="true"
        :err-msg="mobileNoErrorMsg"
        @on-native-blur="on_blur_mobileNo"
      />
      <div class="register_msgN">
        <msg-code
          ref="msgRef"
          v-model="smsCode"
          :start="false"
          :msg-title="'短信验证码'"
          :placeholder="'请输入6位验证码'"
          :maxlength="'6'"
          :text="smsBtnText"
          :disabled="smsCode_btn_status"
          :left-input="true"
          :err-msg="smsErrorMsg"
          s-timer="120"
          @clickCode="handleSMSClick"
          @msgBlur="on_blur_smsCode"
        />
      </div>
    </div>
    <div class="btn-box">
      <button
        class=" btn-lg"
        :disabled="btn_disable"
        @click="submit_btn"
      >
        下一步
      </button>
    </div>
  </div>
</template>

<script>
import mHeader from '@/common/components/header'
import ynetAgreement from '@/common/components/ynet_agreement';
import ynetPrompt from '@/common/components/ynet_prompt';
import ynetInput from '@/common/components/ynet_input_new';
import msgCode from '@/common/components/ynet_msg_code_new';
import ynetRegisterTitle from '@/common/components/ynet_register_title';

export default {
  components: {
    mHeader,
    ynetAgreement,
    ynetPrompt,
    ynetInput,
    msgCode,
    ynetRegisterTitle,
  },

  data() {
    return {
      mobileNo: '',
      smsCode: '',
      deviceId: '',
      registerFlowNo: '',
      mobileNo_error: {
        isError_space: false, //input 是否为空
        isError_formate: false, //input 值是否符合规则
        isTrigger: false //input 是否触发校验
      },
      smsCode_error: {
        isError_space: false, //input 是否为空
        isError_formate: false, //input 值是否符合规则
        isTrigger: false, //input 是否触发校验
      },
      smsTimeout: false,
      smsIncorrect: false,
      smsBtnText: '获取验证码',
      smsBusinessNo: '',
      isOurBankCard: false,
      hasSecurityTool: false
    };
  },

  computed: {
    btn_disable() {
      let status; // 校验ok
      status =
                    this.mobileNo_error.isTrigger &&
                    this.smsCode_error.isTrigger &&
                    !this.mobileNo_error.isError_formate &&
                    !this.smsCode_error.isError_formate;
      return !status;
    },
    smsCode_btn_status() {
      return !(this.mobileNo_error.isTrigger && !this.mobileNo_error.isError_formate);
    },
    // 只有手机号合法的情况下才展示 验证码错误信息
    show_smsCode() {
      return this.mobileNo && !this.mobileNo_error.isError_formate;
    },
    // 在先触发sms时显示 请输入手机号的提示
    show_error_space() {
      return !this.mobileNo && this.smsCode_error.isTrigger;
    },
    mobileNoErrorMsg() {
      if (this.show_error_space || (this.mobileNo_error.isTrigger && !this.mobileNo)) {
        return '请输入手机号码'
      }
      if (this.mobileNo && this.mobileNo_error.isError_formate) {
        return '请输入正确的手机号码'
      }
    },
    smsErrorMsg() {
      if (this.show_smsCode) {
        if (this.smsCode_error.isError_space) {
          return '请输入短信验证码'
        }
        if (!this.smsCode_error.isError_space && this.smsCode_error.isError_formate) {
          return '请输入6位数短信验证码'
        }
        if (this.smsTimeout) {
          return '短信验证码已失效，请重新获取验证码'
        }
        if (this.smsIncorrect) {
          return '短信验证码错误，请核对或重新获取'
        }
      }
    },
  },

  created() {
    this.checkPWTools()
    this.getIsOurBankCard()
  },

  methods: {
    // 手机号失焦
    on_blur_mobileNo() {
      let reg = /^[1][0-9]{10}$/;
      let mobileNo = this.mobileNo.replace(/\s/g, '');
      this.mobileNo_error = this.verify_inout(mobileNo, reg);
    },

    on_blur_smsCode() {
      let reg = /^[0-9]{6}$/;
      this.smsCode_error = this.verify_inout(this.smsCode, reg);
    },

    handleSMSClick() {
      this.smsBtnText = '重新发送'
      this.on_blur_mobileNo()
      if (this.smsCode_btn_status) return
      this.$refs.msgRef.startSendCode()

      this.getSMSNo()
    },

    submit_btn() {
      // 点击「下一步」按钮，发送两次 RPC 请求，分别校验以下内容
      // 1. 短信验证码正确性
      // 2. 手机号是否是黑名单
      const _this = this

      _this.checkSMS()
        .then(_this.checkBlackStatus)
        .then(_this.link2Next)
    },

    handleCheckMobileNoRegisted(response) {
      const { errorCode } = response.resData.body

      if (errorCode === '1') {
        confirm('提示', '该手机号已注册，确认是否为本人账户？', {
          okButton: '我的，登录',
          cancelButton: '换个号注册',
        }).then(response => {
          if (response.ok) {
            // 返回登录页面，自动预填写已输入的手机号
            login({ currentMobile: this.mobileNo })
          }
        })
      }
    },

    link2Next() {
      if (isOurBankCard) {
        pushWindow('/ynet_account/register/open_success.html')
      } else {
        pushWindow('/ynet_account/register/set_tran_pwd.html')
      }
    },
    // 交易密码是否已开启且处于正常状态
    checkPWTools () {
      app.api.rpc('UR0009').then(res => {
        if (res.toolList.length > 0) {
          res.toolList.forEach(element => {
            if (element.securityType === 'pp' && element.securityStatus ==='00') {
              this.hasSecurityTool = true
            }
          });
        }
      })
    },

    // 银行业务章程页面
    go_business_constitution() {
      pushWindow('/ynet_account/register/registration_agreement.html');
      // 由于点击使用了阻止冒泡，跳转时需要将input框onblur
      document.documentElement.click();
    },
    /**
             * 校验input框并返回值
             * @param {*} inputValue  input框值
             * @param {*} reg         匹配的正则表达式
             */
    verify_inout(inputValue, reg) {
      this.smsTimeout = false
      this.smsIncorrect = false

      let result = {
        isError_space: false, //input 是否为空
        isError_formate: false, //input 值是否符合规则
        isTrigger: false //input 是否触发校验
      };
      result.isTrigger = true;
      if (inputValue) {
        result.isError_space = false;
        if (reg) {
          if (inputValue.search(reg) !== -1) {
            result.isError_formate = false;
          } else {
            result.isError_formate = true;
          }
        }
      } else {
        result.isError_space = true;
        result.isError_formate = true;
      }
      return result;
    },
    //简易注册  清空数据
    clearData() {
      this.mobileNo = '';
      this.smsCode = '';
      this.mobileNo_error = {
        isError_space: false, //input 是否为空
        isError_formate: false, //input 值是否符合规则
        isTrigger: false //input 是否触发校验
      };
      this.smsCode_error = {
        isError_space: false, //input 是否为空
        isError_formate: false, //input 值是否符合规则
        isTrigger: false //input 是否触发校验
      };
    },

    getIsOurBankCard() {
      getSessionStorage('isOurBankCard').then(response => {
        const { isOurBankCard } = JSON.parse(response)

        this.isOurBankCard = isOurBankCard
      })
    },

    getSMSNo() {
      return new Promise((resolve, reject) => {
        const data = {
          userId: '',
          mobileNo: this.mobileNo,
          businessType: '000007',
        }

        rpc('UR0017', data).then(response => {
          const { businessSerialNo } = response

          this.smsBusinessNo = businessSerialNo
          resolve()
        })
      })
    },

    checkSMS() {
      return new Promise((resolve, reject) => {
        const data = {
          smsCode: this.smsCode,
          businessSerialNo: this.smsBusinessNo,
          businessType: '000007',
        }

        rpc('UR0018', data).then(response => {
          const { verifyStatus } = response

          if (verifyStatus === '01') {
            resolve()
          }
        })
      })
    },

    checkBlackStatus() {
      return new Promise((resolve, reject) => {
        const mobileNo = this.mobileNo

        rpc('UR0030', { mobileNo }).then(response => {
          const { checkResult } = response

          if (checkResult == '00') {
            setSessionStorage(
              'registerMoblileNo',
              JSON.stringify({ mobileNo })
            ).then(() => resolve())
          } else {
            alert('提示', '暂不能进行本交易，请前往柜面办理。', { button: '我知道了' })
          }
        })
      })
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
    .register {
        background: #fff;
        height: 100%;
        .constitution{
            color: $ynet-dark-purple;
        }
        .ynet-input {
            display: block;

            &:before{
                display: none;
            }

            &:after {
                display: none;
            }
        }
        .register_msgN {
            padding: 0.32rem 0 0.16rem;
            position: relative;
            border-bottom: .01rem solid #dfdfdf;
            margin: 0 .32rem;

            .ynet-input {
                width: 100%;
                border-bottom: 0;
                margin: 0;
            }

            .ynet-msg-code__page-bt {
                margin-top: .62rem;
                flex: 0!important;
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
        .error-clues {
            text-align: right;
            font-size: 0.22rem;
            color: #d33b30;
            padding: 0.2rem 0.32rem 0 0;
            height: 0.2rem;
            line-height: 0.2rem;
            margin-bottom: 0.2rem;
        }
        .title {
            padding-top: .64rem;
            padding-left: .32rem;
            padding-bottom: .4em;
            color: #333;
            font-size: .52rem;
            line-height: .74rem;
            font-weight: 600;
        }
        .register_input {
            background: #fff;
            margin-top: .4rem;

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
            min-height: .2rem;
            padding-top: .06rem;
            padding-left: 2.1rem;
            font-size: .24rem;
            line-height: .34rem;
            color: #FF001F;
        }

        .ynet-agreement {
            margin-bottom: 0;
        }

        .btn-box {
            margin-top: .64rem;
        }

        .ynet-agreement__content a {
            text-decoration: none;
        }

        .ynet-prompt__content p {
            line-height: .36rem!important;
        }
    }
</style>
