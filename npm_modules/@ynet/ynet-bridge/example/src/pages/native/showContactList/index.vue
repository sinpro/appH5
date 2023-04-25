<template>
    <div>
        <m-titleview title="通讯录列表">
            打开系统通讯录或者自定义通讯录列表页面。
        </m-titleview>
        <m-sectionview>
            <div v-for="(contactInfo, index) in contactList" :key="index">
                <m-cellview title="姓名" :value="contactInfo.name"></m-cellview>
                <m-cellview title="手机号" :value="contactInfo.phoneNums | formatPhones"></m-cellview>
            </div>
            <m-buttonview @click="callApi('showContactList-1')">打开通讯录列表页面-案例一</m-buttonview>
            <m-buttonview @click="callApi('showContactList-2')">打开通讯录列表页面-案例二</m-buttonview>
            <m-buttonview @click="callApi('showContactList-3')">打开通讯录列表页面-案例三</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            contactList: []
        }
    },

    filters: {
        formatPhones (phoneNums) {
            return (phoneNums || []).join('|')
        }
    },
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'showContactList-1':
                    api.showContactList({maxSeletedNum:'1'}).then(result => {
                        this.contactList = result.data
                    }, result => {
                        alert(result.errorMessage)
                    })
                    break
                case 'showContactList-2':
                    api.showContactList({maxSeletedNum:'2'}).then(result => {
                        this.contactList = result.data
                    },
                    result => {
                        alert(result.errorMessage)
                    })
                    break
                case 'showContactList-3':
                    api.showContactList({maxSeletedNum:'2', contactList:[{'name':'name','phone':'10000','phones':['10000','10000']}]}).then(result => {
                        this.contactList = result.data
                    },
                    result => {
                        alert(result.errorMessage)
                    })
                    break
            }
        }
    }
}
</script>

