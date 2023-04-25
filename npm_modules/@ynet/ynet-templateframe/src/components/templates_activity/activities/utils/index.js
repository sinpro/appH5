export function computedAttr(){
	return {
		todayText(){
			return this.activityDetail.joinType == 1 ? '今天' : ''
		},
		lotteryTimes(){
			return this.activityTimes.unUsedNum  ? this.activityTimes.unUsedNum : this.activityDetail.joinTimes
		}
	}
}


/*
*	判断活动是否开始或已经过期
*	@param gameStartTime:String    活动开始时间YYYYMMDDHH24MISS（14位）
*	@param gameEndTime:String      活动结束时间YYYYMMDDHH24MISS（14位）
*	@param gameEndDesc:String      活动结束语句
*	
*/

export function activityStatus({gameStartTime, gameEndTime, gameEndDesc= '活动已结束！'}){

	let currentTime = (() => {
		let format = str => str = str > 10 ? str + '' : `0${str}`
		let nowDate = new Date()
		return `${nowDate.getFullYear()}${format(nowDate.getMonth()+1)}${format(nowDate.getDate())}${format(nowDate.getHours())}${format(nowDate.getMinutes())}${format(nowDate.getSeconds())}`
	})()

	return currentTime < gameStartTime ? { status: false, desc: '活动未开始！'} : 
			currentTime > gameEndTime ? { status: false, desc: gameEndDesc } : { status: true }

}