<template>
    <div>
        <m-titleview title="获取设备唯一号">
            获取设备唯一标识，使用mpaas组件生成。
        </m-titleview>
        <m-sectionview>
            <m-cellview title="设备唯一标识" :value="deviceID" @valueClick="showAlert"></m-cellview>
            <m-buttonview @click="callApi('getDeviceFingerprint')">getDeviceFingerprint</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            deviceID: ''
        }
    },
    
    methods: {

        showAlert (event) {
            alert(event.value)
        },

        callApi(casename){
            switch(casename){
                case 'getDeviceFingerprint':
                    api.getDeviceFingerprint().then(result => {
                        this.deviceID = result.deviceID
                    })
                    break
            }
        }
    }
}
</script>
