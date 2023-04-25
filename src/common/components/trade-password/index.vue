<template>
  <div class="ynet-trade-password">
    <md-popup
      v-model="isPopupShow"
      position="bottom"
      :mask-closable="false"
    >
      <md-popup-title-bar
        only-close
        title="请输入交易密码"
        @confirm="hidePopUp"
        @cancel="hidePopUp"
      />
      <div class="query-input-area">
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
            @focus="focusHandle"
            @blur="blurHandle"
            v-model="accPasswordValue"
            @encrypt="passwordInfo = $event"
          />
        </div>
        <div :style="{ height: keyboardHeight + 'px' }"/>
      </div>
    </md-popup>
  </div>
</template>

<script>
import { CellItem, Amount, Popup, PopupTitleBar } from 'mand-mobile';
import safeInput from '@/common/components/y-encrypt-input';

export default {
  name: 'ynet-trade-password',
  props: {
    randomKey: {
      type: String,
      default: false,
    },
  },
  data() {
    return {
      screenHeight: window.screen.availHeight,
      isPopupShow: false,
      accPasswordValue: '',
      passwordInfo: {
        length: 0,
        action: '',
      },
      focusState: false,
    }
  },
  components: {
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    safeInput,
  },

  computed: {
    virtualTxt() {
      const max = 6;
      const len = this.passwordInfo.length;
      const fills = Array(len).fill('fill');
      const empty = Array(max - len).fill('');
      if (empty.length > 0 && this.focusState) {
        empty[0] = 'pin';
      }
      return fills.concat(empty);
    },

    keyboardHeight() {
      return this.screenHeight * 0.42;
    },
  },

  watch: {
    passwordInfo(val) {
      if (val.action === 'hide' || val.length === 6) {
        this.hidePopUp();
        this.$emit('done', { value: this.accPasswordValue, info: this.passwordInfo });
      }
    }
  },

  methods: {
    resetInfo() {
      this.accPasswordValue = '';
      this.passwordInfo = {
        length: 0,
        action: '',
      };
    },

    showPopUp() {
      this.isPopupShow = true;
      this.resetInfo();
      this.$refs.safeIpt.showKeyboard();
    },

    hidePopUp() {
      this.isPopupShow = false;
      this.$refs.safeIpt.hideKeyboard();
    },

    focusHandle() {
      this.resetInfo();
      this.focusState = true;
    },

    blurHandle() {
      this.focusState = false;
    },
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

.ynet-trade-password {
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

  .query-input-area {
    background-color: #fff;
    padding: 0.4rem 0.6rem 0;
  }
  
  .md-popup-title-bar {
    background-color: #f9f9f9;
    height: 1rem;

    .title-bar-title {
      padding-top: 0.38rem;

      p.title {
        font-size: 0.32rem;
      }
    }

    .md-popup-close {
      padding-top: 0.3rem;
    }
  }

  .md-popup-title-bar {
    background-color: #f9f9f9;
    height: 1rem;

    .title-bar-title {
      padding-top: 0.38rem;

      p.title {
        font-size: 0.32rem;
      }
    }

    .md-popup-close {
      padding-top: 0.3rem;
    }
  }
}
</style>
