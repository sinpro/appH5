<template>
  <div class="safe_management">
    <div class="common_wrap">
      <md-cell-item
        title="设备管理"
        :addon="tradeText"
        :arrow="true"
        @click="goDeviceManage"
      />
    </div>
  </div>
</template>

<script>
import { CellItem } from 'mand-mobile';

export default {
  components: {
    [CellItem.name]: CellItem,
  },

  methods: {
    goDeviceManage() {
      app.api.pushWindow('/ynet_account/safe_management/device_management.html');
    }
  },
}
</script>

<style lang="scss">
.safe_management {
  .common_wrap {
    background: #fff;
    padding: 0 .32rem;
  }
}
</style>
