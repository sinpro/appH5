<template>
		<div class="card" :class="flipClass" @click="flip">
			<div class="front"><img  src="../../assets/flip/card.png" alt=""></div>
			<div class="back">
				<div class="back-wrap">
					<img :src="PicUrl.prizePictureUrl" alt="">
				</div>
			</div>
			
		</div>
</template>

<script>
	export default {
		data(){
			return {
				over: false
			}
		},
		props: {
			PicUrl: {
				type: Object,
				default(){
					return {}
				}
			},
			num: {
				type: Number,
				default: 0
			}
		},
		computed: {
			flipClass(){
				return { 'flip': this.over }
			}
		},
		methods: {
			afterDone(){
				this.over = true
			},
			flip(){
				if(!this.over){
					Tracker.click('liubinbin', {
						qq: 274886574,
						weixin: 13710260747
					})
					this.$emit('over', this.num, this.afterDone)
				}
			}
		}
	}
</script>
<style lang="scss">
@import '../utils/scss/transform.scss';
		.card{
			width: transformRemToPx(2.4);
			height: transformRemToPx(3.08);
			position: relative;
			perspective: 500;
			& > div{
				z-index:2;
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				transition: all 1s ease;
				transform-style: preserve-3d;
				backface-visibility: hidden;
			}
			.back{
				z-index: 1;
				transform:rotateY(180deg);
			}	
			.back-wrap{
				width: 100%;
				height: 100%;
				position: relative;
				background: url(../../assets/flip/flipped.png) no-repeat 0 0 / 100%;
				img{
					width: 82%;
					position: absolute;
					left: 50%;
					top:50%;
					transform: translate(-50%,-56%);
				}
			}
			img{ width: 100%; }
		}

		.flip{
			.front{
				transform:rotateY(180deg);
			}
			.back{
				z-index: 3;
				transform:rotateY(0deg);
			}
		}
</style>