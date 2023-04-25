<template>
    <div class="tfloor_imagetext_fimagetexttopbottomslidetwo" :style="fImagetextStyle">
        <div class="tfloor_imagetext_fimagetexttopbottomslidetwocontainer" ref="scrollercontainer">
            <div class="tfloor_imagetext_fimagetexttopbottomslidetwo_content">
                <div class="tfloor_imagetext_fimagetexttopbottomslidetwo_list" v-for="(item, index) in fImagetextInfo.imagetextList" :key="index" @click="linkTo(item)">
                    <img :src="item.imageUrl" class="tfloor_imagetext_fimagetexttopbottomslidetwo_img" />
                    <div class="tfloor_imagetext_fimagetexttopbottomslidetwo_text_container">
                        <div class="tfloor_imagetext_fimagetexttopbottomslidetwo_text" :style="titleStyle">{{item.title}}</div>
                        <div class="tfloor_imagetext_fimagetexttopbottomslidetwo_text" :style="descStyle">{{item.titleDes}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'
import BetterScroll from 'better-scroll'

export default {

    name: 'FImageTextTopBottomSlideTwo',

    mixins,

    props,

    computed: {
        fImagetextInfo() {
            return {
                imagetextList: this.imageTextList
            }
        },
        fImagetextStyle() {
            return {
                borderBottom: this.isBottomLine == '0' ? 'none' : '1px solid #3671F'
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
        }
    },
    mounted() {
        this.initScroll()
    },
    methods: {
        initScroll() {
            this.$nextTick(() => {
                new BetterScroll(this.$refs.scrollercontainer, {
                    scrollX: true
                })
            })
        },
        linkTo(item) {
            this.doEmit('mclick', {action: item.action, actionContext: item.actionContext})
        }
    }
}
</script>
<style lang="scss">
.tfloor_imagetext_fimagetexttopbottomslidetwo {
    width: 100%;
    .tfloor_imagetext_fimagetexttopbottomslidetwocontainer {
        height: 158px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        overflow: hidden;
    }
    .tfloor_imagetext_fimagetexttopbottomslidetwo_content{
        display: flex;
        flex-wrap: nowrap;
        padding: 0 16px;
    }
    .tfloor_imagetext_fimagetexttopbottomslidetwo_list {
        margin-left: 0;
        width: 142px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;

        &+.tfloor_imagetext_fimagetexttopbottomslidetwo_list{
            margin-left: 16px;
        }
    }
    .tfloor_imagetext_fimagetexttopbottomslidetwo_img {
        width: 142px;
        height: 94px;
        margin-bottom: 8px;
    }
    .tfloor_imagetext_fimagetexttopbottomslidetwo_text_container {
        width: 100%;
        .tfloor_imagetext_fimagetexttopbottomslidetwo_text {
            line-height: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .tfloor_imagetext_fimagetexttopbottomslidetwo_text:first-child {
            margin-bottom: 4px;
        }
    }
}
.tfloor_imagetext_fimagetexttopbottomslidetwo::-webkit-scrollbar{//隐藏滚动条
    display: none;
}
</style>