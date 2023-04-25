<template>
    <div class="tfloor_product_fproductthree" :style="fProductStyle">
        <div class="tfloor_product_fproductthree_container" v-for="(item, index) in pList" :key="index"
            @click="linkTo(item)">
            <div class="tfloor_product_fproductthree_name">{{item.productName}}</div>
            <div class="tfloor_product_fproductthree_rate">{{item.productRate}}</div>
            <div class="tfloor_product_fproductlist_type">{{mapProductType[item.productType].rateDesc}}</div>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'

export default {

    name: 'FProductThree',

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
                borderBottom: this.divider == '1' ? `1px solid ${this.doParseColor(this.dividerColor)}` : 'none'
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
.tfloor_product_fproductthree {
    width: 100%;
    display: flex;
    .tfloor_product_fproductthree_container {
        width: 33.3%;
        height: 108px;
        padding: 16px;
        text-align: center;
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: inset 1px 0 0 0 #DDE0E4;
        .tfloor_product_fproductthree_rate {
            font-weight: bolder;
            font-size: 20px;
            color: #D62F43;
            line-height: 24px;
            margin: 16px auto 4px auto;
        }
        .tfloor_product_fproductthree_type {
            font-size: 12px;
            color: #A2A4A6;
            line-height: 16px;
        }
        .tfloor_product_fproductthree_name {
            font-size: 14px;
            color: #323C41;
            line-height: 16px;
            font-weight: bolder;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>