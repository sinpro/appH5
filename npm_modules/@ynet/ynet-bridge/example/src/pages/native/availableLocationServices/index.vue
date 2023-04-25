<template>
    <div>
        <m-titleview title="定位权限检查">
            判断设备是否可以使用定位服务，判断是否有权限
        </m-titleview>
        <m-sectionview>
            <m-cellview title="定位权限支持" :value="(bSupport==true ? '支持' : (bSupport === false ? '不支持' : ''))"></m-cellview>
            <m-buttonview @click="callApi('availableLocationServices')">检查是否有定位权限</m-buttonview>
            <m-buttonview @click="callApi('openLocationSettings')">打开应用定位权限设置</m-buttonview>
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
                case 'availableLocationServices':
                    api.availableLocationServices().then(isLocationServicesEnabled => {
                        this.bSupport = isLocationServicesEnabled
                    })
                    break
                case 'openLocationSettings':
                    api.openLocationSettings().then(result => {
                        if(result.actionType){
                            alert('开启定位')
                        }else{
                            alert('点击取消')
                        }
                    })
                    break
            }
        }
    }
}
</script>

