<template>
    <div>
        <m-titleview title="打开第三方地图导航APP">
            显示已安装的第三方地图（系统地图，高德地图，百度地图，腾讯地图）的选项，跳转并开始导航，起点为当前位置
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('openNavigationApp')">打开第三方地图导航</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'openNavigationApp':
                    api.openNavigationApp({
                        name:'北京市', latitude:'29.5703930000', longitude:'106.5727140000'
                    }).then(data => alert(JSON.stringify(data)), result => alert(result.errorMessage))
                    break
            }
        }
    }
}
</script>

