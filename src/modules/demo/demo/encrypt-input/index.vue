<template>
  <field title="加密输入框">
    <cell-item>
      <encrypt-input
        ref="eipt"
        v-model="password"
        :style="mystyle"
        :max="12"
        :is-encry="true"
        :placeholder="'请输入加密字符串'"
        :random-key="'ASKDUWJEDWUSSKDDJSNSNDS'"
        :type="'number'"
        :reg="regular"
        @input="inputHandler"
        @blur="blurHandler"
        @focus="focusHandler"
        @encrypt="encryptHandler"
      />
    </cell-item>
    <input-item
      title="输入结果"
      :value="password"
      readonly
    />
  </field>
</template>

<script>
import { Field, CellItem, InputItem } from 'mand-mobile'
import EncryptInput from '@/common/components/y-encrypt-input'

export default {
  name: 'EncryptInputDemo',
  components: {
    Field,
    CellItem,
    InputItem,
    EncryptInput
  },
  data() {
    return {
      password: '',
      regular: '',
      mystyle: {},
    }
  },
  mounted() {
    console.log(this.$refs.eipt);
  },
  methods: {
    inputHandler(val) {
      console.log('input:' + val);
    },

    blurHandler(val) {
      console.log('blur:' + val);
    },

    focusHandler(val) {
      console.log('focus:' + val);
    },

    encryptHandler(options) {
      console.log('encrypt:', options);
    }
  }
}
</script>
