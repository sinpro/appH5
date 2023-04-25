<template>
    <div class="tfloor_navigation_bar" :style="defaultStyle">
        <div class="tfloor_navigation_bar_status">
            <img :src="(options.statusBarStyle == '1') ? require('./assets/bar-white.png') : require('./assets/bar-black.png')" />
        </div>
        <div class="tfloor_navigation_bar_navigator" :style="containerStyle">
            <div class="tfloor_navigation_bar_navigator_placehoder"/>
            <div class="tfloor_navigation_bar_navigator_left" v-if="iLeftList.length">
                <manageview v-for="(info, index) in iLeftList" :key="index" 
                    :type="info.type" :options="info"
                    class="tfloor_navigation_bar_navigator_item" v-on="$listeners"/>
            </div>
            <div class="tfloor_navigation_bar_navigator_middle">
                <manageview v-for="(info, index) in iCenterList" :key="index" 
                    :type="info.type" :options="info"
                    class="tfloor_navigation_bar_navigator_item" v-on="$listeners"/>
            </div>
            <div class="tfloor_navigation_bar_navigator_right" v-if="iRightList.length">
                <manageview v-for="(info, index) in iRightList" :key="index" 
                    :type="info.type" :options="info"
                    class="tfloor_navigation_bar_navigator_item" v-on="$listeners"/>
            </div>
            <div class="tfloor_navigation_bar_navigator_placehoder"/>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'
import manageview from './manage/view.vue'

export default {

    name: 'FNavigationBar',

    mixins,

    props,

    components: {
        manageview
    },

    mounted () {
        this.emitFloatEvent()
    },

    methods: {

        emitFloatEvent () {
            let styleConfig = {}
            
            if(this.options.navigationBarFloat == '1'){
                styleConfig = {
                    position: 'absolute',
                    zIndex: 1000
                }
            }

            this.$emit('config', {
                type: 'style',
                config: styleConfig
            })
        },

        filterList (list = []) {
            let isLogin = this.loginStatus.loginFlag == '1'
            return list.filter(info => {
                return (isLogin && info.loginDisplay != '1') || 
                (!isLogin && info.loginDisplay != '2')
            })
        }
    },

    computed: {

        iLeftList () {
            return this.filterList(this.options.iLeftList)
        },
        
        iCenterList () {
            return this.filterList(this.options.iCenterList)
        },
        
        iRightList () {
            return this.filterList(this.options.iRightList)
        },

        defaultStyle () {
            return {
                backgroundColor: this.doParseColor(this.options.navigationBarBgColor),
            }
        },

        containerStyle () {
            let navigationBarDivideColor = this.options.navigationBarDivideColor || '#00FFFFFF'
            
            return {
                borderBottom: `1px solid ${this.doParseColor(navigationBarDivideColor)}`
            }
        }
    }
}
</script>
<style lang="scss">
.tfloor_navigation_bar{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;

    .tfloor_navigation_bar_status{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px;
    }

    .tfloor_navigation_bar_navigator{
        width: 100%;
        margin: 0 auto;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 44px;
        font-size: 16px;
    }

    .tfloor_navigation_bar_navigator_left{
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 0 0 auto;
        margin-right: 10px;
    }

    .tfloor_navigation_bar_navigator_middle{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tfloor_navigation_bar_navigator_right{
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex: 0 0 auto;
        margin-left: 10px;
    }

    .tfloor_navigation_bar_navigator_placehoder{
        flex: 0 0 auto;
        height: 100%;
        width: 16px;
    }

    .tfloor_navigation_bar_navigator_item{
        overflow: initial;

        &+.tfloor_navigation_bar_navigator_item{
            margin-left: 10px;
        }
    }
}
</style>