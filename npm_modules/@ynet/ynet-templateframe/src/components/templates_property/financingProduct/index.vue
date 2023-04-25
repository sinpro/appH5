<template>
    <div class="financingProduct__style">
        <div class="financingProduct"  v-if="styleType == '03' || styleType == '04'">
            <span>产品间距</span>
            <el-radio-group v-model="isGap" @change="changeIsGap">
                <el-radio label="0">无</el-radio>
                <el-radio label="1">有</el-radio>
            </el-radio-group>
        </div>
        <div class="cut__off__ule" v-if="(styleType == '03' && isGap == 0) || (styleType == '04' && isGap == 0) || styleType == '02' || styleType == '01' || styleType == '07'">
            <span>分割线</span>
            <el-input :disabled="!isSplitBtn" v-model="divlineColor" @change="updataOptions"></el-input>
            <div @click="isSplitBtnEvent" class="splitBtn" :class="[isSplitBtn ? 'splitBtn__active' : '']">
                <div class="splitRadio" :class="[isSplitBtn ? 'splitRadio__active' : '']"></div>
            </div>
        </div>
        <div class="financingProduct" v-if="styleType == '01'">
            <span>说明样式</span>
            <el-radio-group v-model="noteType" @change="updataOptions">
                <el-radio label="1">样式1</el-radio>
                <el-radio label="2">样式2</el-radio>
            </el-radio-group>
        </div>
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
                    <!-- <div @click="showSettings" class="edit__block">
                        <img src="../../../assets/edit1.png" alt="">
                    </div> -->
                </div>
                
            </div>
            <div class="product__message__body" v-for="(list,index) in contentList" :key="index">
                <span v-text="'产品' + (index + 1)"></span>
                <div>
                    <input
                    :placeholder="list.placeholder"
                    v-model="list.financialName"
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

        <div class="btn__style" v-if="styleType == '02'">
            <div class="btn__text">
                <span>按钮文字</span>
                <el-input type="text" v-model="btnText" @change="updataOptions"></el-input>
            </div>
            <div class="btn__background">
                <span>按钮背景</span>
                <el-input type="text" v-model="btnBackground" @change="updataOptions"></el-input>
            </div>
        </div>
        <div v-if="styleType == '07'" class="pic__content__select">
            <el-form>
                <div>
                    <el-form-item>
                        <div class="choose-img">
                            <span class="carousel__content__body__text">图标内容</span>
                            <span class="choose-size">{{imageList.length + '/' + imageList.length}}</span>
                        </div>
                        <div class="carousel__content__body" v-for="(item,index) in imageList" :key="index">
                            <div class="carousel__Specifications">
                                <div class="carousel__Specifications_image" @click="uploadImg(index)" :style="{width:'72px',height:'72px'}">
                                    <img class="showImg" :src="concatImageUrl(item.picUrl)" alt="">
                                </div>
                                <div class="arousel__peration">
                                    <el-input class="arousel__peration_input" @change="updataOptions" v-model="imageList[index].title"></el-input>
                                    <div class="arousel__peration_image">
                                        <img v-if="index>0" @click="changeImgIndexTop(index)" :src="iconUpActiveImg" alt="">
                                        <img v-if="index<imageList.length-1" @click="changeImgIndexBottom(index)" :src="iconDownStopImg" alt="">
                                        <img :src="iconDelImg" alt="" @click="delPic(index)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                </div>
            </el-form>
        </div>

        <!-- <div class="floor_save" @click="sureForRpc">楼层保存</div> -->
        <div class="floor_save" @click="sureForRpc">
                <button>楼层保存</button>
            </div>

        <el-dialog title="从理财列表中导入" :visible.sync="dialogFormVisible" :before-close="hideDialog">
            <finance-product ref="productList" @backMenu="backMenu"/>
            <div slot="footer" class="dialog-footer">
                <el-button class="btn" @click="getProductList">确定</el-button>
                <!-- <el-button class="btn">确定</el-button> -->
            </div>
        </el-dialog>

        <!-- 从右向左展示模板编辑页面侧边栏 -->
        <transition name="slideleft">
            <link-panel v-if="bSeniorOptions" :options="linkOptions" @back="linkBack"/>
        </transition>

        <div class="dialogImage">
            <el-dialog title="选择素材" :visible.sync="isShowCropper" class="cropper-box" :before-close="handleDialogClose"  :close-on-click-modal="false">
                <choose-material ref="chooseMaterial" @backImgTemplate="backImg"></choose-material>
                <div slot="footer" class="dialog-footer">
                    <el-button class="btn" @click="getCropperImgMsg">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import mixins from '../../mixins';
