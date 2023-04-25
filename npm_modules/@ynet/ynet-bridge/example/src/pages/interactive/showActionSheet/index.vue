<template>
    <div>
        <m-titleview title="显示选项卡">
            显示iOS风格选项卡视图
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('showActionSheet')">显示选项卡</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'showActionSheet':
                    api.showActionSheet({
                        title:'title', items:['item1','item2'], selectedIndex:1
                    }).then(result => {
                        alert('您选中的是：' + result.selectItem)
                    }, result => {
                        alert(result.errorMessage)
                    })
                    break
            }
        }
    }
}
</script>

