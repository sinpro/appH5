<template>
    <div class="page_main_floor">
        <div class="page_main_floor_container">
            <template-frame class="frame" v-for="(item, index) in itemList" :key="index"
                :type="item.type" :options="item.options"
                @mClick="templateSelect"
            />
        </div>
    </div>
</template>
<script>
import {TemplateFrame} from '../../../../../src/frame'
import {API} from '../../../core/service/api'

export default {
    
    components: {
        TemplateFrame
    },

    data() {
        return {
            itemList: []
        }
    },

    created () {
        this.initFloor()
    },

    methods: {

        initFloor () {
            API.getFloorList({pageType:'01'}).then(res => {
                this.itemList = this.initList(res.body)
            })
        },

        initList (data) {
            let list = data.floorInfoList || []
            let retArr = []

            //构建列表
            list.forEach((item) => {
                let floorType = item.floorType
                let styleType = item.styleType
                let type = styleType ? `${floorType}-${styleType}` : floorType
                retArr.push({type, options: item})
            })

            return retArr
        },

        templateSelect () {

        }
    }
}
</script>
<style lang="scss" scoped>
.page_main_floor{
    display: flex;
    justify-content: center;

    .page_main_floor_container{
        width: 320px;
        height: auto;
        min-height: 400px;
        position: relative;
    }
}

</style>