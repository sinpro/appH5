<template>
  <ynet-viewbox>
    <ynet-header
      ref="yh"
      slot="viewbox-header"
      :show-left-menu="showLeftMenu"
      :prevent-back="preventBack"
      :right-menu="rightMenu"
      @leftHandler="leftHandler"
      @rightHandler="rightHandler"
    />
    <div
      slot="viewbox-header"
      class="h"
    >
      我是固定的内容
    </div>
    <div class="m">
      <ynet-button>刘自水</ynet-button>
    </div>
    <div
      slot="viewbox-footer"
      class="f"
    >
      我是固定的内容
    </div>
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
  data(){
    return {
      showLeftMenu: false,
      preventBack: true,
      rightMenu: [
        {
          text: 'happy',
          color: "#FFFF3730"
        },
        {
          text: '欢哥',
          color: "#FFFF3730"
        }
      ]
    }
  },
  mounted(){
    setTimeout(() => {
      this.$refs.yh.showLeftMenu(true)
    }, 3000)
  },
  methods: {
    leftHandler(){
      console.log(111)
    },
    rightHandler(index){
      console.log(index)
    },
    clickHandle(){
      console.log(123)
    }
  }
}
</script>
<style lang="scss" scoped>
	.h,.f{
		height: .8rem;
		background: blue;
		color: #fff;
		text-align: center;
		line-height: .8rem;
	}
	.m{
		width: 7.5rem;
		height: 14.5rem;
	}
</style>
