<template>
    <div>
        <m-titleview title="屏幕亮度">
            设置屏幕亮度
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('setBrightness')">设置屏幕亮度</m-buttonview>
            <m-buttonview @click="callApi('recoverBrightness')">还原屏幕亮度</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'setBrightness':
                    api.setBrightness(0.8)
                    break
                case 'recoverBrightness':
                    api.recoverBrightness()
                    break
            }
        }
    }
}
</script>

