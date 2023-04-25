<template>
    <div>
        <m-titleview title="内存数据存取">
            获取存储的内存数据/设置内存数据存储
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('getSessionStorage')">获取内存数据</m-buttonview>
            <m-buttonview @click="callApi('setSessionStorage-string')">内存存储字符串</m-buttonview>
            <m-buttonview @click="callApi('setSessionStorage-object')">内存存储对象</m-buttonview>
            <m-buttonview @click="callApi('setSessionStorage-array')">内存存储数组</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'getSessionStorage':
                    api.getSessionStorage('storekey').then(data => alert(JSON.stringify(data)))
                    break
                case 'setSessionStorage-string':
                    api.setSessionStorage('storekey', '测试字符串')
                    break
                case 'setSessionStorage-object':
                    api.setSessionStorage('storekey', {var1:'value1', var2: '值2'})
                    break
                case 'setSessionStorage-array':
                    api.setSessionStorage('storekey', [{vara:'a1', varb: '值b'}])
                    break
            }
        }
    }
}
</script>

