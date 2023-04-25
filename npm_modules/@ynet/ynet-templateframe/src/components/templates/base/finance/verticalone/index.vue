<template>
    <div class="template_finance_verticalone" ref="templatefinanceverticalone" :style="wrapStyle">
        <div class="template_finance_verticalone_container" :style="containerStyle">
            <div class="template_finance_verticalone_financeTitle" :style="financeTitleStyle">{{options.styleInfoList[0].fieldset1}}</div>
            <div class="template_finance_verticalone_rate" :style="rateStyle">
                {{options.styleInfoList[0].fieldset2}}
            </div>
            <div class="template_finance_verticalone_financeLabel" :style="financeLabelStyle">
                <span>{{options.styleInfoList[0].fieldset8}}</span>
                <span>{{options.styleInfoList[0].fieldset4}}</span>
                <span>{{options.styleInfoList[0].fieldset6}}</span>
            </div>
            <div class="template_finance_verticalone_financeButton" :style="buttonStyle" 
                @click="$emit('mClick', options.styleInfoList[0])">
                {{(options.styleInfoList[0] || {}).buttonName}}
            </div>
        </div>
    </div>
</template>
<script>
import props from '../../../props'
import mixins from '../../../mixins'

export default {
    mixins,
    props,

    data () {
        return {
            wrapStyle: {
                borderBottom: 'none'
            },
            containerStyle: {
                width: '100%',
                paddingTop: '16px',
                paddingBottom: '16px',
            },
            financeTitleStyle: {
                fontSize: '18px',
                marginTop: '0'
            },
            rateStyle: {
                fontSize: '24px',
                marginTop: '0'
            },
            financeLabelStyle: {
                fontSize: '12px',
                marginTop: '0'
            },
            buttonStyle: {
                height: '40px',
                lineHeight: '40px',
                fontSize: '16px',
                marginTop: '0',
                backgroundColor: '#3671FF'
            }
        }
    },

    created () {
    },

    mounted () {
        this.calcRect()
    },

    methods: {

        calcRect () {

            //分割线控制
            if(this.options.isShowLine == '1'){
                let divstyle = 'solid'
                let divcolor = this.options.divlineColor || '#ddd'
                //分割线类别 0-实线，1-虚线
                if(this.options.divlineType == '1'){
                    divstyle = 'dashed'
                }
                //分割线控制
                this.wrapStyle.borderBottom = `1px ${divstyle} ${divcolor}`
            }

            this.buttonStyle.backgroundColor = (this.options.styleInfoList[0] || {}).buttonBGGroud || ''

            this.containerStyle.width = this.calcpxbyelem(this.$refs.templatefinanceverticalone, 375, 343) + 'px'
            this.buttonStyle.height = this.calcpxbyelem(this.$refs.templatefinanceverticalone, 375, 40) + 'px'
            this.buttonStyle.lineHeight = this.buttonStyle.height
            this.buttonStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceverticalone, 375, 16) + 'px'
            this.buttonStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinanceverticalone, 375, 16) + 'px'
            this.rateStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceverticalone, 375, 24) + 'px'
            this.rateStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinanceverticalone, 375, 8) + 'px'
            this.financeTitleStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceverticalone, 375, 18) + 'px'
            this.financeLabelStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceverticalone, 375, 12) + 'px'
            this.financeLabelStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinanceverticalone, 375, 8) + 'px'

            this.containerStyle.paddingTop = this.calcpxbyelem(this.$refs.templatefinanceverticalone, 375, 16 + 8) + 'px'
            this.containerStyle.paddingBottom = this.calcpxbyelem(this.$refs.templatefinanceverticalone, 375, 16) + 'px'
        }
    }

}
</script>
<style scoped>
    @import '../../../reset.css';

    .template_finance_verticalone{
        width: 100%;
    }

    .template_finance_verticalone_container{
        margin: 0 auto;
    }

    .template_finance_verticalone_financeTitle{
        color: #323C41;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        text-align: center;
    }

    .template_finance_verticalone_rate{
        color: #EE2039;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
    }

    .template_finance_verticalone_financeLabel{
        color: #A2A4A6;
        margin-top: 2px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
    }

    .template_finance_verticalone_financeLabel span{
        border: none;
        padding: 1px;
        border-radius: 2px;
        margin: 0 1px;
    }

    .template_finance_verticalone_financeButton{
        width: 100%;
        background-color: #3671FF;
        color: #FFFFFF;
        text-align: center;
    }


</style>
