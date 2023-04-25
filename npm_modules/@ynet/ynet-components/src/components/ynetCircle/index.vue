<template>
	<div class="ynet-circle" :style="circleSize">
		<svg viewBox="0 0 100 100">
			<path :d="pathString" :stroke="trailColor" :stroke-width="trailWidth" :fill-opacity="0" :style="trailStyle" />
			<path :d="pathString" :stroke-linecap="strokeLinecap" :stroke="strokeColor" :stroke-width="computedStrokeWidth" fill-opacity="0" :style="pathStyle" />
		</svg>
		<div class="ynet-circle_content">
			<slot></slot>
		</div>
	</div>
</template>
<script>
	import props from './props'
	export default {
		name: 'ynet-circle', props,
		computed: {
			circleSize(){
				return {
					width: this.size,
					height: this.size
				}
			},
			radius(){
				return 50 - this.strokeWidth / 2
			},
			pathString(){
				if(this.dashboard){
					return `M 50,50 m 0,${this.radius}
					a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}
					a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}`
				}else{
					return `M 50,50 m 0,-${this.radius}
					a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
					a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}`
				}
			},
			len(){
				 return Math.PI * 2 * this.radius
			},
			trailStyle(){
				if(this.dashboard){
					return {
						'stroke-dasharray': `${this.len - 75}px ${this.len}px`,
						'stroke-dashoffset': `-${75 / 2}px`,
						'transition': 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
					}
				}
				return {}
			},
			pathStyle(){
				let style = {}
				if(this.dashboard){
					style = {
						'stroke-dasharray': `${(this.percent / 100) * (this.len - 75)}px ${this.len}px`,
						'stroke-dashoffset': `-${75 / 2}px`,
						'transition': 'stroke-dashoffset .3s ease 0s, stroke-dasharray .6s ease 0s, stroke .6s, stroke-width .06s ease .6s'
					}
				}else{
					style = {
						'stroke-dasharray': `${this.len}px ${this.len}px`,
						'stroke-dashoffset': `${((100 - this.percent) / 100 * this.len)}px`,
						'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
					}
				}
				return style
			},
			computedStrokeWidth(){
				return this.percent === 0 && this.dashboard ? 0 : this.strokeWidth;
			}
		}
	}
</script>
<style lang="scss">
	.ynet-circle{
		position: relative;
		.ynet-circle_content{
			width: 100%;
			text-align: center;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
		}
	}
</style>