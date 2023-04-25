<template>
  <div class="register">
    <m-header :left-menu="[{icontype:'back_black'}]" bar-bottom-line-color="#ffffff" />
    <ynet-register-title title="请您进行短信验证" />
    <p style="padding-left:0.32rem;color:#666666">为了保证您的账户安全，请进行短信验证</p>
    <div class="register_input">
      <!-- <ynet-input
        ref="myInput"
        v-model="mobileNo"
        placeholder="银行注册手机号"
        :max="11"
        type="tel"
        :left-input="true"
        @on-native-blur="on_blur_mobileNo"
      /> -->
      <div
        class="input_area"
      >
        <input
          v-model="mobileNo"
          type="tel"
          placeholder="银行注册手机号"
          maxlength="11"
        >
      </div>
      
      <!-- <input
        ref="myInput"
        v-model="mobileNo"
        type="tel"
        placeholder="银行注册手机号"
        maxlength="11"
      > -->
      <div class="register_msgN">
        <msg-code
          ref="msgRef"
          v-model="smsCode"
          :start="false"
          :msg-title="''"
          :placeholder="'验证码'"
          :maxlength="'6'"
          :text="smsBtnText"
          :disabled="repeat"
          :left-input="true"
          :truly-mobile="smsCode_btn_status"
          :s-timer="allTime"
          @clickCode="get_smsCode"
          @msgBlur="on_blur_smsCode"
        />
      </div>
    </div>
    <div class="btn-box">
      <button class="btn-lg" :disabled="btn_disable" @click="submit_btn">下一步</button>
    </div>
  </div>
</template>

<script>
import mHeader from "@/common/components/header";
import msgCode from "@/common/components/ynet_msg_code_new";
import ynetRegisterTitle from "@/common/components/ynet_register_title";

