<template>
    <div class="tfloor_imagetext_fimagetextleftright">
        <div class="tfloor_imagetext_fimagetextleftright_container" :style="fImagetextStyle" v-for="(item, index) in fImagetextInfo.imagetextList" :key="index" @click="linkTo(item)">
            <img :src="item.imageUrl" :style="imageStyle" />
            <div class="tfloor_imagetext_fimagetextleftright_text_container" :style="fImageContainerStyle">
                <div class="tfloor_imagetext_fimagetextleftright_text" :style="titleStyle">{{item.title}}</div>
                <div class="tfloor_imagetext_fimagetextleftright_text" :style="descStyle">{{item.titleDes}}</div>
            </div>
            <img :src="fImagetextInfo.rightBtnUrl" class="tfloor_imagetext_fimagetextleftright_img" v-if="fImagetextInfo.showRightBtn"/>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'

export default {

    name: 'FImageTextLeftRight',

    mixins,

    props,

    computed: {
        imageStyle() {
            let imageWH = this.imageWH.split('*') || [80, 80];
            return {
                width: this.doCalcSize(imageWH[0]),
                height: this.doCalcSize(imageWH[1])
            }
        },
        fImagetextInfo() {
            return {
                imagetextList: this.imageTextList,
                showRightBtn: (this.isBottomLine == '0' && this.isRightBtn == '1') ? true : false,
                rightBtnUrl: this.btnImageUrl
            }
        },
        fImagetextStyle() {
            return {
                borderBottom: this.isBottomLine == '0' ? 'none' : '1px solid #3671F',
                flexDirection: this.imageOption == '0' ? 'row' : 'row-reverse',
                justifyContent: this.imageOption == '0' ? 'flex-start' : 'space-between'
            }
        },
        titleStyle() {
            return {
                fontSize: this.doCalcSize(this.titleTextSize),
                fontWeight: this.titleIsBold == '0' ? 'normol' : 'bolder',
                color: this.doParseColor(this.titleColor)
            }
        },
        descStyle() {
            return {
                fontSize: this.doCalcSize(this.desTextSize),
                fontWeight: this.desIsBlod == '0' ? 'normol' : 'bolder',
                color: this.doParseColor(this.desColor)
            }
        },
        fImageContainerStyle() {
            let pStatus = this.imageOption == '0', rightBtnStatus = ((this.isBottomLine == '0' && this.isRightBtn == '1') ? true : false);
            let imageWH = this.imageWH.split('*') || [80, 80];
            return {
                margin: `${this.doCalcSize((96 - parseInt(imageWH[1]))/2)} ${(pStatus && rightBtnStatus) ? this.doCalcSize('16') : 0} auto ${(pStatus) ? this.doCalcSize('16') : 0}`,
                maxWidth: `calc(100% - ${this.doCalcSize((pStatus && rightBtnStatus) ? 156 : 96)})`

            }
        }
    },
    methods: {
        linkTo(item) {
            this.doEmit('mclick', {action: item.action, actionContext: item.actionContext})
        }
    }
}
</script>
<style lang="scss">
.tfloor_imagetext_fimagetextleftright {
    width: 100%;
    .tfloor_imagetext_fimagetextleftright_container {
        display: flex;
        align-items: center;
        padding: 0 16px;
        box-sizing: border-box;
        width: 100%;
        height: 96px;
        .tfloor_imagetext_fimagetextleftright_img {
            width: 80px;
            height: 80px;
            margin-left: auto;
        }
        .tfloor_imagetext_fimagetextleftright_text_container {
            .tfloor_imagetext_fimagetextleftright_text {
                line-height: 16px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 20px;
            }
            .tfloor_imagetext_fimagetextleftright_text:first-child {
                margin-bottom: 8px;
                line-height: 22px;
            }
        }
    }
    
}
</style>