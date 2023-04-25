<template>
	<base-layout v-model="value" class="activity-win-history">
		<div class="title" :class="bigTitle ? 'big' : ''">我的中奖</div>
		<div class="details">
			<ul class="head flexbox">
				<li v-for="(item, index) in activityResultHistory" :key="index">
					<span>{{item.prizeName}}</span>
					<span>{{formatterDate(item.winningTime)}}</span>
				</li>
			</ul>
		</div>
		<img src="../assets/close.png" @click="closeThis" class="close"/>
	</base-layout>
</template>
<script>
	import BaseLayout from './baseLayout'
	import formatter from '../activities/utils/formatter'
	export default {
		name : 'activity-win-history',
		components: {
			BaseLayout
		},
		props: {
			value: {
				type: Boolean,
				default: false
			},
			bigTitle: {
				type: Boolean,
				default: false
			},
			activityResultHistory: {
				type: Array,
				default(){
					return []
				}
			}
		},
		methods: {
			closeThis(){
				this.$emit('closeThis')
			},
			formatterDate(date, limit='yyyy.MM.dd'){
				if(!date) return ''
				return formatter.formatDate(formatter.toDate(date, 'yyyyMMddHHmmss'), limit)
			}
		}
	}
</script>
<style lang="scss">
	@import '../activities/utils/scss/transform.scss';
	.activity-win-history{
		.title {
			position: absolute;
			z-index: 9;
			left: 50%;
			transform: translateX(-50%);
			top: transformRemToPx(-0.34);
			width: transformRemToPx(2.9);
			height: transformRemToPx(0.72);
			background: url("../assets/bar.png") no-repeat;
			background-size: 100%;
			font-weight: 500;
			color: #ffffff;
			display: flex;
			align-items: center;
			justify-content: center;
			
			&.big {
				top: transformRemToPx(-0.7);
				width: transformRemToPx(5.52);
				height: transformRemToPx(0.9);
				padding-bottom: transformRemToPx(0.32);
				background: url("../assets/flip/bar_no.png") no-repeat;
				background-size: 100%;
				font-size: transformRemToPx(0.4);
				letter-spacing: transformRemToPx(0.02);
				font-weight: 400;
			}
		}
		.details{
			text-align: left;
			width: transformRemToPx(5.2);
			background: #ffffff;
			padding: transformRemToPx(0.6) transformRemToPx(0.4);
			border-radius: transformRemToPx(0.2);
			max-height: transformRemToPx(8);
			-webkit-overflow-scrolling:touch;
			overflow-y: auto;
			.flexbox{
				li{
					display: flex;
					justify-content: space-between;
					height: transformRemToPx(0.8);
					line-height: transformRemToPx(0.8);
					position: relative;
					&:after{
						content: "";
						position: absolute;
						width:100%;
						height: 1px;
						background: #e5e5e5;
						left:0;
						bottom: 0;
						transform: scaleY(0.5);
					}
				}

			}
		}
		.close {
			width: transformRemToPx(0.66);
			height: transformRemToPx(0.66);
			margin: transformRemToPx(0.6) auto;
		}
	}
</style>