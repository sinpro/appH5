<template>
    <div class="tfloor_account">
        <div v-if="loginStatus.loginFlag!='1'" class="tfloor_account_image">
            <img :src="noLogin.imageUrl" @click="fireClick(noLogin.action)" class="tfloor_account_image"/>
        </div>
        <div v-else-if="accountList.length==0" class="tfloor_account_image">
            <img :src="noOpenAccount.imageUrl" @click="fireClick(noOpenAccount.action)" class="tfloor_account_image"/>
        </div>
        <div v-else class="tfloor_account_wrap" ref="wrapper">
            <div class="tfloor_account_content">    
                <component 
                    v-for="(accountInfo, index) in accountList"
                    :key="index"
                    :is="'view' + accountInfo.accountStyle"
                    :isMask="isMask"
                    :options="accountInfo"
                    :desc="accountDesc"
                    :btnStyle="btnStyle"
                    class="tfloor_account_item"
                    @togglemask="isMask=!isMask"
                    v-on="$listeners"/>
            </div>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'
import BScroll from 'better-scroll'
import components from './components/index.js'

export default {

    name: 'FAccount',

    mixins,

    props,

    components,

    data () {
        return {
            isMask: false
        }
    },

    mounted () {
        this.initScroller()
    },

    methods: {

        /**
         * 初始化滚动条
         */
        initScroller () {
            this.$nextTick( () => {
                if(!this.scroller){
                    this.scroller = new BScroll(this.$refs.wrapper, {
                        scrollX: true,
                        scrollY: false,
                        click: true
                    })
                }else{
                    this.scroller.refresh()
                }
            })
        },

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
.tfloor_account {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .tfloor_account_image{
        width: 343px;
        height: 112px;
    }

    .tfloor_account_wrap{
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: nowrap;
    }

    .tfloor_account_content{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: nowrap;
        font-size: 0;
        padding: 0 16px;
    }

    .tfloor_account_item{
        flex: 0 0 auto;
        margin-left: 0;
        display: inline-block;
        width: 343px;

        &+.tfloor_account_item{
            margin-left: 8px;
        }
    }
}
</style>