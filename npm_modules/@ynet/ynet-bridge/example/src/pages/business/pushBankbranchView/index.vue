<template>
    <div>
        <m-titleview title="打开网点视图">
            打开原生网点预约应用。包含相关业务场景的地图模式、列表模式、导航等
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('pushBankbranchView')">打开网点视图</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'pushBankbranchView':
                    api.pushBankbranchView()
                    break
            }
        }
    }
}
</script>

