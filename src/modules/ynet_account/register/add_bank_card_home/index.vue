<template>
  <div class="validate_identity" style="background: #ffffff">
    <m-header :left-menu="[{ icontype: 'back_black' }]" bar-bottom-line-color="#333333" />
    <ynet-register-title title="请验证您的银行卡" :desc="titleDesc" />
    <div style="margin-top: .64rem;">
      <div class="login-pw_input">
        <ynet-input
          v-model="mobileNo"
          type="number"
          placeholder="银行预留手机号"
          :left-input="true"
          :max="11"
        />
        <div class="sms_wrapper">
          <msg-code
            ref="msgRef"
            v-model="smsCode"
            s-timer="120"
            maxlength="6"
            placeholder="验证码"
            :start="false"
            :text="smsBtnText"
            :left-input="true"
            :truly-mobile="isTrulyMobile"
            @clickCode="getSMS"
          />
        </div>
        <ynet-input
          v-if="myBankCardType == '1'"
          v-model="validDate"
          title="有效期"
          placeholder="有效期(月/年)"
          type="number"
          :max="4"
          :left-input="true"
          :mask-value="validDateMask"
          @on-native-blur="handleValidDateMask"
        />
        <ynet-input
          v-if="myBankCardType == '1'"
          v-model="cvv2Num"
          placeholder="CVV2(卡背面3位数安全码)"
          type="number"
          :max="3"
          :left-input="true"
        />
        <ynet-input
          v-if="isOurBankCard"
          v-model="accPassword"
          type="number"
          :max="6"
          :min="6"
          :debounce="0"
          :left-input="true"
          :is-encry="true"
          :random-key="randomStr"
          :placeholder="passwordPlaceholder"
          :mask-value="accPasswordMask"
          @on-password-blur="handlePasswordBlur"
          @on-password-change="handlePasswordBlur"
        />
      </div>
      <div style="margin-top: .8rem; text-align: center;">
        <button class="btn-lg" @click="handleNextClick">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
import mHeader from "@/common/components/header";
import ynetInput from "@/common/components/ynet_input_test";
import ynetRegisterTitle from "@/common/components/ynet_register_title";
import msgCode from "@/common/components/ynet_msg_code_new";

