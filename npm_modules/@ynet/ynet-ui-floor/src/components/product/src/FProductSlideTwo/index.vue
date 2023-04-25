<template>
    <div class="tfloor_product_fproductslidetwo" ref="wrapper">
        <div class="tfloor_product_fproductslidetwo_list">
            <div class="tfloor_product_fproductslidetwo_container" :style="fProductStyle" v-for="(item, index) in pList" :key="index"
                @click="linkTo(item)">
                <div class="tfloor_product_fproductslidetwo_feature">{{mapList[item.productType]}}</div>
                <div class="tfloor_product_fproductslidetwo_name">{{item.productName}}</div>
                <div class="tfloor_product_fproductslidetwo_rate">{{item.productRate}}</div>
                <div class="tfloor_product_fproductlist_type">{{mapProductType[item.productType].rateDesc}}</div>
            </div>
        </div>
        
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'
import BetterScroll from 'better-scroll'

export default {

    name: 'FProductSlideTwo',

    mixins,

    props,
    data() {
        return {
            mapList: {
                '0000': '理财',
                '0001': '基金',
                '0002': '丁存款',
            }
        }
    },
    computed: {
        mapProductType() {
            return this.productDesc.reduce((list, curValue) => {
                list[curValue.type] = curValue.desc || {}
                return list
            }, {})
        },
        pList() {
            return this.productList || []
        },
        fProductStyle() {
            return {
                boxShadow: `0 0 ${this.doCalcSize('10')} 0 ${this.doParseColor(this.shadeColor)}`
            }
        }
    },
    mounted() {
        this.initScroll()
    },
    methods: {
        initScroll() {
            this.$nextTick(() => {
                new BetterScroll(this.$refs.wrapper, {
                    scrollX: true,
                    click: true
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
.tfloor_product_fproductslidetwo {
    width: 100%;
    display: flex;
    height: 168px;
    overflow: hidden;
    .tfloor_product_fproductslidetwo_list {
        display: flex;
        flex-wrap: nowrap;
        width: max-content;
        padding: 0px 8px;
        box-sizing: border-box;
        .tfloor_product_fproductslidetwo_container {
            width: 142px;
            height: 136px;
            padding: 16px;
            margin: 16px 8px;
            text-align: center;
            box-sizing: border-box;
            background: #FFFFFF;
            box-shadow: inset 1px 0 0 0 #DDE0E4;
            .tfloor_product_fproductslidetwo_rate {
                font-weight: bolder;
                font-size: 24px;
                color: #D62F43;
                line-height: 24px;
                margin: 16px auto 4px auto;
            }
            .tfloor_product_fproductslidetwo_type {
                font-size: 12px;
                color: #A2A4A6;
                line-height: 16px;
            }
            .tfloor_product_fproductslidetwo_name {
                color: #323C41;
                line-height: 16px;
                font-size: 12px;
                color: #A2A4A6;
                margin: 4px auto 16px auto;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .tfloor_product_fproductslidetwo_feature {
                font-weight: bolder;
                font-size: 14px;
                color: #323C41;
                line-height: 20px;
            }
        }
    }
    
}
</style>