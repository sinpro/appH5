<template>
  <ynet-viewbox>
    <ynet-header slot="viewbox-header" />
    <ynet-index-bar :sort-data="list">
      <template v-slot="{userData}">
        <div
          v-for="(v,k) in userData"
          :id="k"
          class="group"
        >
          <h6 class="first">
            {{ k }}
          </h6>
          <p v-for="(v1, k1) in v">
            {{ v1.text }}
          </p>
        </div>
      </template>
    </ynet-index-bar>
  </ynet-viewbox>
</template>
<script>
import { ynetViewbox, ynetHeader, ynetIndexBar } from '@ynet/ynet-components'
	
export default {
  components: {
    ynetViewbox, ynetHeader, ynetIndexBar
  },
  data(){
    return {
      list : Object.freeze([
        {text:'张三'},
        {text:'李四'},
        {text:'李五'},
        {text:'王五'},
        {text:'just do it'},
        {text:'aalex'},
        {text:'啊哥哥哥'},
        {text:'钱多多'},
        {text:'鲍子'},
        {text:'狗子'},
        {text:'%^狗子'},
        {text:'谢贤'},
        {text:'happy哥'},
        {text:'朱俊豪'},
        {text:'章栋豪'},
        {text:'李志明'},
        {text:'王欢'},
      ])
    }
  },
  mounted(){
    window.laspp = app
  }
}
</script>
<style lang="scss" scoped>
	.group{
		.first{
			padding: .2rem;
		}
		p{
			background: #fff;
			padding: 0 .2rem;
			height: .8rem;
			display: flex;
			align-items: center;
			position: relative;
			&:not(:last-child):after{
				content: "";
				width: 100%;
				height: 1px;
				background: #ebedf0;
				position: absolute;
				left: .2rem;
				bottom: 0;
				transform: scaleY(0.5);
			}
		}
	}
</style>