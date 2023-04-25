<template>
    <div class="template_finance_verticallist" ref="templatefinanceverticallist">
        <ul class="template_finance_verticallist_ul">
            <li v-for="(itemInfo, index) in (options.styleInfoList || [])" :style="itemStyle" :key="index" class="template_finance_verticallist_li" :class="{'template_finance_verticallist_line':index == 0}"
                @click="$emit('mClick', itemInfo)">
                <div class="template_finance_verticallist_textBlock">
                    <div class="template_finance_verticallist_rate" :style="rateStyle">
                        {{itemInfo.fieldset2}}
                    </div>
                    <div class="template_finance_verticallist_financeTitle" :style="financeStyle">{{itemInfo.fieldset1 || itemInfo.finName}}</div>
                </div>
                <div class="template_finance_verticallist_textBlock">
                    <div class="template_finance_verticallist_rateLabel" :style="rateLabelStyle">
                        {{itemInfo.fieldset3}}
                    </div>
                    <div class="template_finance_verticallist_financeLabel" :style="financeLabelStyle" :class="{'template_finance_verticallist_financeLabelGray': options.noteType == '1'}">
                        <span v-show="itemInfo.fieldset8">{{itemInfo.fieldset8}}</span>
                        <span v-show="itemInfo.fieldset4">{{itemInfo.fieldset4}}</span>
                        <span v-show="itemInfo.fieldset7">{{itemInfo.fieldset7}}</span>
                    </div>
                </div>
            </li>
        </ul>
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
            itemStyle: {
                width: 'auto',
                height: 'auto',
                borderTop: 'none'
            },
            rateStyle: {
                width: 'auto',
                fontSize: '12px'
            },
            rateLabelStyle: {
                width: 'auto',
                fontSize: '12px'
            },
            financeStyle: {
                width: 'auto',
                fontSize: '12px'
            },
            financeLabelStyle: {
                width: 'auto',
                fontSize: '12px'
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
                this.itemStyle.borderTop = `1px ${divstyle} ${divcolor}`
            }

            this.itemStyle.width = this.calcpxbyelem(this.$refs.templatefinanceverticallist, 375, 343) + 'px'
            this.rateStyle.width = this.calcpxbyelem(this.$refs.templatefinanceverticallist, 375, 120) + 'px'
            this.rateStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceverticallist, 375, 24) + 'px'
            this.rateLabelStyle.width = this.rateStyle.width
            this.rateLabelStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceverticallist, 375, 12) + 'px'
            this.financeStyle.width = this.calcpxbyelem(this.$refs.templatefinanceverticallist, 375, 207) + 'px'
            this.financeStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceverticallist, 375, 16) + 'px'
            this.financeLabelStyle.width = this.financeStyle.width
            this.financeLabelStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceverticallist, 375, 11) + 'px'
            this.itemStyle.height = this.calcpxbyelem(this.$refs.templatefinanceverticallist, 375, 82) + 'px'
        }
    }

}
</script>
<style scoped>
    @import '../../../reset.css';

    .template_finance_verticallist{
        width: 100%;
        text-align: left;
    }

    .template_finance_verticallist_ul{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .template_finance_verticallist_li{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .template_finance_verticallist_line{
        border-top: none!important;
    }

    .template_finance_verticallist_textBlock{
        display: flex;
        justify-content: space-between;
    }


    .template_finance_verticallist_rate{
        color: #EE2039;
        transform: translateY(-20%);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_finance_verticallist_rateLabel{
        color: #A2A4A6;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: flex;
        align-items: center;
    }

    .template_finance_verticallist_financeTitle{
        color: #323C41;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_finance_verticallist_financeLabel{
        color: #EE2039;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: flex;
    }

    .template_finance_verticallist_financeLabel span{
        border: 1px solid #EB9DA6;
        padding: 1px;
        border-radius: 2px;
        margin: 0 2px;
    }

    .template_finance_verticallist_financeLabelGray{
        color: #A2A4A6;
    }

    .template_finance_verticallist_financeLabelGray span{
        border: none;
    }

</style>
