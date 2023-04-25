<template>
    <div>
        <m-titleview title="剪贴板">
            复制字符串到手机系统剪切板。
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('copyToClipboard')">复制字符串到剪切板</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'copyToClipboard':
                    api.copyToClipboard('我是复制内容').then(result => {
                        alert('复制成功')
                    })
                    break
            }
        }
    }
}
</script>

