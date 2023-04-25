<template>
    <div>
        <m-titleview title="人脸识别">
            调起Face++人脸识别。
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('openFaceRecognition')">开始人脸识别</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'openFaceRecognition':
                    api.openFaceRecognition({idcard_name: '王欢', idcard_number: '420114198810182810'}).then(result => {
                        if(result.identification_reslut == '0'){
                            alert('识别成功')
                        }else{
                            alert('识别失败')
                        }
                    }, result => {
                        alert(result.errorMessage)
                    })
                    break
            }
        }
    }
}
</script>
