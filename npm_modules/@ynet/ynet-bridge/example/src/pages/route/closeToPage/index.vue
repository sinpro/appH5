<template>
    <div>
        <m-titleview title="关闭页面到指定页面">
            关闭到指定页面,根据url或index回退到指定的页面。
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('closeToPage')">根据索引返回1个页面</m-buttonview>
            <m-buttonview @click="callApi('closeToPage-2')">根据索引返回2个页面</m-buttonview>
            <m-buttonview @click="callApi('closeToPage-url')">根据url精准匹配返回页面</m-buttonview>
            <m-buttonview @click="callApi('closeToPage-index-data')">匹配索引携带数据返回1个页面</m-buttonview>
            <m-buttonview @click="callApi('closeToPage-url-data')">匹配url携带数据返回页面</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'closeToPage':
                    api.closeToPage(-1).then(result => alert(JSON.stringify(result)))
                    break
                case 'closeToPage-2':
                    api.closeToPage(-2).then(result => alert(JSON.stringify(result)))
                    break
                case 'closeToPage-url':
                    api.closeToPage(window.location.href).then(result => alert(JSON.stringify(result)))
                    break
                case 'closeToPage-index-data':
                    api.closeToPage(window.location.href, {a:'1',b:{dd:'我是参数'}}).then(result => alert(JSON.stringify(result)))
                    break
                case 'closeToPage-url-data':
                    api.closeToPage(window.location.href, {a:'1',b:{dd:'我是参数'}}).then(result => alert(JSON.stringify(result)))
                    break
            }
        }
    }
}
</script>
