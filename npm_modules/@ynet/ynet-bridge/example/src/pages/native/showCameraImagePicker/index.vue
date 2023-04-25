<template>
    <div>
        <m-titleview title="打开相册/拍照">
            打开相册和拍照选择的actionsheet
        </m-titleview>
        <m-sectionview>
            <m-imageview :src="imageInfo.imgBase64Data"></m-imageview>
            <m-buttonview @click="callApi('showCameraImagePicker')">打开相册/拍照</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            imageInfo: {}
        }
    },
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'showCameraImagePicker':
                    api.showCameraImagePicker().then(result => this.imageInfo = result)
                    break
            }
        }
    }
}
</script>

