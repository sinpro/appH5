<template>
	<div class="ynet-index-bar">
		<div class="ynet-index-bar_bar" @touchstart="touchstart" @touchmove="touchmove">
			<span v-for="(v,k) in userData">{{k}}</span>
		</div>
		<div class="ynet-index-bar_main">
			<slot :userData="userData"></slot>
		</div>
	</div>
</template>
<script>
	import { sortFn } from './utils'
	import props from './props'
	export default {
		name: 'ynet-index-bar', props,
		data(){
			return {
				direction: '',
				startY: 0,
				deltaY: 0
			}
		},
		computed: {
			userData(){
				return sortFn(this.sortData)
			}
		},
		methods: {
			touchstart(e){
				this.startY = e.touches[0].clientY
			},
			touchmove(e){
				const touch = e.touches[0]
				this.deltaY = touch.clientY - this.startY
				console.log(this.deltaY / 20)
			}
		}
	}
</script>
<style lang="scss">
	@import './index'
</style>