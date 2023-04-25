<template>
    <div class="tfloor_menu_grid_view01">
        <div class="tfloor_menu_grid_view01_palacelist" v-for="(lineList, lineIndex) in itemList" :key="lineIndex">
            <div v-for="(item, index) in lineList" :key="index" :style="itemStyle"
                class="tfloor_menu_grid_view01_palaceli" :class="{'tfloor_menu_grid_view01_palacelimini': (columnsNum <= 3)}"
                @click="fireClick(item)">
                <div class="tfloor_menu_grid_view01_palaceflag" v-if="false">{{item.s_rightFlag}}</div>
                <img class="tfloor_menu_grid_view01_palaceimage" :src="item.imageUrl || require('../../../../../assets/images/gray.jpg')"/>
                <div class="tfloor_menu_grid_view01_palacelabel">{{item.title}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../../assets/mixins/mixins'

export default {

    mixins,

    props: {

        columnsNum: {
            type: Number
        },

        itemList: {
            type: Array,
            default () {
                return []
            }
        },

        titleColor: {
            type: String,
            default: ''
        },
    },

    methods: {

        fireClick (item) {
            this.doEmit('mclick', {action: item.action, actionContext: item.actionContext})
        }
    },

    computed: {


        itemStyle () {
            return {
                width: (100/this.columnsNum + '%'),
                color: this.doParseColor(this.titleColor)
            }
        }
    }
}
</script>
<style lang="scss">
.tfloor_menu_grid_view01{
    width: 100%;
}

.tfloor_menu_grid_view01_palacelist {
    display: flex;
    width: 100%;

    &+.tfloor_menu_grid_view01_palacelist{
        margin-top: 12px;
    }
}

.tfloor_menu_grid_view01_palaceli{
    text-align: center;
    font-size: 0;
    position: relative;
}

.tfloor_menu_grid_view01_palacelimini{
    display: flex;
    justify-content: center;
    align-items: center;

    .tfloor_menu_grid_view01_palacelabel{
        margin-top: 0;
        margin-left: 4px;
        text-align: left;
        width: auto;
        max-width: 39%;
    }
}

.tfloor_menu_grid_view01_palacelabel{
    text-overflow: ellipsis;
    text-align: center;
    width: 100%;
    margin-top: 1px;
    font-size: 12px;
}

.tfloor_menu_grid_view01_palaceimage{
    display: inline-block;
    width: 36px;
    height: 36px;
}

.tfloor_menu_grid_view01_palaceflag{
    position: absolute;
    right: 0;
    top: 0;
    display: block;
    padding: 2px;
    background: red;
    color: white;
    max-width: 100%;
    transform: scale(0.8, 0.8);
    font-size: 12px;
    height: 14px;
    line-height: 8px;
}
</style>