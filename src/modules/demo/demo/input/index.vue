<template>
  <ynet-viewbox>
    <ynet-header slot="viewbox-header" />
    <field
      title="ynetInput"
      brief="出入参请参考mand-mobile中的Input"
    >
      <ynet-input 
        v-model="testCurValue"
        placeholder="手机号"
        align="right"
        type="number"
      />
      <div style="margin-top: 0.5rem;">
        当前值：{{ testCurValue }}
      </div>
    </field>
  </ynet-viewbox>
</template>
<script>
import { Field } from 'mand-mobile'
import { ynetInput, ynetHeader } from 'ynet-components'
export default {
  name: 'Demo',
  components: {
    Field,
    ynetInput,
    ynetHeader
  },
  data() {
    return {
      testCurValue: ''
    }
  },
  methods: {
    clickHandle(){
      console.log(123)
    }
  }
}
</script>
