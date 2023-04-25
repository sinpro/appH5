<template>
    <div>
        <m-titleview title="时间日期选择器">
            显示iOS风格的时间选择器
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('showDatePicker-0')">显示日期选择框</m-buttonview>
            <m-buttonview @click="callApi('showDatePicker-1')">显示时间选择框</m-buttonview>
            <m-buttonview @click="callApi('showDatePicker-2')">显示日期时间选择框</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
 
    methods: {

        callApi(casename){
            switch(casename){
                case 'showDatePicker-0':
                    api.showDatePicker({
                        type:'0', title:'title', minimumDate:'2019-01-01', maximumDate:'2020-01-01', 
                        currentDate:'2019-07-14', dateFormat:'YYYY-MM-DD'
                    }).then(result => {
                        if(result.actionType == '0'){
                            alert('您已取消')
                        }else{
                            alert(`选择日期：${result.currentDate}`)
                        }
                    })
                    break
                case 'showDatePicker-1':
                    api.showDatePicker({
                        type:'1', title:'title', minimumDate:'05:00', maximumDate:'12:00', 
                        currentDate:'10:18', dateFormat:'HH:mm'
                    }).then(result => {
                        if(result.actionType == '0'){
                            alert('您已取消')
                        }else{
                            alert(`选择日期：${result.currentDate}`)
                        }
                    })
                    break
                case 'showDatePicker-2':
                    api.showDatePicker({
                        type:'2', title:'title', minimumDate:'2019-01-01 00:00', maximumDate:'2020-01-01 00:00', 
                        currentDate:'2019-07-14 18:18', dateFormat:'YYYY-MM-DD HH:mm'
                    }).then(result => {
                        if(result.actionType == '0'){
                            alert('您已取消')
                        }else{
                            alert(`选择日期：${result.currentDate}`)
                        }
                    })
                    break
            }
        }
    }
}
</script>