export default {
  components: {
    mHeader,
    msgCode,
    ynetRegisterTitle
  },
  data() {
    return {
      mobileNo: "",
      smsCode: "",
      deviceId: "",
      title: "",
      registerFlowNo: "",
      mobileNo_error: {
        isError_space: false, //input 是否为空
        isError_formate: false, //input 值是否符合规则
        isTrigger: false //input 是否触发校验
      },
      smsCode_error: {
        isError_space: false, //input 是否为空
        isError_formate: false, //input 值是否符合规则
        isTrigger: false //input 是否触发校验
      },
      smsTimeout: false,
      smsIncorrect: false,
      smsBtnText: "获取验证码",
      hasChecked: true, // 已阅读协议
      businessSerialNo: "",
      smsValidate: "",
      userId: "",
      businessType: "",
      bizChannel: "",
      mp_sId: "",
      repeat: false,
      allTime: 120
    };
  },
  computed: {
    btn_disable() {
      return false;
    },
    smsCode_btn_status() {
      let reg = /^1(3|4|5|7|8)\d{9}$/;
      let mobileNo = this.mobileNo.replace(/\s/g, "");
      if (mobileNo.search(reg) !== -1) {
        // this.repeat = true
        return true;
      } else {
        return false;
      }
    },
    // 只有手机号合法的情况下才展示 验证码错误信息
    show_smsCode() {
      return this.mobileNo && !this.mobileNo_error.isError_formate;
    },
    // 在先触发sms时显示 请输入手机号的提示
    show_error_space() {
      return !this.mobileNo && this.smsCode_error.isTrigger;
    }
  },

  mounted() {
    app.api.trackEvent("MB_zhucedl_dl_07", {});
  },

  methods: {
    // 手机号失焦
    on_blur_mobileNo() {
      // let reg = /^1(3|4|5|7|8)\d{9}$/;
      // let mobileNo = this.mobileNo.replace(/\s/g, '');
      // if(mobileNo.search(reg) == -1) {
      //     app.api.showToast('请输入正确的手机号')
      // }
    },

    on_blur_smsCode() {
      let reg = /^[0-9]{6}$/;
      this.smsCode_error = this.verify_inout(this.smsCode, reg);
    },

    get_smsCode(cb) {
      let reg = /^1(3|4|5|7|8)\d{9}$/;
      let mobileNo = this.mobileNo.replace(/\s/g, "");
      if (mobileNo.search(reg) !== -1) {
        if (this.repeat) {
          return;
        } else {
          cb();
          this.smsBtnText = "重新发送";
          let timer = this.allTime;
          let time = setInterval(() => {
            timer--;
            if (timer == 1) {
              this.repeat = false;
              timer = this.allTime;
              clearInterval(time);
            } else {
              this.repeat = true;
            }
          }, 1000);
          this.$refs.msgRef.startSendCode();
          const mobileNo = this.mobileNo.replace(/\s*/g, "");

          const data = {
            mobileNo: mobileNo
          };

          app.api
            .rpc("LG1004", data)
            .then(response => {
              this.businessSerialNo = response.businessSerialNo;
              this.smsValidate = response.smsValidate;
              this.userId = response.userId;
              this.businessType = response.businessType;
              this.bizChannel = response.bizChannel;
              if (response.errorCode === "AU0002") {
                app.api.alert("提示", "您今日的短信验证码次数已达上限。", {
                  okButton: "我知道了"
                });
              }
              if (response.errorCode === "0") {
                this.smsCode = response.smsCode; // todo: 使用真正手机接到的验证码
                app.api.showToast("验证码已发送");
                this.$refs.msgRef.msgFocus();
              }
            })
            .catch(error => {
              //   app.api.alert(error.errorMsg);
            });
        }
      } else {
        app.api.showToast("请输入正确的手机号");
      }
    },

    submit_btn() {
      let reg = /^1(3|4|5|7|8)\d{9}$/;
      let mobileNo = this.mobileNo.replace(/\s/g, "");
      console.log(this.smsCode, 11);
      if (mobileNo.search(reg) == -1) {
        app.api.showToast("请输入正确的手机号");
      } else if (
        this.smsCode == undefined ||
        (mobileNo.search(reg) !== -1 && this.smsCode.length != 6)
      ) {
        app.api.showToast("请输入正确的验证码");
      } else {
        const mobileNo = this.mobileNo;
        const that = this;

        const data = {
          mobileNo: this.mobileNo,
          smsCode: this.smsCode,
          businessSerialNo: this.businessSerialNo,
          smsValidate: this.smsValidate,
          bizChannel: this.bizChannel,
          businessType: this.businessType,
          userId: this.userId
        };

        app.api.rpc("LG1005", data).then(res => {
          this.mp_sId = res.mp_sId;
          let bridge = window.AlipayJSBridge || window.FlameJSBridge;
          bridge.call(
            "setSessionID",
            {
              sessionID: res.mp_sId
            },
            res => {}
          );
          app.api
            .rpc("LG1001", {
              mobileNo: this.mobileNo,
              loginName: this.mobileNo,
              mp_sId: this.mp_sId
            })
            .then(res => {
              let jumpLink = "";
              let c = 0;
              app.api.trackEvent('MB_zhucedl_dl_08', {
                mobileNo: this.mobileNo,
                state: '1'
              })
              if (res.isOpenAccountFlag == "0") {
                for (let a of res.dataConfigList) {
                  c++;
                  if (a.configValue == "1") {
                    if (a.configType == "checkPersonInfo") {
                      console.log(jumpLink);
                      app.api.pushWindow(
                        "/ynet_account/forget_pwd/IdCheck.html",
                        {
                          jumpLink: res.dataConfigList,
                          mp_sId: this.mp_sId,
                          phone: this.mobileNo,
                          PageIndex: 1
                        }
                      );
                      break;
                    } else if (a.configType == "checkFaceInfo") {
                      app.api.pushWindow(
                        "/ynet_account/forget_pwd/faceStart.html",
                        {
                          jumpLink: res.dataConfigList,
                          mp_sId: this.mp_sId,
                          phone: this.mobileNo,
                          PageIndex: 1
                        }
                      );
                      break;
                    } else if (a.configType == "checkBankCardsInfo") {
                      app.api.pushWindow(
                        "/ynet_account/forget_pwd/cardList.html",
                        {
                          jumpLink: res.dataConfigList,
                          mp_sId: this.mp_sId,
                          phone: this.mobileNo,
                          PageIndex: 1
                        }
                      );
                      break;
                    }
                  }
                }
              } else {
                app.api.pushWindow(
                  "/ynet_account/forget_pwd/input_newPwd.html",
                  { phone: this.mobileNo, mp_sId: this.mp_sId }
                );
              }
            });
        }, reason => {
          app.api.trackEvent('MB_zhucedl_dl_08', {
            mobileNo: this.mobileNo,
            state: '0',
            errorMsg: reason.errorMessage
          })
        });
      }

      // app.api.pushWindow('/ynet_account/forget_pwd/IdCheck.html');
    },

    handleCheckMobileNoRegisted(response) {
      const { errorCode } = response.resData.body;

      if (errorCode === "1") {
        app.api
          .confirm("提示", "该手机号已注册，确认是否为本人账户？", {
            okButton: "我的，登录",
            cancelButton: "换个号注册"
          })
          .then(response => {
            if (response.ok) {
              // 返回登录页面，自动预填写已输入的手机号
              login({ currentMobile: this.mobileNo });
            }
          });
      }
    },

    // 银行业务章程页面
    go_business_constitution() {
      app.api.pushWindow("/ynet_account/register/registration_agreement.html");
      // 由于点击使用了阻止冒泡，跳转时需要将input框onblur
      document.documentElement.click();
    },
    /**
     * 校验input框并返回值
     * @param {*} inputValue  input框值
     * @param {*} reg         匹配的正则表达式
     */
    verify_inout(inputValue, reg) {
      this.smsTimeout = false;
      this.smsIncorrect = false;

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
      this.mobileNo = "";
      this.smsCode = "";
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
    padding: 0.32rem 0;
    position: relative;
    border-bottom: 0.01rem solid #e9e9e9;
    margin: 0.16rem 0.32rem;

    .ynet-input {
      width: 100%;
      border-bottom: 0;
      margin: 0;
    }

    .ynet-msg-code__page-bt {
      // margin-top: .62rem;
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
    margin-top: 0.64rem;

    .ynet-input__box__input {
      text-align: left !important;
    }
    .ynet-input__box {
      color: #333 !important;
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
        line-height: .48rem;
      }
    }
  }
  a {
    text-decoration: underline;
    color: #999;
  }
  .ynet-msg-code {
    align-items: baseline;
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

  .btn-box {
    margin-top: 0.8rem;
  }

  .ynet-agreement__content a {
    text-decoration: none;
  }

  .ynet-prompt__content p {
    line-height: 0.36rem !important;
  }
}
</style>
