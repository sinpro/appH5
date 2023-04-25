<template>
  <ynet-viewbox>
    <ynet-header slot="viewbox-header" />
    <field
      title="ynetButton"
      brief="出入参请参考mand-mobile中的Button"
    >
      <a
        slot="action"
        href="https://didi.github.io/mand-mobile/#/zh-CN/docs/components/basic/button"
        target="_blank"
      >点击查看文档</a>
      <ynet-button @clickHandle="clickHandle">
        default
      </ynet-button>
      <p style="height:.2rem" />
      <ynet-button
        type="primary"
        loading
        @clickHandle="clickHandle"
      >
        Loading
      </ynet-button>
      <p style="height:.2rem" />
      <ynet-button
        type="warning"
        @clickHandle="clickHandle"
      >
        warning
      </ynet-button>
      <p style="height:.2rem" />
      <ynet-button
        type="primary"
        icon="refresh"
        round
        @clickHandle="clickHandle"
      >
        Primary
      </ynet-button>
      <p style="height:.2rem" />
      <ynet-button
        type="primary"
        icon="edit"
        inline
        @clickHandle="clickHandle"
      >
        Primary
      </ynet-button>
      <ynet-button
        type="primary"
        plain
        inline
        @clickHandle="clickHandle"
      >
        primary
      </ynet-button>
      <p style="height:.2rem" />
      <ynet-button
        type="warning"
        size="small"
        inline
        @clickHandle="clickHandle"
      >
        warning
      </ynet-button>
      <ynet-button
        type="disabled"
        size="small"
        inline
        @clickHandle="clickHandle"
      >
        warning
      </ynet-button>
    </field>
  </ynet-viewbox>
</template>
<script>
import { Field } from 'mand-mobile'
import { ynetButton, ynetViewbox, ynetHeader } from '@ynet/ynet-components'
export default {
  name: 'Demo',
  components: {
    Field,
    ynetButton, ynetViewbox, ynetHeader
  },
  methods: {
    clickHandle(){
      console.log(123)
    }
  }
}
</script>
