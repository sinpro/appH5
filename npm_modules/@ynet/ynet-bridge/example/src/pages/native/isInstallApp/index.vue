<template>
    <div>
        <m-titleview title="检测是否已安装APP">
            判断是否安装第三方app
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('isInstallApp')">判断微信APP是否安装</m-buttonview>
            <m-inputview placeholder="ios scheme url" v-model="iosScheme"></m-inputview>
            <m-inputview placeholder="android package name" v-model="androidPackage"></m-inputview>
            <m-buttonview @click="callApi('isInstallApp-1')">判断第三方APP是否存在</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            iosScheme: '',
            androidPackage: ''
        }
    },
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'isInstallApp':
                    api.isInstallApp({schemeURL:'weixin://', packageName:'com.tencent.mm'}).then(result => {
                        if(result.installed){
                            window.alert('微信APP已安装')
                        }else{
                            window.alert('微信APP尚未安装')
                        }
                    })
                    break
                case 'isInstallApp-1':
                    if(!this.iosScheme && !this.androidPackage){
                        window.alert('请输入待检查信息')
                        return 
                    }
                    
                    api.isInstallApp({schemeURL:this.iosScheme, packageName:this.androidPackage}).then(result => {
                        if(result.installed){
                            window.alert('微信APP已安装')
                        }else{
                            window.alert('微信APP尚未安装')
                        }
                    })
                    break
            }
        }
    }
}
</script>

