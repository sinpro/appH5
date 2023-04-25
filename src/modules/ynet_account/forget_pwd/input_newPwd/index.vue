<template>
  <div class="register">
    <m-header
      :left-menu="[{icontype:'back_black'}]"
      bar-bottom-line-color="#333333"
    />
    <ynet-register-title title="请设置新的登录密码" />
    <div class="register_input">
      <ynet-input
        ref="myInput"
        v-model="mobileNo"
        title="设置密码"
        placeholder="请设置8-20位的登录密码" 
        :max="20"
        type="safety_text"
        :is-encry="true"
        :random-key="randomStr"
        :left-input="true"
        :err-msg="mobileNoErrorMsg"
        @on-input="adf"
        @on-blur="on_blur_mobileNo"
        @on-password-change="handlePasswordChange"
      />
      <div style="margin-top:0.32rem;margin-bottom:0.24rem">
        <ynet-input 
          v-model="idNo"
          title="确认密码" 
          :is-encry="true"
          :random-key="randomStr"
          placeholder="请确认登录密码"
          type="safety_text"
          :max="20"
          :left-input="true"
          :err-msg="idNoErrorMsg" 
          @on-input="checkTwo"
          @on-blur="on_blur_id"
          @on-password-change="handlePasswordCheck"
        />
      </div>
    </div>
    <div class="explain">
      密码设置长度为8-20位，必须包含字母，且同时包含数字、字母、符号中任意两种以上字符
    </div>
    <div class="btn-box">
      <button
        class=" btn-lg"
        :disabled="btn_disable"
        @click="submit_btn"
      >
        确定
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
      randomStr: '',
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
      hasChecked: true, // 已阅读协议
      idNo: '',
      idNoErrorMsg: '',
      pwd: '',
      checkPwd: '',
      testCwd: '',
      testPwd: ''
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
      return this.mobileNo && !this.mobileNo_error.isError_formate;
    },
    // 在先触发sms时显示 请输入手机号的提示
    show_error_space() {
      return !this.mobileNo && this.smsCode_error.isTrigger;
    },
    mobileNoErrorMsg() {
      if (this.show_error_space || (this.mobileNo_error.isTrigger && !this.mobileNo)) {
        return '请输入密码'
      }
      if (this.mobileNo && this.mobileNo_error.isError_formate) {
        return '请输入密码'
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
    app.api.trackEvent("MB_zhucedl_dl_09",{})
    setTimeout(() => {
      this.$refs.myInput.parentShowkeyboard()
    }, 300)
    app.api.rpc('UR0051').then(response => {                     
      this.randomStr = response.mathRandom
    })
  },
        
  methods: {
            
    handlePasswordChange(val) {
      const { length, md5, inputLevel, value } = val
      console.log(val)
      this.testCwd = inputLevel > 1 ? true : false
      this.testPwd = inputLevel > 1 ? true : false
      this.passMd = md5
      this.pwd = value
      this.adf(length)
    },
    handlePasswordCheck(val) {
      const { length, md5, inputLevel, value } = val
      console.log(val)
      this.testCwd = inputLevel > 1 ? true : false
      this.testPwd = inputLevel > 1 ? true : false
      this.passMdc = md5
      this.checkPwd = value
      this.checkTwo(length)
    },
    adf(value) {
      this.mobileNo = ''
      for(var i=0;i<value;i++) {
        this.mobileNo += '●'
                    
      }
      console.log(this.mobileNo)
      return this.mobileNo
    },
    checkTwo(value) {
      this.idNo = ''
      for(var i=0;i<value;i++) {
        this.idNo += '●'
      }
      console.log(this.idNo)
      return this.idNo
    },
    on_blur_id() {
      console.log(123213)
      if(this.pwd !== this.checkPwd) {
        console.log('两次密码不一致')
      }else {
        this.idNoErrorMsg = ''
      }
    },
    // 手机号失焦
    on_blur_mobileNo() {
      if(this.mobileNo.length < 8){
        app.api.alert('您输入的密码格式有误，请确认后重新输入', '提示', { okButton: '我知道了' })
                    
      }
    },
            
    on_blur_smsCode() {
      let reg = /^[0-9]{6}$/;
      this.smsCode_error = this.verify_inout(this.smsCode, reg);
    },
            
    get_smsCode() {
      this.smsBtnText = '重新发送'
      this.on_blur_mobileNo()
      if (this.smsCode_btn_status) return
      this.$refs.msgRef.startSendCode()

      const mobileNo = this.mobileNo.replace(/\s*/g, '')

      const data = {
        mobileNo: mobileNo
      }
                
      app.api.rpc('LG1004', data)
        .then(response => {
          if (response.errorCode === 'AU0002') {
            app.api.alert('提示', '您今日的短信验证码次数已达上限。', { okButton: '我知道了' })
          }
          if (response.errorCode === '0') {
            this.smsCode = response.smsCode    // todo: 使用真正手机接到的验证码
            app.api.showToast('验证码已发送')
          }
        })
        .catch(error => app.api.alert(error))
    },
            
    submit_btn() {
      // const reg = /^(?=.*[A-Za-z$@$!%*#?&])(?=.*\d)[A-Za-z\d$@$!%*#?&]{8,}$/
      // const testCwd= reg.test(this.checkPwd)
      // const testPwd = reg.test(this.pwd)
      // console.log(this.mobileNo,111)
      console.log(this.mobile,this.idNo,11)
      if(this.mobileNo == '' && this.idNo == ''){
        app.api.showToast('密码不能为空')
      }else {
        if(!this.testPwd){
          app.api.alert('您输入的密码格式有误，请确认后重新输入', '提示', { okButton: '我知道了' })
        }else if (this.testPwd && this.mobileNo.length < 8){
          app.api.showToast('密码位数不足，请重新输入')
        }
        else if(this.testPwd && this.passMd !== this.passMdc) {
          app.api.alert('两次输入的密码不一致，请确认后重新输入', '提示', { okButton: '我知道了' })
        } else if(this.passMd == this.passMdc){
                        
          app.api.rpc('LG1007',{
            "comfirmPassword": this.pwd,
            "password": this.checkPwd,
            "mp_sId":app.params.mp_sId,
            "mathRandom":this.randomStr,
            "channelId": 'MB'
          }).then(res => {
            if(res.updateStatusFlag == '1') {
              app.api.pushWindow('/ynet_account/forget_pwd/success.html',{phone:app.params.phone})
            }
          })
        }
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
            login({ currentMobile: this.mobileNo })
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
            margin-top: .8rem;
            
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
        .explain{
            font-size: 0.24rem;
            color: #999999;
            padding: 0rem 0.32rem;
        }
    }
</style>
