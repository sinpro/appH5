<template>
    <div>
        <m-titleview title="发送短信、邮件">
            发送短信/发送邮件
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('sendSMS')">发送短信</m-buttonview>
            <m-buttonview @click="callApi('sendMail')">发送邮件</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'sendSMS':
                    api.sendSMS({
                        mobileNo:'15068714343',content:'您好，给你发短信了'
                    }).then(result => {
                        
                    }, result => {
                        alert(result.errorMessage)
                    })
                    break
                case 'sendMail':
                    api.sendMail({ 
                        subject:'测试',
                        messageBody:'测试体',
                        toRecipients:['123@qq.com'],
                        ccRecipients:['123@qq.com']
                    }).then(result => {
                        
                    }, result => {
                        alert(result.errorMessage)
                    })
                    break
            }
        }
    }
}
</script>

