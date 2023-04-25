<template>
  <div class="ynet-encrypt-input">
    <input
      v-if="!nativeMode"
      ref="ipt"
      v-model="value"
      type="password"
      :maxlength="max"
      :style="inStyle"
      :placeholder="placeholder"
      @input="inputHandle"
      @blur="blurHandle"
      @focus="focusHandle"
    >
    <input
      v-else
      ref="encryptIpt"
      type="password"
      :style="inStyle"
      :placeholder="placeholder"
      :value="fakeValue"
      readonly
    >
    <div
      v-if="nativeMode"
      class="ynet-encrypt-input-mask"
      @click.stop="showKeyboard"
    />
  </div>
</template>

<script>
const brickID = 'ENCRYPT_KEYBOARD_SCROLL_BRICK';
const maskID = 'ENCRYPT_KEYBOARD_MASK';
export default {
  name: 'YnetEncryptInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    inStyle: {
      type: Object,
      default: () => ({}),
    },
    keyboardType: {
      type: String,
      default: '0',
    },
    max: {
      type: Number,
      default: 6,
    },
    isEncry: {
      type: Boolean,
      default: false,
    },
    autoShow: {
      type: Boolean,
      default: false,
    },
    randomKey: {
      type: String,
      default: '',
    },
    reg: {
      default: '',
      type: String,
    },
    type: {
      default: 'all',
      type: String,
    }
  },
  data() {
    return {
      isSimulator: !!window['ALTAS_CHEETAH_SIMULATOR_DEVTOOLS'],
      hasJSAPI: !!window['AlipayJSBridge'] || !!window['FlameJSBridge'],
      keyboardState: 'blur',
      clientHeight: document.documentElement.clientHeight,
      screenHeight: window.screen.availHeight,
      brick: document.getElementById(brickID) || document.createElement('div'),
      mask: document.getElementById(maskID) || document.createElement('div'),
      fakeValue: '',
      safeKeyboardRes: {},
    }
  },
  computed: {
    nativeMode() {
      return !this.isSimulator && this.hasJSAPI;
    },
    keyboardHeight() {
      return this.screenHeight * 0.4;
    },
    keyboardRes() {
      return this.nativeMode ? this.safeKeyboardRes : { value: this.value, length: this.value.length, md5: this.value, inputLevel: this.combType() };
    },
  },
  created() {
    if (this.nativeMode) {
      this.mask.addEventListener('click', this.hideKeyboard);

      if (this.brick.id !== brickID) {
        this.brick.id = brickID;
        document.body.appendChild(this.brick);
      }

      if (this.mask.id !== maskID) {
        this.mask.id = maskID;
        this.mask.style.cssText = 'width: 100vw; height: 100vh; position: fixed; top: 0; z-index: 99999; display: none;';
        document.body.appendChild(this.mask);
      }
    }
  },

  mounted() {
    if (this.$props.autoShow) {
      setTimeout(() => {
        this.showKeyboard();
      }, 400);
      this.$refs.ipt.focus();
    }
  },

  beforeDestroy() {
    if (this.nativeMode) {
      this.raf && window.cancelAnimationFrame(this.raf);
      this.mask.removeEventListener('click', this.hideKeyboard);
    }
  },
  methods: {
    resetKeyboard() {
      this.value = '';
      this.fakeValue = '';
      this.safeKeyboardRes = { value: '', length: 0, md5: '', inputLevel: 0 };
      this.$emit('input', this.value);
      this.$emit('encrypt', this.keyboardRes);
    },

    combType() {
      let len = 0;
      if (/[0-9]/.test(this.value)) {
        len++;
      }
      if (/[A-Z]|[a-z]/.test(this.value)) {
        len++;
      }
      const containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
      if (containSpecial.test(this.value)) {
        len++
      }
      return len;
    },

    inputHandle() {
      this.$emit('input', this.value);
      this.$emit('encrypt', this.keyboardRes);
    },

    showBrick() {
      if (this.brick) {
        this.brick.style.cssText = `
          height: ${this.keyboardHeight}px;
          transition: none;
        `;
      }
    },

    hideBrick() {
      if (this.brick) {
        this.brick.style.cssText = `
          height: 0px;
          transition: height .3s;
        `;
      }
    },

    blurHandle() {
      this.keyboardState = 'blur';
      this.hideBrick();
      this.showMask(false);
      this.$emit('blur', this.value);
      this.$emit('encrypt', this.keyboardRes);
    },

    focusHandle() {
      this.resetKeyboard();
      this.keyboardState = 'focus';
      this.$emit('focus', this.value);
    },

    showMask(state) {
      this.mask.style.display = state ? 'block' : 'none';
    },

    hideKeyboard() {
      if (!this.nativeMode) {
        this.$refs.ipt.blur();
        return;
      }
      app.api.hideKeyboard();
      this.blurHandle();
    },

    getElementTop(element) {
      let actualTop = element.offsetTop;
      let current = element.offsetParent;
      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      return actualTop;
    },

    scrollAnimate(targetScrollY) {
      let x = targetScrollY < 20 ? targetScrollY : 20;
      this.animate = () => {
        const tarScrollY = window.scrollY + x;
        x *= 0.96;
        window.scrollTo(0, tarScrollY);
        if (tarScrollY < targetScrollY) {
          this.raf = window.requestAnimationFrame(this.animate);
        }
      }
      this.animate(targetScrollY);
    },

    showKeyboard() {
      if (!this.nativeMode) {
        this.$refs.ipt.focus();
        return;
      }

      if (this.keyboardState === 'blur') {
        this.resetKeyboard();
        this.focusHandle();

        const el = this.$refs.encryptIpt;
        const elFromTop = this.getElementTop(el) - window.pageYOffset;
        const elFromBottom = this.clientHeight - elFromTop - el.offsetHeight;
        const needScrollY = this.keyboardHeight - elFromBottom;

        if (needScrollY > 0) {
          this.showBrick();
          const targetScrollY = window.scrollY + needScrollY;
          this.scrollAnimate(targetScrollY);
        } else {
          this.hideBrick();
        }

        this.showMask(true);
        app.api.showKeyboard({
          max: this.$props.max,
          isEncry: this.$props.isEncry,
          randomKey: this.$props.randomKey,
          keyboardType: this.$props.type === 'number' ? '1' : '0',
          regular: this.reg,
        }, (res) => {
          const { action, status, error, value, length } = res;

          if (error !== '0') {
            this.blurHandle();
          }

          if (action === 'input') {
            this.safeKeyboardRes = res;
            this.value = value;
            this.fakeValue = '*'.repeat(length);
            this.inputHandle();
          } else {
            this.blurHandle();
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
$compName: ynet-encrypt-input;

.#{$compName} {
  position: relative;

  input {
    width: 100%;
  }

  .#{$compName}-mask {
    display: block;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 9;
  }
}
</style>
