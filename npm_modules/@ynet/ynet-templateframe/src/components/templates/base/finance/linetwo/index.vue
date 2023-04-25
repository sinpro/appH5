<template>
    <div class="template_finance_linetwo" ref="templatefinancelinetwo">
        <div class="template_finance_linetwo_container" :style="containerStyle">
            <div v-for="(itemInfo, index) in (options.styleInfoList || [])" :key="index" class="template_finance_linetwo_item" :style="itemStyle">
                <div class="template_finance_linetwo_financeTitle" :style="financeTitleStyle">{{ bDesc ? itemInfo.fieldset8: itemInfo.fieldset1}}</div>
                <div v-if="bDesc" class="template_finance_linetwo_financeDesc" :style="financeDescStyle">{{itemInfo.fieldset1}}</div>
                <div class="template_finance_linetwo_rate" :style="rateStyle">{{itemInfo.fieldset2}}</div>
                <div class="template_finance_linetwo_rateLabel" :style="rateLabelStyle">{{itemInfo.fieldset3}}</div>
            </div>
        </div>
        <div v-if="bPlaceholder" class="template_finance_linetwo_placeholder" :style="placeholderStyle"/>
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
            bDesc: false,
            bPlaceholder: false,
            containerStyle: {
                width: '100%',
                height: '102px',
                marginTop: '0',
                marginBottom: '0',
            },
            itemStyle: {
                width: '50%',
                textAlign: 'left',
                backgroundColor: 'none'
            },
            financeTitleStyle: {
                fontSize: '18px',
                marginTop: '0'
            },
            financeDescStyle: {
                fontSize: '12px',
                marginTop: '0'
            },
            rateStyle: {
                fontSize: '24px',
                marginTop: '0'
            },
            rateLabelStyle: {
                fontSize: '12px',
                marginTop: '0'
            },
            placeholderStyle: {
                borderLeft: 'none'
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

            if(this.options.isGap == '1'){
                this.bDesc = true
                this.bPlaceholder = false
                this.itemStyle.width = this.calcpxbyelem(this.$refs.templatefinancelinetwo, 375, 164) + 'px'
                this.itemStyle.textAlign = 'center'
                this.itemStyle.backgroundColor = '#FAFAFC'
                this.financeDescStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinancelinetwo, 375, 12) + 'px'
                this.financeDescStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinancelinetwo, 375, 4) + 'px'
                this.containerStyle.height = this.calcpxbyelem(this.$refs.templatefinancelinetwo, 375, 136) + 'px'
                this.containerStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinancelinetwo, 375, 16) + 'px'
                this.containerStyle.marginBottom = this.containerStyle.marginTop
            }else{
                this.bPlaceholder = true

                //分割线控制
                if(this.options.isShowLine == '1'){
                    let divstyle = 'solid'
                    let divcolor = this.options.divlineColor || '#ddd'
                    //分割线类别 0-实线，1-虚线
                    if(this.options.divlineType == '1'){
                        divstyle = 'dashed'
                    }
                    //分割线控制
                    this.placeholderStyle.borderLeft = `1px ${divstyle} ${divcolor}`
                }else{
                    this.bPlaceholder = false
                }

                this.itemStyle.width = this.calcpxbyelem(this.$refs.templatefinancelinetwo, 375, 156) + 'px'
                this.itemStyle.textAlign = 'left'
                this.containerStyle.height = this.calcpxbyelem(this.$refs.templatefinancelinetwo, 375, 102) + 'px'
            }

            this.financeTitleStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinancelinetwo, 375, 12) + 'px'
            this.rateStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinancelinetwo, 375, 20) + 'px'
            this.rateStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinancelinetwo, 375, 10) + 'px'
            this.rateLabelStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinancelinetwo, 375, 12) + 'px'
            this.rateLabelStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinancelinetwo, 375, 4) + 'px'

            this.containerStyle.width = this.calcpxbyelem(this.$refs.templatefinancelinetwo, 375, 343) + 'px'
        }
    }

}
</script>
<style scoped>
    @import '../../../reset.css';

    .template_finance_linetwo{
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: left;
    }

    .template_finance_linetwo_container{
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }

    .template_finance_linetwo_item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        letter-spacing: 1px;
    }

    .template_finance_linetwo_financeTitle{
        color: #323C41;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
    }

    .template_finance_linetwo_financeDesc{
        color: #A2A4A6;
    }

    .template_finance_linetwo_rate{
        color: #EE2039;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_finance_linetwo_rateLabel{
        color: #A2A4A6;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_finance_linetwo_placeholder{
        width: 0;
        border-left: 1px solid #DDE0E4;
        position: absolute;
        left: 50%;
        height: 100%;
        top: 0;
        opacity: 0.4;
    }

</style>
