<template>
  <div class="login_management">
    <m-header
      :left-menu="[{icontype:'back_black'}]"
    />
    <div class="password">
      <md-cell-item
        title="修改登录密码"
        :arrow="true"
        @click="handleChangePasswordClick"
      />
      <md-cell-item
        title="重置登录密码"
        :arrow="true"
        @click="handleResetPasswordClick"
      />
      <md-cell-item
        title="登录日志查询"
        no-border
        :arrow="true"
        @click="goLoginLog"
      />
    </div>
    <div class="type">
      <md-cell-item
        v-if="authAvailable"
        title="指纹/面容登录"
      >
        <div
          slot="right"
          class="switch_wrapper"
          @click="handleHighLevelClick"
        >
          <md-switch v-model="highLevel" />
          <div class="switch_mask" />
        </div>
      </md-cell-item>
      <md-cell-item title="手势登录">
        <div
          slot="right"
          class="switch_wrapper"
          @click="handleGusterClick"
        >
          <md-switch
            slot="right"
            v-model="gesture"
          />
          <div class="switch_mask" />
        </div>
      </md-cell-item>
      <!-- <md-cell-item
        title="微信快捷登录"
        no-border
      >
        <md-switch
          slot="right"
          v-model="weChat"
        />
      </md-cell-item> -->
    </div>
  </div>
</template>

<script>
import { CellItem, Switch } from 'mand-mobile';
import mHeader from '@/common/components/header';

// const userTypeMap = {
//   '10': '游客',
//   '20': '注册用户',
//   '30': '实名认证用户',
//   '40': '绑卡认证用户',
//   '50': '面签用户',
// };

export default {
  components: {
    [CellItem.name]: CellItem,
    [Switch.name]: Switch,
    mHeader,
  },

  data() {
    return {
      highLevel: false,
      gesture: false,
      // weChat: false,
      openAccountStatus: false,
      // authStatus: false,
      authAvailable: false,
      deviceSupport: 'zw',
    }
  },

  created() {
    app.api.availableLocalAuthentication().then(res => {
      this.authAvailable = res.available;
      this.deviceSupport = res.localAuthenticationType === '1' ? 'zw' : 'rl';
    });

    this.getOpenAccountStatus();
    this.getCheckMethodStatus();
  },

  methods: {
    handleChangePasswordClick() {
      app.api.pushWindow('/ynet_account/login_management/change_password_mobile.html')
    },

    goLoginLog() {
      app.api.pushWindow('/ynet_account/query_login_log/index.html')
    },

    handleResetPasswordClick() {
      if (this.openAccountStatus) {
        // 已开户
        app.api.pushWindow('/ynet_account/login_management/reset_password_banklist.html')
      } else {
        app.api.pushWindow('/ynet_account/login_management/reset_password_mobile.html')
      }
    },

    getOpenAccountStatus() {
      app.api.getUserInfo().then(res => {
        const { userInfo: { body: { userType } } } = res;
        console.log('userInfo:', res);

        if (userType === '40' || userType === '50') {
          this.openAccountStatus = true;
        } else {
          this.openAccountStatus = false;
        }
      });
    },

    getCheckMethodStatus() {
      app.api.rpc('UR0009', {}).then(({ toolList }) => {
        console.log(toolList, '生物认证返回状态')

        let face = false;
        let finger = false;
        let gesture = false;

        toolList.forEach(item => {
          if (item.securityType == 'rl' && item.securityStatus == '00') {
            face = true;
            this.deviceSupport = 'rl';
          }
          if (item.securityType == 'zw' && item.securityStatus == '00') {
            finger = true;
            this.deviceSupport = 'zw';
          }
          if (item.securityType == 'ss' && item.securityStatus == '00') {
            gesture = true;
          }
        })

        this.highLevel = finger || face;
        this.gesture = gesture;
      })
    },

    handleGusterClick() {
      if (this.gesture) {
        app.api.pushGestureSetting('3').then(() => {
          this.gesture = false;
        });
      } else {
        app.api.pushGestureSetting('1').then(() => {
          this.gesture = true;
        });
      }
    },

    handleHighLevelClick() {
      if (!this.authAvailable) {
        app.api.showToast('指纹/面容识别不可用');
        return;
      }

      app.api.startLocalAuthentication().then(() => {
        if (this.highLevel) {
          app.api.rpc('UR0034', {
            securityType: this.deviceSupport,
          }).then(() => {
            this.highLevel = false;
            app.api.clearLocalAuthenticationOnOff('login');
          });
        } else {
          app.api.rpc('UR0032', {
            securityType: this.deviceSupport,
          }).then(({ passwordKey }) => {
            this.highLevel = true;
            app.api.setFingerPrintToken(passwordKey);
          });
        }
      });
    },
  },
}
</script>

<style lang="scss">
.login_management {
  .password,
  .type {
    margin-bottom: 0.16rem;
    background: #fff;
    padding: 0 0.32rem;
  }

  .switch_wrapper {
    display: inline-block;
    position: relative;

    .switch_mask {
      position: absolute;
      z-index: 10;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
}
</style>
