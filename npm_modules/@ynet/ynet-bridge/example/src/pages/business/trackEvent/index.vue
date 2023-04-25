<template>
    <div>
        <m-titleview title="自定义事件埋点">
            mpaas数据采集埋点
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('trackEvent')">上送埋点事件</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'trackEvent':
                    api.trackEvent({eventId: 'APITEST_EVENT_TEST', data: {v_var1:'参数1', v_var2:'参数2'}})
                    break
            }
        }
    }
}
</script>

