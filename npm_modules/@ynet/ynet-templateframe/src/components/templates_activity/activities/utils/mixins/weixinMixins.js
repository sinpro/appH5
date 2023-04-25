import { activityStatus } from '../index'
import { rpc } from '@core/bridge'
import Tracker from '../weblog'
const mixins = {
	data(){
		return {
			isInApp: false,
			//活动初始状态，当在非活动时间内的时候该值为false
			ready: false,
			//抽奖接口结果保存地址
			activityResult: {},
			//抽奖次数接口保存地址
			activityTimes: {},
			//抽奖奖品列表保存地址
			activityList: [],
			//活动详情保存地址
			activityDetail: {},
			//用户中奖记录结果
			activityResultHistory: [],
			//活动中奖名单分页保地址
			activityResultPage: [],
			//geuss 问题列表存放
			yxCrazyGuessInfo: []
		}
	},
	async created(){
		Tracker.click('ACTIVITY_INIT', this.getParamInfo('marketId'))
		
		Promise.all([this.getActivityDetail(), this.getActivityTimes()]).then(res => {
			let { status, desc } = activityStatus(this.activityDetail)
			status ? this.ready = true : window.alert('活动结束', desc)
		})
	},
	methods: {
		popShare(cb){
			Tracker.click('ACTIVITY_SHARE', this.getParamInfo('marketId'))
			this.shareFlag = true

		},
		//调用抽奖接口
		getActivityResult(){
			Tracker.click('ACTIVITY_DRAW', this.getParamInfo('marketId'))
			return rpc('JA00002', {
				 marketId: this.getParamInfo('marketId'),
				 cstNo: this.getParamInfo('customerId'),
				 mobile: this.getParamInfo('mobileNo')
			}).then(res => {
				this.activityResult = Object.freeze(res)
				this.activityTimes = {...this.activityTimes, unUsedNum: res.unUsedNum}
				return res
			})
		},
		//获取用户抽奖次数
		getActivityTimes(){
			return rpc('JA00005', {cstNo: this.getParamInfo('customerId'), actId: this.getParamInfo('marketId')}).then(res => {
				this.activityTimes = Object.freeze(res)
			})
		},
		//获取奖品列表
		getActivityList(){
			return rpc('JA00001', {marketId: this.getParamInfo('marketId')}).then(res => {
				this.activityList = Object.freeze(res.yxMarketPrizeInfo)
			})
		},
		//获取活动详情
		getActivityDetail(){
			return rpc('JA00006', {marketId: this.getParamInfo('marketId')}).then(res => {
				this.activityDetail = Object.freeze(res)
			})
		},
		//获取活动中奖历史记录
		getActivityResultHistory(){
			return rpc('JA00003', {
				marketId: this.getParamInfo('marketId'),
				cstNo: this.getParamInfo('customerId'),
				mobile: this.getParamInfo('mobileNo')
			}).then(res => {
				this.activityResultHistory = Object.freeze(res.winningThePrizeInfoList)
			})
		},

		getParamInfo (field) {
			return ((this.userInfo || {}).body || {})[field] || App.params[field]
		},

		//获取活动全部中奖名单分页
		getActivityResultPage(){
			return rpc('JA00013', {
				marketId: this.getParamInfo('marketId'),
				turnPageBeginPos: '1',
				turnPageShowNum: '10'
			}).then(res => {
				this.activityResultPage = Object.freeze(res.winningThePrizeInfoList)
			})
		},

		//特殊活动接口,非公共 -- 开始猜题
		guessStart(){
			return rpc('JA00010', {
				marketId: this.getParamInfo('marketId')
			}).then(res => {
				this.yxCrazyGuessInfo = Object.freeze(res.yx_crazyGuessInfo)
			})
		},
		//特殊活动接口,非公共 -- 猜题
		guessIng(problemId){
			return rpc('JA00014', {
				marketId: this.getParamInfo('marketId'),
				problemId
			})
		},
		//特殊活动接口,非公共 -- 猜题结束，最后一题完结的时候需要发该接口统计
		guessOver(yx_answerCommitList){
			return rpc('JA00011', {
				marketId: this.getParamInfo('marketId'),
				marketGroup: '05',
				cstNo: this.getParamInfo('customerId'),
				mobile: this.getParamInfo('mobileNo'),
				yx_answerCommitList
			})
		}
	}
}

export default mixins