<template>
  <div class="device_management">
    <title-tip
      v-if="commonUsed"
      text="常用设备"
    />
    <div
      v-if="commonUsed"
      class="frequent_area"
    >
      <div class="device_item">
        <div class="device_item_info">
          <h3>{{ commonUsed.deviceName }}</h3>
          <p>最近使用：{{ commonUsed.loginTime }}</p>
        </div>
        <div style="margin-top: .1rem;">
          <my-btn
            text="解除绑定"
            @click="handleBtnClick"
          />
        </div>
      </div>
    </div>
    <title-tip text="历史登录设备列表" />
    <div class="history_area">
      <div
        v-for="(item, index) in deviceList"
        :key="index"
        class="device_item"
        :class="{ no_border: index == deviceList.length - 1 }"
      >
        <div class="device_item_info">
          <h3>{{ item.name }}</h3>
          <p>最近使用：{{ item.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import titleTip from '@/common/components/title_tip';
import myBtn from "./myBtn";

export default {
  components: {
    titleTip,
    myBtn,
  },

  data() {
    return {
      deviceList: [],
      commonUsed: null,
    }
  },

  created() {
    this.getDeviceHistory();
  },

  methods: {
    getDeviceHistory() {
      app.api.rpc('MM0011').then(response => {
        const {
          loginHistoryDevice,
        } = response

        this.deviceList = loginHistoryDevice.map(item => ({
          id: item.deviceId,
          time: item.loginTime,
          name: item.deviceName,
        }));

        this.commonUsed = loginHistoryDevice.filter(item => item.isBindFlag === '1')[0];
      });
    },

    handleBtnClick() {
      app.api.confirm('您是否解除常用设备绑定？', '提示').then(({ ok }) => {
        if (ok) {
          app.api.rpc('UR0057').then(response => {
            this.commonUsed = null;
          });
        }
      });
    },
  },
}
</script>

<style lang="scss">
.device_management {
  .device_item {
    box-sizing: border-box;
    display: flex;
    height: 1.4rem;
    background: #fff;
    padding: .28rem .32rem;

    .device_item_info {
      flex: 1;

      h3 {
        color: #333;
        font-size: .32rem;
        line-height: .44rem;
      }

      p {
        color: #999;
        font-size: .24rem;
        line-height: .32rem;
        margin-top: .08rem;
      }
    }
  }

  .history_area {
    .device_item {
      position: relative;

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: .32rem;
        right: 0;
        background: #dfdfdf;
        height: 1px;
        transform: scaleY(0.5);
        transform-origin: 0 0;
      }

      &.no_border:after {
        display: none;
      }
    }
  }
}
</style>
