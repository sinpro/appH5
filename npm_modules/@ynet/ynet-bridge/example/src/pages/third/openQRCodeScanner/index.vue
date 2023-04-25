<template>
    <div>
        <m-titleview title="二维码扫描">
            打开扫一扫，回调扫码内容
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('openQRCodeScanner')">打开二维码扫描</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'openQRCodeScanner':
                    api.openQRCodeScanner().then((result) => { alert(result.codeString) })
                    break
            }
        }
    }
}
</script>
