const config = {
	server: 'https://cn-hangzhou-mas-log.cloud.alipay.com/loggw/webLog.do',
	appId: '1957919251958',
	workspaceId: 'FinMallDev',
	per: (window.App && App.device && App.device.specialSign) ? 'APP_H5_' : 'WX_H5_'
}


const fly = data => {
	let formData = new FormData()
	let xhr = new XMLHttpRequest()
	xhr.open('POST', config.server, true)
	formData.append('data', data)
	xhr.send(formData)
}


export default {
	click(events, marketId){
		events =config.per + events
		let data = 'D-VM,2019-05-15 19:19:07,'+config.appId+'_H5-'+config.workspaceId+',0.0.0,2,-,650429d3-694b-4847-92cf-d71b37e43b1c,,'+events+',-,-,-,-,-,-,'+events+',http://192.168.0.25:8082/ynet_activity/activities/flipCard.html,H5behavior,c,http://192.168.0.25:8082/ynet_activity/activities/flipCard.html,'+events+',-,mtrVer=4.0.0.0^mtrSeed='+events+'^userAgent=Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML%2C like Gecko) Version/10.0 Mobile/14E304 Safari/602.1^mtr-marketId='+marketId+'^mPlatformType=^user_id=^fullURL=http://192.168.0.25:8082/ynet_activity/activities/flipCard.html,-,-,072275fd-a293-4c48-a8d8-b52136020216-1557826331576,-,-,http://192.168.0.25:8082/ynet_activity/activities/flipCard.html,http://192.168.0.25:8082/ynet_activity/activities/flipCard.html,-,-,-,iOS,10.3.1,-,-,-,zh-CN,-,-,-,-,-,-,320x568,-,-'
		fly(data)
	}
}