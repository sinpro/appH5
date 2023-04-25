<template>
    <div>
        <m-titleview title="磁盘数据存取">
            获取存储的磁盘数据/设置磁盘数据存储
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('getLocalStorage')">获取磁盘数据</m-buttonview>
            <m-buttonview @click="callApi('setLocalStorage-string')">磁盘存储字符串</m-buttonview>
            <m-buttonview @click="callApi('setLocalStorage-object')">磁盘存储对象</m-buttonview>
            <m-buttonview @click="callApi('setLocalStorage-array')">磁盘存储数组</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'getLocalStorage':
                    api.getLocalStorage('storekey').then(data => alert(JSON.stringify(data)))
                    break
                case 'setLocalStorage-string':
                    api.setLocalStorage('storekey', '测试字符串')
                    break
                case 'setLocalStorage-object':
                    api.setLocalStorage('storekey', {var1:'value1', var2: '值2'})
                    break
                case 'setLocalStorage-array':
                    api.setLocalStorage('storekey', [{vara:'a1', varb: '值b'}])
                    break
            }
        }
    }
}
</script>

