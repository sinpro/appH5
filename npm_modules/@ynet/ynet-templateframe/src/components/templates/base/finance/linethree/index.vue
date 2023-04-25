<template>
    <div class="template_finance_linethree" ref="templatefinancelinethree">
        <div class="template_finance_linethree_container" :style="containerStyle">
            <div class="template_finance_linethree_item" :style="itemStyle">
                <div class="template_finance_linethree_financeTitle" :style="financeTitleStyle">{{options.styleInfoList[0].fieldset1}}</div>
                <div class="template_finance_linethree_rate" :style="rateStyle">{{options.styleInfoList[0].fieldset2}}</div>
                <div class="template_finance_linethree_rateLabel" :style="rateLabelStyle">{{options.styleInfoList[0].fieldset3}}</div>
            </div>
            <div v-if="bPlaceholder" class="template_finance_linethree_placeholder"/>
            <div class="template_finance_linethree_item" :style="itemStyle">
                <div class="template_finance_linethree_financeTitle" :style="financeTitleStyle">{{options.styleInfoList[1].fieldset1}}</div>
                <div class="template_finance_linethree_rate" :style="rateStyle">{{options.styleInfoList[1].fieldset2}}</div>
                <div class="template_finance_linethree_rateLabel" :style="rateLabelStyle">{{options.styleInfoList[1].fieldset3}}</div>
            </div>
            <div v-if="bPlaceholder" class="template_finance_linethree_placeholder"/>
            <div class="template_finance_linethree_item" :style="itemStyle">
                <div class="template_finance_linethree_financeTitle" :style="financeTitleStyle">{{options.styleInfoList[2].fieldset1}}</div>
                <div class="template_finance_linethree_rate" :style="rateStyle">{{options.styleInfoList[2].fieldset2}}</div>
                <div class="template_finance_linethree_rateLabel" :style="rateLabelStyle">{{options.styleInfoList[2].fieldset3}}</div>
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
            bDesc: false,
            bPlaceholder: false,
            containerStyle: {
                width: '100%',
                height: '102px',
                marginTop: '0',
                marginBottom: '0',
            },
            itemStyle: {
                width: '33.33%',
                textAlign: 'center',
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
                this.itemStyle.width = this.calcpxbyelem(this.$refs.templatefinancelinethree, 375, 104) + 'px'
                this.itemStyle.backgroundColor = '#FAFAFC'
                this.containerStyle.height = this.calcpxbyelem(this.$refs.templatefinancelinethree, 375, 92) + 'px'
                this.containerStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinancelinethree, 375, 16) + 'px'
                this.containerStyle.marginBottom = this.containerStyle.marginTop
            }else{
                this.bPlaceholder = true
                this.itemStyle.width = this.calcpxbyelem(this.$refs.templatefinancelinethree, 375, 92) + 'px'
                this.containerStyle.height = this.calcpxbyelem(this.$refs.templatefinancelinethree, 375, 108) + 'px'
            }

            this.financeTitleStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinancelinethree, 375, 12) + 'px'
            this.rateStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinancelinethree, 375, 20) + 'px'
            this.rateStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinancelinethree, 375, 10) + 'px'
            this.rateLabelStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinancelinethree, 375, 12) + 'px'
            this.rateLabelStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinancelinethree, 375, 4) + 'px'

            this.containerStyle.width = this.calcpxbyelem(this.$refs.templatefinancelinethree, 375, 343) + 'px'
        }
    }

}
</script>
<style scoped>
    @import '../../../reset.css';

    .template_finance_linethree{
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: left;
    }

    .template_finance_linethree_container{
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }

    .template_finance_linethree_item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        letter-spacing: 1px;
        padding: 2px;
    }

    .template_finance_linethree_financeTitle{
        color: #323C41;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
    }

    .template_finance_linethree_financeDesc{
        color: #A2A4A6;
    }

    .template_finance_linethree_rate{
        color: #EE2039;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_finance_linethree_rateLabel{
        color: #A2A4A6;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_finance_linethree_placeholder{
        width: 0;
        border-left: 1px solid #DDE0E4;
        opacity: 0.4;
    }

</style>
