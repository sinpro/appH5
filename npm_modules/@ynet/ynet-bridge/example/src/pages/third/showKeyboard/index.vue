<template>
    <div>
        <m-titleview title="打开密码键盘">
            显示微通密码键盘，会涉及到随机密钥的RPC。在程序启动后及密码发送后，都需要调用RPC重置随机密钥。每次调用前端必须清除已输入内容
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('showKeyboard-0')">打开英文键盘</m-buttonview>
            <m-buttonview @click="callApi('showKeyboard-1')">打开数字键盘</m-buttonview>
            <m-buttonview @click="callApi('hideKeyboard')">隐藏键盘</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'showKeyboard-0':
                    api.showKeyboard({max:10, keyboardType:'0', isEncry:false, curText:'', randomKey:'', regular:''}).then(result => alert(result.action))
                    break
                case 'showKeyboard-1':
                    api.showKeyboard({max:10, keyboardType:'1', isEncry:false, curText:'', randomKey:'', regular:''}).then(result => alert(result.action))
                    break
                case 'hideKeyboard':
                    alert('键盘打开3秒后隐藏')
                    api.showKeyboard({max:10, keyboardType:'0', isEncry:false, curText:'curText', randomKey:'', regular:''})
                    setTimeout(() => {
                        api.hideKeyboard()
                    }, 3000)
                    break
            }
        }
    }
}
</script>
