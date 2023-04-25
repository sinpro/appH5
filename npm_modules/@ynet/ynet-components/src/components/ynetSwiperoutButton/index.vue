<template>
	<button  class="ynet-swiperout_button" :class="className" @click="clickHandle" type="button">
		<slot>{{text}}</slot>
	</button >
</template>
<script>
	import props from './props'
	export default {
		name: 'ynet-swiperout-button',
		props,
		computed: {
			className(){
				return {
					'ynet-swipeout_button_primary': this.type === 'primary',
					'ynet-swipeout_button_warning': this.type === 'warning',
					'ynet-swipeout_button_default': this.type === 'default'
				}
			}
		},
		methods: {
			clickHandle(){
				if(this.$parent.$options._componentTag = 'ynet-swipeout-item'){
					this.$parent.onItemClick()
				}
			}
		}
	}
</script>
<style lang="scss">
	.ynet-swiperout_button{
		height: 100%;
		text-align: center;
		font-size: 32px;
		color: #fff;
		border: none;
		&.ynet-swipeout_button_primary{
			background-color: blue;
		}
		&.ynet-swipeout_button_warning{
			background-color: red;
		}
		&.ynet-swipeout_button_default{
			background-color: #000
		}
	}
</style>