<template>
    <div>
        <m-titleview title="检测GPS是否可用">
            判断是否开启gps，iOS下与定位权限一致
        </m-titleview>
        <m-sectionview>
            <m-cellview title="GPS是否支持" :value="(bSupport==true ? '支持' : (bSupport === false ? '不支持' : ''))"></m-cellview>
            <m-buttonview @click="callApi('availableGPS')">检查是否支持</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            bSupport: ''
        }
    },
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'availableGPS':
                    api.availableGPS().then(availableGPS => {
                        this.bSupport = availableGPS
                    })
                    break
            }
        }
    }
}
</script>

