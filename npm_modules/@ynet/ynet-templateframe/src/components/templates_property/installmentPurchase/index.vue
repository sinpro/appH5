<template>
    <div class="financingProduct__style">
        <div class="product__message">
            <div class="product__message__head">
                <span>产品</span>
                <div style="display: flex;">
                    <div class="edit__block" @click="showPopupBlank">
                        <img src="../../../assets/link_gray.png" alt="">
                    </div>
                    <div @click="dialogFormVisible = true" class="edit__block">
                        <img src="../../../assets/addPalace.png" alt="">
                    </div>
                </div>
                
            </div>
            <div class="product__message__body" v-for="(list,index) in contentList" :key="index">
                <span v-text="'产品' + (index + 1)"></span>
                <div>
                    <input
                    :placeholder="list.placeholder"
                    v-model="list.productName"
                    :disabled="true"  class="choose__product__message"/>
                    <div class="peration__product__message">
                        <!-- <img src="../../../assets/link_gray.png" @click="showPopupBlank(index)" alt=""> -->
                         <img @click="riseIndex(index!=0?index:-1)" :src="index!=0?iconToTop:iconStopTop" alt="">
                        <img @click="fallIndex(index!=contentList.length-1?index:-1)" :src="index!=contentList.length-1?iconToBottom:iconStopBottom" alt="">
                        <img @click="deleteIndex(index)" :src="iconDetele">
                    </div>
                </div>
                
                   
            </div>
            
            <div class="gauge__info__palace_notice" v-if="contentList.length == 0">暂无产品数据，请点击右上角的添加功能添加</div>
            
        </div>

        <div class="floor_save" @click="sureForRpc">
            <button>楼层保存</button>
        </div>

        <el-dialog title="从理财列表中导入" :visible.sync="dialogFormVisible" :before-close="hideDialog">
            <installment-purchase @backMenu="backMenu" ref="productList"/>
            <div slot="footer" class="dialog-footer">
                <el-button class="btn" @click="getProductList">确定</el-button>
                <!-- <el-button class="btn">确定</el-button> -->
            </div>
        </el-dialog>

        <!-- 从右向左展示模板编辑页面侧边栏 -->
        <transition name="slideleft">
            <link-panel v-if="bSeniorOptions" :options="linkOptions" @back="linkBack"/>
        </transition>
    </div>
</template>

