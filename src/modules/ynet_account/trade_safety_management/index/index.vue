<template>
  <div class="trade_safety_management">
    <m-header
      :left-menu="[{ icontype: 'back_black' }]"
      :right-menu="[{}]"
    />
    <div class="common_wrap">
      <md-cell-item
        title="交易密码"
        :addon="tradeText"
        :arrow="true"
        @click="handleTradePasswordClick"
      />
    </div>
    <div class="common_wrap" v-if="isSupportFaceFinger">
      <md-cell-item title="指纹/面容支付">
        <div
          slot="right"
          class="switch_wrapper"
          @click="handleFaceFingerClick"
        >
          <md-switch v-model="faceFinger" />
          <div class="switch_mask" />
        </div>
      </md-cell-item>
    </div>
  </div>
</template>

<script>
import { CellItem, Switch } from 'mand-mobile';
import mHeader from '@/common/components/header';

export default {
  components: {
    [CellItem.name]: CellItem,
    [Switch.name]: Switch,
    mHeader,
  },

  data() {
    return {
      tradePassword: false,
      faceFinger: false,
      isSupportFaceFinger: false,
      authType: 'zw',
      openAccountStatus: false,
      realName: false,
      mobileNo: '',
      ecifId: '',
      customerName: '',
    }
  },

  computed: {
    tradeText() {
      if (this.tradePassword) {
        return '已开通';
      } else {
        return '未开通';
      }
    },
  },

  created() {
    this.getUserType();
    this.getPageStatus();
    this.getIsSupportFaceFinger();
  },

  resume(data) {
    app.api.setLeftMenu({ menus: [{ icontype: 'back_black' }] });
    console.log(data);
    if (data.openFaceFinger === '00') {
      app.api.rpc('UR0032', {
        businessType: '000018',
        securityType: this.authType,
      }).then(() => {
        this.faceFinger = true;
        app.api.setLocalAuthenticationOnOff('pay');
        app.api.showToast('开启成功');
      });
    } else if (data.openFaceFinger === '01') {
      app.api.showToast('开启失败');
    } else if (data.openFaceFinger === '10') {
      app.api.rpc('UR0034', {
        businessType: '000018',
        securityType: this.authType,
      }).then(() => {
        this.faceFinger = false;
        app.api.clearLocalAuthenticationOnOff('pay');
        app.api.showToast('关闭成功');
      });
    } else if (data.openFaceFinger === '11') {
      app.api.showToast('关闭失败');
    }
  },

  methods: {
    getUserType() {
      app.api.getUserInfo().then(({ userInfo: { body: { userType, mobileNo, ecifId, customerName } } }) => {
        this.mobileNo = mobileNo;
        this.ecifId = ecifId;
        this.customerName = customerName;

        console.log('userType:', userType);
        if (userType === '40' || userType === '50') {
          this.openAccountStatus = true;
        } else {
          this.openAccountStatus = false;
        }

        if (userType === '10' || userType === '20') {
          this.realName = false;
        } else {
          this.realName = true;
        }
      });
    },

    getPageStatus() {
      app.api.rpc('MM0017', {}).then(({ checkResult }) => {
        console.log(checkResult, '查询支付工具状态');

        if (checkResult === '1') {
          this.faceFinger = true;
        }

        app.api.rpc('UR0009', {
          eventType: '000018'
        }).then(({ toolList }) => {
          console.log(toolList, '查询账户状态');

          toolList.forEach(item => {
            if (item.securityType === 'pp' && (item.securityStatus !== '01' && item.securityStatus !== '99')) {
              this.tradePassword = true;
            }
          });
        });
      })
    },

    getIsSupportFaceFinger() {
      app.api.availableLocalAuthentication().then(res => {
        this.isSupportFaceFinger = res.available;
        this.authType = res.localAuthenticationType === '1' ? 'zw' : 'rl';
      });
    },

    handleTradePasswordClick() {
      if (this.tradePassword) {
        app.api.pushWindow('/ynet_account/trade_safety_management/trade_password.html');
      } else {
        if (this.openAccountStatus) {
          app.api.pushWindow('/ynet_account/trade_safety_management/set_trade_password_card.html', { type: 'set' });
        } else {
          app.api.confirm('您还没有绑定账户，请先绑卡或开户').then(({ ok }) => {
            if (ok) {
              if (this.realName) {
                app.api.pushWindow('ynet_bank_card/bank_card/add_card_basic_info.html', {
                  IDName: this.customerName,
                });
              } else {
                app.api.pushWindow('/ynet_account/register/check_identity.html', {
                  mobileNo: this.mobileNo,
                  ecifId: this.ecifId,
                });
              }
            }
          });
        }
      }
    },

    handleFaceFingerClick() {
      if (this.faceFinger) {
        this.closeFaceFinger();
      } else {
        this.openFaceFinger();
      }
    },

    openFaceFinger() {
      if (this.tradePassword) {
        if (this.isSupportFaceFinger) {
          app.api.startLocalAuthentication().then(() => {
            app.api.pushWindow('/ynet_account/trade_safety_management/type_in_trade_password.html', {
              isOpen: true,
            });
          });
        } else {
          app.api.alert('您的设备暂不支持指纹/面容支付');
        }
      } else {
        app.api.confirm('您还未设置交易密码，无法开启指纹/面容支付');
      }
    },

    closeFaceFinger() {
      app.api.confirm('是否关闭指纹/面容支付？').then(res => {
        if (res.ok) {
          app.api.startLocalAuthentication().then(() => {
            app.api.pushWindow('/ynet_account/trade_safety_management/type_in_trade_password.html', {
              isOpen: false,
            });
          });
        }
      })
    },
  },
}
</script>

<style lang="scss">
.trade_safety_management {
  .common_wrap {
    background: #fff;
    padding: 0 .32rem;
    margin-bottom: .16rem;

    .md-field-item-content:before {
      display: none;
    }
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
