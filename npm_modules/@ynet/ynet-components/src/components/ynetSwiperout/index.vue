<template>
	<div class="ynet-swiperout">
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name: 'ynet-swipeout'
	}
</script>
<style lang="scss">
	.ynet-swiperout{
		width: 100%;
		overflow: hidden;
	}
</style>