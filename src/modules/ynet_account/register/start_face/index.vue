<template>
  <div class="start_face">
    <m-header :left-menu="[{ icontype: 'back_black' }]" bar-bottom-line-color="#ffffff" />
    <img :src="require('@/common/cssBundle/assets/registered/scan_face.png')" />
    <p class="title">人脸识别审核</p>
    <p class="desc">为保护您的账户安全，请进行人脸识别审核，确认用户身份</p>
    <div style="margin-top: .8rem;">
      <button class="btn-lg" @click="handleBtnClick">开始人脸识别</button>
    </div>
    <p class="desc">请保证周围环境光源充足，平视手机</p>
  </div>
</template>

<script>
import mHeader from "@/common/components/header";

export default {
  components: {
    mHeader
  },

  data() {
    return {
      userInfo: null,
      hasOurBankCard: false,
      IDInfo: null,
      onlyValid: false,
      backPage: '',
    };
  },

  created() {
    this.getIDInfo().then(this.getOurBankCard);

    app.api.getSessionStorage("validUserIdentify", false).then(res => {
      const info = res ? JSON.parse(res) : {};
      if ('backPage' in info) {
        this.onlyValid = true;
        this.backPage = info.backPage;
      };
    });
  },

  methods: {
    handleBtnClick() {
      const { IDNo, IDName } = this.IDInfo;

      const obj = {
        idcard_name: IDName,
        idcard_number: IDNo
      };
      let bridge = window.AlipayJSBridge || window.FlameJSBridge
      let _vm = this
      bridge.call("openFaceRecognition", obj, function(response) {
        console.log('人脸识别返回信息', response)
        const { identification_result, error } = response;
        if (error === "0") {
          app.api.updateUserInfo()
          if (_vm.onlyValid) {
            // app.api.alert(_vm.backPage, '提示', { okButton: "我知道了" })
            // app.api.alert('身份认证完成', '提示', { okButton: "我知道了" }).then(() => {
            app.api.pushWindow(_vm.backPage);
            // });
            return;
          }

          app.api.getSessionStorage("userInfo").then(res => {
            console.log('userInfo缓存信息', res)
            let response = res ? JSON.parse(res) : {}
            if (response.userType && response.userType === "20") {
              app.api.pushWindow("/ynet_bank_card/bank_card/my_card_list.html");
            } else {
              app.api.pushWindow("/ynet_account/register/add_bank_card.html");
            }
          });
        } else {
          app.api.alert("人脸识别失败", "提示", { okButton: "我知道了" });
        }
      });
    },

    getIDInfo() {
      return new Promise((resolve, reject) => {
        app.api.getSessionStorage("registerIDInfo").then(response => {
          this.IDInfo = JSON.parse(response);

          resolve();
        });
      });
    },

    getOurBankCard() {
      const { IDNo, IDName } = this.IDInfo;

      const data = {
        certNo: IDNo,
        certType: "10",
        name: IDName
      };

      app.api.rpc("UR0050", data).then(response => {
        const { depositCardList, creditCardList } = response;

        if (depositCardList.length == 0 && creditCardList.length == 0) {
          this.hasOurBankCard = false;
        } else {
          this.hasOurBankCard = true;
        }

        app.api.setSessionStorage(
          "hasOurBankCard",
          JSON.stringify({
            hasOurBankCard: this.hasOurBankCard
          })
        );
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.start_face {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  text-align: center;

  img {
    margin: auto;
    width: 2.12rem;
    height: 2.66rem;
    margin-top: 1.12rem;
  }

  .title {
    margin-top: 0.64rem;
    color: #333;
    font-size: 0.4rem;
    line-height: 0.48rem;
    font-weight: 600;
  }

  .desc {
    margin: 0 0.32rem;
    margin-top: 0.24rem;
    color: #999;
    font-size: 0.28rem;
    line-height: 0.4rem;
  }
}
</style>
