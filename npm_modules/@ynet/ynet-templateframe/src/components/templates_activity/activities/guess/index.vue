<template>
<div class="activities_guess">
	<div class="init-bg" v-show="!status"><img src="../../assets/guess/start.png" @click="start"></div>
	<div class="start-bg" v-show="status">
		<div class="guess-len">第 {{which+1}} 题</div>
		<p class="guess-title">{{whichGuess.problemName}}</p>
		<div class="guess-options">
			<div class="guess-options-wrap">
				<p v-for="(item, index) in whichGuess.optionList" @click="shoose(index)" :class="{'right': index === chooseInfo[1], 'wrong': index === chooseInfo[0]}">{{item.option}}</p>
			</div>
		</div>
		<img class="next" src="../../assets/guess/next.png" @click="nextGuess">
		<p class="rules"><span @click="activityResultDetailFlag = true">规则说明</span></p>
	</div>
	<activity-desc v-model="activityResultDetailFlag" :activityDetail="activityDetail" @closeThis="activityResultDetailFlag = false"></activity-desc>
	<activity-win-history v-model="activityResultHistoryFlag" :activityResultHistory="activityResultHistory" @closeThis="activityResultHistoryFlag = false"></activity-win-history>
	<share v-model="shareFlag"></share>
	<base-layout v-model="lastResult" :full="true" class="result">
		<div class="result-bg">
			<p class="result-prec">战胜 <span> 74% </span> 的人</p>
			<div class="resultInfo">
					<p class="title">{{result.prizeType == '00' ? '再接再励' : '恭喜获得'}}</p>
					<p class="info">{{result.prizeDesc}}</p>
					<p class="btn">
						<span @click="openMarketRulesWinHistory">中奖记录</span>
						<span @click="popShare">分享战绩</span>
					</p>
			</div>
			<img src="../../assets/guess/close.png" class="close" @click="lastResult=false">
		</div>
	</base-layout>
</div>
</template>

