<template>
    <div>
        <m-titleview title="检查版本更新">
            检查版本更新,默认弹窗提示，根据silent参数使用静默查询
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('checkAppUpdate-0')">检查版本更新</m-buttonview>
            <m-buttonview @click="callApi('checkAppUpdate-1')">静默检查版本更新</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'checkAppUpdate-0':
                    api.checkAppUpdate('0').then((result) => alert(JSON.stringify(result)))
                    break
                case 'checkAppUpdate-1':
                    api.checkAppUpdate('1').then((result) => alert(JSON.stringify(result)))
                    break
            }
        }
    }
}
</script>
