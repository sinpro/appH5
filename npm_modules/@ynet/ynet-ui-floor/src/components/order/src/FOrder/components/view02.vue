<template>
    <div class="tfloor_order_view02" @click="fireClick(options.action, options.actionContext)">
        <div class="tfloor_order_view02_wrap">
            <div class="tfloor_order_view02_header">
                <span>{{options.productName}}</span>
            </div>
            <div class="tfloor_order_view02_body">
                <div class="tfloor_order_view02_section">
                    <span class="tfloor_order_view02_info">{{options.loanAmount}}</span>
                    <span class="tfloor_order_view02_desc">{{options.loadAmountDesc}}</span>
                </div>
                <div class="tfloor_order_view02_section">
                    <span class="tfloor_order_view02_info">{{options.inComeAmount}}</span>
                    <span class="tfloor_order_view02_desc">{{options.inComeAmountDesc}}</span>
                </div>
                <div class="tfloor_order_view02_section">
                    <div class="tfloor_order_view02_btngroup">
                        <span class="tfloor_order_view02_btn"
                            v-for="(btnInfo, index) in options.btnArray"
                            :key="index"
                            :style="btnStyle"
                            @click.stop="fireClick(btnInfo.action, options.actionContext)">{{btnInfo.btnTitle}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../../assets/mixins/mixins'

export default {

    mixins,

    props: {

        btnStyle: {
            type: Object,
            default () {
                return {}
            }
        },

        options: {
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
    }
}
</script>
<style lang="scss">
.tfloor_order_view02 {
    width: 100%;
    background: #F2F2F7;
    border-radius: 10px;

    .tfloor_order_view02_wrap{
        padding: 16px;
    }

    .tfloor_order_view02_header{
        font-size: 14px;
        color: #000000;
        letter-spacing: 0;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .tfloor_order_view02_body{
        padding: 12px 0 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .tfloor_order_view02_section{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .tfloor_order_view02_info{
        font-size: 14px;
        color: #050505;
        letter-spacing: 0;
        line-height: 24px;
        font-weight: bold;
    }

    .tfloor_order_view02_desc{
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        line-height: 16px;
        margin-top: 4px;
    }

    .tfloor_order_view02_btngroup{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .tfloor_order_view02_btn{
        font-size: 12px;
        color: #1765CA;
        text-align: center;
        line-height: 12px;
        background: #FFFFFF;
        border-radius: 16px;
        width: 72px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;

        &+.tfloor_order_view02_btn{
            margin-left: 12px;
        }
    }
}
</style>