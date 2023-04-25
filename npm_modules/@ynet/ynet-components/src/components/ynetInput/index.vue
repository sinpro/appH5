<template>
  <div>
    <input-item
      :type="type"
      :align="align"
      :title="title"
      :maxlength="max"
      v-model="currentValue"
      :isTitleLatent="isTitleHidden"
      :disabled="disabled"
      @focus="focusIn"
      :isVirtualKeyboard="isVirtualKeyboard"
      @blur="focusOut"
      :placeholder="placeholder"></input-item>
  </div>
</template>

<script>
import { InputItem } from 'mand-mobile'
import props from './props'

export default {
  name: 'ynet-input',
  components: {
    InputItem
  },
  props,
  created() {
    console.log('input init')
  },
  data() {
    return {
      currentValue: '',
      hideNativeBoard: false
    }
  },
  watch: {
    value(newVal) {
      this.currentValue = newVal
    },
    currentValue(newVal, oldVal) {
      if(newVal !== oldVal) {
        this.$emit('on-change', newVal)
      }
      this.$emit('input', newVal)
    }
  },
  methods: {
    focusIn() {
      if(this.type === 'number'|| this.type === 'alphabet' && this.isVirtualKeyboard) {
        // 阻止弹出默认键盘，但输入光标会消失。
        document.activeElement.blur()
        console.log('hello')
        this.showNativeBoard()
      }
    },
    nativeBlur() {
      console.log('hahhahahhah')
      app.api.hideKeyboard()
      document.removeEventListener('click', this.nativeBlur)
    },
    focusOut() {
      if(this.type === 'number'|| this.type === 'alphabet' && this.isVirtualKeyboard && this.hideNativeBoard) {
        console.log('focusOut')
        this.nativeBlur()
      }
    },
    showNativeBoard() {
      this.hideNativeBoard = true
      const keyboardType = this.$props.type === 'number' ? '1' : '0'
      this.currentValue = ''
      app.api.showKeyboard({
          max: this.$props.max,
          isEncry: this.$props.isEncry,
          randomKey: this.$props.randomKey,
          keyboardType,
      }, res => {
        if(res.action !== 'hide') {
          this.currentValue = res.value
          this.$emit('on-password-change', res)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>