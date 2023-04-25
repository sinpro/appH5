<template>
    <div>
        <m-titleview title="导航栏遮罩">
            显示/隐藏导航栏的遮罩层，用于H5显示全屏的遮罩背景，多次调用只会出现一层。
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('showMask')">显示导航栏遮罩层</m-buttonview>
            <m-buttonview @click="callApi('hideMask')">隐藏导航栏遮罩层</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'showMask':
                    api.showMask({maskColor: '#88000000'})
                    break
                case 'hideMask':
                    api.hideMask()
                    break
            }
        }
    }
}
</script>