<script>
import share from '../../components/share'
import activityDesc from '../../components/activityDesc'
import baseLayout from '../../components/baseLayout'
import activityWinHistory from '../../components/activityWinHistory'
import mixins from '../utils/mixins'
export default {
	mixins: [mixins],
	inheritAttrs: false,
	components: {
		share,
		activityDesc,
		baseLayout,
		activityWinHistory
	},
	data(){
		return {
			activityResultHistoryFlag: false,
			shareFlag: false,
			lastResult: false,
			status: false,
			activityResultDetailFlag: false,

			yxCrazyGuessInfo: [],
			whichGuess: {},
			which: 0,
			chooseInfo: [],
			guessChoose: [],
			result: {}
		}
	},
	methods: {
		nextGuess(){
			if(this.which < this.yxCrazyGuessInfo.length -1 ){
				this.chooseInfo = []
				this.which +=1
				this.whichGuess = this.transformData(this.yxCrazyGuessInfo[this.which])
			}
		},
		transformData(obj){
			try{
				let optionList = obj.optionList.replace(/&quot;/g, '\'')
				obj.optionList = eval(optionList)
				return obj
			}catch(e){
				return obj || {}
			}
		},
		shoose(index){
			if(this.chooseInfo.length > 0) return
			const {problemId} = this.yxCrazyGuessInfo[this.which]

			this.guessIng(problemId).then(res => {
				const correctAnswer = parseInt(res.correctAnswer) - 1
				this.chooseInfo = [correctAnswer == index ? '' : index, correctAnswer]
				this.guessChoose.push({
					problemId,
					correctAnswer: res.correctAnswer,
					problemType: '01'
				})
				//回答完最后一题的时候需要发送接口
				if(this.which == this.yxCrazyGuessInfo.length - 1){
					this.guessOver(this.guessChoose).then(res => {
						this.result = Object.freeze({
							prizeDesc:res.prizeDesc,
							prizeType:res.prizeType
						})
						this.lastResult = true
					})
				}
			})
		},
		openMarketRulesWinHistory(){
			this.activityResultHistoryFlag = true
			this.getActivityResultHistory()
		},
		start(){
			this.guessStart().then(res => {
				this.whichGuess = Object.freeze(this.transformData(this.yxCrazyGuessInfo[0]))
				this.status = true
			})
		}
	},
	created(){
		this.getActivityResultHistory()
	}
}
</script>
<style lang="scss">
@import '../utils/scss/transform.scss';
	.activities_guess{
		width: 100%;
		height: 100%;
		.init-bg{
			width: 100%;
			height: transformRemToPx(14.48);
			background: url(../../assets/guess/bg.png) no-repeat;
			background-size: 100%;
			position: relative;
			img{
				display: block;
				width: transformRemToPx(5.4);
				position: absolute;
				left: 50%;
				top: transformRemToPx(9.3);
				transform: translateX(-50%)
			}
		}
		.start-bg{
			width: 100%;
			height: transformRemToPx(14.48);
			background: url(../../assets/guess/bg_answer.png) no-repeat;
			background-size: 100%;
			position: relative;
			
			.next{
				display: block;
				width: transformRemToPx(4.32);
				position: absolute;
				left: 50%;
				top: transformRemToPx(11.5);
				transform: translateX(-50%)
			}
			.guess-title{
				width: 70%;
				text-align: center;
				color: #F8E71C;
				font-size: transformRemToPx(0.32);
				padding: transformRemToPx(0.6);
				margin: 0 auto;
			}
			.guess-len{
				color: #fff;
				width: transformRemToPx(1.76);
				height: transformRemToPx(0.58);
				text-align:center;
				line-height:transformRemToPx(0.58);
				padding-top: transformRemToPx(0.5);
			}
			.rules{
				position: absolute;
				left: 50%;
				bottom: transformRemToPx(0.58);
				transform: translateX(-50%);
				color: #0D9DF5;
				font-size: transformRemToPx(0.38);
				span{
					border-bottom: 1px solid #0D9DF5;
					display: inline-block;
					padding: 4px;
					letter-spacing: 2px;
				}
			}
			.guess-options{
				position: absolute;
				left: 50%;
				top: transformRemToPx(3.7);
				width: 80%;
				height: transformRemToPx(6);
				overflow:hidden;
				margin:0 auto;
				transform: translateX(-50%);
			}

			.guess-options-wrap{
				width: 100%;
				height: 100%;
				padding-top:transformRemToPx(1);
				p{
					width: transformRemToPx(5);
					height: transformRemToPx(1);
					background:#fff;
					margin: 0 auto transformRemToPx(0.3) auto;
					text-align:center;
					line-height: transformRemToPx(1);
					font-size: transformRemToPx(0.36);
					border-radius: 8px;
					position: relative;
					&.right{
						background:#06BFFB;
						color: #fff;
						&:after{
							content: '';
							display:block;
							width: transformRemToPx(0.36);
							height: transformRemToPx(0.26);
							background: url(../../assets/guess/right.png) no-repeat;
							background-size: 100%;
							position: absolute;
							left: transformRemToPx(0.2);
							top: 50%;
							transform: translateY(-50%);
						}
					}
					&.wrong{
						background:#FF6F1C;
						color: #fff;
						&:after{
							content: '';
							display:block;
							width: transformRemToPx(0.32);
							height: transformRemToPx(0.34);
							background: url(../../assets/guess/error.png) no-repeat;
							background-size: 100%;
							position: absolute;
							left: transformRemToPx(0.2);
							top: 50%;
							transform: translateY(-50%);
						}
					}
				}
			}
		}
		.result{
			.weui-mask{z-index:998}
			.weui-dialog{ z-index: 999 }
			.result-bg{
				width: 100%;
				height: 100%;
				background: url(../../assets/guess/bg_pop.png) no-repeat;
				background-size: 100%;
			}
			.result-prec{
				letter-spacing: 2px;
				width: 100%;
				text-align: center;
				padding: transformRemToPx(1.62) 0 transformRemToPx(0.4) 0;
				color: #fff;
				font-size: transformRemToPx(0.4);
				span{
					font-size:transformRemToPx(0.6);
					color: #F8E71C;
				}
			}
			.resultInfo{
				width: transformRemToPx(6.16);
				height: transformRemToPx(7.92);
				background: url(../../assets/guess/pop.png) no-repeat;
				background-size: 100%;
				box-sizing: border-box;
				padding-top: transformRemToPx(2.2);
				margin: 0 auto;
			}
			.close{
				display:block;
				margin: transformRemToPx(0.6) auto 0 auto;
				width: transformRemToPx(0.6);
			}
			.title{
				font-size: transformRemToPx(0.4);
				font-weight: bold;
				padding: transformRemToPx(0.8) 0;
				color:#000;
			}
			.info{
				font-size: transformRemToPx(0.4);
				font-weight: bold;
				color:#000;
				font-size: transformRemToPx(0.66);
				margin-bottom: transformRemToPx(1);
			}
			.btn{
				display:flex;
				justify-content: space-around;
				span{
					display: inline-block;
					width: transformRemToPx(2.58);
					height: transformRemToPx(0.88);
					background: #0EB3FF;
					color: #fff;
					text-align:center;
					line-height: transformRemToPx(0.88);
					border-radius: 30px;
					font-size: transformRemToPx(0.32);
					&:last-child{
						background: #ff7c0f;
					}
				}
			}
		}
	}
</style>
