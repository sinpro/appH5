<template>
	<div>
		<slot :timeData="timeData">{{formattedTime}}</slot>
	</div>
</template>
<script>
	import { parseTimeData, parseFormat, isSameSecond, raf, cancelRaf } from './utils'
	import props from './props'
	export default {
		name: 'ynet-count-down', props,
		data(){
			return {
				remain: 0
			}
		},
		watch: {
			time: {
				immediate: true,
				handler: 'reset'
			}
		},
		computed: {
			timeData(){
				return parseTimeData(this.remain);
			},
			formattedTime(){
				return parseFormat(this.format, this.timeData, this)
			}
		},
		methods:{
			start(){
				if(this.counting){ return }
				this.counting = true
				this.endTime = Date.now() + this.time
				this.tick()
			},
			pauses(){
				this.counting = false
				cancelRaf(this.rafId)
			},
			reset(){
				this.pauses()
				this.remain = this.time
				if(this.autoStart){ this.start() }
			},
			tick(){
				if(this.millisecond){
					this.microTick();
				}else{
					this.macroTick()
				}
			},
			microTick(){
				this.rafId = raf(() => {
					this.setRemain(this.getRemain())
					if(this.remain !== 0){
						this.microTick()
					}
				})
			},
			macroTick(){
				this.rafId = raf(() => {
					const remain = this.getRemain()
					if(!isSameSecond(remain, this.remain) || remain === 0){
						this.setRemain(remain)
					}
					if(this.remain !== 0){
						this.macroTick()
					}
				})
			},
			getRemain(){
				return Math.max(this.endTime - Date.now(), 0)
			},
			setRemain(remain){
				this.remain = remain
				if(remain === 0){
					this.pauses()
					this.$emit('finish')
				}
			}
		}
	}
</script>