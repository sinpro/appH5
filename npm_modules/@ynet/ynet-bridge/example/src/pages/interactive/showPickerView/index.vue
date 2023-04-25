<template>
    <div>
        <m-titleview title="数据选择器">
            显示数据选择器，风格上与iOS的时间选择器类似。目前只支持2.1中入参格式的三级联动选择
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('showPickerView')">显示数据选择框</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'showPickerView':
                    api.showPickerView({
                        defaultValue: [
                            { name: '浙江省', value: '001' },
                            { name: '杭州市', value: '001001' },
                            { name: '拱墅区', value: '001001001' },
                        ],

                        dataSource:[
                            {
                            name: '浙江省',
                            value: '001',
                            children: [
                                {
                                name: '杭州市',
                                value: '001001',
                                children: [
                                    { name: '拱墅区', value: '001001001', children: [] },
                                    { name: '西湖区', value: '001001002', children: [] },
                                ],
                                },
                                {
                                name: '湖州市',
                                value: '001002',
                                children: [
                                    { name: '南浔区', value: '001002001', children: [] },
                                    { name: '吴兴区', value: '001002002', children: [] },
                                ],
                                },
                            ],
                            },
                        ],
                        }
                    ).then(result => {
                        if(result.actionType == '0'){
                            alert('您已取消')
                        }else{
                            let resultArr = []
                            for(let i = 0; i < result.result.length; i++){
                                resultArr.push(result.result[i].name)
                            }
                            console.log(result)
                            alert('您选择了：' + resultArr.join(','))
                        }
                    })
                    break
            }
        }
    }
}
</script>

