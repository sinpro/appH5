<template>
    <div>
        <m-titleview title="打开银行列表">
            打开银行列表。选择相应的银行回调数据。有RPC调用
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('openBankList')">打开银行列表</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'openBankList':
                    api.openBankList().then(data => alert(JSON.stringify(data)))
                    break
            }
        }
    }
}
</script>

