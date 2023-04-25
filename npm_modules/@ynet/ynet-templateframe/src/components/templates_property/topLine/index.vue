<template>
    <div class="topLine__style">
        <div class="topLine">
            <div class="carousel__content__body" v-if="styleType !== '01'">
                <!-- <div style="display: flex;position: relative;">
                    <span class="carousel__content__body__text">头条图标</span>
                    <div class="carousel__Specifications" v-text="placeholdertext">
                    </div>
                    <img src="../../../assets/add1.png" alt="" class="positionImg"/>
                    <img class="showImg" :src="uploadImgList[0].picUrl" alt="" v-if="uploadImgList[0].upbtnGroup">
                    <input id="file" @change="uploadImg($event)" type="file" class="file" :disabled="closeUpload">
                </div>
                <div class="arousel__peration" @click="delImgList" v-if="uploadImgList[0].upbtnGroup">
                    <img src="../../../assets/del1.png" alt="">
                </div> -->
                <div style="display: flex">
                    <span class="carousel__content__body__text">头条图标</span>
                    <div class="carousel__Specifications" style="margin-left:0">
                        <span style="margin-left:0px">{{placeholdertext}}</span>
                        <img class="showImg" src="../assets/add.png" alt=""  @click="handleClick(36,36,2)">
                        <!-- <input id="file" @change="uploadImg($event,imgName.width1,imgName.height1)" type="file" class="file"> -->
                    </div>
                </div>
                <div style="position: relative; " v-if="!uploadImgList[0].upbtnGroup">
                    <img :src="concatImageUrl(uploadImgList[0].picUrl)" v-if="!uploadImgList[0].upbtnGroup" @click="handleClick(36,36,2)" @mouseover="showbottomSilde = true" @mouseout="showbottomSilde=false" :style="{width: '80px',marginLeft: '72px',marginTop: '16px',verticalAlign:'bottom'}"/>
                    <div class="arousel__peration" v-if="showbottomSilde" @mouseover="showbottomSilde = true" @mouseout="showbottomSilde=false">
                        <!-- <img src="../../../assets/edit1.png" alt="" @click="showMenuSetting"> -->
                        <img src="../../../assets/del1.png" alt="" @click="uploadImgList = [{picUrl: '', upbtnGroup: true}];showbottomSilde=false;updateOptions()">
                    </div>
                </div>
            </div>
            <!-- <div class="cut__off__ule" v-if="styleType == '02'">
                <span>类型颜色</span>
                <el-input :disabled="!isSplitBtn" v-model="color" @change="updateOptions"></el-input>
                <div @click="isSplitBtnEvent" class="splitBtn" :class="[isSplitBtn ? 'splitBtn__active' : '']">
                    <div class="splitRadio" :class="[isSplitBtn ? 'splitRadio__active' : '']"></div>
                </div>
            </div> -->
        </div>
        <div  class="middle" v-if="styleType !== '04'">
            <div class="slideType" v-if="styleType !== '04'">
                <span  style="font-family: MicrosoftYaHeiUI;
    color: #323C41;
    font-size: 13px;">头条类型</span>
                <div @click="isSplitBtnEvent" class="splitBtn" :class="[isSplitBtn ? 'splitBtn__active' : '']">
                    <div class="splitRadio" :class="[isSplitBtn ? 'splitRadio__active' : '']"></div>
                </div>
            </div>
            <div class="cut__off__ule" v-if = "isSplitBtn">
                <span style="font-family: MicrosoftYaHeiUI;
    color: #323C41;
    font-size: 13px;">类型颜色</span>
                <el-input :disabled="!isSplitBtn" v-model="color" @change="updateOptions"></el-input>
                <el-color-picker v-model="color" @change="updateOptions" :disabled="!isSplitBtn"></el-color-picker>
                <div @click="isSplitBtnEvent" class="splitBtn" :class="[isSplitBtn ? 'splitBtn__active' : '']">
                    <div class="splitRadio" :class="[isSplitBtn ? 'splitRadio__active' : '']"></div>
                </div>
            </div>
        </div>
        <div class="oncrete__attributes">
            <div class="gauge__content__head" style="height:36px">
                <span class="gauge__content__head__text">头条内容</span>
                <div class="gauge__head__right" @click="addTopLine">
                    <div class="icon__box"><img class="edit" src="../../../assets/addPalace.png" alt=""></div>
                </div>
            </div>
            <div class="gauge__content__body" v-for="(item, i) in topLineList" :key="i">
                <span class="guage__text" v-text="'头条' + (i+1)"></span>
                <div class="gauge__input">
                    <el-input v-model="item.fieldset1" @change="updateOptions"></el-input>
                    <el-input v-model="item.instructions" @change="updateOptions"></el-input>
                    <div class="edit__icon">
                        <img src="../../../assets/edit3.png" @click="showMenuSetting(item, i)" alt="">
                        <img src="../../../assets/del3.png" @click="delTopLine(i)" alt="">
                    </div>
                </div>
            </div>
            <div class="gauge__info__palace_notice" v-if="topLineList.length == 0">暂无头条数据，请点击右上角的添加按钮添加</div>
            <!-- <div class="floor_save" @click="sureForRpc">楼层保存</div> -->
            <div class="floor_save" >
                <button @click="sureForRpc">楼层保存</button>
            </div>
        </div>

        <!-- 从右向左展示模板编辑页面侧边栏 -->
        <transition name="slideleft">
            <link-panel v-if="isShowMt" :options="linkOptions" @back="linkBack"/>
        </transition>

        <div class="dialogImage">
            <el-dialog title="选择素材" width="800px" :visible.sync="isShowMaterial" class="cropper-box" :before-close="handleDialogCloseMaterial"  :close-on-click-modal="false">
                <choose-material ref="chooseMaterial" :imgOption="size" @backImgTemplate="backImg"></choose-material>
                <div slot="footer" class="dialog-footer">
                    <el-button class="btn" @click="confirm">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { editFloorStyleAllocation, eidtMenuStyleRpc } from '../../../utils/api'
