<template>
    <div>
        <m-titleview>设备管理</m-titleview>
        <m-buttonview @click="callApi('getDeviceAndAppInfo')">getDeviceAndAppInfo</m-buttonview>
        <m-buttonview @click="callApi('getDeviceFingerprint')">getDeviceFingerprint</m-buttonview>
        <m-buttonview @click="callApi('getBatteryInfo')">getBatteryInfo</m-buttonview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'getDeviceAndAppInfo':
                    api.getDeviceAndAppInfo().then(result => alert(JSON.stringify(result)))
                    break
                case 'getDeviceFingerprint':
                    api.getDeviceFingerprint().then(result => alert(JSON.stringify(result)))
                    break
                case 'getBatteryInfo':
                    api.getBatteryInfo().then(result => alert(JSON.stringify(result)))
                    break
            }
        }
    }
}
</script>
