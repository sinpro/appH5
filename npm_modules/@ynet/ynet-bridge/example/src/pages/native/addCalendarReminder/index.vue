<template>
    <div>
        <m-titleview title="日历提醒">
            在系统日历提醒中增加自定义时间
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('addCalendarReminder')">添加日历提醒</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    methods: {

        callApi(casename){
            switch(casename){
                case 'addCalendarReminder':
                    api.addCalendarReminder({
                        title:'测试API', description:'测试API描述' , dtStart:1562232635000, dtEnd:1562232635000, hasAlarm:1, previousDate:1562232635000, appUrl:'weixin://'
                    })
                    break
            }
        }
    }
}
</script>

