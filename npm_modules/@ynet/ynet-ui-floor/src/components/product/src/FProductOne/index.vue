<template>
    <div class="tfloor_product_fproductone">
        <div class="tfloor_product_fproductone_container" v-for="(item, index) in pList" :key="index">
            <div class="tfloor_product_fproductone_name">{{item.productName}}</div>
            <div class="tfloor_product_fproductone_rate">{{item.productRate}}</div>
            <div class="tfloor_product_fproductone_label"><span v-for="labelItem in item.labelList" :key="labelItem">{{labelItem}}</span></div>
            <div class="tfloor_product_fproductone_btn" :style="productStyle" @click="linkTo(item)">{{btnName}}</div>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'

export default {

    name: 'FProductOne',

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
        productStyle() {
            return {
                backgroundColor: this.doParseColor(this.btnBgColor)
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
.tfloor_product_fproductone {
    width: 100%;
    background: #fff;
    .tfloor_product_fproductone_container {
        height: 180px;
        padding: 16px;
        text-align: center;
        box-sizing: border-box;
        .tfloor_product_fproductone_rate {
            font-weight: bolder;
            font-size: 24px;
            color: #D62F43;
            line-height: 28px;
            margin: 8px auto;
        }
        .tfloor_product_fproductone_type {
            margin-top: 6px;
            font-size: 12px;
            color: #A2A4A6;
            line-height: 16px;
        }
        .tfloor_product_fproductone_name {
            font-size: 18px;
            color: #323C41;
            line-height: 24px;
            font-weight: bolder;
            margin-bottom: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .tfloor_product_fproductone_label {
            display: flex;
            justify-content: center;
            span {
                border-right: 1px solid #A2A4A6;
                font-size: 12px;
                color: #A2A4A6;
                text-align: center;
                line-height: 16px;
                padding: 0 4px;
            }
            span:last-child {
                border: none;
            }
        }
        .tfloor_product_fproductone_btn {
            margin-top: 16px;
            width: 343px;
            line-height: 40px;
            color: #FFFFFF;
            font-size: 16px;
            font-weight: bolder;
            cursor: pointer;
        }
    }
}
</style>