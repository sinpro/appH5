<template>
	<base-layout v-model="value" :full="true" class="share-layer">
		<div style="width:100%;height:100%" @click="clostThis">
		<img src="../assets/arrow.png" class="arrow">
		<img src="../assets/plane.png" class="plane">
		</div>
	</base-layout>
</template>

<script>
	import baseLayout from './baseLayout'
	export default {
		name: 'share',
		components: {
			baseLayout
		},
		props: {
			value: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			clostThis(){
				this.$emit('input', false)
			}
		}
	}
</script>
<style lang="scss">
	@import '../activities/utils/scss/transform.scss';
	.share-layer {
	  .arrow {
	    position: absolute;
	    top: transformRemToPx(0.64);
	    right: transformRemToPx(0.82);
	    width: transformRemToPx(1.7);
	    height: transformRemToPx(1.64);
	  }
	  .plane {
	    position: absolute;
	    top: transformRemToPx(2.82);
	    left: transformRemToPx(1.41);
	    width: transformRemToPx(4.68);
	    height: transformRemToPx(1.82);
	  }
	}
</style>