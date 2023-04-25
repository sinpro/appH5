<template>
  <div class="validate_identity" style="background: #ffffff">
    <m-header
      :prevent-back="true"
      :left-menu="[{ icontype: 'close_black' }]"
      bar-bottom-line-color="#ffffff"
      @leftHandler="handleBackClick"
    />
    <ynet-register-title
      title="请绑定您的银行卡"
      :desc="
        hasOurBankCard ? '' : '请绑定一张本行或他行卡，以便享受更全面的服务'
      "
    />
    <div v-if="hasOurBankCard" class="tip_area">
      <span @click="handleMyCardListClick">查看本行账户</span>，或继续绑定一张本行或他行卡
    </div>
    <div style="flex: 1;">
      <div class="my_info">
        <div class="my_info_label">持卡人</div>
        <div class="my_info_name">{{ displayUserName }}</div>
      </div>
      <div class="login-pw_input">
        <ynet-input
          v-model="accountNo"
          class="icon_scan"
          title="银行卡"
          type="number"
          placeholder="请输入持卡人银行卡号"
          :max="19"
          :left-input="true"
          :right-icon="
            require('@/common/cssBundle/assets/registered/scan@2x.png')
          "
          @rightIcon="scanCard"
          @on-change="on_blur_accountNo"
          @on-native-blur="handleAccountNoBlur"
        />
      </div>
      <div class="btn-box">
        <button class="btn-lg" @click="handleButtonClick">下一步</button>
      </div>
    </div>
    <div class="support">
      <div class="support_wrapper">
        <div class="support_title">
          <p>支持的银行卡</p>
          <span class="support_more" @click="handleMoreClick">更多</span>
        </div>
        <div class="support_list">
          <div v-for="(item, index) in bankList" class="support_listItem" :key="index">
            <img :src="item.logo" />
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mHeader from "@/common/components/header";
import ynetInput from "@/common/components/ynet_input_test";
import ynetRegisterTitle from "@/common/components/ynet_register_title";

