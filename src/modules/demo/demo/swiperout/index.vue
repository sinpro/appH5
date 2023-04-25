<template>
  <ynet-viewbox>
    <ynet-header slot="viewbox-header" />
    <field
      title="ynet-swiperout"
      brief="出入参暂无说明"
    >
      <a
        slot="action"
        target="_blank"
      >点击查看文档</a>
      <ynet-swiperout>
        <ynet-swiperout-item transition-mode="follow">
          <template v-slot:left-menu>
            <ynet-swiperout-button
              class="bq"
              type="primary"
            >
              删除
            </ynet-swiperout-button>
          </template>
          <template v-slot:right-menu>
            <ynet-swiperout-button
              class="bq"
              type="primary"
            >
              删除
            </ynet-swiperout-button>
            <ynet-swiperout-button
              class="bq"
              type="default"
            >
              他
            </ynet-swiperout-button>
            <ynet-swiperout-button
              class="bq"
              type="warning"
            >
              不
            </ynet-swiperout-button>
          </template>
          <template v-slot:content>
            <div
              slot="content"
              class="demo-content"
            >
              左右滑动
            </div>
          </template>
        </ynet-swiperout-item>
        <ynet-swiperout-item transition-mode="follow">
          <template v-slot:right-menu>
            <ynet-swiperout-button
              class="bq"
              type="primary"
            >
              好
            </ynet-swiperout-button>
            <ynet-swiperout-button
              class="bq"
              type="default"
            >
              他
            </ynet-swiperout-button>
          </template>
          <template v-slot:content>
            <div
              slot="content"
              class="demo-content"
            >
              仅左滑动
            </div>
          </template>
        </ynet-swiperout-item>
        <ynet-swiperout-item
          transition-mode="follow"
          disabled
        >
          <template v-slot:right-menu>
            <ynet-swiperout-button
              class="bq"
              type="primary"
            >
              好
            </ynet-swiperout-button>
            <ynet-swiperout-button
              class="bq"
              type="default"
            >
              他
            </ynet-swiperout-button>
          </template>
          <template v-slot:content>
            <div
              slot="content"
              class="demo-content"
            >
              禁用滑动
            </div>
          </template>
        </ynet-swiperout-item>
      </ynet-swiperout>
    </field>
  </ynet-viewbox>
</template>
<script>
import { Field, cellItem } from 'mand-mobile'
import { ynetViewbox, ynetHeader,ynetSwiperout, ynetSwiperoutItem, ynetSwiperoutButton } from '@ynet/ynet-components'
export default {
  name: 'Demo',
  components: {
    Field, ynetHeader, ynetViewbox,cellItem,
    ynetSwiperout, ynetSwiperoutItem, ynetSwiperoutButton
  },
  created(){
			
  },
  methods: {
    clickHandle(){
      console.log(123)
    }
  }
}
</script>
<style lang="scss" scoped>
	.demo-content{
		padding: .3rem;
	}
	.bq{
		width: 1rem;
	}
</style>
