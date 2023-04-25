<template>
    <div>
        <m-titleview title="中文转大写拼音">
            中文转大写拼音
        </m-titleview>
        <m-sectionview>
            <m-cellview title="拼音" :value="pinyin" @valueClick="showToast"></m-cellview>
            <m-buttonview @click="callApi('chinese2MandarinLatin')">中文转大写拼音</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            pinyin: ''
        }
    },
    
    methods: {

        showToast (event) {
            api.showToast(event.value)
        },

        callApi(casename){
            switch(casename){
                case 'chinese2MandarinLatin':
                    api.chinese2MandarinLatin('转账汇款').then(result => {
                        this.pinyin = result.resultString
                    })
                    break
            }
        }
    }
}
</script>