import { API } from '~/config/api'
import cropper from '../../common/cropper'
import { getCookie } from '../../../../../utils/cookie'
import chooseMaterial from '^/chooseMaterial'
import linkPanel from '../components/popup/linkPanel'
import mixins from '../../mixins.js'
import linkConfig from '../../../config/linkConfig'
export default {
    mixins,
    components: {
        cropper,
        chooseMaterial,
        linkPanel
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
            if(nval == '02') {
                this.placeholdertext = '36x36@2x'
            } else {
                this.placeholdertext = '20x20@2x'
            }
            this.color = ''
            this.styleType = nval
        },
        currentTemplateItem(nval) {
            this.styleType = nval.subkind
        },
        styleType() {
            if(this.styleType == '02'){
                this.placeholdertext = '36x36@2x'
            }
        }
        
    },
    data() {
        return {
            linkOptions:{},
            styleType: '', // 样式类型
            isShowCropper: false, // 显示裁剪框
            cropwidth: null,
            cropheight: null,
            imgType: '',
            imgName: '',
            cropperImgUrl: '',
            isDisabled: false,
            closeUpload: false,
            uploadImgList: [{picUrl: '', upbtnGroup: false}],
            labelWidth: '72px',
            color: '',
            isSplitBtn: false,
            topLineNum: 0,
            topLineList: [],
            linkType: 1,
            linkAdress: '',
            isLogin: 0,
            isNeedId: 0,
            isShowMt: false,
            headLineList: [],
            topLineIndex: 0,
            placeholdertext: '20x20@2x',
            // 传递options数据给样式面板
            menuOptions: {},
            isShowMaterial: false,
            size: [],
            showbottomSilde: false,
            // contentType: ''
        }
    },
    created() {
        this.styleType = this.currentTemplateItem.subkind ? this.currentTemplateItem.subkind : this.flag
        this.isSplitBtn = this.currentTemplateItem.options.isGap == '1'
        this.color = this.currentTemplateItem.options.color
        this.uploadImgList[0].picUrl = this.currentTemplateItem.options.picUrl
        if(this.currentTemplateItem.options.picUrl) {
            this.uploadImgList[0].upbtnGroup = true
        }
        this.topLineNum = this.currentTemplateItem.options.styleInfoList.length
        if(this.currentTemplateItem.options.styleInfoList.length == 0) {
            this.topLineList = []
        } else {
            
            this.currentTemplateItem.options.styleInfoList.forEach((ele, i)=> {
                this.topLineList.push({
                    contentType: '1',
                    instructions: ele.instructions,
                    fieldset1: ele.fieldset1,
                    styleName: '头条',
                    styleType: ele.styleType || this.styleType,
                    // contentType: '1',
                    // instructions: this.topLineList[this.topLineIndex].instructions,
                    picLink: ele.picLink || this.linkAdress,
                    // floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                    floorId: ele.floorId || this.options.floorId || this.currentTemplateItem.options.floorId,
                    ordernNum: ele.ordernNum || (i +1),
                    picLinkType: ele.picLinkType || this.linkType,
                    isLoginNeeded: ele.isLoginNeeded || this.isLogin,
                    isIdNeeded: ele.isIdNeeded || this.isNeedId,
                })
            });
        }
        
    },
    methods: {
        backImg(imgArr) {
            this.uploadImgList = []
            this.isShowMaterial = false
            this.uploadImgList.push({picUrl: imgArr[0].showSelectImg, upbtnGroup: false})
        },
        linkBack(obj) {
            this.isShowMt = false
            // picLinkType: "1", picLink: "", isLoginNeeded: "1", isIdNeeded: "0", xPicUrl: ""
            this.linkType = obj.picLinkType
            this.linkAdress = obj.picLink
            this.isLogin = obj.isLoginNeeded
            this.isNeedId = obj.isIdNeeded

            this.topLineList[this.topLineIndex].picLink = this.linkAdress
            this.topLineList[this.topLineIndex].picLinkType = this.linkType
            this.topLineList[this.topLineIndex].isLoginNeeded = this.isLogin
            this.topLineList[this.topLineIndex].isIdNeeded = this.isNeedId
            this.updateOptions()
        },
        handleClick(width,height) {
            this.size = []
            this.isShowMaterial = true
            this.size.push(width,height,2)
        },
        handleDialogCloseMaterial() {
            this.isShowMaterial = false
        },
        confirm() {
            this.uploadImgList = []
            this.materialUrlList = this.$refs.chooseMaterial.getParentImage()
            this.isShowMaterial = false
            this.uploadImgList.push({picUrl: this.materialUrlList, upbtnGroup: false})
            this.updateOptions();
        },
        updateOptions() {
            this.menuOptions = {
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId,
                styleType: this.styleType,
                floorType: '03',
                floorName: '头条',
                floorIsAd: '0',
                picUrl: this.uploadImgList[0].picUrl || linkConfig['flameappPicUrl'].url + '/cheetahresource/template/assets/gray.jpg',
                isGap: this.styleType == '04' ? '0' : (this.isSplitBtn ? '1' : '0'),
                color: this.isSplitBtn? this.color : 'red',
                heightF: this.styleType == '02' ? '52' : '38',
                operatorId: this.options.operatorId,
                operator: this.options.operator,
                styleInfoList: this.topLineList
            }
            this.$emit('setMenuStyleOptions', this.menuOptions)
        },
        isSplitBtnEvent() {
            this.isSplitBtn = !this.isSplitBtn
            this.updateOptions()
        },
         /**
         * 创建头条条数
         */
        createTopLine (num) {
            return Object.assign({
                contentType: '1',
                instructions: '',
                styleName: '头条',
                styleType: this.styleType,
                contentType: '1',
                fieldset1: '',
                // instructions: this.topLineList[this.topLineIndex].instructions,
                picLink: this.linkAdress,
                floorId: this.options.floorId,
                ordernNum: num + 1,
                picLinkType: this.linkType,
                isLoginNeeded: this.isLogin,
                isIdNeeded: this.isNeedId,
            })
        },
        /**
         * 添加轮播项
         */
        addTopLine () {
            let num = this.topLineList.length
            this.topLineList.push(this.createTopLine(num))
        },
        // 删除头条条目
        delTopLine(index) {
            this.topLineNum = 1
            if(this.topLineList.length == 1) {
                return
            }
            this.topLineList.splice(index, 1)
            this.topLineNum = this.topLineList.length
            this.updateOptions()
        },
        backMenu() {
            this.isShowMt = false
            this.topLineList[this.topLineIndex].picLink = this.linkAdress
            this.topLineList[this.topLineIndex].picLinkType = this.picLinkType
            this.topLineList[this.topLineIndex].isLoginNeeded = this.isLogin
            this.topLineList[this.topLineIndex].isIdNeeded = this.isNeedId
            this.topLineList[this.topLineIndex].picLink = this.linkAdress
            this.updateOptions()
        },
        editFloorStyleAllocation() {
            let data ={
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                pageId: this.options.pageId,
                floorType: '03',
                floorName: '头条',
                floorIsAd: '0',
                // orderNum: '1',
                styleType: this.styleType,
                color: this.color,
                picUrl: this.uploadImgList[0].picUrl,
                // cycleType: this.cycleType,
                // isGap: this.isSplitBtn ? '1' : '0',
                isGap: this.styleType == '04' ? '0' : (this.isSplitBtn ? '1' : '0'),
                status: '0',
                widthF: '375',
                heightF: (this.styleType == '01' ? '40' : (this.styleType == '02' ? '52' : (this.styleType == '03' ? '64' : (this.styleType == '04' ? '40' : '40')))),
                operatorId: this.options.operatorId,
                operator: this.options.operator
            }
            editFloorStyleAllocation(data).then(res => {
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
            var newTopLineList = []
            this.topLineList.forEach((res, i) => {
                newTopLineList.push({
                    // contentType: res.contentType,
                    instructions: res.instructions,
                    styleName: '头条',
                    styleType: this.styleType,
                    contentType: '1',
                    fieldset1: res.fieldset1,
                    // contentType: '1',
                    // instructions: this.topLineList[this.topLineIndex].instructions,
                    picLink: res.picLink,
                    // floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                    floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                    ordernNum: i +1,
                    picLinkType: res.picLinkType,
                    isLoginNeeded: res.isLoginNeeded,
                    isIdNeeded: res.isIdNeeded,
                })
            })
            let carouselData = {
                floorType: '03',
                floorId: this.options.floorId || this.currentTemplateItem.options.floorId,
                headLineList: newTopLineList
            }
            console.dir(newTopLineList)
            eidtMenuStyleRpc(carouselData).then(res => {
                this.handleMsg(res, '楼层保存成功', '楼层保存失败')
            })
        },
        sureForRpc() {
            this.editFloorStyleAllocation()
            // this.eidtMenuStyleRpc()
        },
        showMenuSetting(item, i) {
            this.topLineIndex = i
            this.setting_item = item
            this.isShowMt = true
            this.linkOptions = item
        },
        async getCropperImgMsg() {
            this.isDisabled = true
              this.cropperImgUrlList = await this.$refs.cropper.getImageBlob()
            var FileController = API.uploadImg;
            // FormData 对象
            var form = new FormData();
            var fileOfBlob = new File([this.cropperImgUrlList], this.imgName);
            // 文件对象
            form.append("file", fileOfBlob);
            // 其他参数
            // XMLHttpRequest 对象
            var xhr = new XMLHttpRequest();
            // iCIFID: getCookie('iCIFID') || '',
            //     eCIFID: getCookie('eCIFID') || ''
            xhr.open("post", FileController, true);
            xhr.setRequestHeader('iCIFID' , getCookie('iCIFID') || '' );
            // 'iCIFID' + getCookie('eCIFID') || '')
            xhr.setRequestHeader('eCIFID' , getCookie('eCIFID') || '' )
            xhr.onload = () => {
                this.isDisabled = false
                this.closeUpload = true
                var backlist = JSON.parse(xhr.response)
                this.uploadImgList[0].picUrl = backlist.body.uploadFileList[0].filePath
                this.updateOptions()
                this.uploadImgList[0].upbtnGroup = true
                this.isShowCropper = false
            };
            xhr.send(form);
        },
        uploadImg(event) {
            // this.uploadImgIndex = i
            var files = event.target.files
            this.imgType = files[0].name.split('.')[1]
            this.cropwidth = 40
            this.cropheight = 40
            this.imgName = files[0].name
            this.isShowCropper = true
            this.cropperImgUrl = this.getObjectURL(files[0])
        },

        getObjectURL (file) {
            let url = null ;
            if (window.createObjectURL!=undefined) { // basic
                url = window.createObjectURL(file) ;
            }else if (window.webkitURL!=undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file) ;
            }else if (window.URL!=undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file) ;
            }
            return url ;
        },
        // 模态框关闭回调
        handleDialogClose() {
            this.isShowCropper = false
            this.dialogFormVisible = true
        },
        // 清空图片
        delImgList() {
            this.closeUpload = false
            this.uploadImgList = [{picUrl: '', upbtnGroup: false}]
            this.updateOptions()
        },
        // 数字中文转换
        // changeNumToC(type) {
        //     switch(type) {
        //         case '1':
        //         return '资讯'
        //         break;
        //         case '2':
        //         return '交易'
        //         break;
        //         case '3':
        //         return '公告'
        //         break;
        //         case '4':
        //         return '活动'
        //         break;
        //     }
        // },
        // // 中文转数字
        // changeCToNum(type) {
        //     switch(type) {
        //         case '资讯':
        //         return '1'
        //         break;
        //         case '交易':
        //         return '2'
        //         break;
        //         case '公告':
        //         return '3'
        //         break;
        //         case '活动':
        //         return '4'
        //         break;
        //     }
        // },
    }
}
</script>

