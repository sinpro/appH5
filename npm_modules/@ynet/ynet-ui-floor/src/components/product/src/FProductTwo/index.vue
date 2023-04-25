<template>
    <div class="tfloor_product_fproducttwo" :style="fProductStyle">
        <div class="tfloor_product_fproducttwo_container" v-for="(item, index) in pList" :key="index"
            @click="linkTo(item)">
            <div class="tfloor_product_fproducttwo_name">{{item.productName}}</div>
            <div class="tfloor_product_fproducttwo_rate">{{item.productRate}}</div>
            <div class="tfloor_product_fproductlist_type">{{mapProductType[item.productType].rateDesc}}</div>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'

export default {

    name: 'FProductTwo',

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
.tfloor_product_fproducttwo {
    width: 100%;
    display: flex;
    .tfloor_product_fproducttwo_container {
        width: 50%;
        height: 102px;
        padding: 16px;
        text-align: left;
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: inset 1px 0 0 0 #DDE0E4;
        .tfloor_product_fproducttwo_rate {
            font-weight: bolder;
            font-size: 20px;
            color: #D62F43;
            line-height: 24px;
            margin: 10px auto 4px auto;
        }
        .tfloor_product_fproducttwo_type {
            font-size: 12px;
            color: #A2A4A6;
            line-height: 16px;
        }
        .tfloor_product_fproducttwo_name {
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