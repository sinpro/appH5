<template>
	<x-dialog class="base-layout" v-model="value" :dialog-style="dialogStyle">
		<slot></slot>
	</x-dialog>
</template>

<script>
	// import { XDialog } from 'vux'
	export default {
		name: 'base-layout',
		components: {
			// XDialog
		},
		props: {
			full: {
				type: Boolean,
				default: false
			},
			value: {
				type: Boolean,
				default: false
			},
			hideOnBlur: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			dialogStyle(){
				return this.full ? {'width': '100%', 'height':'100%', 'max-width':'99999px'} : {}
			}
		}
	}
</script>
<style lang="scss">
	@import '../activities/utils/scss/transform.scss';
	.base-layout{
		.weui-mask{
			position: transformPositionFixed();
		}
		.weui-dialog{
			position: transformPositionFixed();
			background-color: transparent; 
			width: auto;
			overflow: auto;
		}
	}
</style>