<template>
  <div class="checkCard">
    <m-header
      :left-menu="[{icontype:'back_black'}]"
      bar-bottom-line-color="#333333"
    />
    <ynet-register-title title="请你进行银行卡验证" />
    <p style="padding-left:0.32rem;color:#333">
      为了保证您的账户安全，请进行银行卡验证
    </p>
    <div
      class="main"
      style="margin-top:0.64rem"
    >
      <ynet-input
        v-model="mobileNo"
        title=""
        placeholder="银行预留手机号" 
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
          :msg-title="''" 
          :placeholder="'验证码'"
          :maxlength="'6'" 
          :text="smsBtnText" 
          :left-input="true"
          :truly-mobile="true" 
          :err-msg="smsErrorMsg"
          :s-timer="allTime"
          :disabled="repeat"
          @clickCode="get_smsCode"
          @msgBlur="on_blur_smsCode"
        />
      </div>
      <div
        v-if="creditCard"
        class="creditCard"
      >
        <ynet-input
          v-model="date"
          title=""
          placeholder="有效期（月/年）" 
          :max="4"
          type="number" 
          :left-input="true" 
          :mask-value="validDateMask"
          @on-native-blur="on_blur_date"
        />
        <div style="margin:0.32rem 0rem">
          <ynet-input
            v-model="cvv"
            title=""
            placeholder="CVV2(卡背面3位数安全码)" 
            :max="3"
            type="number" 
            :left-input="true" 
            @on-native-blur="on_blur_cvv"
          />
        </div>
      </div>
      <ynet-input
        v-if="myBank && !creditCard"
        v-model="pwdNo"
        title="" 
        placeholder="6位卡密码" 
        :max="6"
        type="number"
        :min="6"
        :debounce="0"
        :mask-value="maskValue"
        :left-input="true" 
        :err-msg="idNoErrorMsg"
        :random-key="randomStr"
        :is-encry="true"
        @on-native-blur="on_blur_pwd"
        @on-password-blur="handlePasswordBlur"
        @on-password-change="handlePasswordChange"
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
import msgCode from '@/common/components/ynet_msg_code_new';
import ynetRegisterTitle from '@/common/components/ynet_register_title';
import { parse } from 'path';

