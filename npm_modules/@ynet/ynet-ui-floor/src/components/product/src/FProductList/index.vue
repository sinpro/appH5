<template>
    <div class="tfloor_product_fproductlist">
        <div class="tfloor_product_fproductlist_container"  :style="fProductStyle" v-for="(item, index) in pList" :key="index"
            @click="linkTo(item)">
            <div class="tfloor_product_fproductlist_item">
                <div class="tfloor_product_fproductlist_rate">{{item.productRate}}</div>
                <div class="tfloor_product_fproductlist_type">{{mapProductType[item.productType].rateDesc}}</div>
            </div>
            <div class="tfloor_product_fproductlist_item">
                <div class="tfloor_product_fproductlist_name">{{item.productName}}</div>
                <div class="tfloor_product_fproductlist_label">
                    <span v-for="labelItem in item.labelList" :key="labelItem">{{labelItem}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'

export default {

    name: 'FProductList',

    mixins,

    props,

    methods: {
        linkTo(item) {
            this.doEmit('mclick', {action: item.action, actionContext: item.actionContext})
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
                borderBottom: this.divider == '1' ? `1px solid ${this.doParseColor(this.dividerColor)}` : 'none'
            }
        }
    }
}
</script>
<style lang="scss">
.tfloor_product_fproductlist {
    width: 100%;
    background: #fff;
    .tfloor_product_fproductlist_container {
        height: 82px;
        margin: auto 16px;
        display: flex;
        align-items: center;
        .tfloor_product_fproductlist_item {
            .tfloor_product_fproductlist_rate {
                font-weight: bolder;
                font-size: 24px;
                color: #D62F43;
                line-height: 28px;
            }
            .tfloor_product_fproductlist_type {
                margin-top: 6px;
                font-size: 12px;
                color: #A2A4A6;
                line-height: 16px;
            }
            .tfloor_product_fproductlist_name {
                font-size: 16px;
                color: #323C41;
                line-height: 22px;
                margin-bottom: 8px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .tfloor_product_fproductlist_label {
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
        .tfloor_product_fproductlist_item:first-child {
            width: 120px;
            margin-right: 16px;
        }
    }
}
</style>