export default {
  components: {
    mHeader,
    ynetInput,
    ynetRegisterTitle,
    msgCode
  },

  data() {
    return {
      urlData: null, // 上页面传值
      selectCardType: null, //  选中卡类型
      selectCardValue: "", // 选中卡类型的值
      epinPassword: "", //经过Epin加密处理的密码
      apinPassword: "",
      title: "",
      sequence: "",
      openFlag: "",
      loginFlag: "",

      accountNo: "", // 卡号
      IDInfo: null,
      cardInfo: {},
      titleDesc: "",
      isOurBankCard: true,
      myBankCardType: "1", // 0 - 本行储蓄； 1 - 本行信用； 2 - 他行储蓄
      mobileNo: "",
      isTrulyMobile: false,
      smsCode: "",
      smsBtnText: "获取验证码",
      smsID: "",
      accPassword: "",
      accPasswordMask: "",
      accPasswordValue: "",
      cvv2Num: "",
      validDate: "",
      validDateValue: "",
      bankName: "",
      bankNo: "",
      isTrulySMS: false,
      randomStr: "",
      isAddCard: false,
      userInfo: {},
      hasSecurityTool: false // 是否已设置安全工具
    };
  },

  computed: {
    passwordPlaceholder() {
      if (this.myBankCardType == "0") {
        return "6位卡密码";
      } else {
        return "6位查询密码";
      }
    },

    validDateMask() {
      if (this.validDate.length <= 2) {
        return this.validDate;
      } else {
        return `${this.validDate.slice(0, 2)}/${this.validDate.slice(2)}`;
      }
    }
  },

  created() {
    this.checkPWTools();
    this.getUserInfo();
    this.getIDInfo();
    this.getRandomStr();
    this.getBankInfo().then(this.initData);
  },

  methods: {
    getCardInfo() {
      return new Promise((resolve, reject) => {
        app.api.getSessionStorage("registerCardInfo").then(response => {
          this.cardInfo = JSON.parse(response);
          resolve();
        });
      });
    },

    setTitleDescAndLocalCardInfo() {
      const {
        bankName,
        cardNumber,
        isOurBankCard,
        cardType,
        bankID
      } = this.cardInfo;
      console.log("cardInfo", JSON.stringify(this.cardInfo));

      this.titleDesc = `请验证${bankName}${
        cardType == "10" ? "信用卡" : "储蓄卡"
      }(${cardNumber.slice(-4)})的信息`;
      this.accountNo = cardNumber;
      this.isOurBankCard = isOurBankCard;
      this.bankNo = bankID;
      this.bankName = bankName;

      if (isOurBankCard) {
        if (cardType === "10") {
          this.myBankCardType = "1";
        } else {
          this.myBankCardType = "0";
        }
      } else {
        this.myBankCardType = "2";
      }
    },

    initData() {
      if (!this.isAddCard) {
        this.getCardInfo().then(this.setTitleDescAndLocalCardInfo);
      }
    },

    checkBlackAccount() {
      return new Promise((resolve, reject) => {
        const mobileNo = this.mobileNo.includes('*') ? '': this.mobileNo;
        if (mobileNo) {
          app.api.rpc("UR0030", { mobileNo }).then(response => {
            if (response.checkResult === "00") {
              resolve();
            } else {
              app.api.alert("暂不能进行本交易，请前往柜面办理。", "提示", {
                okButton: "我知道了"
              });
            }
          });
        } else {
          resolve()
        }
      })
    },

    handleNextClick() {
      if (this.isAddCard) {
        this.checkCanISendRPC()
          .then(this.checkBlackAccount)
          .then(this.checkCardAndSms)
          .then(this.setRequestData)
          .then(this.addCardToAccount)
          .then(this.link2NextPage);
      } else {
        this.checkCanISendRPC()
          .then(this.checkBlackAccount)
          .then(this.checkCardAndSms)
          .then(this.setRequestData)
          .then(this.link2NextPage);
      }
    },

    getSMS(callback) {
      this.checkMobileNo().then(() => {
        callback();
        this.smsBtnText = "重新发送";
        this.$refs.msgRef.startSendCode();

        app.api
          .rpc("UR0017", {
            mobileNo: this.mobileNo,
            transType: "00"
          })
          .then(response => {
            if (response.errorCode === "AU0002") {
              app.api.alert("您今日的短信验证码次数已达上限。", "提示", {
                okButton: "我知道了"
              });
            }
            if (response.errorCode === "0") {
              this.smsID = response.businessSerialNo;
              app.api.showToast("验证码已发送");
            }
          });
      });
    },

    checkCardAndSms() {
      console.log("检查短信");
      return new Promise((resolve, reject) => {
        const data = {
          cardNo: this.accountNo,
          accountType: this.myBankCardType == "1" ? "1" : "2",
          owner: this.isOurBankCard ? "1" : "0",
          smsCode: this.smsCode,
          mobileNo: this.mobileNo,
          businessSerialNo: this.smsID,
          cardPassword: this.accPasswordValue,
          mathRandom: this.randomStr
        };

        if (this.myBankCardType == "1") {
          data.valiDate = this.validDateValue;
          data.cvv2 = this.cvv2Num;
        }

        if (this.isAddCard) {
          app.api.rpc("UR0058", data).then(response => {
            const { checkResult } = response;

            if (checkResult === "0") {
              resolve();
            }
          });
        } else {
          app.api.rpc("UR0062", data).then(response => {
            const { checkResult } = response;

            if (checkResult === "0") {
              resolve();
            }
          });
        }
      });
    },

    getPasswordString(length) {
      const str = "●";
      let value = "";

      for (let i = 0; i < length; i++) {
        value += str;
      }

      return value;
    },

    handlePasswordChange(val) {
      const { length } = val;
      const str = this.getPasswordString(length);

      this.accPassword = str;
      this.accPasswordMask = str;
    },

    handlePasswordBlur(val) {
      const { length, value } = val;
      const str = this.getPasswordString(length);

      this.accPassword = str;
      this.accPasswordMask = str;
      this.accPasswordValue = value;
    },

    handleValidDateMask() {
      this.validDateValue = this.validDate;
      this.validDate = this.validDateMask;
    },

    getIDInfo() {
      return new Promise((resolve, reject) => {
        app.api.getSessionStorage("registerIDInfo").then(response => {
          this.IDInfo = response ? JSON.parse(response) : {};
          console.log('获取registerIDInfo', this.IDInfo);

          resolve();
        });
      });
    },
    // 获取用户信息
    getUserInfo() {
      app.api.getUserInfo().then(res => {
        this.userInfo = res.userInfo.body ? res.userInfo.body : null;
      });
    },
    getRegisterData() {
      console.log('准备使用registerIDInfo', this.IDInfo);
      console.log('准备使用userInfo', this.userInfo);

      let IDName, IDNo, imagePath, backImagePath;
      if (
        this.userInfo &&
        this.userInfo.userType &&
        this.userInfo.userType !== "20" &&
        this.userInfo.userType !== "10"
      ) {
        [IDName, IDNo, imagePath, backImagePath] = [
          this.userInfo.customerName,
          this.userInfo.certNo,
          "",
          ""
        ];
      } else {
        IDName = this.IDInfo.IDName;
        IDNo = this.IDInfo.IDNo;
        imagePath = this.IDInfo.imagePath;
        backImagePath = this.IDInfo.backImagePath;
      }

      const data = {
        custName: IDName.includes("*") ? "" : IDName,
        mobileNo: this.mobileNo.includes("*") ? "" : this.mobileNo,
        cardNo: this.accountNo.includes("*") ? "" : this.accountNo,
        certNo: IDNo.includes("*") ? "" : IDNo,
        certType: "10",
        idCardFontPicPath: imagePath,
        idCardBackPicPath: backImagePath,
        bankNo: this.bankNo,
        bankName: this.bankName,
        mathRandom: this.randomStr
      };

      if (this.myBankCardType === "0") {
        data.accountType = "00";
        data.password = this.accPasswordValue;
      }
      if (this.myBankCardType === "1") {
        data.cvv2 = this.cvv2Num;
        data.validDate = this.validDateValue;
        data.accountType = "01";
        data.password = this.accPasswordValue;
      }
      if (this.myBankCardType === "2") {
        data.accountType = "10";
      }

      return data;
    },

    getRandomStr() {
      app.api.rpc("UR0051").then(response => {
        this.randomStr = response.mathRandom;

        app.api.setSessionStorage(
          "randomKey",
          JSON.stringify({ randomStr: this.randomStr })
        );
      });
    },

    getBankInfo() {
      return new Promise((resolve, reject) => {
        function isEmptyObj(obj) {
          for (let i in obj) {
            return false;
          }
          return true;
        }

        if (!isEmptyObj(app.params)) {
          const { title, num, bankCode, type, mask, telNumber } = app.params;

          this.isAddCard = true;
          this.isOurBankCard = true;
          this.bankName = title;
          this.bankNo = bankCode;
          this.accountNo = num;
          this.mobileNo = telNumber;
          this.myBankCardType = type === "1" ? "1" : "0";
          this.titleDesc = `请验证${title}${
            type == "1" ? "信用卡" : "储蓄卡"
          }(${mask.slice(-4)})的信息`;
        }

        resolve();
      });
    },

    // 存储请求数据
    setRequestData() {
      console.log("存储数据");
      const data = this.getRegisterData();

      return new Promise((resolve, reject) => {
        app.api
          .setSessionStorage("otherBankRegisterData", JSON.stringify(data))
          .then(() => resolve(data));
      });
    },

    addCardToAccount(data) {
      return new Promise((resolve, reject) => {
        app.api.rpc("UR0006", data).then(response => {
          if (response.errorCode === "0") {
            resolve();
          }
        });
      });
    },

    // 存储是否是我行卡片，方便开户成功后显示对应文本。
    // 如果是挂载银行卡，直接进入成功页面。
    // 否则，进入设置交易密码页面。
    link2NextPage() {
      const isOurBankCard = this.isOurBankCard;
      console.log("跳转");
      app.api
        .setSessionStorage("isOurBankCard", JSON.stringify({ isOurBankCard }))
        .then(() => {
          if (this.isAddCard) {
            app.api.pushWindow("/ynet_account/register/add_card_success.html");
          } else if (this.hasSecurityTool) {
            this.openEAccount()
          } else {
            app.api.pushWindow("/ynet_account/register/set_tran_pwd.html");
          }
        });
    },
    // 交易密码是否已开启且处于正常状态
    checkPWTools() {
      app.api.rpc("UR0009").then(res => {
        if (res.toolList.length > 0) {
          res.toolList.forEach(element => {
            if (
              element.securityType === "pp" &&
              element.securityStatus === "00"
            ) {
              this.hasSecurityTool = true;
            }
          });
        }
      });
    },
    // 开通电子账户
    openEAccount() {
      let registerData = this.getRegisterData()
      let data = {
        cardNo: registerData.cardNo,
        accountType: registerData.accountType
      };
      app.api.rpc("UR0005", data).then(response => {
        if (response.errorCode === "0") {
          app.api.pushWindow("/ynet_account/register/open_success.html");
        }
      });
    },
    checkCanISendRPC() {
      return new Promise((resolve, reject) => {
        if (this.myBankCardType === "0") {
          this.checkMobileNo()
            .then(this.checkSMSLength)
            .then(this.checkPassword)
            .then(() => resolve());
        }
        if (this.myBankCardType === "1") {
          this.checkMobileNo()
            .then(this.checkSMSLength)
            .then(this.checkDate)
            .then(this.checkCVV2)
            .then(this.checkPassword)
            .then(() => resolve());
        }
        if (this.myBankCardType === "2") {
          this.checkMobileNo()
            .then(this.checkSMSLength)
            .then(() => resolve());
        }
      });
    },

    checkMobileNo() {
      return new Promise((resolve, reject) => {
        if (this.mobileNo.length !== 11) {
          app.api.showToast("请输入正确的手机号");
        } else {
          const mobileReg = /^1[3|4|5|7|8|9][0-9]\d{4,8}$/;
          const isTrulyMobile = mobileReg.test(this.mobileNo);

          this.isTrulyMobile = isTrulyMobile;

          if (!isTrulyMobile) {
            app.api.showToast("请输入正确的手机号");
          } else {
            resolve();
          }
        }
      });
    },

    checkSMSLength() {
      return new Promise((resolve, reject) => {
        if (this.smsCode.length !== 6) {
          app.api.showToast("请输入正确的验证码");
        } else {
          this.isTrulySMS = true;
          resolve();
        }
      });
    },

    checkPassword() {
      return new Promise((resolve, reject) => {
        if (this.accPassword.length === 6) {
          resolve();
        } else {
          app.api.showToast("请输入正确的密码");
        }
      });
    },

    checkDate() {
      return new Promise((resolve, reject) => {
        const month = parseInt(this.validDateValue.slice(0, 2));
        const year = parseInt(this.validDateValue.slice(2));
        if (0 < month && month <= 12 && year >= 19) {
          resolve();
        } else {
          app.api.showToast("请输入正确的有效期");
        }
      });
    },

    checkCVV2() {
      return new Promise((resolve, reject) => {
        if (this.cvv2Num.length === 3) {
          resolve();
        } else {
          app.api.showToast("请输入正确的CVV2");
        }
      });
    }
  }
};
</script>

<style lang="scss">
.validate_identity {
  .sms_wrapper {
    margin: 0 0.32rem;
    margin-top: 0.32rem;
    border-bottom: 0.01rem solid #dfdfdf;
    padding: 0.24rem 0;
  }

  .my_input {
    margin-top: 0.32rem;
  }
}
</style>
