<template>
    <div>
        <m-titleview title="开始本地指纹/面容识别">
            检测本地指纹/面容识别是否可用；进行指纹/面容本地验证
        </m-titleview>
        <m-sectionview>
            <m-cellview title="登录验证是否开启" :value="loginOpened"></m-cellview>
            <m-cellview title="支付验证是否开启" :value="payOpened"></m-cellview>
            <m-buttonview @click="callApi('availableLocalAuthentication')">检测识别是否可用</m-buttonview>
            <m-buttonview @click="callApi('startLocalAuthentication')">开始本地验证</m-buttonview>
            <m-buttonview @click="callApi('startLocalAuthentication-1')">开始本地验证+其他验证</m-buttonview>
            <m-buttonview @click="callApi('setLocalAuthenticationOnOff')">开启本地登录验证</m-buttonview>
            <m-buttonview @click="callApi('clearLocalAuthenticationOnOff')">关闭本地登录验证</m-buttonview>
            <m-buttonview @click="callApi('setLocalAuthenticationOnOff-1')">开启本地支付验证</m-buttonview>
            <m-buttonview @click="callApi('clearLocalAuthenticationOnOff-1')">关闭本地支付验证</m-buttonview>
            <m-buttonview @click="callApi('setFingerPrintToken')">设置指纹/面容识别Token</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            loginOpened: '',
            payOpened: ''
        }
    },

    created () {
        api.getLocalAuthenticationOnOff('login').then(res => {
            this.loginOpened = res.result ? '开启' : '未开启'
        })

        api.getLocalAuthenticationOnOff('pay').then(res => {
            this.payOpened = res.result ? '开启' : '未开启'
        })
    },

    methods: {

        callApi(casename){
            switch(casename){
                case 'availableLocalAuthentication':
                    api.availableLocalAuthentication().then(available => {
                        if(available){
                            window.alert('本地验证可用')
                        }else{
                            window.alert('本地验证不可用')
                        }
                    })
                    break
                case 'startLocalAuthentication':
                    api.startLocalAuthentication().then(res => {
                        window.alert('验证成功')
                    }, (res) => {
                        window.alert(`验证失败: [${res.error}][${res.errorMessage}]`)
                    })
                    break
                case 'startLocalAuthentication-1':
                    api.startLocalAuthentication({showOtherButton: true}).then(res => {
                        window.alert('验证成功')
                    }, (res) => {
                        window.alert(`验证失败: [${res.error}][${res.errorMessage}]`)
                    })
                    break
                case 'setLocalAuthenticationOnOff':
                    api.setLocalAuthenticationOnOff('login').then(res => {
                        window.alert('设置成功')
                    })
                    break
                case 'clearLocalAuthenticationOnOff':
                    api.clearLocalAuthenticationOnOff('login').then(res => {
                        window.alert('清理成功')
                    })
                    break
                case 'setLocalAuthenticationOnOff-1':
                    api.setLocalAuthenticationOnOff('pay').then(res => {
                        window.alert('设置成功')
                    })
                    break
                case 'clearLocalAuthenticationOnOff-1':
                    api.clearLocalAuthenticationOnOff('pay').then(res => {
                        window.alert('清理成功')
                    })
                    break
                case 'setFingerPrintToken':
                    api.setFingerPrintToken('TOKEN0000000000001').then(res => {
                        window.alert('设置成功')
                    })
                    break
            }
        }
    }
}
</script>

