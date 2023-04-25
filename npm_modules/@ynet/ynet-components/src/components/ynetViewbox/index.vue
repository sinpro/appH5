<template>
	<div class="ynet-viewbox">
		<div class="ynet-viewbox_document">
			<slot name="viewbox-header" />
			<div class="ynet-viewbox_main">
				<slot></slot>
			</div>
			<slot name="viewbox-footer" />
		</div>
	</div>
</template>
<script>
	export default {
		name: 'ynet-viewbox'
	}
</script>
<style lang="scss" scoped>
	@import './index'
</style>