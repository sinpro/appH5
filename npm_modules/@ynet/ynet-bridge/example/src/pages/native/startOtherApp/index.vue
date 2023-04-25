<template>
    <div>
        <m-titleview title="打开第三方APP">
            启动第三方APP
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('startOtherApp')">打开微信APP</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'startOtherApp':
                    api.startOtherApp({schemeURL:'weixin://', packageName:'com.tencent.mm'})
                    break
            }
        }
    }
}
</script>

