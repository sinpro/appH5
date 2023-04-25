<template>
  <div class="detail">
    <div class="time_area">
      <div class="detail_data">
        {{ detail.loginTime.slice(0, 10) }}
      </div>
    </div>
    <div class="info_area">
      <div class="info_item">
        <div class="info_label">
          登录时间
        </div>
        <div class="info_data">
          {{ detail.loginTime }}
        </div>
      </div>
      <div class="info_item">
        <div class="info_label">
          退出时间
        </div>
        <div class="info_data">
          {{ detail.logoutTime }}
        </div>
      </div>
      <div class="info_item">
        <div class="info_label">
          登录账号
        </div>
        <div class="info_data">
          {{ detail.id }}
        </div>
      </div>
      <div class="info_item">
        <div class="info_label">
          在线时长
        </div>
        <div class="info_data">
          {{formatTime(detail.onlineTime)}}
        </div>
      </div>
      <div class="info_item">
        <div class="info_label">
          登录设备
        </div>
        <div class="info_data">
          {{ detail.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myBtn from "./myBtn";

export default {
  components: {
    myBtn,
  },

  data() {
    return {
      detail: null,
    }
  },

  created() {
    console.log(app.params, 'data')
    this.detail = app.params
  },

  methods: {
    formatTime(t) {
      const sec = ~~(t / 1000);
      return sec > 60 ? `${~~(sec / 60)}分钟` : `${sec}秒`;
    }
  },
}
</script>

<style lang="scss">
.detail {
  .time_area {
    height: 1.12rem;
    background: #fff;
    position: relative;
    display: flex;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #dfdfdf;
      height: 1px;
      transform: scaleY(0.5);
      transform-origin: 0 0;
      margin-left: .32rem;
    }

    .detail_data {
      color: #333;
      font-size: .32rem;
      line-height: 1.12rem;
      text-indent: .32rem;
      flex: 1;
    }
  }

  .info_area {
    box-sizing: border-box;
    background: #fff;
    padding: .28rem .32rem;
    padding-bottom: .12rem;
  }

  .info_item {
    display: flex;
    height: .4rem;
    line-height: .4rem;
    justify-content: space-between;
    margin-bottom: .16rem;

    .info_label {
      color: #999;
    }

    .info_data {
      color: #333;
    }
  }
}
</style>
