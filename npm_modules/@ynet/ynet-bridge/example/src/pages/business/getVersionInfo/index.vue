<template>
    <div>
        <m-titleview title="获取APP启动信息">
            获取APP启动信息
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('getVersionInfo')">获取版本信息</m-buttonview>
            <m-buttonview @click="callApi('getServerDate')">获取服务器日期</m-buttonview>
            <m-buttonview @click="callApi('getCurrentStyle')">获取首页风格</m-buttonview>
            <m-buttonview @click="callApi('getServerUrl')">获取服务器地址</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'getVersionInfo':
                    api.getVersionInfo('newAppVersion').then(data => alert(JSON.stringify(data)))
                    break
                case 'getServerDate':
                    api.getServerDate().then(data => alert(data.resultDate))
                    break
                case 'getCurrentStyle':
                    api.getCurrentStyle().then(data => alert(data.resultStyle))
                    break
                case 'getServerUrl':
                    api.getServerUrl().then(data => alert(data.imgServerUrl))
                    break
            }
        }
    }
}
</script>

