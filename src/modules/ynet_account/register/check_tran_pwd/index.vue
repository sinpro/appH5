<template>
  <div class="set_tran_pwd">
    <m-header :left-menu="[{ icontype: 'back_black' }]" bar-bottom-line-color="#333333" />
    <ynet-register-title title="确认交易密码" desc="请再次输入交易密码确认" />
    <div class="pwd" @click="handlePwdClick">
      <div class="pwd_item">
        <div class="pwd_itemPoint" :class="{ active: passwordLength > 0 }" />
      </div>
      <div class="pwd_item">
        <div class="pwd_itemPoint" :class="{ active: passwordLength > 1 }" />
      </div>
      <div class="pwd_item">
        <div class="pwd_itemPoint" :class="{ active: passwordLength > 2 }" />
      </div>
      <div class="pwd_item">
        <div class="pwd_itemPoint" :class="{ active: passwordLength > 3 }" />
      </div>
      <div class="pwd_item">
        <div class="pwd_itemPoint" :class="{ active: passwordLength > 4 }" />
      </div>
      <div class="pwd_item">
        <div class="pwd_itemPoint" :class="{ active: passwordLength > 5 }" />
      </div>
    </div>
    <div v-if="showAlert" class="set_alert">两次密码输入不一致，请重新输入</div>
    <div style="visibility: hidden;">
      <ynet-input
        ref="myInput"
        v-model="secTranPwd"
        title="设置密码"
        type="number"
        :max="6"
        :min="6"
        :is-verify="true"
        :debounce="0"
        :is-encry="true"
        :random-key="randomStr"
        @on-password-change="handleChangePwd"
      />
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
      secTranPwd: "",
      secondPasswordMD5: "",
      passwordLength: 0,
      urlData: null,
      registerData: null,
      randomStr: "",
      hasBinded: ""
    };
  },

  computed: {
    showAlert() {
      if (this.passwordLength === 6) {
        if (this.secondPasswordMD5 !== this.urlData.firstPasswordMD5) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  created() {
    app.api.getSessionStorage("hasBinded").then(res => {
      console.log("是否已绑定卡来开户", res);
      this.hasBinded = res ? JSON.parse(res).hasBinded : "";
    });
  },
  mounted() {
    this.urlData = app.params;
    this.getRandomStr().then(() => {
      setTimeout(() => {
        this.$refs.myInput.parentShowkeyboard();
      }, 300);
    });
  },

  methods: {
    handleChangePwd(val) {
      const { length, md5, value } = val;

      this.secTranPwd = value;
      this.passwordLength = length;
      this.secondPasswordMD5 = md5;

      if (md5 === this.urlData.firstPasswordMD5) {
        this.getRegisterData()
          .then(this.handleRegister)
          .then(() =>
            app.api.pushWindow("ynet_account/register/open_success.html")
          );
      }
    },

    handlePwdClick() {
      this.$refs.myInput.parentShowkeyboard();
    },

    handleRegister() {
      // app.api.alert('确认验证码')
      if (this.hasBinded) {
        let data = {
          cardNo_sequence: this.registerData.cardNo_sequence,
          accountType: this.registerData.accountType
        }
        return new Promise((resolve, reject) => {
          app.api.rpc("UR0005", data).then(response => {
            if (response.errorCode === "0") {
              resolve();
            }
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          app.api.rpc("UR0004", this.registerData).then(response => {
            if (response.errorCode === "0") {
              resolve();
            }
          });
        });
      }
    },

    getRegisterData() {
      const { firTranPwd } = this.urlData;

      return new Promise((resolve, reject) => {
        app.api.getSessionStorage("otherBankRegisterData").then(response => {
          const data = JSON.parse(response);

          data.tradePwd = firTranPwd;
          data.comfirmPassword = firTranPwd;

          this.registerData = data;

          console.log(data, "用于开户的数据信息");

          resolve(data);
        });
      });
    },

    getRandomStr() {
      return new Promise((resolve, reject) => {
        app.api.getSessionStorage("randomKey").then(response => {
          const { randomStr } = JSON.parse(response);
          this.randomStr = randomStr;
          resolve();
        });
      });
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.set_tran_pwd {
  background-color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .title {
    font-size: 0.6rem;
    line-height: 0.84rem;
    color: #333;
    text-align: center;
    margin-top: 0.4rem;
  }

  .desc {
    height: 0.84rem;
    margin-top: 0.2rem;
    font-size: 0.24rem;
    line-height: 0.34rem;
    color: #999;
    text-align: center;
  }

  .pwd {
    height: 1rem;
    border: 0.01rem solid #999;
    border-right: 0;
    border-radius: 0.08rem;
    margin: 0 0.32rem;
    margin-top: 1.12rem;
    overflow: hidden;
    display: flex;

    .pwd_item {
      flex: 1;
      height: inherit;
      border-right: 0.01rem solid #999;
      text-align: center;
      line-height: 1.2rem;
      vertical-align: middle;
    }

    .pwd_itemPoint {
      display: none;
      width: 0.32rem;
      height: 0.32rem;
      border-radius: 50%;
      background-color: #333;

      &.active {
        display: inline-block;
      }
    }
  }

  .set_alert {
    font-size: 0.24rem;
    text-align: center;
    color: #ff001f;
    line-height: 0.34rem;
    margin-top: 0.64rem;
  }
}
</style>