export default {
  components: {
    ynetAgreement,
    ynetPrompt,
    ynetInput,
    msgCode,
    ynetRegisterTitle,
  },
  data() {
    return {
      allTime: 120,
      repeat:false,
      mobileNo: '',
      randomStr:'',
      // mobileNoDisabled: false,
      // mobileNo: '',
      mobileNo: app.params.cardInfo.mobileNo_mask,
      smsCode: '',
      deviceId: '',
      registerFlowNo: '',
      mobileNo_error: {
        isError_space: false, //input 是否为空
        isError_formate: false, //input 值是否符合规则
        isTrigger: false //input 是否触发校验
      },
      date: '',
      smsCode_error: {
        isError_space: false, //input 是否为空
        isError_formate: false, //input 值是否符合规则
        isTrigger: false, //input 是否触发校验
      },
      smsTimeout: false,
      smsIncorrect: false,
      smsBtnText: '获取验证码',
      hasChecked: true, // 已阅读协议
      pwdNo: '',
      idNoErrorMsg: '',
      cvv: '',
      creditCard: true,
      myBank: true,
      businessSerialNo:'',
      smsValidate:'',
      userId:'',
      businessType:'',
      bizChannel:'',
      truelyPwd:'',
      maskValue: '',
      creditCardPlaceholder: ''
    };
  },
  computed: {
    validDateMask() {
      if (this.date.length <= 2) {
        return this.date
      } else {
        return `${this.date.slice(0, 2)}/${this.date.slice(2)}`
      }
    },
    btn_disable() {
      return false
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
      // if ((!this.mobileNo && this.smsCode_error.isTrigger) || (this.mobileNo_error.isTrigger && !this.mobileNo)) {
      //   return '请输入手机号码'
      // }
      // if (this.mobileNo && this.mobileNo_error.isError_formate) {
      //   return '请输入正确的手机号码'
      // }
      return '请输入手机号码'
    },
    smsErrorMsg() {
      // if (this.show_smsCode) {
      //   if (this.smsCode_error.isError_space) {
      //     return '请输入短信验证码'
      //   }
      //   if (!this.smsCode_error.isError_space && this.smsCode_error.isError_formate) {
      //     return '请输入6位数短信验证码'
      //   }
      //   if (this.smsTimeout) {
      //     return '短信验证码已失效，请重新获取验证码'
      //   } 
      //   if (this.smsIncorrect) {
      //     return '短信验证码错误，请核对或重新获取'
      //   } 
      // } 
      return '请输入短信验证码'
    },
  },

  mounted() {
    app.api.rpc('UR0051').then(response => {                     
      this.randomStr = response.mathRandom
    })
    console.log(app.params)
    this.creditCard = app.params.cardInfo.accountType == '1' ?  true : false
    this.myBank = app.params.cardInfo.owner == '1' ? true : false
    this.mobileNoDisabled = app.params.cardInfo.owner == '1' ? true : false
    this.creditCardPlaceholder = this.creditCard ? '6位查询密码' : '6位卡密码'
  },
        
  methods: {
    handlePasswordChange(val) {
      console.log(val)
      const { length } = val
      const str = this.getPasswordString(length)

      this.pwdNo = str
      this.maskValue = str
      this.truelyPwd = val.value
    },
    handlePasswordBlur(val){
      const { length } = val
      const str = this.getPasswordString(length)

      this.pwdNo = str
      this.maskValue = str
      this.truelyPwd = val.value
      console.log(this.truelyPwd)
    },
    getPasswordString(length) {
      const str = '●'
      let value = ''

      for (let i = 0; i < length; i++) {
        value += str
      }
      return value
    },
    on_blur_date() {
      //18
      this.date = this.validDateMask
      console.log( (parseInt(this.date.slice(-2)) < 13))
      if((parseInt(this.date.slice(-2)) < 19) || (parseInt(this.date.slice(0,2)) > 12) ||  (parseInt(this.date.slice(0,2)) == 0)) {
        app.api.showToast('请输入正确的有效期')
      }
    },
    on_blur_pwd() {
      if(this.pwdNo.length == 0) {
        this.idNoErrorMsg = '您的身份信息有误，请重新填写'
      }else {
        this.idNoErrorMsg = ''
      }
    },
    // 手机号失焦
    on_blur_mobileNo() {
      // let reg = /^1(3|4|5|7|8)\d{9}$/;
      // let mobileNo = this.mobileNo.replace(/\s/g, '');
      // if(mobileNo.search(reg) == -1) {
      //     app.api.showToast('请输入正确的手机号')
      // }
      console.log(1234)
    },
            
    on_blur_smsCode() {
      let reg = /^[0-9]{6}$/;
      this.smsCode_error = this.verify_inout(this.smsCode, reg);
                
    },
            
    get_smsCode(cb) {
      let reg = /^1(3|4|5|7|8)\d{9}$/;
      let mobileNo = this.mobileNo.replace(/\s/g, '');
      if(this.mobileNo.length == 11 && this.myBank) {
        this.getMsgCode(cb)
      }else if(mobileNo.search(reg) !== -1 && !this.myBank) {
        this.getMsgCode(cb)
      }else {
        app.api.showToast('请输入正确的手机号')
      }
                
    },
    getMsgCode(cb) {
      if(this.repeat) {
        return
      }else {
        cb()
        this.smsBtnText = '重新发送'
        let timer = this.allTime
        let time = setInterval(()=> {
          timer--
          console.log(timer)
          if(timer == 1) {
            this.repeat = false
            timer = this.allTime
            clearInterval(time)
          }else {
            this.repeat = true
          }
        },1000)
        console.log(1112222)
        this.$refs.msgRef.startSendCode()

        const mobileNo = this.mobileNo.replace(/\s*/g, '')
        const data = {
          mobileNo: this.mobileNo,
        }
        app.api.rpc('LG1010', data)
          .then(response => {
            console.log(response)
            this.businessSerialNo=response.businessSerialNo
            this.smsValidate=response.smsValidate
            this.userId=response.userId
            this.businessType=response.businessType
            this.bizChannel = response.bizChannel
            if (response.errorCode === 'AU0002') {
              app.api.alert('提示', '您今日的短信验证码次数已达上限。', { okButton: '我知道了' })
            }
            if (response.errorCode === '0') {
              this.smsCode = response.smsCode    // todo: 使用真正手机接到的验证码
              app.api.showToast('验证码已发送')
            }
          })
          // .catch(error => app.api.alert(error))
      }
    },
    checkRpc(){
      app.api.rpc('LG1002',{
        mp_sId: app.params.mp_sId,
        accountNo_sequence: app.params.cardInfo.accountNo_sequence,
        accountType: app.params.cardInfo.accountType,
        // accountType:'1',
        owner:app.params.cardInfo.owner,
        smsCode:this.smsCode,
        mobileNo:this.mobileNo,
        businessSerialNo:this.businessSerialNo,
        mathRandom: this.randomStr,
        cardPassword: this.truelyPwd,
        vailDate:this.date,
        cvv2: this.cvv,
        mp_sId:app.params.mp_sId,
      }).then(res => {
        if(res.checkResult == '0'){
          app.api.pushWindow('/ynet_account/forget_pwd/input_newPwd.html',{phone:app.params.phone,mp_sId:app.params.mp_sId});
        }
      })
    },
    submit_btn() {
      let reg = /^1(3|4|5|7|8)\d{9}$/;
      let mobileNo = this.mobileNo.replace(/\s/g, '');
                
      if(mobileNo.search(reg) == -1 && !this.myBank) {           
        app.api.showToast('请输入正确的手机号')
      }else if (mobileNo.search(reg) !== -1 && this.smsCode.length < 6){
        app.api.showToast('请输入正确的验证码')
      }else if (!this.myBank && this.creditCard){
        if(this.date.length == 0 || this.date.length != 5) {
          app.api.showToast('请输入正确的日期')
        }else if(this.cvv.length == 0 ) {
          app.api.showToast('请输入安全码')
        }else{
          this.checkRpc()
        }
      }else if (this.myBank && this.creditCard){
        if(this.date.length == 0 || this.date.length != 5) {
          app.api.showToast('请输入正确的日期')
        }else if(this.cvv.length == 0 ) {
          app.api.showToast('请输入安全码')
        }else {
          this.checkRpc()                        
        }
      }else if(this.myBank && !this.creditCard){
        if(this.pwdNo.length < 6 ) {
          app.api.showToast('请输入正确的卡密')
        }else {
          this.checkRpc()
        }
      }else{
        console.log(2)
        this.checkRpc()
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
    .checkCard {
        background: #fff;
        height: 100%;
        .main {
            margin-top: 0.64rem;
            .cardNo{
                height: 1.44rem;
                margin: 0 .32rem;
                border-bottom: .01rem solid #dfdfdf;
                padding: .24rem 0;
                box-sizing: border-box;
                .ynet-input__title{
                        color: #333;
                        font-size: .24rem;
                        line-height: .32rem;
                }
                .ynet-input__box{
                    height: 0.8rem;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    .ynet-input__box__mask{
                        font-size: 0.32rem;
                    }
                    .bankName{
                        font-size: 0.24rem;
                    }
                }
            }
        }
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
            // padding-top: .32rem;
            position: relative;
            border-bottom: .01rem solid #E9E9E9;
            margin: .32rem;
            .ynet-input {
                width: 100%;
                border-bottom: 0;
                margin: 0;
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
        .main {
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
            display: flex;
            align-items: baseline;
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
