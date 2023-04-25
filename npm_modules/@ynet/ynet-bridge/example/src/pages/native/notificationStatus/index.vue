<template>
    <div>
        <m-titleview title="检测推送通知权限">
            检查推送通知状态。
        </m-titleview>
        <m-sectionview>
            <m-cellview title="推送通知权限" :value="(bSupport==true ? '支持' : (bSupport === false ? '不支持' : ''))"></m-cellview>
            <m-buttonview @click="callApi('notificationStatus')">检测推送通知权限</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            bSupport: ''
        }
    },
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'notificationStatus':
                    api.notificationStatus().then(notificationStatus => {
                        this.bSupport = notificationStatus
                    })
                    break
            }
        }
    }
}
</script>

