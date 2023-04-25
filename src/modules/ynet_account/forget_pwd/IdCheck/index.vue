<template>
  <div class="register">
    <m-header
      :left-menu="[{icontype:'back_black'}]"
      bar-bottom-line-color="#333333"
    />
    <ynet-register-title title="请您进行身份验证" />
        
    <p style="padding-left:0.32rem;color:#666666">
      为了保护您的账户安全，请进行身份验证
    </p>
    <div class="register_input">
      <div style="margin-bottom:0.32rem">
        <ynet-input
          ref="myInput"
          v-model="idName"
          title="真实姓名" 
          placeholder="真实姓名"
          :max="5"
          :left-input="true" 
          :err-msg="mobileNoErrorMsg"
          @on-native-blur="on_blur_mobileNo"
        />
      </div>
      <ynet-input 
        v-model="idNo"
        title="身份证号" 
        placeholder="身份证号" 
        :max="18"
        :left-input="true" 
        :err-msg="idNoErrorMsg"
        @on-native-blur="on_blur_id"
      />
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
import ynetAgreement from '@/common/components/ynet_agreement';
import ynetPrompt from '@/common/components/ynet_prompt';
import ynetInput from '@/common/components/ynet_input_test';
import ynetRegisterTitle from '@/common/components/ynet_register_title';

export default {
  components: {
    ynetAgreement,
    ynetPrompt,
    ynetInput,
    ynetRegisterTitle,
  },
  data() {
    return {
      idName: '',
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
      hasChecked: true, // 已阅读协议
      idNo: '',
      idNoErrorMsg: '',
    };
  },
  computed: {
    btn_disable() {
      return false
    },
    smsCode_btn_status() {
      return !(this.mobileNo_error.isTrigger && !this.mobileNo_error.isError_formate);
    },
    // 只有手机号合法的情况下才展示 验证码错误信息
    show_smsCode() {
      return this.idName && !this.mobileNo_error.isError_formate;
    },
    // 在先触发sms时显示 请输入手机号的提示
    show_error_space() {
      return !this.idName && this.smsCode_error.isTrigger;
    },
    mobileNoErrorMsg() {
      if (this.show_error_space || (this.mobileNo_error.isTrigger && !this.idName)) {
        return '请输入手机号码'
      }
      if (this.idName && this.mobileNo_error.isError_formate) {
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

  mounted() {
    console.log(app.params)
    console.log(this.$refs.myInput)
    setTimeout(() => {
      this.$refs.myInput.fastfocusFn()
    }, 300)
  },
        
  methods: {
    on_blur_id() {
                
                
    },
    // 手机号失焦
    on_blur_mobileNo() {
                
    },
            
    on_blur_smsCode() {
      let reg = /^[0-9]{6}$/;
      this.smsCode_error = this.verify_inout(this.smsCode, reg);
    },
            
            
    submit_btn() {
      if(this.idName.length >1 && this.idNo.length  == 18){
        app.api.rpc('LG1003',{
          custName: this.idName,
          certNo: this.idNo,
          mp_sId: app.params.mp_sId,
        }).then(res => {
          console.log(res)
          let b = parseInt(app.params.PageIndex) + 1 + ''
          console.log(parseInt(app.params.PageIndex) + 1)
                            
          let jumpInfo = app.params.jumpLink
          let pageInfo =  {jumpLink:jumpInfo,mp_sId: app.params.mp_sId,phone:app.params.phone,PageIndex:b,custom:{custName: this.idName,certNo: this.idNo}}
          if(res.checkPassFlag == '1'){
            if(parseInt(app.params.PageIndex) + 1 <= jumpInfo.length) {
              for (let a of jumpInfo) {
                if(a.configValue == b){
                  console.log(a)
                  if(a.configType == 'checkPersonInfo') {
                    app.api.pushWindow('/ynet_account/forget_pwd/IdCheck.html',pageInfo);
                  }else if(a.configType == 'checkFaceInfo'){
                    app.api.pushWindow("/ynet_account/forget_pwd/faceStart.html",pageInfo)
                  }else if(a.configType == 'checkBankCardsInfo'){
                    app.api.pushWindow("/ynet_account/forget_pwd/cardList.html",pageInfo)
                  }
                }
              }
            }else {
              app.api.pushWindow("/ynet_account/forget_pwd/input_newPwd.html",pageInfo)
            }
          }
          // app.api.pushWindow("/ynet_account/forget_pwd/faceStart.html", {jumpLink:app.params.jumpLink,mp_sId: app.params.mp_sId})
        })
      }else if(this.idName.length < 2){
        app.api.showToast('请输入正确的名字')
      }else if(this.idName.length > 1 && this.idNo.length != 18) {
        app.api.alert('您的身份信息有误，请确认后重新输入', '提示', { okButton: '我知道了' })
      }
                
    },
            
    handleCheckMobileNoRegisted(response) {
      const { errorCode } = response.resData.body

      if (errorCode === '1') {
        app.api.confirm('提示', '该手机号已注册，确认是否为本人账户？', {
          okButton: '我的，登录',
          cancelButton: '换个号注册',
        }).then(response => {
          if (response.ok) {
            // 返回登录页面，自动预填写已输入的手机号
            login({ currentMobile: this.idName })
          }
        })
      }
    },
            
    // 银行业务章程页面
    go_business_constitution() {
      app.api.pushWindow('/ynet_account/register/registration_agreement.html');
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
      this.idName = '';
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
    }
  }
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
            padding-top: .16rem;
            position: relative;
            border-bottom: .01rem solid #E9E9E9;
            margin: 0 .32rem;
            
            .ynet-input {
                width: 100%;
                border-bottom: 0;
                margin: 0;
            }
            
            .ynet-msg-code__page-bt {
                margin-top: .62rem;
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
            margin-top: .64rem;
            
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
            margin-top: .8rem;
        }
        
        .ynet-agreement__content a {
            text-decoration: none;
        }
        
        .ynet-prompt__content p {
            line-height: .36rem!important;
        }
    }
</style>
