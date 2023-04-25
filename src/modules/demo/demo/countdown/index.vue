<template>
  <ynet-viewbox>
    <ynet-header
      slot="viewbox-header"
      :right-menu="[{text:'欢哥', color:'#FFFF3730'}]"
    />
    {{ hh }}
    <field
      title="ynet-count-down"
      brief="出入参暂无说明"
    >
      <a
        slot="action"
        target="_blank"
      >点击查看文档</a>
      <cell-item title="普通使用">
        <template v-slot>
          <ynet-count-down
            :time="time"
            format="hh:mm:ss"
            auto-start
          />
        </template>
      </cell-item>
      <cell-item title="自定义格式">
        <template v-slot>
          <ynet-count-down
            :time="time"
            format="dd天hh时mm分ss秒"
            auto-start
          />
        </template>
      </cell-item>
      <cell-item title="毫秒级">
        <template v-slot>
          <ynet-count-down
            :time="time"
            format="mm:ss:sss"
            millisecond
            auto-start
          />
        </template>
      </cell-item>
      <cell-item title="自定义样式">
        <template v-slot>
          <ynet-count-down
            :time="time"
            auto-start
            millisecond
          >
            <template v-slot="{timeData}">
              <div class="td-wrap">
                <span class="td">{{ timeData.hours }}</span>
                <span class="td">{{ timeData.minutes }}</span>
                <span class="td">{{ timeData.seconds }}</span>
                <span class="td">{{ timeData.milliseconds }}</span>
              </div>
            </template>
          </ynet-count-down>
        </template>
      </cell-item>
      <cell-item title="手动控制">
        <ynet-count-down
          ref="countdown"
          :time="time"
          format="mm:ss:sss"
          millisecond
        />
        <template v-slot:right>
          <ynet-button
            size="small"
            type="primary"
            inline
            @clickHandle="start"
          >
            开始
          </ynet-button>
          <span style="display:inline-block;width:10px" />
          <ynet-button
            size="small"
            type="default"
            inline
            @clickHandle="pauses"
          >
            暂停
          </ynet-button>
          <span style="display:inline-block;width:10px" />
          <ynet-button
            size="small"
            type="warning"
            inline
            @clickHandle="reset"
          >
            重置
          </ynet-button>
        </template>
      </cell-item>
    </field>
  </ynet-viewbox>
</template>
<script>
import { Field, cellItem } from 'mand-mobile'
import { ynetViewbox, ynetHeader, ynetCountDown, ynetButton } from '@ynet/ynet-components'
export default{
  components: {
    Field, ynetHeader, ynetViewbox, ynetButton, ynetCountDown, cellItem
  },
  data(){
    return {
      hh: '欢哥忽悠我',
      time: 30 * 60 * 6
    }
  },
  mounted(){
    setTimeout(() => {
      // this.hh = '我确定欢哥在忽悠我'
      this.rightMenu = [{text:'水哥',color:'#FFFF3730'}]
    }, 2000)
			
  },
  methods:{
    start(){
      this.$refs.countdown.start()
    },
    pauses(){
      this.$refs.countdown.pauses()
    },
    reset(){
      this.$refs.countdown.reset()
    }
  }
}
</script>
<style lang="scss" scoped>
	.td-wrap{
		padding: .2rem 0;
		span{
			display: inline-block;
			padding:.1rem .2rem;
			font-size: 14px;
			border-radius: 8px;
			line-height: .44rem;
			text-align: center;
			background-color: #2f86f6;
			color: #fff;
		}
	}
</style>