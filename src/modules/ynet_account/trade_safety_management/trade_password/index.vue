<template>
  <div class="trade_safety_management">
    <div class="common_wrap">
      <md-cell-item
        title="修改交易密码"
        :arrow="true"
        @click="handleChangePasswordClick"
      />
      <md-cell-item
        title="重置交易密码"
        :arrow="true"
        @click="handleResetPasswordClick"
      />
    </div>
  </div>
</template>

<script>
import { CellItem, Switch } from 'mand-mobile';

export default {
  components: {
    [CellItem.name]: CellItem,
    [Switch.name]: Switch,
  },

  created() {
    app.api.rpc('UR0009');
  },

  methods: {
    handleChangePasswordClick() {
      app.api.pushWindow('/ynet_account/trade_safety_management/confirm_old_trade_password.html');
    },

    handleResetPasswordClick() {
      app.api.pushWindow('/ynet_account/trade_safety_management/set_trade_password_card.html', { type: 'reset' });
    },
  },
}
</script>

<style lang="scss">
.trade_safety_management {
  .common_wrap {
    background: #fff;
    padding: 0 .32rem;

    .md-field-item-content:before {
      display: none;
    }

    &:nth-of-type(2n) {
      margin-top: .16rem;
    }
  }
}
</style>
