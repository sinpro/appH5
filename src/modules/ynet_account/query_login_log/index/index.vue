<template>
  <div class="query_login_log">
    <div class="list_area">
      <div
        v-for="(item, index) in historyList"
        :key="index"
        class="list_item"
        @click="handleItemClick(item)"
      >
        <md-cell-item
          :title="item.status == '1' ? '登录成功' : '登录失败'"
          :addon="item.loginTime"
          arrow
          no-border
        />
      </div>
    </div>
  </div>
</template>

<script>
import { CellItem } from 'mand-mobile'

export default {
  components: {
    [CellItem.name]: CellItem,
  },

  data() {
    return {
      historyList: []
    }
  },

  created() {
    this.getLoginHistory()
  },

  methods: {
    getLoginHistory() {
      app.api.rpc('MM0010').then(({ list }) => {
        this.historyList = list.slice(0, 30).reverse().map(item => ({
          id: item.loginId,
          name: item.deviceName,
          status: item.logonResult,
          onlineTime: item.onLineTime,
          loginTime: item.loginTime,
          logoutTime: item.loginOutTime,
        }))
      })
    },

    handleItemClick(data) {
      app.api.pushWindow('/ynet_account/query_login_log/detail.html', data)
    },
  },
}
</script>

<style lang="scss">
.query_login_log {
  .list_area {
    margin-top: .16rem;
    background: #fff;
    padding-left: .32rem;

    .list_item {
      padding-right: .32rem;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        background: #dfdfdf;
        width: 100%;
        height: 1px;
        transform: scaleY(0.5);
        transform-origin: 0 0;
      }
    }
  }
}
</style>
