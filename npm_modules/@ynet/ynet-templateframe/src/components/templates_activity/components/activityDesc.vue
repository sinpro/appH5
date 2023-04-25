<template>
	<base-layout v-model="value" class="activity-desc">
		<div class="title" :class="bigTitle ? 'big' : ''">活动说明</div>
		<div class="details">
			<div class="time">
				<span>活动时间：</span>
				{{formatterDate(activityDetail.gameStartTime)}} - {{formatterDate(activityDetail.gameEndTime)}}
			</div>
			<div class="rule">
				<span>活动规则：</span>
			</div>
			<div v-html="filterHtml(activityDetail.gameDetail)"></div>
		</div>
		<img src="../assets/close.png" @click="closeThis" class="close"/>
	</base-layout>
</template>

<script>
import BaseLayout from './baseLayout'
import formatter from '../activities/utils/formatter'
export default {
	name: 'activity-desc',
	components: {
		BaseLayout
	},
	props: {
		value: {
			type: Boolean,
			default: true
		},
		bigTitle: {
			type: Boolean,
			default: false
		},
		activityDetail: {
			type: Object,
			default(){
				return {
					gameStartTime: '20181101000000',
					gameEndTime: '20181130000000',
					gameDetail: '<p>1. 阿基洛夫就啊浪费阿金啊老家阿娇大幅减少；理念圳龙克拉 </p>\
                  <p>2. 阿基洛夫就啊浪费阿金啊老家阿娇大幅减少；理念圳龙克拉 </p>\
                  <p>3. 阿基洛夫就啊浪费阿金啊老家阿娇大幅减少；理念圳龙克拉 </p>'
				}
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
		},
		filterHtml(str){
			try{
				return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
			}catch(e){
				return this.gameDetail
			}
		}
	}
}
</script>
<style lang="scss">
	@import '../activities/utils/scss/transform.scss';

	.activity-desc{

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
			p {
				margin-top: transformRemToPx(0.2);
			}
		}
		.time, .rule {
			margin-top: transformRemToPx(0.4);
			span {
			  font-weight: bold;
			}
		}
		.close {
			width: transformRemToPx(0.66);
			height: transformRemToPx(0.66);
			margin: transformRemToPx(0.6) auto;
		}
	}
</style>