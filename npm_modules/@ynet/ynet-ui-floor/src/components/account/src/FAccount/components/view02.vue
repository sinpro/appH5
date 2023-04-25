<template>
    <div class="tfloor_account_view02">
        <div class="tfloor_account_view02_wrap">
            <div class="tfloor_account_view02_btn" @click="fireClick(buttonInfo.action)"
                :style="btnStyle">
                <img :src="desc.add" class="tfloor_account_view02_icon"/>
                <span class="tfloor_account_view02_text" v-if="buttonInfo.btnTitle">{{buttonInfo.btnTitle}}</span>
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
        },

        desc: {
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

        buttonInfo () {
            return this.options.btnArray ? (this.options.btnArray[0] || {}) : {}
        }
    }
}
</script>
<style lang="scss">
.tfloor_account_view02 {
    width: 100%;
    background: #FFFFFF;
    border-radius: 8px;
    height: 138px;

    .tfloor_account_view02_wrap{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tfloor_account_view02_btn{
        width: 160px;
        height: 36px;
        background: #F2F2F7;
        color: #1765CA;
        border-radius: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tfloor_account_view02_icon{
        width: 16px;
        height: 16px;
    }

    .tfloor_account_view02_text{
        font-size: 16px;
        text-align: center;
        line-height: 20px;
        margin-left: 8px;
    }
}
</style>