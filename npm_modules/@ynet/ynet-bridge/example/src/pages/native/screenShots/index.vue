<template>
    <div>
        <m-titleview title="截屏">
            调用截屏功能，包括普通全屏截屏、WebView截屏、WebView长图截屏等。
        </m-titleview>
        <m-sectionview>
            <m-imageview :src="imageResult0"></m-imageview>
            <m-buttonview @click="callApi('screenShots-0')">截全面屏</m-buttonview>
            <m-imageview :src="imageResult1"></m-imageview>
            <m-buttonview @click="callApi('screenShots-1')">截WebView屏</m-buttonview>
            <m-imageview :src="imageResult2"></m-imageview>
            <m-buttonview @click="callApi('screenShots-2')">截WebView长图屏</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            imageResult0: '',
            imageResult1: '',
            imageResult2: ''
        }
    },
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'screenShots-0':
                    api.screenShots('0').then(result => this.imageResult0 = result.imageResult)
                    break
                case 'screenShots-1':
                    api.screenShots('1').then(result => this.imageResult1 = result.imageResult)
                    break
                case 'screenShots-2':
                    api.screenShots('2').then(result => this.imageResult2 = result.imageResult)
                    break
            }
        }
    }
}
</script>

