<template>
  <div class="reset_password_success">
    <m-header
      :left-menu="[{icontype:'close_black'}]"
      :preventBack="true"
      bar-bottom-line-color="#333333"
      @leftHandler="closeToHone"
    />
    <success-result
      title="重置登录密码成功"
      text="尊敬的用户，您的登录密码已经重置成功。"
    />
    <div class="btn_area">
      <button
        class="btn-lg"
        @click="handleFinishClick"
      >
        完成
      </button>
    </div>
  </div>
</template>

<script>
import successResult from '@/common/components/success_result'
import mHeader from '@/common/components/header'

export default {
  components: {
    successResult,
    mHeader,
  },

  data() {
    return {
      mobileNo: '',
      highLevel: false,
      gesture: false,
      promiseArr: [],
    }
  },

  resume() {
    this.closeToHone();
  },

  created() {
    this.getMobileNo();
    this.getCheckMethodStatus();
  },

  methods: {
    getMobileNo() {
      app.api.getUserInfo().then(res => {
        const { mobileNo } = res.userInfo.body;
        this.mobileNo = mobileNo;
      });
    },

    getCheckMethodStatus() {
      app.api.pushGestureSetting('3');
      app.api.clearLocalAuthenticationOnOff('login');
    },

    closeToHone() {
      app.api.closeToHomePage('me');
    },

    handleFinishClick() {
      app.api.alert('您已重置登录密码，请重新登录', '提示').then(() => {
        console.log('重新登录');
        app.api.login({
          // pageUrl: '/ynet_account/login_management/index.html',
          // currentMobile: app.params.mobileNo,
        }).then(() => {
          this.closeToHone();
        }).catch(() => {
          this.closeToHone();
        });
      });
    },
  },
}
</script>

<style lang="scss">
.reset_password_success {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;

  .btn_area {
    text-align: center;
    margin-top: 1.6rem;
  }
}
</style>
