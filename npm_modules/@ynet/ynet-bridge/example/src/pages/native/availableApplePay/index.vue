<template>
    <div>
        <m-titleview title="ApplePay权限检查">
            是否支持ApplePay。Android直接返回不支持
        </m-titleview>
        <m-sectionview>
            <m-cellview title="ApplePay是否支持" :value="(bSupport==true ? '支持' : (bSupport === false ? '不支持' : ''))"></m-cellview>
            <m-buttonview @click="callApi('availableApplePay')">检查是否支持</m-buttonview>
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
                case 'availableApplePay':
                    api.availableApplePay().then(result => {
                        this.bSupport = result
                    })
                    break
            }
        }
    }
}
</script>

