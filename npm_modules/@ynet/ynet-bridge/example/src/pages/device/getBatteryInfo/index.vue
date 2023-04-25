<template>
    <div>
        <m-titleview title="获取电池信息">
            获取电池信息
        </m-titleview>
        <m-sectionview>
            <m-cellview title="电池剩余电量">{{batteryInfo}}</m-cellview>
            <m-buttonview @click="callApi('getBatteryInfo')">获取电池信息</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            batteryInfo: ''
        }
    },
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'getBatteryInfo':
                    api.getBatteryInfo().then(result => {
                        this.batteryInfo = result.level + '%'
                    })
                    break
            }
        }
    }
}
</script>
