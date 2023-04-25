<template>
    <div>
        <m-titleview title="调试模式">
            开启webview的调试模式，实际上是客户端设置webview的userAgent，通过此JSApi客户端存储最新的userAgent，在下次启动的时设置webview的userAgent为最新值。
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('debugMode-0')">开启调试模式</m-buttonview>
            <m-buttonview @click="callApi('debugMode-1')">关闭调试模式</m-buttonview>
            <m-buttonview @click="callApi('debugMode-2')">查看调试模式</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'debugMode-0':
                    api.debugMode('debug')
                    break
                case 'debugMode-1':
                    api.debugMode('')
                    break
                case 'debugMode-2':
                    alert(navigator.userAgent)
                    break
            }
        }
    }
}
</script>

