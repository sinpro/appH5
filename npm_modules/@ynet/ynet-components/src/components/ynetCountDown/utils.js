const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR


function padZero(num, targetLenght = 2){
	let str = String(num)
	while(str.length < targetLenght){
		str = '0' + str
	}
	return str
}

export function parseTimeData(time){
	return {
		days: Math.floor(time / DAY),
		hours : Math.floor((time % DAY) / HOUR),
		minutes : Math.floor((time % HOUR) / MINUTE),
		seconds : Math.floor((time % MINUTE) / SECOND),
		milliseconds : Math.floor(time % SECOND)
	}
}

export function parseFormat(format = 'hh:mm:ss', TimeData, that){
	if(that.$scopedSlots.default){ return '' }
	let { days, hours, minutes, seconds, milliseconds } = TimeData
	if(format.indexOf('dd') === -1){
		hours += days * 24
	}else{
		format = format.replace('dd', padZero(days))
	}
	if(format.indexOf('hh') === -1){
		minutes += hours * 60
	}else{
		format = format.replace('hh', padZero(hours))
	}
	if(format.indexOf('mm') === -1){
		seconds += minutes * 60
	}else{
		format = format.replace('mm', padZero(minutes))
	}
	if(format.indexOf('ss') === -1){
		milliseconds += seconds * 1000
	}else{
		format = format.replace('ss', padZero(seconds))
	}

	return format.replace('sss', padZero(milliseconds, 3))
}

export function isSameSecond(time1, time2){
	return Math.floor(time1 / 1000) === Math.floor(time2 / 1000)
}


export function raf(fn){
	return window.requestAnimationFrame(fn)
}

export function cancelRaf(id){
	return window.cancelAnimationFrame(id)
}