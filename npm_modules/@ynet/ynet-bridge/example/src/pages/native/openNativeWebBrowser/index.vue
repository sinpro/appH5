<template>
    <div>
        <m-titleview title="打开浏览器">
            打开系统浏览器
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('openNativeWebBrowser')">打开系统浏览器</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    methods: {

        callApi(casename){
            switch(casename){
                case 'openNativeWebBrowser':
                    api.openNativeWebBrowser('http://www.baidu.com/')
                    break
            }
        }
    }
}
</script>

