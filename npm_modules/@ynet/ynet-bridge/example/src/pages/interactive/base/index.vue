<template>
    <div>
        <m-titleview title="基础交互">
            基础交互（提示框、确认框、加载中、提示输入框）
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('alertEx-0')">提示框</m-buttonview>
            <m-buttonview @click="callApi('alertEx-1')">确认框</m-buttonview>
            <m-buttonview @click="callApi('showInputAlert')">提示输入框</m-buttonview>
            <m-buttonview @click="callApi('showLoading')">显示加载中</m-buttonview>
            <m-buttonview @click="callApi('hideLoading')">隐藏加载中</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'alertEx-0':
                    api.alert('您好')
                    break
                case 'alertEx-1':
                    api.confirm('您好').then((result) => {
                        if(result.ok){
                            alert('点击了确定')
                        }else {
                            alert('点击了取消')
                        }
                    })
                    break
                case 'showInputAlert':
                    api.showInputAlert({
                        title:'备注', message:'请输入备注', presetInputContent:'000', placeholder:'请输入备注', 
                        okButton:'确定',cancelButton:'取消',wordsNumLimit:'10',keyboardType:'DefaultPad',clickBgToHide: false
                    }).then((result) => {
                        if(result.ok){
                            alert('点击了确定')
                        }else {
                            alert('点击了取消')
                        }
                    })
                    break
                case 'showLoading':
                    api.showLoading()
                    break
                case 'hideLoading':
                    alert('加载中3秒后自动关闭')
                    api.showLoading()
                    setTimeout(() => {
                        api.hideLoading()
                    }, 3000)
                    break
                case 'showToast':
                    api.showToast('提示信息')
                    break
            }
        }
    }
}
</script>

