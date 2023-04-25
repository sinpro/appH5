<template>
    <div>
        <m-titleview title="关闭页面">
            关闭H5页面（关闭所有页面、关闭其他页面、关闭指定页面）。
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('closeAll')">关闭所有页面</m-buttonview>
            <m-buttonview @click="callApi('closeOther')">关闭其他页面</m-buttonview>
            <m-buttonview @click="callApi('closePage')">关闭指定页面</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'closeAll':
                    api.closeAll().then(result => alert(JSON.stringify(result)))
                    break
                case 'closeOther':
                    api.closeOther().then(result => alert(JSON.stringify(result)))
                    break
                case 'closePage':
                    api.closePage([window.location.href.split('#')[0]]).then(result => alert(JSON.stringify(result)))
                    break
            }
        }
    }
}
</script>
