<template>
  <ynet-viewbox>
    <ynet-header slot="viewbox-header" />
    <field title="ynet-circle">
      <a
        slot="action"
        target="_blank"
      >点击查看文档</a>
      <div class="circle-items">
        <ynet-circle
          :percent="percent"
          size="2.8rem"
        >
          <template v-slot>
            <span style="font-size:0.42rem">{{ percent }}%</span>
          </template>
        </ynet-circle>
      </div>
      <div class="circle-items">
        <ynet-circle
          :percent="percent"
          size="4rem"
          stroke-linecap="square"
          stroke-color="pink"
        >
          <template v-slot>
            <p style="font-size:0.42rem">
              42,001,776
            </p>
            <p style="color:#999">
              消费人群规模
            </p>
            <p>总占人数<span style="color:red; font-weight:bold; padding:0 .1rem;">{{ percent }}%</span></p>
          </template>
        </ynet-circle>
      </div>
      <div class="circle-items">
        <ynet-circle
          :percent="percent"
          size="2.8rem"
          dashboard
        >
          <template v-slot>
            <p>仪表盘</p>
            <span style="font-size:0.42rem">{{ percent }}%</span>
          </template>
        </ynet-circle>
      </div>
    </field>
  </ynet-viewbox>
</template>
<script>
import { Field } from 'mand-mobile'
import { ynetViewbox, ynetHeader, ynetCircle } from '@ynet/ynet-components'
	
export default {
  components: {
    Field, 
    ynetViewbox, ynetHeader, ynetCircle
  },
  data(){
    return {
      percent: 26
    }
  }
}
</script>
<style lang="scss" scoped>
	.circle-items{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: .8rem;
	}
</style>