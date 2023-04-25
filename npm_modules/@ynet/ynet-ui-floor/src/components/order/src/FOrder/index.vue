<template>
    <div class="tfloor_order">
        <div class="tfloor_order_rect">
            <div class="tfloor_order_rect_header">
                <round-header :options="header" v-on="$listeners">
                    <div slot="preIcon" 
                        v-if="loginStatus.loginFlag=='1' && orderInfo.orderNum && orderInfo.orderNum != '0'">
                        {{orderInfo.orderNum}}</div>
                </round-header>
            </div>
            <div class="tfloor_order_rect_body">
                <div v-if="loginStatus.loginFlag!='1'">
                    <div class="tfloor_order_nolist">{{orderDesc.unLoginDesc}}</div>
                </div>
                <div v-else-if="(orderInfo.orderList || []).length==0">
                    <div class="tfloor_order_nolist">{{orderDesc.desc}}</div>
                </div>
                <div v-else>
                    <component
                        v-for="(detailInfo, index) in (orderInfo.orderList || [])"
                        :key="index"
                        :is="'view' + detailInfo.orderStyle" 
                        :options="detailInfo"
                        :btnStyle="btnStyle"
                        class="tfloor_order_item"
                        v-on="$listeners"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'
import components from './components/index.js'
import RoundHeader from '../../../../assets/components/RoundHeader/index.vue'

export default {

    name: 'FOrder',

    mixins,

    props,

    components: {
        RoundHeader,
        ...components,
    },

    methods: {

        fireClick (action, actionContext) {
            this.doEmit('mclick', {action, actionContext})
        }
    },

    computed: {

        btnStyle () {
            return {
                color: this.doParseColor(this.btnTitleColor),
                backgroundColor: this.doParseColor(this.btnBgColor)
            }
        }
    }
}
</script>
<style lang="scss">
.tfloor_order {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .tfloor_order_rect{
        width: 343px;
        background: #FFFFFF;
        border-radius: 8px;
    }

    .tfloor_order_rect_header{
        padding: 16px 16px 0 16px;
    }

    .tfloor_order_rect_body{
        padding: 16px;
    }
    
    .tfloor_order_nolist{
        width: 100%;
        height: 40px;
        font-size: 12px;
        color: #999999;
        text-align: center;
        line-height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tfloor_order_item{
        flex: 0 0 auto;
        margin-left: 0;
        display: inline-block;

        &+.tfloor_order_item{
            margin-top: 16px;
        }
    }
}
</style>