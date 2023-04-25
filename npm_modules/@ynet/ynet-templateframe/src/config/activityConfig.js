export const activityTypeUrl = type => {
    let urlData = {}
    if(type == '01'){
        urlData.url = '/ynet_activity/activities/goldenEggs.html'
        urlData.activityType = '砸金蛋'
    }else if(type == '02'){
        urlData.url = '/ynet_activity/activities/turntable.html'
        urlData.activityType = '大转盘'
    }else if(type == '03'){
        urlData.url = '/ynet_activity/activities/fruitMachine.html'
        urlData.activityType = '水果机'
    }else if(type == '04'){
        urlData.url = '/ynet_activity/activities/shake.html'
        urlData.activityType = '摇一摇'
    }else if(type == '05'){
        urlData.url = '/ynet_activity/guess/start.html'
        urlData.activityType = '有奖问答'
    }else if(type == '06'){
        urlData.url = '/ynet_activity/activities/scratch.html'
        urlData.activityType = '刮刮卡'
    }else if(type == '07'){
        urlData.url = '/ynet_activity/activities/flipCard.html'
        urlData.activityType = '翻翻乐'
    }else{
        urlData.url = '/ynet_activity/activities/redPacket.html'
        urlData.activityType = '多次抽奖'
    }
    return urlData
}