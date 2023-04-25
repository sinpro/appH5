<template>
    <div class="tfloor_product_roundslideblock_view02" @click="fireClick(options.action, options.actionContext)">
        <div class="tfloor_product_roundslideblock_view02_wrap">
        <div class="tfloor_product_roundslideblock_view02_header">{{options.productName}}</div>
        <div class="tfloor_product_roundslideblock_view02_body">
            <div>
                <div class="tfloor_product_roundslideblock_view02_number" :style="colorStyle">
                    <div class="tfloor_product_roundslideblock_view02_trend"
                        :class="{'tfloor_product_roundslideblock_view02_trenddown': options.trend == '1'}"
                        :style="borderStyle"></div>
                    <div class="tfloor_product_roundslideblock_view02_price">
                        <span>{{options.price}}</span>
                        <div class="tfloor_product_roundslideblock_view02_pricemark">
                            <div>{{options.trendAmount}}</div>
                            <div>{{options.trendRate}}</div>
                        </div>
                    </div>
                </div>
                <div class="tfloor_product_roundslideblock_view02_pricedesc">{{options.priceDesc}}</div>
            </div>
            <div>
                <div class="tfloor_product_roundslideblock_view02_btngroup" 
                    v-if="options.btnArray && options.btnArray[0]">
                    <span class="tfloor_product_roundslideblock_view02_btn"
                        @click.stop="fireClick(options.btnArray[0].action, options.actionContext)"
                        :style="btnStyle">{{options.btnArray[0].btnTitle}}</span>
                </div>
            </div>
        </div>
        <div class="tfloor_product_roundslideblock_view02_footer">
            <div class="tfloor_product_roundslideblock_view02_label">{{options.trendRegion}}</div>
        </div>
    </div>
    </div>
</template>
<script>
import mixins from '../../../../../assets/mixins/mixins'

export default {

    mixins,

    props: {
        
        options: {
            type: Object,
            default () {
                return {}
            }
        },

        btnStyle: {
            type: Object,
            default () {
                return {}
            }
        }
    },

    methods: {

        fireClick (action, actionContext) {
            this.doEmit('mclick', {action, actionContext})
        }
    },

    computed: {

        colorStyle () {
            return {
                color: this.options.trend == '1' ? this.doParseColor('#0DB510') : this.doParseColor('#FF3A30')
            }
        },

        borderStyle () {
            return {
                borderTopColor: this.options.trend == '1' ? this.doParseColor('#0DB510') : '',
                borderBottomColor: this.options.trend == '1' ? '' : this.doParseColor('#FF3A30'),
            }
        }
    }
}
</script>
<style lang="scss">
.tfloor_product_roundslideblock_view02{
    width: 288px;
    background: #F2F2F7;
    border-radius: 8px;

    .tfloor_product_roundslideblock_view02_wrap{
        padding: 16px 16px 8px 16px;
    }

    .tfloor_product_roundslideblock_view02_header{
        font-size: 14px;
        color: #000000;
        font-weight: bold;
    }

    .tfloor_product_roundslideblock_view02_body{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 12px;
        border-bottom: 1px solid #E8E8E8;
    }

    .tfloor_product_roundslideblock_view02_number{
        display: flex;
        align-items: center;
        margin-top: 12px;
        color: #FF3A30;
    }

    .tfloor_product_roundslideblock_view02_trend{
        width: 0;
        height: 0;
        border-right: 3px solid transparent;
        border-left: 3px solid transparent;
        border-bottom: 6px solid #FF3A30;
        border-top: none;
    }

    .tfloor_product_roundslideblock_view02_trenddown{
        border-right: 3px solid transparent;
        border-left: 3px solid transparent;
        border-top: 6px solid #FF3A30;
        border-bottom: none;
    }

    .tfloor_product_roundslideblock_view02_price{
        font-weight: bold;
        font-size: 24px;
        line-height: 24px;
        position: relative;
        margin-left: 6px;
    }

    .tfloor_product_roundslideblock_view02_pricemark{
        position: absolute;
        right: -8px;
        top: 50%;
        transform: translateX(100%) translateY(-50%);
        font-weight: normal;
        font-size: 10px;
        line-height: 14px;
    }

    .tfloor_product_roundslideblock_view02_pricedesc{
        margin-top: 6px;
        font-size: 12px;
        color: #8A8A8E;
        line-height: 16px;
    }

    .tfloor_product_roundslideblock_view02_btngroup{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .tfloor_product_roundslideblock_view02_btn{
        font-size: 12px;
        color: #FFFFFF;
        text-align: center;
        line-height: 12px;
        background: #1765CA;
        border-radius: 16px;
        width: 72px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;

        &+.tfloor_product_roundslideblock_view02_btn{
            margin-left: 12px;
        }
    }

    .tfloor_product_roundslideblock_view02_footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 8px;
    }

    .tfloor_product_roundslideblock_view02_label{
        display: flex;
        font-size: 10px;
        color: #929292;
        letter-spacing: 0;
        line-height: 16px;
    }

    .tfloor_product_roundslideblock_view02_labeltext{
        margin: 0 2px;
    }

    .tfloor_product_roundslideblock_view02_desc{
        font-size: 10px;
        color: #929292;
        letter-spacing: 0;
        text-align: right;
        line-height: 16px;
    }
}
</style>