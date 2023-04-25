<template>
  <div class="set_trade_password_success">
    <m-header
      :left-menu="[{icontype:'close_black'}]"
      :preventBack="true"
      bar-bottom-line-color="#333333"
      @leftHandler="handleFinishClick"
    />
    <success-result
      :title="resultTitle"
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
import successResult from '@/common/components/success_result';
import mHeader from '@/common/components/header';

export default {
  components: {
    successResult,
    mHeader,
  },

  data() {
    return {
      resultTitle: '交易密码设置成功',
    }
  },

  created() {
    this.setTitle();
  },

  methods: {
    setTitle() {
      if (app.params.setType === 'reset') {
        app.api.setMiddleTitle({ title:'重置结果' });
        this.resultTitle = '交易密码重置成功';
      }
    },

    handleFinishClick() {
      app.api.closeToPage('/ynet_account/trade_safety_management/index.html');
    }
  }
}
</script>

<style lang="scss">
.set_trade_password_success {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;

  .btn_area {
    text-align: center;
    margin-top: 2.2rem;
  }
}
</style>
