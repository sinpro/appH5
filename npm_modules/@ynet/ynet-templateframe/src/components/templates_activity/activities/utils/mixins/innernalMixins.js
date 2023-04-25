import mock_innernal from '../mock/innernalMock'
export default {
	inheritAttrs: false,
	props: {
		//活动详情保存地址
		activityDetail: {
			type: Object,
			default(){ return {} }
		}
	},
	data(){
		return {
			isInApp: false,
			//活动初始状态，当在非活动时间内的时候该值为false, 内管系中不存在过期
			ready: true,
			//抽奖接口结果保存地址
			activityResult: {},
			//抽奖次数接口保存地址
			activityTimes: {},
			//抽奖奖品列表保存地址
			activityList: [],
			//用户中奖记录结果
			activityResultHistory: [],
			//活动中奖名单分页保地址
			activityResultPage: [],
			//geuss 问题列表存放
			yxCrazyGuessInfo: []
		}
	},
	created(){
		this.getActivityDetail()
		this.getActivityTimes()
	},
	methods: {
		//分享
		popShare(){
			this.shareFlag = true
		},
		//调用抽奖接口
		getActivityResult(){
			//JA00002
			return new Promise(resolve => {
				setTimeout(() => {
					this.activityResult = Object.freeze( mock_innernal.JA00002)
					this.activityTimes = {...this.activityTimes, unUsedNum: mock_innernal.JA00002.unUsedNum}
					resolve(mock_innernal.JA00002) 
				}, 1000)
			})
		},
		//获取用户抽奖次数
		getActivityTimes(){
			//JA00005
			this.activityTimes = Object.freeze(mock_innernal.JA00005)
			return Promise.resolve(mock_innernal.JA00005)
		},
		//获取奖品列表
		getActivityList(){
			//JA00001
			this.activityList = Object.freeze(this.$attrs.activityList || [])
			return Promise.resolve(this.$attrs.activityList || [])
		},
		//获取活动详情
		getActivityDetail(){
			//JA00006
			// this.activityDetail = Object.freeze(this.$attrs.activityDetail || {})
			// return Promise.resolve(this.$attrs.activityDetail || {})
		},
		//获取活动中奖历史记录
		getActivityResultHistory(){
			//JA00003
			this.activityResultHistory = Object.freeze(mock_innernal.JA00003.winningThePrizeInfoList)
			return Promise.resolve(mock_innernal.JA00003.winningThePrizeInfoList) 
		},
		//获取活动全部中奖名单分页
		getActivityResultPage(){
			//JA00013
			this.$nextTick(() => {
				this.activityResultPage = Object.freeze(mock_innernal.JA00013.winningThePrizeInfoList)
			})
		},

		guessStart(){
			//JA00010
			this.yxCrazyGuessInfo = Object.freeze(this.$attrs.yx_crazyGuessInfo || [])
			return Promise.resolve(this.$attrs.yx_crazyGuessInfo || [])
		},
		guessIng(){},
		guessOver(){}
	}
}