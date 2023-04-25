<template>
    <div class="template_finance_verticaloneimagetext" ref="templatefinanceverticaloneimagetext" :style="wrapStyle">
        <div @click="$emit('mClick', (iFinanceList[0] || {}))" class="template_finance_verticaloneimagetext_container" :style="containerStyle">
            <div class="template_finance_verticaloneimagetext_financeTitle" :style="financeTitleStyle">{{(iFinanceList[0] || {}).fieldset1}}</div>
            <div class="template_finance_verticaloneimagetext_rate" :style="rateStyle">
                {{(iFinanceList[0] || {}).fieldset2}}
            </div>
            <div class="template_finance_verticaloneimagetext_financeLabel" :style="financeLabelStyle">
                <span>{{(iFinanceList[0] || {}).fieldset3}}</span>
            </div>
            <div class="template_finance_verticaloneimagetext_lineplaceholder" :style="linePlaceholderStyle"/>
            <div class="template_finance_verticaloneimagetext_financeImage" :style="imageConStyle">
                <div :style="{width: ((100/iImageList.length) + '%')}" class="template_finance_verticaloneimagetext_imageInfo" v-for="(imageInfo, index) in iImageList" :key="index">
                    <imageview :src="imageInfo.picUrl" :style="imageStyle"/>
                    <span class="template_finance_verticaloneimagetext_icontitle" :style="iconTitleStyle">{{imageInfo.title}}</span>
                </div>
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
                borderBottom: 'none',
                padding: '0'
            },
            containerStyle: {
                width: '100%',
                paddingTop: '16px',
                paddingBottom: '16px'
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
                marginTop: '0',
                marginBottom: '0'
            },
            imageConStyle: {
                fontSize: '16px',
                marginTop: '0'
            },

            iFinanceList: [],
            iImageList: [],
            imageStyle: {
                width: 'auto',
                height: 'auto'
            },
            iconTitleStyle:{
                fontSize: '14px',
                marginTop: '0'
            },
            linePlaceholderStyle: {
                margin: '0'
            }
        }
    },

    created () {
    },

    mounted () {
        this.divideList()
        this.calcRect()
    },

    methods: {

        divideList () {
            let styleInfoList = this.options.styleInfoList || []
            let iFinanceList = []
            let iImageList = []
            styleInfoList.forEach((styleInfo) => {
                if(styleInfo.contentType == '3') iFinanceList.push(styleInfo)
                if(styleInfo.contentType == '4') iImageList.push(styleInfo)
            })

            this.iFinanceList = iFinanceList
            this.iImageList = iImageList
        },

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

            this.containerStyle.width = this.calcpxbyelem(this.$refs.templatefinanceverticaloneimagetext, 375, 343) + 'px'
            this.imageStyle.width = this.calcpxbyelem(this.$refs.templatefinanceverticaloneimagetext, 375, 26) + 'px'
            this.imageStyle.height = this.imageStyle.width

            this.imageConStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceverticaloneimagetext, 375, 16) + 'px'
            this.imageConStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinanceverticaloneimagetext, 375, 16) + 'px'
            this.rateStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceverticaloneimagetext, 375, 24) + 'px'
            this.rateStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinanceverticaloneimagetext, 375, 8) + 'px'
            this.financeTitleStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceverticaloneimagetext, 375, 18) + 'px'
            this.financeLabelStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceverticaloneimagetext, 375, 12) + 'px'
            this.financeLabelStyle.marginBottom = this.calcpxbyelem(this.$refs.templatefinanceverticaloneimagetext, 375, 16) + 'px'

            this.iconTitleStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceverticaloneimagetext, 375, 14) + 'px'
            this.iconTitleStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinanceverticaloneimagetext, 375, 8) + 'px'
            this.linePlaceholderStyle.margin = '0 ' + this.calcpxbyelem(this.$refs.templatefinanceverticaloneimagetext, 375, 16) + 'px'

            this.containerStyle.paddingTop = this.calcpxbyelem(this.$refs.templatefinanceverticaloneimagetext, 375, 16) + 'px'
            this.containerStyle.paddingBottom = this.calcpxbyelem(this.$refs.templatefinanceverticaloneimagetext, 375, 16) + 'px'
            this.wrapStyle.padding = this.calcpxbyelem(this.$refs.templatefinanceverticaloneimagetext, 375, 16) + 'px 0' 
        }
    }

}
</script>
<style scoped>
    @import '../../../reset.css';

    .template_finance_verticaloneimagetext{
        width: 100%;
    }

    .template_finance_verticaloneimagetext_container{
        margin: 0 auto;
        box-shadow: 0 1px 6px 0 rgba(21,30,121,0.10);
    }

    .template_finance_verticaloneimagetext_financeTitle{
        color: #323C41;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        text-align: center;
    }

    .template_finance_verticaloneimagetext_rate{
        color: #EE2039;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
    }

    .template_finance_verticaloneimagetext_financeLabel{
        color: #A2A4A6;
        margin-top: 2px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
    }

    .template_finance_verticaloneimagetext_lineplaceholder{
        height: 1px;
        background-color: #ddd;
        transform: scaleY(0.5);
        opacity: 0.5;
    }

    .template_finance_verticaloneimagetext_financeLabel span{
        border: none;
        padding: 1px;
        border-radius: 2px;
        margin: 0 1px;
    }

    .template_finance_verticaloneimagetext_financeImage{
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .template_finance_verticaloneimagetext_imageInfo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .template_finance_verticaloneimagetext_icontitle{
        color: #A2A4A6;
    }

</style>
