<template>
  <div class="ynet-trade-password-view">
    <div class="grid-input">
      <div class="cube-list">
        <div class="cube-item" :class="{ fill: item === 'fill', pin: item === 'pin' }" :key="index" v-for="(item, index) in virtualTxt" />
      </div>
      <safe-input
        ref="safeIpt"
        placeholder="请输入卡密码"
        type="number"
        :max="6"
        :is-encry="true"
        :random-key="randomKey"
        @focus="focusHandler"
        @blur="blurHandle"
        v-model="accPasswordValue"
        @encrypt="getPasswordInfo"
        :autoShow="true"
      />
    </div>
  </div>
</template>

<script>
import safeInput from '@/common/components/y-encrypt-input';

export default {
  name: 'ynet-trade-password-view',
  props: {
    randomKey: {
      type: String,
      default: false,
    },
  },
  data() {
    return {
      accPasswordValue: '',
      passwordInfo: {
        length: 0,
        action: '',
      },
      virtualTxt: [],
      focusState: false,
    }
  },
  components: {
    safeInput,
  },

  mounted() {
    this.enterPage();
  },

  watch: {
    passwordInfo(val) {
      this.getVirtualTxt();
      if (val.action === 'hide' || val.length === 6) {
        this.hidePopUp();
        this.$emit('done', { value: this.accPasswordValue, info: this.passwordInfo });
      }
    }
  },

  methods: {
    enterPage() {
      this.focusState = true;
      this.getVirtualTxt();
    },

    getVirtualTxt() {
      const max = 6;
      const len = this.passwordInfo.length;
      const fills = Array(len).fill('fill');
      const empty = Array(max - len).fill('');
      if (empty.length > 0 && this.focusState) {
        empty[0] = 'pin';
      }
      this.virtualTxt = fills.concat(empty);
    },

    resetInfo() {
      this.accPasswordValue = '';
      this.passwordInfo.length = 0;
      this.passwordInfo.action = '';
    },

    getPasswordInfo(info) {
      this.passwordInfo = info;
    },

    showPopUp() {
      this.resetInfo();
      this.$refs.safeIpt.showKeyboard();
    },

    hidePopUp() {
      this.$refs.safeIpt.hideKeyboard();
    },

    focusHandler() {
      this.getVirtualTxt();
      this.resetInfo();
      this.focusState = true;
      this.showPopUp();
      this.$emit('focus', { value: this.accPasswordValue, info: this.passwordInfo });
    },

    blurHandle() {
      this.getVirtualTxt();
      this.$emit('blur', { value: this.accPasswordValue, info: this.passwordInfo });
      this.focusState = false;
    }
  }
}

</script>

<style lang="scss">
@keyframes bling {
  0%, 100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}

.ynet-trade-password-view {
  .grid-input {
    position: relative;
    height: 0.9rem;

    > div {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }

    .ynet-encrypt-input {
      opacity: 0;

      input {
        height: 100%;
      }
    }

    .cube-list {
      display: flex;
      border: 1px solid #ccc;
      border-radius: 0.06rem;

      .cube-item {
        flex-grow: 1;
        text-align: center;
        line-height: 0.9rem;
        width: 16.6666%;

        & + .cube-item {
          border-left: 1px solid #ccc;
        }

        &.fill {
          &:after {
            content: '●';
          }
        }

        &.pin {
          &:after {
            content: '|';
            animation: bling 1s infinite;
          }
        }
      }
    }
  }
}
</style>
