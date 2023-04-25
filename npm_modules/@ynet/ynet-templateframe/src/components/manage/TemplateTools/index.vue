<template>
    <div class="template_tools">
        <ul>
            <li v-for="tool in toolList" :key="tool.toolType" :title="tool.label" @click="toolSelect(tool)">
                <img :src="tool.logo"/>
            </li>
        </ul>
    </div>
</template>
<script>
import props from './utils/props'

export default {

    components: {
    },
    
    props: props,

    data () {
        return {
            toolList: []
        }
    },

    created () {
        let toolList = [
            {label:'设置', toolType: 'set', logo: require('./assets/icon_set_active.png')},
            {label:'上移', toolType: 'up', showType: 't_common', logo: require('./assets/icon_up.png')},
            {label:'下移', toolType: 'down', showType: 't_common', logo: require('./assets/icon_down.png')},
            {label:'删除', toolType: 'delete', logo: require('./assets/icon_delete.png')}
        ]

        this.toolList = this.initTool(toolList, this.type)
    },

    mounted () {
        
    },

    methods: {

        initTool (toolList, type) {
            let toolArr = []
            for(let i = 0; i < toolList.length; i++){
                let showType = toolList[i].showType
                if(!showType || showType.indexOf(type) != -1){
                    toolArr.push(toolList[i])
                }
            }
            return toolArr
        },

        toolSelect(tool) {
            this.$emit('toolSelect', tool.toolType)
        }
    }

}
</script>
<style scoped>
    .template_tools ul,
    .template_tools ul li{
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .template_tools ul{
        width: 30px;
        background-color: #FFFFFF;
    }

    .template_tools ul li{
        width: 100%;
        height: 28px;
        text-align: center;
        padding: 4px;
    }

    .template_tools ul li img{
        width: 20px;
        height: 20px;
    }
</style>
