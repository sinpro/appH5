<template>
    <div>
        <m-titleview title="下拉刷新">
            开始下拉刷新/结束下拉刷新
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('startPullDownRefresh')">主动触发下拉刷新</m-buttonview>
            <m-buttonview @click="callApi('stopPullDownRefresh')">停止下拉刷新</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'startPullDownRefresh':
                    api.startPullDownRefresh()
                    break
                case 'stopPullDownRefresh':
                    api.stopPullDownRefresh()
                    break
            }
        }
    }
}
</script>

