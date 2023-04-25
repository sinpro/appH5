<template>
  <div class="user_info">
    <div class="type">
      <md-input-item
        title="昵称"
        placeholder="可输入10个字符"
        align="right"
        v-model="nickname"
      ></md-input-item>
    </div>
    <div class="btn_area">
      <button
        class="btn-lg"
        @click="saveAvatar"
      >
        保存
      </button>
    </div>
  </div>
</template>

<script>
import { InputItem } from 'mand-mobile';


export default {
  components: {
    [InputItem.name]: InputItem,
  },

  data() {
    return {
      nickname: '',
    }
  },

  created() {
    this.nickname = app.params.oldName;
  },

  methods: {
    saveAvatar() {
      if (this.nickname.length > 10) {
        app.api.alert('昵称长度不得超过10个字符！', '提示');
        return;
      }
      if (this.nickname === app.params.oldName) {
        app.api.closeToPage('/ynet_account/login_management/user_info.html');
      } else {
        app.api.rpc('UM0002', {
          alias: this.nickname,
        }).then(() => {
          app.api.updateUserInfo();
          app.api.closeToPage('/ynet_account/login_management/user_info.html', { newName: this.nickname });
        });
      }
    }
  },
}
</script>

<style lang="scss">
.user_info {
  .type {
    margin-top: 0.16rem;
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

  .btn_area {
    margin-top: 0.64rem;
    text-align: center;
  }
}
</style>
