<template>
    <div>
        <m-titleview title="打开城市列表">
            打开银行网点城市列表
        </m-titleview>
        <m-sectionview>
            <m-cellview title="选中的城市码" :value="cityInfo.areaCode"></m-cellview>
            <m-cellview title="选中的城市名称" :value="cityInfo.areaName"></m-cellview>
            <m-buttonview @click="callApi('pushCityListView')">打开城市列表</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            cityInfo: {}
        }
    },
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'pushCityListView':
                    api.pushCityListView({
                        areaType:1, areaMax:'2', selectedAreaList:[]
                    }).then(data => this.cityInfo = data.selectedAreaList[0])
                    break
            }
        }
    }
}
</script>

