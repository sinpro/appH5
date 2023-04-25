<template>
    <div>
        <m-titleview title="打开容器/离线包">
            在当前离线包内/跨包打开新页面
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('pushWindow')">打开当前离线包内页面</m-buttonview>
            <m-buttonview @click="callApi('pushWindowOnline')">打开在线页面</m-buttonview>
            <m-buttonview @click="callApi('startH5App')">打开跨离线包页面</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'pushWindow':
                    api.pushWindow(window.location.href, {test:'12'}).then(result => alert(JSON.stringify(result)))
                    break
                case 'pushWindowOnline':
                    api.pushWindowOnline('https://www.baidu.com').then(result => alert(JSON.stringify(result)))
                    break
                case 'startH5App':
                    api.pushWindow(window.location.href, {test:'12'}).then(result => alert(JSON.stringify(result)))
                    break
            }
        }
    }
}
</script>
