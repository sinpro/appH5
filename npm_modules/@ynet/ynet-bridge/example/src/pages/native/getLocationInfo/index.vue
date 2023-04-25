<template>
    <div>
        <m-titleview title="定位信息">
            获取地理位置信息，经纬度及逆地理编码城市信息。
        </m-titleview>
        <m-sectionview>
            <m-cellview title="纬度" :value="locationInfo.latitude"></m-cellview>
            <m-cellview title="经度" :value="locationInfo.longitude"></m-cellview>
            <m-cellview title="国家" :value="locationInfo.country"></m-cellview>
            <m-cellview title="省份" :value="locationInfo.administrativeArea"></m-cellview>
            <m-cellview title="城市" :value="locationInfo.locality"></m-cellview>
            <m-cellview title="区" :value="locationInfo.subLocality"></m-cellview>
            <m-cellview title="街" :value="locationInfo.thoroughfare"></m-cellview>
            <m-cellview title="详细地址" :value="locationInfo.fullAddress"></m-cellview>
            <m-buttonview @click="callApi('getLocationInfo')">获取定位信息</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            locationInfo: {}
        }
    },
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'getLocationInfo':
                    api.getLocationInfo().then(result => {
                        this.locationInfo = result
                    })
                    break
            }
        }
    }
}
</script>

