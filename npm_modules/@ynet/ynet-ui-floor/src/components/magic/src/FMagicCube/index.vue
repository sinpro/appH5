<!--
    魔方组件：
        属性列表
            {String}  density       魔方密度
            {Array}   data          魔方数据
            {String}  data.x        item左顶点水平坐标
            {String}  data.y        item左顶点垂直坐标
            {String}  data.width    item宽度
            {String}  data.height   item高度
-->
<template>
    <div class="tfloor_magic_cube">
        <div class="tfloor_magic_cube_panel" :style="containerStyle" v-if="(cubeInfos.items || []).length">
            <div v-for="(cubeInfo, cubeIndex) in cubeInfos.items" :key="cubeIndex"
                :style="cubeInfo.style"
                class="tfloor_magic_cube_item" 
                @click="fireClick(cubeInfo.action)">
                <img :src="cubeInfo.content" class="tfloor_magic_cube_img"
                    :style="cubeInfo.imagestyle"/>
            </div>
        </div>
        <!--调试模式数据空才显示-->
        <div v-if="systemInfo.viewMode == 'configure' && (cubeInfos.items || []).length == 0" class="tfloor_magic_cube_none">
            <img src="../../../../assets/images/icon_magiccube_none.png" class="tfloor_magic_cube_noneimg"/>
            <span class="tfloor_magic_cube_nonetext">点击编辑魔方</span>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'

export default {

    name: 'FMagicCube',

    mixins,

    props,

    computed: {

        /**
         * 容器样式
         */
        containerStyle () {
            let height = this.cubeInfos.height

            return {
                width: '100%',
                height: height,
                marginTop: this.doCalcSize(this.pageTopBottomMargin),
                marginBottom: this.doCalcSize(this.pageTopBottomMargin)
            }
        },

        dataInfo () {
            return this.data
        },

        /**
         * 魔方密度
         */
        density () {
            let density = this.dataInfo.density || '4x4'
            return density.split(/[*.:Xx]/)
        },

        /**
         * 方块信息
         */
        cubeInfos () {
            let items = []
            let densitys = this.density || []
            let fullWidth = this.doRemoveUnit(this.doCalcSize('375'))
            //左右间距
            let pageLeftRightMargin = this.doRemoveUnit(this.doCalcSize(this.pageLeftRightMargin))
            //图片间距
            let itemMargin = parseFloat(this.doRemoveUnit(this.doCalcSize(this.itemMargin)))
            //每方格的宽高像素值
            let pxPerFrame = (parseFloat(fullWidth) + parseFloat(itemMargin) - 2*parseFloat(pageLeftRightMargin))/parseFloat(densitys[0])
            let itemList = this.dataInfo.itemList || []
            let maxHeight = 0, itemHeight = 0

            //魔方中每个元素的信息
            for(let i = 0; i < itemList.length; i++){
                let cubeInfo = itemList[i]
                
                let item = {
                    style:{
                        position: 'absolute',
                        left: this.doApplyUnit(parseFloat(pxPerFrame)*parseFloat(cubeInfo.x) - (itemMargin/2) + parseFloat(pageLeftRightMargin)),
                        top: this.doApplyUnit(parseFloat(pxPerFrame)*parseFloat(cubeInfo.y) - (itemMargin/2)),
                        width: this.doApplyUnit(parseFloat(pxPerFrame)*parseFloat(cubeInfo.width)),
                        height: this.doApplyUnit(parseFloat(pxPerFrame)*parseFloat(cubeInfo.height)),
                    },
                    imagestyle: {
                        width: this.doApplyUnit(parseFloat(pxPerFrame)*parseFloat(cubeInfo.width) - parseFloat(itemMargin)),
                        height: this.doApplyUnit(parseFloat(pxPerFrame)*parseFloat(cubeInfo.height) - parseFloat(itemMargin)),
                    },
                    content: cubeInfo.content,
                    action: cubeInfo.action
                }
                items.push(item)

                itemHeight = parseFloat(this.doRemoveUnit(item.style.top)) 
                    + parseFloat(this.doRemoveUnit(item.style.height))

                if(maxHeight < itemHeight){
                    maxHeight = itemHeight
                }
            }

            return {
                height: maxHeight == 0 ? 'auto' : this.doApplyUnit(maxHeight - itemMargin*1.5),
                items: items
            }
        }
    },

    methods: {

        fireClick (action, actionContext) {
            this.doEmit('mclick', {action, actionContext})
        }
    }
}
</script>
<style lang="scss">
.tfloor_magic_cube{
    width: 100%;
    overflow: hidden;

    .tfloor_magic_cube_panel{
        width: 100%;
        position: relative;
    }

    .tfloor_magic_cube_item{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tfloor_magic_cube_img{
        width: 100%;
        height: 100%;
    }

    .tfloor_magic_cube_none{
        font-size: 12px;
        color: #323C41;
        letter-spacing: 0;
        text-align: center;
        line-height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 146px;
    }

    .tfloor_magic_cube_noneimg{
        width: 108px;
        height: 72px;
    }

    .tfloor_magic_cube_nonetext{
        margin-top: 8px;
    }
}
</style>