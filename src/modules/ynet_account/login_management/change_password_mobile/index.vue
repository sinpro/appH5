<template>
  <div class="change_password">
    <title-tip text="请验证原登录密码" />
    <div class="input_area">
      <md-cell-item title="原登录密码">
        <safe-input
          slot="right"
          placeholder="请输入原登录密码"
          :max="20"
          :is-encry="true"
          type="default"
          :inStyle="{textAlign: 'right', fontSize: '0.32rem'}"
          :random-key="randomKey"
          @input="password = $event"
          @encrypt="passwordInfo = $event"
        />
      </md-cell-item>
    </div>
    <div class="btn_area">
      <button
        class="btn-lg"
        @click="handleNextClick"
      >
        下一步
      </button>
    </div>
  </div>
</template>

<script>
import { CellItem } from 'mand-mobile';
import safeInput from '@/common/components/y-encrypt-input';
import titleTip from '@/common/components/title_tip';

export default {
  components: {
    [CellItem.name]: CellItem,
    titleTip,
    safeInput,
  },

  data() {
    return {
      randomKey: '',
      password: '',
      passwordInfo: null,
      bussinessNumber: '',
    }
  },

  created() {
    this.getRandomKey();
  },

  methods: {
    handleNextClick() {
      this.canISendRPC()
        .then(this.checkPassword)
        .then(this.link2Next);
    },

    link2Next() {
      const data = { bussinessNumber: this.bussinessNumber };
      app.api.pushWindow('/ynet_account/login_management/change_password_confirm.html', data);
    },

    getRandomKey() {
      app.api.rpc('UR0051').then(response => {
        this.randomKey = response.mathRandom;
      })
    },

    canISendRPC() {
      return new Promise((resolve, reject) => {
        if (this.password) {
          const { inputLevel, length } = this.passwordInfo;

          if (inputLevel >= 2 && length >= 8) {
            resolve();
          } else {
            app.api.alert('您输入的密码格式有误，请确认后重新输入', '提示');
          }
        } else {
          app.api.showToast('密码不能为空');
        }
      })
    },

    verify(value) {
      return new Promise((resolve, reject) => {
        app.api.rpc('UR0033', {
          securityType: 'lp',
          passwordKey: value,
          mathRandom: this.randomKey,
        }).then(res => {
          const { businessSerialNo, verifyStatus, errorMsg } = res;
          if (verifyStatus === '02') {
            app.api.alert('密码校验失败', '提示');
          } else if (verifyStatus === '00') {
            app.api.alert('未完成密码验证', '提示');
          } else if (verifyStatus === '01') {
            resolve(res);
          }
        });
      });
    },

    checkPassword() {
      return new Promise((resolve, reject) => {
        this.verify(this.password).then(({ businessSerialNo }) => {
          this.bussinessNumber = businessSerialNo;
          resolve();
        });
      })
    },
  },
}
</script>

<style lang="scss">
.change_password {
  .input_area {
    background: #fff;
    padding: 0 0.32rem;
  }

  .btn_area {
    margin-top: 0.8rem;
    text-align: center;
  }
}
</style>