import { eidtMenuStyleRpc, editFloorStyleAllocation } from '../../../utils/api'
import financeProduct from '../components/popup/financeProduct'
import linkPanel from '../components/popup/linkPanel'
import chooseMaterial from '^/chooseMaterial'
export default {
    mixins,
    components: {
        financeProduct,linkPanel, chooseMaterial
    },
    data() {
        return {
            bSeniorOptions: false,
            styleType: '',
            btnText: '',
            btnBackground: '',
            divlineColor: '',
            isGap: '0',
            noteType: '1',
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

            iconlinkImg: require('../../../assets/edit1.png'),
            iconUpStopImg: require('../../../assets/up1.png'),
            iconUpActiveImg: require('../../../assets/up_active.png'),
            iconDownStopImg: require('../../../assets/down1.png'),
            iconDownActiveImg: require('../../../assets/down_no.png'),
            iconDelImg: require('../../../assets/del3.png'),

            dialogFormVisible: false,
            contentList: [],
            financialList: [],
            // productIndex: 0,
            linkOptions: {},
            // 数据更新options
            menuOptions: {},
            //图文
            imageList: [],
            isShowCropper: false
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
                case '02':
                this.heightF = '180'
                break;
                case '03':
                this.heightF = '102'
                break;
                case '04':
                this.heightF = '108'
                break;
                case '05':
                this.heightF = '104'
                break;
                case '06':
                this.heightF = '168'
                break;
                case '07':
                this.heightF = '196'
                break;
                case '01':
                this.heightF = 82 * this.contentList.length +''
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
        let options = this.currentTemplateItem.options
        console.log(options, 45454545)
        this.isGap = options.isGap
        this.divlineColor = options.divlineColor
        this.isSplitBtn = options.isShowLine == '1' ? true : false
        this.noteType = options.noteType
        
        options.styleInfoList.forEach(info => {
            this.isLoginNeeded = info.isLoginNeeded
            this.isIdNeeded = info.isIdNeeded
            this.picLinkType = info.picLinkType
            this.picLink = info.picLink
            // if(info.finId == '000000') {
            //    this.contentList = [] 
            // } else {
                if(!info.contentType || info.contentType == '3'){
                this.contentList.push({
                    financialName: info.fieldset1,
                    financialId: info.finId,
                    // financialName: info.fieldset1,
                    rate: info.fieldset2,
                    riskLevel: info.fieldset8,
                    term: parseInt(info.fieldset4),
                    // fieldset3: '年化收益率',
                    initialAmt: info.fieldset6
                    // fieldset7: '',
                    // fieldset5: ''
                })
                }else if(info.contentType == '4'){
                    this.imageList.push(info)
                }
            // }
            
            this.btnText = info.buttonName
            this.btnBackground = info.buttonBGGroud
        })
        if(this.styleType == '01') {
            this.heightF = 82 * this.contentList.length +''
        } else if (this.styleType == '02') {
            this.heightF = '180'
        } else if (this.styleType == '03') {
            this.heightF = '102'
        } else if (this.styleType == '04') {
            this.heightF = '108'
        } else if(this.styleType == '05') {
            this.heightF = '104'
        } else if(this.styleType == '06') {
            this.heightF = '168'
        } else if(this.styleType == '07') {
            this.heightF = '196'
        }
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
            // this.contentList[this.productIndex].isIdNeeded = obj.isIdNeeded
            // this.contentList[this.productIndex].isLoginNeeded = obj.isLoginNeeded
            // this.contentList[this.productIndex].picLink = obj.picLink
            // this.contentList[this.productIndex].picLinkType = obj.picLinkType
            
        },
        showPopupBlank() {
            this.bSeniorOptions = true
            // this.productIndex = i
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
        editFloorStyleAllocation() {
            let productData = {
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId,
                floorType: '08',
                floorName: '理财',
                styleType: this.styleType,
                floorIsAd: '0',
                // orderNum: '',
                isGap: this.isGap,
                isShowLine: this.isSplitBtn ? '1' : '0',
                divlineType: '0',
                divlineColor: this.divlineColor,
                noteType: this.noteType,
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
        eidtMenuStyleRpc() {
            var financialList = []
            this.contentList.forEach((item, index) => {
                let field = (item.initialAmt/10000).toFixed(1), fieldset7
                if(field.split('.')[1] > 0) {
                    fieldset7 = field
                } else {
                    fieldset7 = field.split('.')[0]
                }
                financialList.push({
                    contentType: this.styleType=='07' ? '3' : '',
                    styleType: this.styleType,
                    floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                    finId: item.financialId,
                    ordernNum: index +1,
                    finName: item.financialName,
                    fieldset1: item.financialName,
                    fieldset2: item.rate,
                    fieldset8: item.riskLevel,
                    fieldset4: item.term + '天',
                    fieldset3: '年化收益率',
                    fieldset6: item.initialAmt,
                    fieldset7: fieldset7 + '万起投',
                    fieldset5: '理财期限',
                    isIdNeeded: item.isIdNeeded,
                    isLoginNeeded: item.isLoginNeeded,
                    picLinkType: item.picLinkType,
                    picLink: item.picLink,
                    buttonName: this.btnText,
                    buttonBGGroud: this.btnBackground
                })
            })

            let graphicList = [] 
            this.imageList.forEach((imageInfo) => {
                graphicList.push({
                    styleType: this.styleType,
                    floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                    contentType: '4',
                    picUrl: imageInfo.picUrl,
                    title: imageInfo.title,
                    picHeight: '26',
                    picWidth: '26'
                })
            })

            let productStyleDate = {
                // styleName: '',
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId,
                floorType: '08',
                financialList: financialList,
                graphicList: graphicList
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
                this.heightF = 82 * this.contentList.length +''
            } else if(this.styleType == '02') {
                this.contentList = this.contentList.slice(0, 1)
            } else if(this.styleType == '03') {
                this.contentList = this.contentList.slice(0, 2)
            } else if (this.styleType == '04') {
                this.contentList = this.contentList.slice(0, 3)
            }
            console.log(this.contentList, this.heightF)
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
        isSplitBtnEvent() {
            this.isSplitBtn = !this.isSplitBtn
            this.updataOptions()
        },
        changeIsGap(val) {
            if(this.styleType == '03') {
                this.heightF = val == 1 ? '168' : '102'
            }else if(this.styleType == '04') {
                this.heightF = val == 1 ? '124' : '108'                
            }
            this.updataOptions()
        },
        // 数据面板更新data
        updataOptions() {
            var financialList = []
            this.contentList.forEach((item, index) => {
                let field = (item.initialAmt/10000).toFixed(1), fieldset7
                if(field.split('.')[1] > 0) {
                    fieldset7 = field
                } else {
                    fieldset7 = field.split('.')[0]
                }
                financialList.push({
                    contentType: this.styleType=='07' ? '3' : '',
                    styleType: this.styleType,
                    floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                    finId: item.financialId,
                    ordernNum: index +1,
                    buttonName: this.btnText,
                    buttonBGGroud: this.btnBackground,
                    finName: item.financialName,
                    fieldset1: item.financialName,
                    fieldset2: item.rate,
                    fieldset8: item.riskLevel,
                    fieldset4: item.term + '天',
                    fieldset3: '年化收益率',
                    fieldset6: item.initialAmt,
                    fieldset7: fieldset7 + '万起投',
                    fieldset5: '理财期限',
                    isIdNeeded: item.isIdNeeded,
                    isLoginNeeded: item.isLoginNeeded,
                    picLinkType: item.picLinkType,
                    picLink: item.picLink
                })
            })

            this.imageList.forEach((imageInfo) => {
                financialList.push({
                    contentType: '4',
                    picUrl: imageInfo.picUrl,
                    title: imageInfo.title
                })
            })

            this.menuOptions = {
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId,
                floorType: '08',
                floorName: '理财',
                styleType: this.styleType,
                floorIsAd: '0',
                // orderNum: '',
                isGap: this.isGap,
                isShowLine: this.isSplitBtn ? '1' : '0',
                divlineType: '0',
                divlineColor: this.divlineColor,
                noteType: this.noteType,
                status: '0',
                widthF: '375',
                heightF: this.heightF,
                styleInfoList: financialList
            }
            this.$emit('setMenuStyleOptions', this.menuOptions)
        },


        delPic(i) {
            // 清空图片
            // this.closeUpload = false
            this.imageList[i].picUrl = ''
            this.updataOptions();
        },
        handleDialogClose() {
            this.isShowCropper = false
        },
        backImg(imgArr) {
            this.imageList[this.uploadImgIndex].picUrl = imgArr[0].showSelectImg;
            this.isShowCropper = false
            this.updataOptions()
        },
        getCropperImgMsg(){
            let materialUrlList = this.$refs.chooseMaterial.getParentImage()
            console.info(this.uploadImgList)
            this.isShowCropper = false
            this.imageList[this.uploadImgIndex].picUrl=materialUrlList;
            this.imageList[this.uploadImgIndex].upbtnGroup = true
            this.updataOptions()
        },
        uploadImg(i) {
            this.uploadImgIndex = i
            this.isShowCropper=true;
        },
        changeImgIndexTop(index){
            if(index!=-1){
                this.imageList.splice(index,1,...this.imageList.splice(index-1,1,this.imageList[index]))
                this.updataOptions()
            }
        },
        toTop(index){
            let data = this.imageList[index];
            for(var i = index;i>0;i--){
                this.imageList[i]=this.imageList[i-1]
            }
            this.imageList[0]=data;
        },
        changeImgIndexBottom(index){
            if(index!=-1){
                this.imageList.splice(index,1,...this.imageList.splice(index+1,1,this.imageList[index]))
                this.updataOptions()
            }
        },
        toBottom(index){
            let data = this.imageList[index];
            for(var i = index;i<this.imageList.length-1;i++){
                this.imageList[i]=this.imageList[i+1]
            }
            this.imageList[this.imageList.length-1]=data;
        }
    }

}
</script>

<style lang="scss" scoped>
.financingProduct__style .el-dialog__header {
    display: none;
}
    .financingProduct__style {
        background: #ffffff;
        padding: 0 20px;
        // position: relative;
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
    .financingProduct__style .cut__off__ule .el-input {
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
        cursor: pointer;
        // display: flex;
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

    .financingProduct__style .splitBtn {
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

    .financingProduct__style .el-dialog {
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
    .financingProduct__style .gauge__info__palace_notice{
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

    
    .financingProduct__style div.el-dialog span.el-dialog__title {
        padding: 0;
    }

    .pic__content__select{
        .choose-img{
            position: relative;
            .carousel__content__body__text{
                font-family: MicrosoftYaHeiUI;
                font-size: 13px;
                color: #323C41;
                letter-spacing: 0;
                width: 72px;
                display:inline-block;
            }
            .choose-size{
                font-family: MicrosoftYaHeiUI;
                font-size: 12px;
                color: #CACCD2;
                line-height: 16px;
            }
            img{
                cursor: pointer;
                width: 20px;
                height: 20px;
                position: absolute;
                margin: auto;
                top:0;
                right: 0;
                bottom: 0;
            }
        }
        .carousel__content__body {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
        .carousel__content__body .carousel__content__body__text{
            font-family: MicrosoftYaHeiUI;
            font-size: 13px;
            color: #323C41;
            letter-spacing: 0;
        }
        .carousel__Specifications {
            width: 288px;
            margin-left: 72px;
            align-items: center;
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;

            .carousel__Specifications_image{
                background: #FAFAFC;

                .showImg{
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .arousel__peration{
            width: 100%;
            flex:1;
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-end;
            
            .arousel__peration_image{
                height: 32px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }

            .arousel__peration_input{
                cursor: pointer;
                display: inline-block;
            }
        }
    }
    
</style>


