<template>
	<y-button v-bind="$attrs" @click="clickHandle">
		<slot></slot>
	</y-button>
</template>
<script>
	import mdButton from 'mand-mobile/components/button'
	export default {
		name: 'ynet-button',
		data(){
			return {
				clickFlag: true
			}
		},
		components: {
			'yButton': mdButton
		},
		methods: {
			clickHandle(){
				if(!this.clickFlag) return
				this.clickFlag = false
				this.$emit('clickHandle')
				setTimeout(() => {
					this.clickFlag = true
				}, 150)
			}
		}
	}
</script>