<style lang="scss" scoped>
.topLine__style{
& .file {
    display: inline-block;
    width: 80px;
    height: 80px;
    // background: green;
    opacity: 0;
    position: absolute;
    left: 70px;
    top: 0;
}
& .carousel__Specifications .showImg{
    cursor: pointer;
        margin-left: 209px;
    }
    & {
        background: #ffffff;
        padding: 0 20px 0 0;
    }
    .topLine {
        margin-left: 20px;
        background: #FFFFFF;
        box-shadow: inset 0 -1px 0 0 #F2F2F2;
    }
    /* &  .el-form {
        padding: 20px 0 4px 0;
        box-shadow: inset 0 -1px 0 0 #F5F5FA;
    } */
    & .el-select {
        width: 288px;
        // margin-left: 90px;
    }
    // & .el-form-item {
    //     padding-bottom: 16px;
    // }
    /* .el-form-item__label {
        padding: 0 33px 0 0;
    } */
    .el-radio+.el-radio {
        // margin-left: 50px;
    }
    .el-form-item__label, .el-radio__label, .el-input__inner {
        font-family: MicrosoftYaHeiUI;
        font-size: 13px;
        font-weight: 400;
        color: #323C41;
        letter-spacing: 0;
    }
    /* .el-form-item__label {
        color: #D0021B;
    } */
    
    .nomal__font__color .el-form-item__label {
        margin-right: 13px;
    }
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #3671FF;
        background: #3671FF;
    }
    .el-radio__input.is-checked+.el-radio__label {
        color: #323C41;
    }
    /* .el-input-number {
        width: 288px;
        height: 40px;
    } */
    .el-input {
        height: 40px;
        width: 232px;
    }
    .el-input__inner {
        height: 40px;
        padding-left: 15px;
    }

    .carousel__content__body {
        // display: flex;
        justify-content: start;
        padding: 20px 0;
    }
    .carousel__content__body .carousel__content__body__text{
        width: 72px;
        font-family: MicrosoftYaHeiUI;
        font-size: 13px;
        color: #323C41;
        letter-spacing: 0;
    }
    & .carousel__Specifications {
        display: flex;
        margin-left: 30px;
        align-items: center;
    }
    & .carousel__Specifications span {
        font-family: MicrosoftYaHeiUI;
        color:#CACCD2;
        font-size: 12px;
    }
    // &  .carousel__Specifications {
    //     width: 80px;
    //     height: 80px;
    //     background: #FAFAFC;
    //     margin-left: 20px;
    //     text-align: center;
    //     font-family: PingFangSC-Regular;
    //     font-size: 12px;
    //     color: #DDE0E4;
    //     text-align: center;
    //     line-height: 100px;
        
    // }
    .arousel__peration{
        display: flex;
        width: 80px;
        background: rgba($color: #000000, $alpha: 0.5);
        height: 40px;
        align-items: center;
        margin-left: 72px;
        position: absolute;
        bottom: 0;
        img {
            margin-left: 50px;
        }
    }
    // .arousel__peration img{
    //     margin-bottom: 10px;
    //     margin-left: 10px;
    // }
    & .positionImg {
         width: 20px;
         height: 20px;
         position: absolute;
         left:100px;
         top: 25px;
    }

    .cut__off__ule {
        padding-bottom: 20px;
        display: flex;
        align-items: center;
    }
    .cut__off__ule span {
        font-family: MicrosoftYaHeiUI;
        font-size: 13px;
        color: #323C41;
        letter-spacing: 0;
        // margin-right:20px;
    }

    .splitBtn {
        background: #CACCD2;
        border-radius: 1px;
        width: 32px;
        height: 2px;
        margin-left: 20px;
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

    & .gauge__content__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 12px 0;
    }

    & .gauge__content__head__text {
        font-family: MicrosoftYaHeiUI;
        font-size: 13px;
        color: #323C41;
        letter-spacing: 0;
    }

    & .oncrete__attributes {
        padding-left: 20px;
    }
    & {
        .oncrete__attributes {

            .gauge__head__right {
                cursor: pointer;
            }
            .gauge__content__body {
                display: flex;
                justify-content: space-between;
                .guage__text {
                    font-family: MicrosoftYaHeiUI;
                    font-size: 13px;
                    color: #323C41;
                    letter-spacing: 0;
                }
                .gauge__input {
                    width: 288px;

                    .edit__icon {
                        width: 288px;
                        height: 40px;
                        text-align: right;

                        img {
                            cursor: pointer;
                            width: 20px;
                            height: 20px;
                            margin-left: 6px;
                        }
                    }
                }

                .el-input {
                    width: 288px;
                    height: 40px;
                    margin-bottom: 10px;
                }
            }
        }
    }

    .mtbox-leave-active,.mtbox-enter-active{
        transition:  all 0.5s ease; 
    }
    .mtbox-leave-active,.mtbox-enter{
        right:-400px !important;
    }
    .mtbox-leave,.mtbox-enter-active{
        right: 400;
    }


    /* 侧滑面板样式 */
.popup {
    width: 410px;
    position: absolute;
    right: 0;
    top: 0;
    height: 598px;
    background:#ffffff;
    z-index: 1000;
    overflow-y: auto;

    .popup-head {
        height: 48px;
        padding: 0 20px;
        line-height: 48px;
        display: flex;
        align-items: center;
        box-shadow: inset 0 -1px 0 0 #DDE0E4;

        .jiantou {
            width:0;
            height:0;
            border: 6px solid transparent;
            border-right-color: #3671FF;
            position:absolute;
            left: 16;
            content:'';
            cursor: pointer;
        }
        
        .back-icon {
            width: 12px;
            height: 4px;
            // transform: rotate(-90deg);
            background: #3671FF;
            margin-left: 8px;
            cursor: pointer;
        }
        .back-text, .mtSetting {
            font-family: MicrosoftYaHeiUI;
            font-weight: bold;
            font-size: 13px;
            letter-spacing: 0;
        }
        .mtSetting {
            color: #14001D;
        }
        .fenge {
            font-family: MicrosoftYaHeiUI;
            font-weight: bold;
            font-size: 13px;
            color: #000000;
            letter-spacing: 0;
            margin: 0 4px 0 4px;
        }
        .back-text {
            color: #3671FF;
            margin-left: 4px;
            cursor: pointer;
        }
    }

    .setting-content, .palace__setting {
        padding: 20px 20px 20px 24px;

        .el-input {
            height: 40px;
            width: 288px;
        }

        .el-picker-panel__body {
            .el-input {
                width: 147px;
                height: 32px;   
            }
            .el-input__inner {
                width: 147px;
                height: 32px;
            }
        }

        .el-form-item__label {
            padding: 0 20px 0 0;
            font-family: MicrosoftYaHeiUI;
            font-size: 12px;
            color: #323C41;
            letter-spacing: 0;
        }

        .el-input__inner {
            width: 288px;
            height: 40px;
        }
        .el-input__prefix {
            left: 258px;
        }

        .el-input--prefix .el-input__inner {
            padding-left: 5px;
        }
    }
    .palace__setting {

        .palace__icon {
            margin-left: 68px;
            display: flex;
            flex-wrap: wrap;
            // justify-content: space-between;
        }

        .palace__icon__body {
            width: 120px;
            margin-right: 20px;

            .icon__block {
                width: 120px;
                height: 120px;
                background: #FAFAFC;
                position: relative; 

                img {
                    position: absolute;
                    top:50%; 
                    left:50%;
                    transform: translate(-50%,-50%);
                }
            }

            .del__text {
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #A2A4A6;
                text-align: center;
                margin: 6px 0;
            }
        }

        .el-radio__input.is-checked+.el-radio__label {
            color: #323C41;
        }

        ::placeholder {
            font-family: MicrosoftYaHeiUI;
            font-size: 12px;
            color: #323C41;
        }

        .padding_left_del {

            .el-form-item__label {
                padding: 0 6px 0 0;
            }
            
        }
        .add_right_padding {
            .el-form-item__label {
                padding: 0 40px 0 0;
            }

            .el-radio__label {
                // font-family: MicrosoftYaHeiUI;
                font-size: 12px;
                color: #323C41;
                letter-spacing: 0;
                font-weight: 400;
            }
        }

        .line__style__radio {
            height: 60px;
            position: relative;
            .el-radio {
                display: block;
                margin-top: 12px;
            }
            .el-radio+.el-radio {
                margin: 0;
                margin-top: 12px;
            }
            .el-input {
                width: 220px;
                position: absolute;
                right: 0;
                bottom: -10px;

                .el-input__inner {
                    width: 220px;
                }
            }
        }
    }
}

.el-dialog {
        width: 800px;
}

.cropper-box div.el-dialog div.el-dialog__body {
        padding: 0;
    }
    .cropper-box .el-dialog__body {
        padding: 0;
    }
.el-dialog__footer {
    padding: 16px 0;

    .el-button:focus, .el-button:hover{
            color: #ffffff;
            border-color: #3671FF;
            background-color: #3671FF;
        }

    .dialog-footer {
        width: 112px;
        height: 40px;
        margin: 0 auto;

        .btn {
            width: 112px;
            height: 40px;
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

    & .gauge__info__palace_notice{
        color: #d0d2d4;
        text-align: center;
        background: #FAFAFC;
        padding: 20px 0;
    }
    .middle {
        margin-left: 20px;
        border-bottom: 1px solid #F2F2F2;
        .slideType{
            display: flex;
            height: 60px;
            align-items: center;
            justify-content: space-between;
        }
        .cut__off__ule{
            .splitBtn{
                margin-left: 24px;
            }
            .el-input{
                margin-left: 20px;
            }
            .el-color-picker__trigger{
                position: absolute;
                right: 0px;
                .el-color-picker__color span {
                    margin-left: 0
                }
            }
        }
    }
}
</style>



