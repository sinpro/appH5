<template>
    <div>
        <m-titleview title="清除webview历史">
            清除webview的历史记录。
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('clearHistory')">清除webview历史</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'clearHistory':
                    let len = history.length
                    api.clearHistory().then(() => alert(`原历史记录数${len}，现历史记录数${history.length}`))
                    break
            }
        }
    }
}
</script>
