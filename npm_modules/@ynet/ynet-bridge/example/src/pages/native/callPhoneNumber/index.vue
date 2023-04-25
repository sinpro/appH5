<template>
    <div>
        <m-titleview title="拨打电话">
            拨打电话
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('callPhoneNumber')">拨打电话</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    methods: {

        callApi(casename){
            switch(casename){
                case 'callPhoneNumber':
                    api.callPhoneNumber('15068714343')
                    break
            }
        }
    }
}
</script>

