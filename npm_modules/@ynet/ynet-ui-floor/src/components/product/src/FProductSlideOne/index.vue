<template>
    <div class="tfloor_product_fproductslideone" ref="wrapper">
        <div class="tfloor_product_fproductslideone_list">
            <div class="tfloor_product_fproductslideone_container"  :style="fProductStyle" v-for="(item, index) in pList" :key="index"
                @click="linkTo(item)">
                <div class="tfloor_product_fproductslideone_item">
                    <div class="tfloor_product_fproductslideone_rate">{{item.productRate}}</div>
                    <div class="tfloor_product_fproductslideone_type">{{mapProductType[item.productType].rateDesc}}</div>
                </div>
                <div class="tfloor_product_fproductslideone_item">
                    <div class="tfloor_product_fproductslideone_name">{{item.productName}}</div>
                    <div class="tfloor_product_fproductslideone_label">
                        <span v-for="labelItem in item.labelList" :key="labelItem">{{labelItem}}</span>
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

    name: 'FProductSlideOne',

    mixins,

    props,
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
.tfloor_product_fproductslideone {
    width: 100%;
    display: flex;
    height: 120px;
    overflow: hidden;
    .tfloor_product_fproductslideone_list {
        display: flex;
        flex-wrap: nowrap;
        width: max-content;
        padding: 0px 8px;
        box-sizing: border-box;
        .tfloor_product_fproductslideone_container {
            height: 88px;
            width: 300px;
            width: max-content;
            margin: auto 8px;
            display: flex;
            align-items: center;
            padding: 0 16px;
            background-color: #FFFFFF;
            .tfloor_product_fproductslideone_item {
                .tfloor_product_fproductslideone_rate {
                    font-weight: bolder;
                    font-size: 24px;
                    color: #D62F43;
                    line-height: 28px;
                }
                .tfloor_product_fproductslideone_type {
                    margin-top: 6px;
                    font-size: 12px;
                    color: #A2A4A6;
                    line-height: 16px;
                }
                .tfloor_product_fproductslideone_name {
                    font-size: 16px;
                    color: #323C41;
                    line-height: 22px;
                    margin-bottom: 8px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .tfloor_product_fproductslideone_label {
                    display: flex;
                    span {
                        display: inline-block;
                        border: 1px solid rgba($color: #D62F43, $alpha: 0.5);
                        border-radius: 2px;
                        padding: 0 4px;
                        line-height: 16px;
                        text-align: center;
                        margin-right: 4px;
                        font-size: 11px;
                        color: #D62F43;
                    }
                }
            }
            .tfloor_product_fproductslideone_item:first-child {
                width: 110px;
                margin-right: 12px;
            }
        }
    }
    
}
</style>