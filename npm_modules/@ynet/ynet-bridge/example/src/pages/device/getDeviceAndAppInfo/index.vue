<template>
    <div>
        <m-titleview title="获取设备APP信息">
            获取手机系统和APP信息。 主要是设备信息 手机型号、ip、MAC地址、APP版本等
        </m-titleview>
        <m-sectionview>
            <m-cellview title="app版本" :value="appInfo.appVersion"></m-cellview>
            <m-cellview title="系统版本" :value="appInfo.deviceVersion"></m-cellview>
            <m-cellview title="UUID" :value="appInfo.UUID" @valueClick="showAlert"></m-cellview>
            <m-cellview title="手机品牌" :value="appInfo.phoneType"></m-cellview>
            <m-cellview title="手机型号" :value="appInfo.model"></m-cellview>
            <m-cellview title="IP" :value="appInfo.ip"></m-cellview>
            <m-cellview title="是否root" :value="appInfo.isCrack"></m-cellview>
            <m-cellview title="设备ID" :value="appInfo.deviceToken" @valueClick="showAlert"></m-cellview>
            <m-cellview title="屏幕宽（像素值）" :value="appInfo.screenWidth"></m-cellview>
            <m-cellview title="屏幕高（像素值）" :value="appInfo.screenHeight"></m-cellview>
            <m-buttonview @click="callApi('getDeviceAndAppInfo')">获取设备APP信息</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            appInfo: {}
        }
    },
    
    methods: {

        showAlert (event) {
            alert(event.value)
        },

        callApi(casename){
            switch(casename){
                case 'getDeviceAndAppInfo':
                    api.getDeviceAndAppInfo().then(result => {
                        this.appInfo = result
                    })
                    break
            }
        }
    }
}
</script>
