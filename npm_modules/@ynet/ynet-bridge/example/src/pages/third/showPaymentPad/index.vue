<template>
    <div>
        <m-titleview title="打开支付密码键盘">
            弹出带取款密码、支付密码UI的密码键盘的支付弹窗，也是使用微通键盘集成。
        </m-titleview>
        <m-sectionview>
            <m-cellview title="密码密文" :value="passwordValue"></m-cellview>
            <m-buttonview @click="callApi('showPaymentPad')">打开支付密码键盘</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            passwordValue: ''
        }
    },
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'showPaymentPad':
                    api.showPaymentPad({accountBankLogo:'YNET', randomKey:'',styleType:'1',
                    money:'3333',
                    accountName:'xiaohua',accountPhoneNumOrCardId:'138 0000 1234',
                    contents:[{content:'222',size:'32',color:'#666666'}]}).then(result => {
                        this.passwordValue = result.value
                    }, result => alert(result.errorMessage))
                    break
            }
        }
    }
}
</script>