export default {
  components: {
    mHeader,
    ynetInput,
    ynetRegisterTitle
  },

  data() {
    return {
      userName: "",
      accountNo: "",
      bankList: [],
      hasOurBankCard: false,
      placeImg: require("@/common/cssBundle/assets/registered/bank_eg.png"),
      goBackPath: ""
    };
  },

  computed: {
    // 转换用户名字：江泽民 -> **民
    displayUserName() {
      let str = "";
      if (this.userName.includes("*")) {
        return this.userName;
      }
      for (let i = 0; i < this.userName.length; i++) {
        if (i != this.userName.length - 1) {
          str += "*";
        } else {
          str += this.userName[i];
        }
      }

      return str;
    }
  },

  created() {
    console.log("url参数", app.params);
    app.api.getSessionStorage("needEAccount").then(res => {
      if (res) {
        this.goBackPath = JSON.parse(res).path;
      }
    });
    app.api.closeOther();
    this.getUserName();
    this.getBankList();
    this.getHasOurBankCard();
  },

  methods: {
    handleBackClick() {
      app.api
        .confirm("您是否确定放弃开户?", "提示", {
          okButton: "放弃开户",
          cancelButton: "取消"
        })
        .then(response => {
          if (response.ok) {
            if (this.goBackPath) {
              app.api.pushWindow(this.goBackPath);
            } else {
              app.api.closeAll();
            }
          }
        });
    },

    handleMoreClick() {
      app.api.pushWindow("/ynet_account/register/support_banks.html");
    },

    handleButtonClick() {
      this.checkCanISendRPC()
        .then(this.getCardInfo)
        .then(this.setCardInfo);
    },

    handleMyCardListClick() {
      if (this.goBackPath) {
        app.api.pushWindow("/ynet_bank_card/bank_card/our_bank_list.html");
      } else {
        app.api.pushWindow("/ynet_account/register/my_card_list.html");
      }
    },

    scanCard() {
      app.api.showOCRBankCard().then(response => {
        const { cardNumber } = response;

        this.accountNo = cardNumber.replace(/[^0-9]/gi, "");
      });
    },

    link2Next() {
      if (this.goBackPath) {
        app.api.pushWindow("/ynet_bank_card/bank_card/add_bank_card_home.html");
      } else {
        app.api.pushWindow("/ynet_account/register/add_bank_card_home.html");
      }
    },

    getUserName() {
      return new Promise((resolve, reject) => {
        if (app.params.IDName) {
          this.userName = app.params.IDName;
          resolve();
          return;
        }
        app.api.getSessionStorage("registerIDInfo").then(response => {
          const { IDName } = JSON.parse(response);
          this.userName = IDName;
          resolve();
        });
      });
    },

    getCardInfo() {
      return new Promise((resolve, reject) => {
        const cardNo = this.accountNo;

        const options = {
          processError: this.handleGetCardInfoError
        };

        app.api.rpc("UR0012", { cardNo }, options).then(response => {
          resolve(response);
        });
      });
    },

    getBankList() {
      const data = {
        pageSize: "4",
        pageNo: "1"
      };

      app.api.rpc("UR0027", data).then(response => {
        const { bankInfoList } = response;

        this.bankList = bankInfoList.map(item => {
          const o = {};

          o.text = item.bankName;
          // todo: 替换银行 logo
          o.logo = item.bankIcon || this.placeImg;

          return o;
        });
      });
    },

    getHasOurBankCard() {
      app.api.getSessionStorage("hasOurBankCard").then(response => {
        const { hasOurBankCard } = JSON.parse(response);
        console.log("hasOurBankCard", response);
        this.hasOurBankCard = hasOurBankCard;

        if (hasOurBankCard) {
          app.api
            .confirm("您已有本行账户，是否继续开户？", "提示", {
              okButton: "继续开户",
              cancelButton: "查看账户"
            })
            .then(response => {
              if (response.ok) {
                return;
              } else {
                if (this.goBackPath) {
                  app.api.pushWindow(
                    "/ynet_bank_card/bank_card/our_bank_list.html"
                  );
                } else {
                  app.api.pushWindow(
                    "/ynet_account/register/my_card_list.html"
                  );
                }
              }
            });
        }
      });
    },

    handleGetCardInfoError(response) {
      const { errorCode } = response.resData.body;

      if (errorCode === "UC00904001") {
        app.api.showToast("暂不支持绑定该银行卡，可查看“支持的银行卡”");
      }
    },

    setCardInfo(response) {
      return new Promise((resolve, reject) => {
        const { bankName, bankType, cardType, bankCode } = response;

        const data = {
          bankName: bankName,
          cardNumber: this.accountNo,
          isOurBankCard: bankType === "1" ? true : false,
          cardType,
          bankID: bankCode
        };
        if (cardType == "10" && bankType == "0") {
          app.api.showToast("暂不支持绑定他行信用卡，可查看“支持的银行卡”");
          return;
        }
        app.api
          .setSessionStorage("registerCardInfo", JSON.stringify(data))
          .then(this.link2Next());
      });
    },

    checkCanISendRPC() {
      let that = this
      return new Promise((resolve, reject) => {
        const reg = /^([1-9]{1})(\d{15}|\d{17}|\d{18})$/;

        if (reg.test(this.accountNo)) {
          // 检查卡号是否已被加挂
          that.checkStatus(() => {
            resolve();
          })
        } else {
          app.api.showToast("请输入正确的银行卡号");
        }
      });
    },
    // 检查卡是否已加挂
    checkStatus (cb) {
      app.api.rpc('UR0003',{cardNo: this.accountNo}).then(res => {
        if (res.result === '00') {
          typeof cb === 'function' && cb()
        } else {
          app.api.alert('该卡已加挂!')
        }
      })
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.validate_identity {
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  .login-pw_input {
    margin-top: 0.32rem;
    position: relative;
  }

  .btn-box {
    margin-top: 0.8rem;
  }

  .support {
    .support_wrapper {
      padding: 0 0.32rem;
    }

    .support_title {
      height: 0.96rem;
      border-bottom: 0.01rem solid #dfdfdf;
      display: flex;
      justify-content: space-between;
      line-height: 0.96rem;

      p {
        color: #333;
        font-size: 0.32rem;
        font-weight: 600;
      }

      .support_more {
        color: #999;
        font-size: 0.28rem;
        vertical-align: middle;
      }
    }

    .support_list {
      height: 1.86rem;
      padding-top: 0.2rem;
      display: flex;

      .support_listItem {
        flex: 1;
        text-align: center;
        padding-top: 0.2rem;

        img {
          width: 0.64rem;
          height: 0.64rem;
          display: inline-block;
          vertical-align: top;
        }

        p {
          padding-top: 0.16rem;
          color: #333;
          font-size: 0.24rem;
          line-height: 0.34rem;
        }
      }
    }
  }

  .ynet-input__right-icon {
    width: 0.4rem;
    height: 0.4rem;
    margin-left: 0.22rem;
  }

  .my_input {
    align-items: center;
  }

  .my_info {
    height: 0.97rem;
    line-height: 0.96rem;
    color: #333;
    font-size: 0.32rem;
    display: flex;
    margin: 0 0.32rem;
    border-bottom: 0.01rem solid #dfdfdf;
    margin-top: 0.64rem;

    .my_info_label {
      margin-right: 0.28rem;
    }
  }

  .tip_area {
    padding: 0 0.32rem;
    margin-top: 0.16rem;
    color: #666;
    font-size: 0.24rem;
    line-height: 0.34rem;

    span {
      color: #6161f2;
    }
  }
}
</style>
