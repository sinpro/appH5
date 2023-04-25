<template>
    <div>
        <m-titleview title="原生API调用">
            提供原生API调用
        </m-titleview>
        <m-sectionview>
            <m-inputview v-model="apiName" placeholder="请输入api名称"></m-inputview>
            <m-textareaview v-model="apiParams" placeholder="请输入api的参数，如 {a:'b'}"></m-textareaview>
            <m-buttonview @click="callApi">发起调用</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            apiName: '',
            apiParams: ''
        }
    },
    
    methods: {

        callApi(){
            let params 

            if(!this.apiName){
                alert('请输入API名称')
                return
            }

            if(!this.apiParams){
                alert('请输入API参数')
                return
            }

            try{
                params = JSON.parse(this.apiParams)
            }catch(e){
                alert('API参数非有效JSON字符串：' +  e.message)
                return
            }

            api.ready(() => {
                AlipayJSBridge.call(this.apiName, params, (res) => {
                    alert(JSON.stringify(res))
                })
            })
        }
    }
}
</script>
