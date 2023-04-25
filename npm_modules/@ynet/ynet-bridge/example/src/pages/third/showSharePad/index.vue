<template>
    <div>
        <m-titleview title="打开分享面板">
            弹出分享面板/直接分享
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('showSharePad')">打开分享面板</m-buttonview>
            <m-buttonview @click="callApi('shareTo')">直接分享</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'showSharePad':
                    api.showSharePad({
                        showShareType:'1|2|3|4',title:'砸金蛋活动', desc:'砸金蛋活动描述',content:'http://www.baidu.com', 
                        contentType:'url',thumbUrl:'https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1785611105.jpg'
                    }).then(result => alert(JSON.stringify(result)), result => {
                        alert(result.errorMessage)
                    })
                    break
                case 'shareTo':
                    api.shareTo({
                        title:'砸金蛋活动标题', desc:'砸金蛋活动描述', contentType:'url', content:'http://www.baidu.com', 
                        thumbUrl:'https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1785611105.jpg', showShareType:'1'
                    }).then(result => alert(JSON.stringify(result)))
                    break
            }
        }
    }
}
</script>
