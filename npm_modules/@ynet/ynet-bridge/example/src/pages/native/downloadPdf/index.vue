<template>
    <div>
        <m-titleview title="下载PDF">
            下载PDF
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('downloadPdf')">下载PDF</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'downloadPdf':
                    api.downloadPdf('http://www.baidu.com/')
                    break
            }
        }
    }
}
</script>