<script>
import { eidtMenuStyleRpc, editFloorStyleAllocation } from '../../../utils/api'
import installmentPurchase from '../components/popup/installmentPurchase'
import linkPanel from '../components/popup/linkPanel'
export default {
    components: {
        installmentPurchase, linkPanel
    },
    data() {
        return {
            bSeniorOptions: false,
            styleType: '',
            btnText: '',
            btnBackground: '',
            divlineColor: '',
            isGap: 0,
            noteType: 1,
            isSplitBtn: false,
            heightF: '',
            isIdNeeded: '0',
            isLoginNeeded: '0',
            picLinkType: '1',
            picLink: '',
            iconToTop:require('../../../assets/up_active.png'),
            iconStopTop:require('../../../assets/up1.png'),
            iconToBottom:require('../../../assets/down1.png'),
            iconStopBottom:require('../../../assets/down_no.png'),
            iconDetele:require('../../../assets/del_gray.png'),
            dialogFormVisible: false,
            contentList: [],
            financialList: [],
            // 数据更新options
            menuOptions: {},
            linkOptions: {}
        }
    },
    props: {
        flag: {
            type: String,
            default: ''
        },
        currentTemplateItem: {
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
    watch: {
        flag(nval) {
            this.styleType = nval
            switch(nval) {
                case '01':
                this.heightF = '166'
                break;
                case '02':
                this.heightF = '150'
                break;
            }
        },
        currentTemplateItem(nval) {
            this.styleType = nval.subkind
        }
    },
    created() {
        this.styleType = this.currentTemplateItem.subkind ? this.currentTemplateItem.subkind : this.flag
        console.log(this.styleType, 999999999)
    },
    mounted() {
        this.heightF = '166'
        let options = this.currentTemplateItem.options
        
        options.styleInfoList.forEach(info => {

            // this.isLoginNeeded = info.isLoginNeeded
            // this.isIdNeeded = info.isIdNeeded
            // this.picLinkType = info.picLinkType
            // this.picLink = info.picLink
            if(info.finId == '000000') {
                this.contentList = []
            } else {
                this.contentList.push({
                    productName: info.fieldset1,
                    productId: info.finId
                })
            }
        })
        
        console.log(this.contentList, 88888)
    },
    methods: {
        linkBack (obj) {
            //链接值
            // Object.assign(this.setting_item, obj)
            console.log(obj)
            this.bSeniorOptions = false
            this.contentList.forEach(info => {
                info.isIdNeeded = obj.isIdNeeded
                info.isLoginNeeded = obj.isLoginNeeded
                info.picLink = obj.picLink
                info.picLinkType = obj.picLinkType
            })
        },
        showPopupBlank() {
            this.bSeniorOptions = true
            let imgGroup = this.currentTemplateItem.options.styleInfoList
            this.linkOptions = {
                isIdNeeded: imgGroup[0].isIdNeeded,
                isLoginNeeded: imgGroup[0].isLoginNeeded,
                picLink: imgGroup[0].picLink,
                picLinkType: imgGroup[0].picLinkType,
                xPicUrl:''
            }
        },
        backMenu() {
            this.dialogFormVisible = false
        },
        sureForRpc() {
            this.editFloorStyleAllocation()
            // this.eidtMenuStyleRpc()
        },
        editFloorStyleAllocation() {
            let productData = {
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId,
                floorType: '10',
                floorName: '分期',
                styleType: this.styleType,
                floorIsAd: '0',
                // orderNum: '',
                // isGap: this.isGap,
                // isShowLine: this.isSplitBtn ? '1' : '0',
                // divlineType: '0',
                // divlineColor: this.divlineColor,
                // noteType: this.noteType,
                status: '0',
                widthF: '375',
                heightF: this.heightF,
                operatorId: this.options.operatorId,
                operator: this.options.operator
            }
            editFloorStyleAllocation(productData).then(res => {
                if(res.data.body.errorCode === '0') {
                    this.eidtMenuStyleRpc()
                } else {
                    this.handleMsg(res, '楼层保存成功', '楼层保存失败')
                }
            })
        },

        handleMsg (res, sucMsg, failMsg) {
            if (res.data.body.errorCode === '0') {
                this.$notify({
                title: '成功',
                message: sucMsg,
                duration: 2000,
                type: 'success'
                })
            } else {
                this.$notify({
                title: '失败',
                message: failMsg,
                duration: 2000,
                type: 'error'
                })
            }
        },
        eidtMenuStyleRpc() {
            var financialList = []
            this.contentList.forEach((item, index) => {
                financialList.push({
                    styleType: this.styleType,
                    floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                    finId: item.productId,
                    ordernNum: index +1,
                    fieldset1: item.productName,
                    picUrl: item.productUrl,
                    fieldset2: item.productAmt + '元*' + item.productTimes + '期',
                    isIdNeeded: item.isIdNeeded,
                    isLoginNeeded: item.isLoginNeeded,
                    picLinkType: item.picLinkType,
                    picLink: item.picLink
                })
            })
            let productStyleDate = {
                // styleName: '',
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId,
                floorType: '10',
                installmentList: financialList
            }
            eidtMenuStyleRpc(productStyleDate).then(res => {
                this.handleMsg(res, '楼层保存成功', '楼层保存失败')
            })
        },
        hideDialog() {
            // this.isShowCropper = false
            this.dialogFormVisible = false
        },
        getProductList() {
            this.$refs.productList.getProductList().forEach(info => {
                this.contentList.push(info)
            })
            
            if(this.styleType == '01') {
                this.heightF = '166'
            } else {
                this.heightF = '150'
            }
            console.log(this.contentList)
            this.updataOptions()
            this.dialogFormVisible = false
        },
        //改变理财产品位置
        riseIndex(index){
            if(index!=-1){
                this.contentList.splice(index,1,...this.contentList.splice(index-1,1,this.contentList[index]))
            }
            this.updataOptions()
        },
        fallIndex(index){
            console.log('1111')
            if(index!=-1){
                this.contentList.splice(index,1,...this.contentList.splice(index+1,1,this.contentList[index]))
            }
            this.updataOptions()
        },
        deleteIndex(index){
            this.contentList.splice(index,1)
            this.updataOptions()
        },
        // 数据面板更新data
        updataOptions() {
            var financialList = []
            this.contentList.forEach((item, index) => {
                financialList.push({
                    styleType: this.styleType,
                    floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                    finId: item.productId,
                    ordernNum: index +1,
                    fieldset1: item.productName,
                    fieldset2: item.productAmt + '元*' + item.productTimes + '期',
                    picUrl: item.productUrl,
                    isIdNeeded: item.isIdNeeded,
                    isLoginNeeded: item.isLoginNeeded,
                    picLinkType: item.picLinkType,
                    picLink: item.picLink
                })
            })
            this.menuOptions = {
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId,
                floorType: '10',
                floorName: '分期',
                styleType: this.styleType,
                floorIsAd: '0',
                // orderNum: '',
                status: '0',
                widthF: '375',
                heightF: this.heightF,
                styleInfoList: financialList
            }
            this.$emit('setMenuStyleOptions', this.menuOptions)
        }
    }

}
</script>

<style lang="scss" scoped>
.financingProduct__style {
    & .el-dialog__header {
    display: none;
}
    & {
        background: #ffffff;
        padding: 0 20px;
    }
    .financingProduct span, .cut__off__ule span{
        font-family: MicrosoftYaHeiUI;
        font-size: 13px;
        color: #323C41;
        letter-spacing: 0;
    }
    .financingProduct, .cut__off__ule {
        padding-top: 20px;
        display: flex;
        align-items: center;
    }
    .financingProduct .el-radio-group {
        margin-left: 20px;
    }
    .financingProduct .el-radio-group .el-radio__label, .product__message .product__message__head span {
        font-family: MicrosoftYaHeiUI;
        font-weight: 400;
        font-size: 13px;
        color: #323C41;
        letter-spacing: 0;
    }
    .financingProduct .el-radio-group .el-radio+.el-radio {
        margin-left: 63px;
    }
    
    .cut__off__ule {
        box-shadow: inset 0 -1px 0 0 #F5F5FA;
        padding-bottom: 20px;
    }
    & .cut__off__ule .el-input {
        height: 40px;
        width: 228px;
        margin-left: 33px;
    }
    .cut__off__ule .el-input__inner {
        height: 40px;
        padding-left: 15px;
    }
    .product__message {
        padding-top: 20px;
    }
    .product__message .product__message__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .product__message .product__message__head .edit__block {
        width: 40px;
        height: 40px;
        padding: 10px;
    }
    .product__message__body {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
    }
    .product__message__body > span {
        font-family: MicrosoftYaHeiUI;
        font-size: 13px;
        color: #323C41;
    }
    .product__message__body .choose__product__message {
        width: 288px;
        height: 40px;
        background: #FAFAFC;
        border: 1px solid #DDE0E4;
        border-radius: 2px;
        padding: 0 40px 0 16px;
    }
    .peration__product__message {
        width: 288px;
        height: 40px;
        padding: 10px 0;
        padding-left: 158px;
        display: flex;
        justify-content: space-between;
    }
    .product__message__body .choose__product__message span {
        font-family: MicrosoftYaHeiUI;
        font-size: 12px;
        color: #323C41;
        line-height: 40px;
    }

    & .splitBtn {
        background: #CACCD2;
        border-radius: 1px;
        width: 32px;
        height: 2px;
        margin-left: 18px;
        position: relative;
        cursor: pointer;
    }

    .splitBtn__active {
        background: #A8D2FF;
    }

    .splitRadio{
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #CACCD2;
        position: absolute;
        left: 0px;
        top: -8px;
    }
    .splitRadio__active {
        position: absolute;
        left: 16px;
        top: -8px;
        background: #3671FF;
        transition: left 0.5 ease-in-out;
    }

    & .el-dialog {
        width: 800px;

        .el-dialog__header {
            padding: 24px 40px;

            .el-dialog__headerbtn {
                top: 26px;
                right: 40px;
            }
        }

        .el-dialog__footer {
            padding: 20px 20px 20px;
            text-align: right;
            box-sizing: border-box;
        }
        .el-button:focus, .el-button:hover {
            color: #ffffff;
            border-color: #3671FF;
            background-color: #3671FF;
        }

    }
    & .gauge__info__palace_notice{
        color: #d0d2d4;
        text-align: center;
        background: #FAFAFC;
        padding: 20px 0;
    }

    .btn__style {
        // padding: 0 20px;

        .btn__background, .btn__text {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;

            span{
                font-family: MicrosoftYaHeiUI;
                font-size: 13px;
                color: #323C41;
                letter-spacing: 0;
            }
            .el-input {
                height: 40px;
                width: 280px;
                // background: #FFFFFF;
                // border: 1px solid #DDE0E4;
                // border-radius: 2px;

                .el-input__inner {
                    height: 40px;
                    width: 280px;
                    background: #FFFFFF;
                    border: 1px solid #DDE0E4;
                    border-radius: 2px;
                }
            }
        }
    }

    .floor_save{
        margin-top: 100px;
        bottom: 65px;
        height: 75px;
        border-top: 1px solid #f1f1f1;
        right: 10px;
        padding-top: 15px;
        text-align: center;
        button{
            // background: #fff;
            height: 42px;
            width: 112px;
            border-radius: 2px;
            color: #fff;
            background: #3671FF;
            border:none;
            &:hover{
                color: #fff;
                background: #3671FF;
                border:none;
                cursor:pointer;
            }
        }
        
    }

    
    & div.el-dialog span.el-dialog__title {
        padding: 0;
    }
}

    
</style>


